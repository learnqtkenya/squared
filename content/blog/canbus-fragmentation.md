---
title: "Implementing a CAN Bus Fragmentation Protocol: A Developer's Guide"
date: "2025-03-25"
author: "Erick"
tags: ["CAN"]
excerpt: "How do you squeeze a 100-byte telemetry packet through an 8-byte straw? One fragment at a time."
coverImage: "/images/blog/can-fragmentation.png"
---

## Understanding the Problem

As embedded developers, we frequently encounter the fundamental limitation of the standard CAN bus: an 8-byte maximum payload per frame. This constraint becomes particularly challenging when we need to transmit larger data structures like configuration parameters, telemetry data, or diagnostic information.

Consider a typical scenario: You have a network of sensors sending 50-byte telemetry packets to a central controller. Each packet contains multiple measurements, timestamps, and status flags. How do you transmit this data over a communication channel limited to 8 bytes per message?

In this guide, I'll walk you through the implementation of a robust fragmentation protocol that elegantly solves this problem.

## Core Concepts of Our Fragmentation Protocol

Before diving into implementation details, let's understand the key concepts:

1. **Fragmentation**: Breaking larger messages into smaller pieces that fit within CAN's 8-byte limit
2. **Fragment Types**: Different types of fragments (START, MIDDLE, END, SINGLE) each serving a specific purpose
3. **Reassembly**: Collecting fragments and recombining them into the original message
4. **Identification**: Ensuring fragments from different messages don't get mixed up

## Bit-Level Design: Optimizing Every Bit

The foundation of our protocol is a careful allocation of bits in both the CAN ID field and data payload. Let's examine the structure in detail:

### Extended CAN ID (29 bits)

```
+-------------------------------------------------------------+
| 28 27 26 25 | 24 23 | 22 21 20 | 19 18 17 16 | 15 to 0     |
+-------------------------------------------------------------+
| Target ID   | Prior | Msg Type  | Sender ID   | Msg Specific|
| (4 bits)    | (2b)  | (3 bits)  | (4 bits)    | (16 bits)   |
+-------------------------------------------------------------+
```

In our implementation, we'll construct the CAN ID using bitwise operations:

```cpp
uint32_t buildCanId(uint8_t target_id, uint8_t priority, uint8_t msg_type, 
                    uint8_t sender_id, uint16_t msg_specific) {
    uint32_t id = 0;
    id |= (target_id & 0xF) << 25;       // Target ID in bits [28:25]
    id |= (priority & 0x3) << 23;        // Priority in bits [24:23]
    id |= (msg_type & 0x7) << 20;        // Message type in bits [22:20]
    id |= (sender_id & 0xF) << 16;       // Sender ID in bits [19:16]
    id |= (msg_specific & 0xFFFF);       // Message-specific data in bits [15:0]
    return id;
}
```

And we'll need a corresponding function to parse received CAN IDs:

```cpp
void parseCanId(uint32_t can_id, uint8_t &target_id, uint8_t &priority,
                uint8_t &msg_type, uint8_t &sender_id, uint16_t &msg_specific) {
    target_id = (can_id >> 25) & 0xF;      // Extract target ID from bits [28:25]
    priority = (can_id >> 23) & 0x3;       // Extract priority from bits [24:23]
    msg_type = (can_id >> 20) & 0x7;       // Extract message type from bits [22:20]
    sender_id = (can_id >> 16) & 0xF;      // Extract sender ID from bits [19:16]
    msg_specific = can_id & 0xFFFF;        // Extract message-specific data from bits [15:0]
}
```

### Fragment Types and Headers

Our protocol defines four fragment types, each with a specific header structure:

#### 1. START Fragment

```
+-------------------------------------------------------------------+
| CAN ID (29 bits)                      | Data (8 bytes)            |
+---------------------------------------+---------------------------+
| Target|Pri|Type|Sender|FragType=START | ST|MID|TotalSize|Payload  |
| (4b)  |2b |3b  |4b    |16b           | 1b|1b |2b       |4b       |
+---------------------------------------+---------------------------+
```

Here's how we define the START fragment header:

```cpp
// Header for START fragment
struct StartHeader {
    uint8_t structType;   // Type of data structure being sent
    uint8_t messageId;    // Unique identifier for this message
    uint16_t totalSize;   // Total size of the complete message
};
// Size: 4 bytes, leaving 4 bytes for payload in an 8-byte CAN frame
```

#### 2. MIDDLE Fragment

```
+-------------------------------------------------------------------+
| CAN ID (29 bits)                      | Data (8 bytes)            |
+---------------------------------------+---------------------------+
| Target|Pri|Type|Sender|FragType=MIDDLE| ST|MID|SeqNum|Payload     |
| (4b)  |2b |3b  |4b    |16b           | 1b|1b |1b    |5b          |
+---------------------------------------+---------------------------+
```

Here's the header for MIDDLE fragments:

```cpp
// Header for MIDDLE and END fragments
struct ChainHeader {
    uint8_t structType;   // Type of data structure
    uint8_t messageId;    // Message identifier
    uint8_t seqNum;       // Sequence number
};
// Size: 3 bytes, leaving 5 bytes for payload
```

#### 3. END Fragment

```
+-------------------------------------------------------------------+
| CAN ID (29 bits)                      | Data (8 bytes)            |
+---------------------------------------+---------------------------+
| Target|Pri|Type|Sender|FragType=END   | ST|MID|SeqNum|Payload     |
| (4b)  |2b |3b  |4b    |16b           | 1b|1b |1b    |5b          |
+---------------------------------------+---------------------------+
```

The END fragment uses the same `ChainHeader` as MIDDLE fragments.

#### 4. SINGLE Fragment

```
+-------------------------------------------------------------------+
| CAN ID (29 bits)                      | Data (8 bytes)            |
+---------------------------------------+---------------------------+
| Target|Pri|Type|Sender|FragType=SINGLE| ST|MID|Size |Payload      |
| (4b)  |2b |3b  |4b    |16b           | 1b|1b |1b   |5b           |
+---------------------------------------+---------------------------+
```

Here's the header for SINGLE fragments:

```cpp
// Header for SINGLE fragments
struct SingleHeader {
    uint8_t structType;   // Type of data structure
    uint8_t messageId;    // Message identifier
    uint8_t dataSize;     // Size of the contained data
};
// Size: 3 bytes, leaving 5 bytes for payload
```

## Core Implementation Components

Now that we understand the bit-level structure, let's implement the key components of our fragmentation protocol.

### 1. Fragment Protocol Constants

First, let's define the constants for our protocol:

```cpp
namespace FragProtocol {
    // Fragment types
    enum FragmentType : uint8_t {
        START = 0,   // First fragment
        MIDDLE = 1,  // Middle fragment
        END = 2,     // Last fragment
        SINGLE = 3   // Complete message in one fragment
    };
    
    // Constants
    constexpr uint16_t MAX_MESSAGE_SIZE = 2048;    // Maximum reassembled message size
    constexpr uint8_t MAX_MESSAGES = 8;            // Maximum concurrent messages
    constexpr uint32_t DEFAULT_TIMEOUT_MS = 5000;  // Default timeout
    
    // Header sizes
    constexpr uint8_t START_HEADER_SIZE = 4;   // structType(1) + msgId(1) + totalSize(2)
    constexpr uint8_t MIDDLE_HEADER_SIZE = 3;  // structType(1) + msgId(1) + seqNum(1)
    constexpr uint8_t END_HEADER_SIZE = 3;     // structType(1) + msgId(1) + seqNum(1)
    constexpr uint8_t SINGLE_HEADER_SIZE = 3;  // structType(1) + msgId(1) + size(1)
    
    // Maximum payload sizes (8-byte CAN frame - header size)
    constexpr uint8_t MAX_START_PAYLOAD = 8 - START_HEADER_SIZE;     // = 4
    constexpr uint8_t MAX_MIDDLE_PAYLOAD = 8 - MIDDLE_HEADER_SIZE;   // = 5
    constexpr uint8_t MAX_END_PAYLOAD = 8 - END_HEADER_SIZE;         // = 5
    constexpr uint8_t MAX_SINGLE_PAYLOAD = 8 - SINGLE_HEADER_SIZE;   // = 5
}
```

### 2. Message Tracking Structures

To manage the fragmentation process, we need two key structures:

```cpp
// Structure to track incoming messages being reassembled
struct IncomingMessage {
    uint8_t buffer[FragProtocol::MAX_MESSAGE_SIZE];  // Buffer for reassembly
    uint16_t totalSize = 0;        // Expected size when complete
    uint16_t receivedSize = 0;     // Bytes received so far
    uint8_t messageId = 0;         // Message identifier 
    uint8_t senderId = 0;          // Sender node identifier
    uint8_t structType = 0;        // Type of data structure
    uint8_t expectedSeqNum = 0;    // Next expected sequence number
    uint32_t lastFragmentTime = 0; // Timestamp for timeout detection
    bool active = false;           // Whether this slot is in use
    
    void reset() {
        active = false;
        receivedSize = 0;
        expectedSeqNum = 0;
    }
    
    bool isComplete() const {
        return active && (receivedSize >= totalSize);
    }
};

// Structure to track outgoing messages being sent
struct OutgoingMessage {
    const uint8_t* data = nullptr;   // Pointer to source data
    uint16_t totalSize = 0;          // Total message size
    uint16_t sentSize = 0;           // Bytes sent so far
    uint8_t messageId = 0;           // Message identifier
    uint8_t targetNode = 0;          // Destination node
    uint8_t structType = 0;          // Type of data structure
    uint8_t nextSeqNum = 0;          // Next sequence number to send
    uint32_t lastSendTime = 0;       // Timestamp for throttling
    bool active = false;             // Whether transmission is active
    
    void reset() {
        active = false;
        sentSize = 0;
        nextSeqNum = 0;
    }
};
```

### 3. Sending a Message

Now let's implement the core function for sending a message, which handles the fragmentation decision:

```cpp
bool sendBytes(uint8_t target_node, uint8_t struct_type, 
               const void* data, uint16_t len, 
               uint8_t priority = PRIORITY_NORMAL) {
    // Validate parameters
    if (!data || len == 0 || len > FragProtocol::MAX_MESSAGE_SIZE) {
        return false;
    }
    
    // Check if already sending a message
    if (m_outgoingMessage.active) {
        return false;
    }
    
    // For very small messages that fit in a SINGLE fragment
    if (len <= FragProtocol::MAX_SINGLE_PAYLOAD) {
        return sendSingleFragment(target_node, struct_type, data, len, priority);
    }
    
    // For larger messages, set up fragmented transmission
    m_outgoingMessage.messageId = generateMessageId();
    m_outgoingMessage.targetNode = target_node;
    m_outgoingMessage.structType = struct_type;
    m_outgoingMessage.totalSize = len;
    m_outgoingMessage.sentSize = 0;
    m_outgoingMessage.nextSeqNum = 0;
    m_outgoingMessage.data = static_cast<const uint8_t*>(data);
    m_outgoingMessage.active = true;
    m_outgoingMessage.lastSendTime = 0;  // Send first fragment immediately
    
    return true;  // Fragmentation set up, actual sending happens in update()
}
```

### 4. Sending Fragments

Let's implement the function to send a SINGLE fragment (for small messages):

```cpp
bool sendSingleFragment(uint8_t target_node, uint8_t struct_type,
                        const void* data, uint16_t len, uint8_t priority) {
    // Prepare buffer for SINGLE fragment (8 bytes max)
    uint8_t buffer[8] = {0};
    
    // First byte is struct_type
    buffer[0] = struct_type;
    
    // Create header
    SingleHeader header;
    header.messageId = generateMessageId();
    header.dataSize = len;
    
    // Copy header after struct_type
    memcpy(buffer + 1, &header, sizeof(header) - 1);  // -1 because structType already set
    
    // Copy data
    memcpy(buffer + FragProtocol::SINGLE_HEADER_SIZE, data, len);
    
    // Send using the CAN handler
    return m_canHandler.send(
        priority,
        MESSAGE_TYPE_FRAGMENT,  // Special message type for fragments
        target_node, 
        FragProtocol::SINGLE,   // Fragment type as code
        buffer,
        FragProtocol::SINGLE_HEADER_SIZE + len
    );
}
```

And here's the function that sends the next fragment for a multi-fragment message:

```cpp
bool sendNextFragment() {
    if (!m_outgoingMessage.active) {
        return false;
    }
    
    // Implement throttling to avoid flooding the bus
    uint32_t currentTime = getCurrentTimeMs();
    if (currentTime < m_outgoingMessage.lastSendTime + 5) {  // 5ms minimum interval
        return false;
    }
    
    // Prepare buffer
    uint8_t buffer[8] = {0};
    
    // First byte is always the struct type
    buffer[0] = m_outgoingMessage.structType;
    
    // Handle START fragment (first in sequence)
    if (m_outgoingMessage.nextSeqNum == 0) {
        // Create START header
        StartHeader header;
        header.messageId = m_outgoingMessage.messageId;
        header.totalSize = m_outgoingMessage.totalSize;
        
        // Copy header after struct_type
        memcpy(buffer + 1, &header, sizeof(header) - 1);
        
        // Calculate available payload space
        uint8_t payloadSize = std::min<uint16_t>(
            m_outgoingMessage.totalSize,
            FragProtocol::MAX_START_PAYLOAD
        );
        
        // Copy payload data
        memcpy(buffer + FragProtocol::START_HEADER_SIZE,
               m_outgoingMessage.data,
               payloadSize);
        
        // Send START fragment
        bool success = m_canHandler.send(
            m_outgoingMessage.priority,
            MESSAGE_TYPE_FRAGMENT,
            m_outgoingMessage.targetNode,
            FragProtocol::START,
            buffer,
            FragProtocol::START_HEADER_SIZE + payloadSize
        );
        
        if (success) {
            // Update state for next fragment
            m_outgoingMessage.sentSize = payloadSize;
            m_outgoingMessage.nextSeqNum = 1;
            m_outgoingMessage.lastSendTime = currentTime;
        }
        
        return success;
    }
    else {
        // Handle MIDDLE or END fragments
        
        // Calculate offset in the source data
        uint16_t offset = FragProtocol::MAX_START_PAYLOAD + 
            (m_outgoingMessage.nextSeqNum - 1) * FragProtocol::MAX_MIDDLE_PAYLOAD;
        
        // Determine bytes remaining
        uint16_t remaining = m_outgoingMessage.totalSize - offset;
        
        // Decide if this is the last fragment
        bool isLastFragment = (remaining <= FragProtocol::MAX_END_PAYLOAD);
        uint8_t fragmentType = isLastFragment ? FragProtocol::END : FragProtocol::MIDDLE;
        
        // Create header
        ChainHeader header;
        header.messageId = m_outgoingMessage.messageId;
        header.seqNum = m_outgoingMessage.nextSeqNum;
        
        // Copy header after struct_type
        memcpy(buffer + 1, &header, sizeof(header) - 1);
        
        // Calculate payload size
        uint8_t maxPayload = isLastFragment ? 
            FragProtocol::MAX_END_PAYLOAD : FragProtocol::MAX_MIDDLE_PAYLOAD;
        uint8_t payloadSize = std::min<uint16_t>(remaining, maxPayload);
        
        // Copy payload
        memcpy(buffer + (isLastFragment ? FragProtocol::END_HEADER_SIZE : 
                         FragProtocol::MIDDLE_HEADER_SIZE),
               m_outgoingMessage.data + offset,
               payloadSize);
        
        // Send fragment
        bool success = m_canHandler.send(
            m_outgoingMessage.priority,
            MESSAGE_TYPE_FRAGMENT,
            m_outgoingMessage.targetNode,
            fragmentType,
            buffer,
            (isLastFragment ? FragProtocol::END_HEADER_SIZE : 
                             FragProtocol::MIDDLE_HEADER_SIZE) + payloadSize
        );
        
        if (success) {
            // Update state
            m_outgoingMessage.sentSize += payloadSize;
            m_outgoingMessage.nextSeqNum++;
            m_outgoingMessage.lastSendTime = currentTime;
            
            // If this was the last fragment, mark transmission complete
            if (isLastFragment) {
                m_outgoingMessage.active = false;
            }
        }
        
        return success;
    }
}
```

### 5. Receiving and Processing Fragments

Now let's implement the functions to process received fragments:

```cpp
void processFragment(uint8_t fragmentType, const uint8_t* data, 
                     uint16_t len, uint8_t senderId) {
    // Sanity check
    if (!data || len < 1) {
        return;
    }
    
    // Extract struct type
    uint8_t structType = data[0];
    data++; // Skip struct type
    len--;  // Adjust length
    
    // Dispatch based on fragment type
    switch (fragmentType) {
        case FragProtocol::START:
            processStartFragment(structType, data, len, senderId);
            break;
            
        case FragProtocol::MIDDLE:
            processMiddleFragment(structType, data, len, senderId);
            break;
            
        case FragProtocol::END:
            processEndFragment(structType, data, len, senderId);
            break;
            
        case FragProtocol::SINGLE:
            processSingleFragment(structType, data, len, senderId);
            break;
    }
}
```

Let's implement the handler for START fragments:

```cpp
void processStartFragment(uint8_t structType, const uint8_t* data, 
                         uint16_t len, uint8_t senderId) {
    // Validate minimum length for header
    if (len < sizeof(StartHeader) - 1) {  // -1 because structType already extracted
        return;
    }
    
    // Extract header fields
    StartHeader header;
    header.structType = structType;  // Already extracted
    memcpy(&header.messageId, data, sizeof(StartHeader) - 1);
    
    // Validate total size
    if (header.totalSize == 0 || header.totalSize > FragProtocol::MAX_MESSAGE_SIZE) {
        return;
    }
    
    // Check for existing message with same ID and sender
    IncomingMessage* msg = findIncomingMessage(header.messageId, senderId);
    if (msg && msg->active) {
        // Found duplicate or retransmission, reset it
        msg->reset();
    }
    else {
        // Find free slot for new message
        msg = nullptr;
        for (int i = 0; i < FragProtocol::MAX_MESSAGES; i++) {
            if (!m_incomingMessages[i].active) {
                msg = &m_incomingMessages[i];
                break;
            }
        }
        
        if (!msg) {
            // No free slots, find oldest message to replace
            uint32_t oldestTime = UINT32_MAX;
            for (int i = 0; i < FragProtocol::MAX_MESSAGES; i++) {
                if (m_incomingMessages[i].lastFragmentTime < oldestTime) {
                    oldestTime = m_incomingMessages[i].lastFragmentTime;
                    msg = &m_incomingMessages[i];
                }
            }
            msg->reset();  // Reset the oldest message
        }
    }
    
    // Initialize message state
    msg->messageId = header.messageId;
    msg->senderId = senderId;
    msg->structType = structType;
    msg->totalSize = header.totalSize;
    msg->receivedSize = 0;
    msg->expectedSeqNum = 1;  // Next expected sequence number
    msg->lastFragmentTime = getCurrentTimeMs();
    msg->active = true;
    
    // Process payload data
    uint16_t payloadOffset = sizeof(StartHeader) - 1;
    uint16_t payloadLen = len - payloadOffset;
    if (payloadLen > 0) {
        // Copy payload data to buffer
        memcpy(msg->buffer, data + payloadOffset, payloadLen);
        msg->receivedSize = payloadLen;
    }
    
    // Check if message is already complete (small messages)
    if (msg->isComplete()) {
        // Call callback with reassembled data
        if (m_callbacks[msg->structType]) {
            m_callbacks[msg->structType](
                msg->buffer, 
                msg->totalSize, 
                msg->messageId, 
                msg->senderId
            );
        }
        msg->reset();  // Free the slot
    }
}
```

The implementations for MIDDLE and END fragments follow a similar pattern, focusing on buffer offset calculation and sequence verification.

### 6. Tracking Timeouts

To prevent resource leaks, we need to check for timeouts:

```cpp
void checkTimeouts() {
    uint32_t currentTime = getCurrentTimeMs();
    
    for (int i = 0; i < FragProtocol::MAX_MESSAGES; i++) {
        IncomingMessage& msg = m_incomingMessages[i];
        
        if (msg.active && 
            (currentTime - msg.lastFragmentTime > m_fragmentTimeoutMs)) {
            // Message has timed out
            msg.reset();  // Free the slot
        }
    }
}
```

### 7. The Main Update Loop

To tie everything together, implement an update function that should be called periodically:

```cpp
bool update() {
    bool activityDetected = false;
    
    // Check for timeouts in incoming messages
    checkTimeouts();
    
    // Send next fragment if we have an active outgoing message
    if (m_outgoingMessage.active) {
        if (sendNextFragment()) {
            activityDetected = true;
        }
    }
    
    return activityDetected;
}
```

## Using the Protocol in Your Application

Now that we've implemented the core fragmentation protocol, let's see how to use it in a real application:

### 1. Initialize the Protocol

```cpp
// In your application initialization
CANHandler canHandler(CAN1_RX_PIN, CAN1_TX_PIN, NODE_ID);
FragmentProtocol fragProtocol(canHandler);

void initialize() {
    // Initialize CAN handler
    if (!canHandler.initialize()) {
        // Handle error
        return;
    }
    
    // Initialize fragment protocol
    if (!fragProtocol.initialize()) {
        // Handle error
        return;
    }
    
    // Register callbacks for message types
    registerCallbacks();
}
```

### 2. Define a Data Structure to Send

```cpp
// Example data structure
#pragma pack(push, 1)  // Ensure no padding
struct SensorData {
    uint32_t timestamp;
    float temperature;
    float pressure;
    float humidity;
    uint8_t status;
};
#pragma pack(pop)

// Unique code for this data type
constexpr uint8_t SENSOR_DATA_TYPE = 10;
```

### 3. Register a Callback for Receiving Data

```cpp
void registerCallbacks() {
    // Register callback for sensor data
    fragProtocol.registerCallback<SensorData>(
        SENSOR_DATA_TYPE,
        [](const SensorData& data, uint8_t msgId, uint8_t senderId) {
            // Process received sensor data
            processSensorData(data, senderId);
        }
    );
}

void processSensorData(const SensorData& data, uint8_t senderId) {
    printf("Received sensor data from node %d:\n", senderId);
    printf("  Timestamp: %u\n", data.timestamp);
    printf("  Temperature: %.1f°C\n", data.temperature);
    printf("  Pressure: %.1f hPa\n", data.pressure);
    printf("  Humidity: %.1f%%\n", data.humidity);
    printf("  Status: 0x%02X\n", data.status);
}
```

### 4. Send Data Using the Protocol

```cpp
void sendSensorReading() {
    // Create sensor data
    SensorData data;
    data.timestamp = getCurrentTimestamp();
    data.temperature = readTemperatureSensor();
    data.pressure = readPressureSensor();
    data.humidity = readHumiditySensor();
    data.status = getSystemStatus();
    
    // Send using fragment protocol
    if (fragProtocol.sendFragged<SensorData>(
            MASTER_NODE_ID,    // Target node (master)
            SENSOR_DATA_TYPE,  // Data type identifier
            data,              // Data structure
            PRIORITY_NORMAL    // Priority
        )) {
        printf("Sensor data transmission initiated\n");
    }
    else {
        printf("Failed to send sensor data\n");
    }
}
```

### 5. Regular Update in Main Loop

```cpp
void mainLoop() {
    while (true) {
        // Update CAN handler to process received messages
        canHandler.update();
        
        // Update fragment protocol to send pending fragments and check timeouts
        fragProtocol.update();
        
        // Rest of your application logic
        // ...
        
        // Optional: Delay or yield to other tasks
        delayMilliseconds(1);
    }
}
```

## Key Implementation Considerations

When implementing this protocol, keep these important details in mind:

### 1. Buffer Management

The protocol maintains reassembly buffers for each incoming message. Ensure you allocate enough memory for these buffers:

```cpp
// Memory usage calculation for 8 concurrent messages, 2KB each:
// 8 * (2048 bytes buffer + ~24 bytes tracking) ≈ 16.5KB
```

Adjust `MAX_MESSAGE_SIZE` and `MAX_MESSAGES` based on your application's memory constraints.

### 2. Error Handling

Add robust error handling for edge cases:

- Missing fragments
- Out-of-sequence fragments
- Message ID collisions
- Buffer overruns

### 3. Timeout Selection

The timeout value depends on your network characteristics:

```cpp
// For stable, low-latency networks
constexpr uint32_t FRAGMENT_TIMEOUT_MS = 1000;  // 1 second

// For congested or high-latency networks
constexpr uint32_t FRAGMENT_TIMEOUT_MS = 5000;  // 5 seconds
```

### 4. Node ID Management

Ensure unique node IDs for all devices on your CAN network (4-bit limit means maximum 16 nodes).

## Advanced Enhancements

Once you have the basic protocol working, consider these enhancements:

### 1. Acknowledgment System

Add acknowledgment messages to confirm receipt of critical fragments:

```cpp
bool sendAcknowledgment(uint8_t targetNode, uint8_t messageId) {
    uint8_t ackData[2] = { messageId, 0 };
    return m_canHandler.send(
        PRIORITY_HIGH,
        MESSAGE_TYPE_ACK,
        targetNode,
        0,  // ACK code
        ackData,
        sizeof(ackData)
    );
}
```

### 2. Retransmission Logic

Implement retransmission for unacknowledged fragments:

```cpp
void checkRetransmission() {
    uint32_t currentTime = getCurrentTimeMs();
    
    if (m_outgoingMessage.active && 
        m_outgoingMessage.requiresAck &&
        currentTime - m_outgoingMessage.lastSendTime > RETRANSMISSION_TIMEOUT_MS) {
        // Reset to retransmit
        m_outgoingMessage.sentSize = 0;
        m_outgoingMessage.nextSeqNum = 0;
    }
}
```

### 3. Flow Control

Add receiver-driven flow control to prevent buffer overruns:

```cpp
struct FlowControlMessage {
    uint8_t messageId;
    uint8_t maxFragments;  // How many more fragments to send
    uint8_t delayMs;       // Minimum delay between fragments
};
```

### 4. Compression

For very large messages, add compression:

```cpp
bool sendCompressedBytes(uint8_t target_node, uint8_t struct_type, 
                        const void* data, uint16_t len) {
    // Allocate compression buffer
    uint8_t* compressBuffer = new uint8_t[len];
    
    // Compress data
    uint16_t compressedSize = compressData(data, len, compressBuffer);
    
    // Send compressed data
    bool result = sendBytes(target_node, struct_type, compressBuffer, compressedSize);
    
    // Clean up
    delete[] compressBuffer;
    
    return result;
}
```

## Conclusion

Implementing a CAN fragmentation protocol requires careful attention to bit-level details, buffer management, and error handling. The protocol described here provides a robust solution for transmitting data structures much larger than CAN's 8-byte limit.

By understanding both the conceptual design and concrete implementation details, you can adapt this protocol to your specific application requirements, whether you're sending sensor readings, configuration parameters, or diagnostic data.

Remember that while fragmentation enables transmission of larger messages, it introduces overhead and latency. For time-critical applications, consider whether structuring your data into smaller, self-contained messages might be more appropriate than sending large fragmented packets.

---

*This implementation guide is based on a protocol developed and tested in industrial automation applications. The code snippets provide a foundation you can adapt to your specific hardware platform and application requirements.*

---

## Resources

1. [http://www.hoefner-online.de/home/pdfs/2017GlabbeekHoefnerMars.pdf](http://www.hoefner-online.de/home/pdfs/2017GlabbeekHoefnerMars.pdf)
2. [https://www.csselectronics.com/pages/can-bus-ultimate-guide](https://www.csselectronics.com/pages/can-bus-ultimate-guide)