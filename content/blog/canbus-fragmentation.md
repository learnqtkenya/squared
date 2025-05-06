---
title: "Implementing a CAN Bus Fragmentation Protocol: A Developer's Guide"
date: "2025-03-25"
author: "Erick"
tags: ["CAN"]
excerpt: "How do you squeeze a 100-byte telemetry packet through an 8-byte straw? One fragment at a time."
coverImage: "/images/blog/can-fragmentation.png"
---

## Preface: Understanding the Context

**Important Note**: This blog post is an educational exploration of creating a custom fragmentation protocol for classical CAN bus. In real-world applications, there are several established protocol stacks that already solve this problem efficiently:

- **J1939 Protocol Stack**: Widely used in automotive and heavy-duty vehicle applications
- **CANopen**: Common in industrial automation
- **OBD2**
- ...

If you're working on a production system, it's strongly recommended to use these battle-tested protocol stacks. This implementation is primarily for learning purposes, demonstrating the underlying principles of data fragmentation on a constrained communication bus.

## Introduction: The CAN Bus Foundation

The Controller Area Network (CAN) bus has become a staple in embedded systems since its introduction by Bosch in the 1980s. Originally designed for automotive applications, its reliability, noise immunity, and deterministic behavior have made it indispensable across industrial automation, robotics, medical devices, and more.

Before diving into fragmentation, let's understand the fundamental building blocks of CAN communication and why we might eventually need to break larger messages into fragments.

## Understanding Standard CAN

### The Anatomy of a CAN Frame

A standard CAN frame consists of several fields:

- **Start of Frame (SOF)**: A single dominant bit marking the beginning of a frame
- **Arbitration Field**: Contains the message identifier and RTR bit
- **Control Field**: Includes the IDE bit and data length code (DLC)
- **Data Field**: Contains 0-8 bytes of data payload
- **CRC Field**: Error detection mechanism
- **ACK Field**: Acknowledgment from receivers
- **End of Frame (EOF)**: Seven recessive bits marking frame end

The key limitation we'll address is that **data field size of 8 bytes maximum on classical CAN**. This constraint exists because CAN was designed for real-time control systems where short, frequent messages are typical.

### Standard vs. Extended CAN IDs

CAN supports two frame formats:
- **Standard CAN** (CAN 2.0A): 11-bit identifier allowing for 2,048 unique message IDs
- **Extended CAN** (CAN 2.0B): 29-bit identifier allowing for over 536 million unique IDs

In our implementation, we'll use extended CAN IDs not just for the greater number of identifiers, but to encode additional metadata within the ID field itself.

### Building and Parsing CAN IDs

Let's examine how to construct and parse CAN IDs programmatically. In our implementation, we're dividing the 29-bit extended ID into several functional fields:

```
+-------------------------------------------------------------+
| 28 27 26 25 | 24 23 | 22 21 20 | 19 18 17 16 | 15 to 0     |
+-------------------------------------------------------------+
| Target ID   | Prior | Msg Type  | Sender ID   | Msg Specific|
| (4 bits)    | (2b)  | (3 bits)  | (4 bits)    | (16 bits)   |
+-------------------------------------------------------------+
```

Here's how we build a CAN ID:

```cpp
uint32_t buildCanId(uint8_t target_id, Priority priority, MessageType msg_type,
                    uint8_t sender_id, uint32_t msg_specific) {
    uint32_t id = 0;
    id |= (target_id & 0xF) << 25;  // Target ID in bits [28:25]
    id |= (static_cast<uint32_t>(priority) & 0x3) << 23;  // Priority in bits [24:23]
    id |= (static_cast<uint32_t>(msg_type) & 0x7) << 20;  // Message type in bits [22:20]
    id |= (sender_id & 0xF) << 16;  // Sender ID in bits [19:16]
    id |= (msg_specific & 0xFFFF);  // Message-specific data in bits [15:0]

    return id;
}
```

This function takes individual components and combines them into a single 29-bit ID. Each component is:
1. **Masked** to ensure it doesn't exceed its allocated size
2. **Shifted** to its correct position
3. **Combined** with other fields using bitwise OR

To extract information from a received CAN ID, we use the reverse process:

```cpp
void parseCanId(uint32_t can_id, uint8_t &target_id, uint8_t &priority,
                uint8_t &msg_type, uint8_t &sender_id, uint32_t &msg_specific) {
    target_id = (can_id >> 25) & 0xF;        // Extract target ID from bits [28:25]
    priority = (can_id >> 23) & 0x3;         // Extract priority from bits [24:23]
    msg_type = (can_id >> 20) & 0x7;         // Extract message type from bits [22:20]
    sender_id = (can_id >> 16) & 0xF;        // Extract sender ID from bits [19:16]
    msg_specific = can_id & 0xFFFF;          // Extract message-specific data from bits [15:0]
}
```

Here we:
1. **Shift right** to bring the target bits to the least significant position
2. **Mask** with the appropriate bit pattern to extract just the field we want
3. **Assign** the result to the appropriate variable

We also provide individual accessor functions for convenience:

```cpp
uint8_t getTargetId(uint32_t can_id) {
    return (can_id >> 25) & 0xF;
}

uint8_t getPriority(uint32_t can_id) {
    return (can_id >> 23) & 0x3;
}

// Additional getters for other fields...
```

This bit manipulation is fundamental to creating an efficient protocol on top of CAN.

## The 8-Byte Limitation Challenge of classical CAN

Now that we understand how to use CAN IDs effectively, we face the main limitation: the 8-byte payload maximum of classical CAN. This constraint becomes problematic in several scenarios:

1. **Telemetry data**: Sending multiple sensor readings with timestamps
2. **Configuration parameters**: Updating device settings in bulk
3. **Diagnostic information**: Detailed error logs or state dumps
4. **Firmware updates**: Transferring new program code

For example, in a battery management system, you might want to transmit:
- Battery voltage (4 bytes)
- Current (4 bytes)
- Temperature (4 bytes)
- State of charge (4 bytes)
- Cell balancing status (variable bytes)
- Timestamp (4-8 bytes)

That's at least 20 bytes of data that cannot fit in a single CAN frame.

## CAN FD: The Modern Alternative

Before implementing a fragmentation protocol, it's worth considering if CAN FD (Flexible Data-rate) could solve your problem. Introduced more recently, CAN FD offers:

1. **Larger payloads**: Up to 64 bytes per frame (compared to 8 bytes in classic CAN)
2. **Higher bit rates**: During the data phase, speeds up to 8 Mbps are possible
3. **Improved error detection**: Enhanced CRC mechanisms

CAN FD is backward compatible with classic CAN on the physical layer, but not at the protocol level. This means:
- CAN FD controllers can usually be configured to operate in classic CAN mode
- Classic CAN controllers cannot interpret CAN FD frames
- Both types can exist on the same physical bus, but CAN FD frames will be seen as errors by classic CAN controllers

**When to use CAN FD instead of fragmentation:**
- When all nodes on your network support CAN FD
- When your data is between 9-64 bytes
- When latency is critical (fragmentation adds overhead)
- When you're designing a new system from scratch

**When fragmentation is still necessary, even with CAN FD:**
- When retrofitting existing systems with classic CAN controllers
- When your data exceeds 64 bytes
- When you need a protocol that works across both classic CAN and CAN FD networks
- When hardware upgrades aren't feasible

Even with CAN FD, very large data structures (hundreds or thousands of bytes) still require fragmentation. Let's develop a robust solution that works for both classic CAN and CAN FD.

## Designing a Fragmentation Protocol

A fragmentation protocol for CAN must address several key requirements:

1. **Breaking data into small chunks**: Each fitting within the CAN frame payload
2. **Proper sequencing**: Maintaining the original data order
3. **Fragment identification**: Associating fragments with their parent message
4. **Reassembly**: Reconstructing the original data reliably
5. **Error handling**: Detecting and managing lost fragments or timeouts

Our approach divides messages into four types of fragments:

1. **START fragment**: Contains initial metadata and the first portion of data
2. **MIDDLE fragment(s)**: Contains sequential chunks of the message
3. **END fragment**: Contains the final piece of data
4. **SINGLE fragment**: Used for small messages that fit in one fragment but still need the protocol's metadata

Let's define these fragment types and their structure:

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
    
    // Header sizes (all headers start with struct_type byte)
    constexpr uint8_t START_HEADER_SIZE = 4;   // struct_type(1) + msgId(1) + totalSize(2)
    constexpr uint8_t MIDDLE_HEADER_SIZE = 3;  // struct_type(1) + msgId(1) + seqNum(1)
    constexpr uint8_t END_HEADER_SIZE = 3;     // struct_type(1) + msgId(1) + seqNum(1)
    constexpr uint8_t SINGLE_HEADER_SIZE = 3;  // struct_type(1) + msgId(1) + size(1)
    
    // Max payload sizes (8 byte CAN frame - header)
    constexpr uint8_t MAX_START_PAYLOAD = 8 - START_HEADER_SIZE;
    constexpr uint8_t MAX_MIDDLE_PAYLOAD = 8 - MIDDLE_HEADER_SIZE;
    constexpr uint8_t MAX_END_PAYLOAD = 8 - END_HEADER_SIZE;
    constexpr uint8_t MAX_SINGLE_PAYLOAD = 8 - SINGLE_HEADER_SIZE;
}
```

This gives us a clear structure for our protocol. Notice how we calculate the maximum available payload for each fragment type by subtracting the header size from the total CAN frame data size (8 bytes).

## Fragment Structures in Detail

Let's examine each fragment type in detail:

### 1. START Fragment

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

The START fragment includes:
- **struct_type (1 byte)**: Identifies the type of data structure being sent
- **messageId (1 byte)**: Unique identifier for this specific message
- **totalSize (2 bytes)**: Total size of the complete message
- **payload (4 bytes)**: First chunk of data

The START fragment establishes the context for the entire message. The receiver uses this information to allocate buffer space and prepare for reassembly.

### 2. MIDDLE Fragment

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

MIDDLE fragments include:
- **struct_type (1 byte)**: Same as in START
- **messageId (1 byte)**: Same as in START
- **seqNum (1 byte)**: Sequence number for this fragment
- **payload (5 bytes)**: Next chunk of data

The sequence number allows the receiver to place this fragment in the correct position during reassembly, even if fragments arrive out of order.

### 3. END Fragment

```
+-------------------------------------------------------------------+
| CAN ID (29 bits)                      | Data (8 bytes)            |
+---------------------------------------+---------------------------+
| Target|Pri|Type|Sender|FragType=END   | ST|MID|SeqNum|Payload     |
| (4b)  |2b |3b  |4b    |16b           | 1b|1b |1b    |5b          |
+---------------------------------------+---------------------------+
```

The END fragment has the same structure as MIDDLE fragments but signals that this is the last piece of the message. After processing an END fragment, the receiver completes the reassembly process.

### 4. SINGLE Fragment

```
+-------------------------------------------------------------------+
| CAN ID (29 bits)                      | Data (8 bytes)            |
+---------------------------------------+---------------------------+
| Target|Pri|Type|Sender|FragType=SINGLE| ST|MID|Size |Payload      |
| (4b)  |2b |3b  |4b    |16b           | 1b|1b |1b   |5b           |
+---------------------------------------+---------------------------+
```

For small messages that fit within 5 bytes, we use a SINGLE fragment:
- **struct_type (1 byte)**: Type of data
- **messageId (1 byte)**: Message identifier
- **dataSize (1 byte)**: Size of the payload
- **payload (up to 5 bytes)**: The complete message data

SINGLE fragments are more efficient for small messages since they avoid the overhead of START, MIDDLE, and END sequences.

## Message Tracking Structures

To implement our protocol, we need data structures to track both incoming (being reassembled) and outgoing (being fragmented) messages:

```cpp
// Structure to track incoming messages being reassembled
struct IncomingMessage {
    uint8_t buffer[FragProtocol::MAX_MESSAGE_SIZE];  // Reassembly buffer
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

These structures serve several important purposes:

- **IncomingMessage** maintains a buffer for each message being reassembled, tracks which fragments have been received, and monitors for timeouts.
- **OutgoingMessage** keeps track of the send progress, allowing the protocol to send fragments incrementally over multiple update cycles.

For our implementation, we'll maintain an array of IncomingMessage structures to handle multiple concurrent incoming messages:

```cpp
IncomingMessage m_incomingMessages[FragProtocol::MAX_MESSAGES];
```

And a single OutgoingMessage for the currently transmitting message:

```cpp
OutgoingMessage m_outgoingMessage;
```

This design choice means we can receive multiple messages simultaneously but only send one message at a time. For most applications, this is a reasonable tradeoff that simplifies the implementation.

## Sending Messages

Now let's examine how to send a message using our fragmentation protocol:

```cpp
bool FragmentProtocol::sendBytes(
    uint8_t target_node, uint8_t struct_type,
    const void* data, uint16_t len,
    CommProtocol::Priority priority)
{
    // Validate parameters
    if (!data || len == 0 || len > FragProtocol::MAX_MESSAGE_SIZE) {
        tr_error("Invalid data or length for send: %u bytes", len);
        return false;
    }

    // Check if already sending
    if (m_outgoingMessage.active) {
        tr_warn("Cannot send, transmission in progress");
        return false;
    }

    // For small messages, send as SINGLE fragment
    if (len <= FragProtocol::MAX_SINGLE_PAYLOAD) {
        uint8_t buffer[8];

        // First byte is struct_type
        buffer[0] = struct_type;

        // Next byte is message ID
        buffer[1] = generateMessageId();

        // Next byte is data size
        buffer[2] = len;

        // Copy data
        memcpy(buffer + FragProtocol::SINGLE_HEADER_SIZE, data, len);

        // Send the message
        bool success = m_commHandler.send(
                           priority,
                           CommProtocol::FRAGMENT,
                           target_node,
                           FragProtocol::SINGLE,
                           buffer,
                           FragProtocol::SINGLE_HEADER_SIZE + len
                       );

        if (success) {
            m_fragmentsSent++;
            m_messagesCompleted++;
            tr_debug("Sent SINGLE fragment: ID=%u, size=%u", buffer[1], len);
        }

        return success;
    }

    // Prepare for fragmented transmission
    m_outgoingMessage.messageId = generateMessageId();
    m_outgoingMessage.targetNode = target_node;
    m_outgoingMessage.structType = struct_type;
    m_outgoingMessage.totalSize = len;
    m_outgoingMessage.sentSize = 0;
    m_outgoingMessage.nextSeqNum = 0;
    m_outgoingMessage.data = static_cast<const uint8_t*>(data);
    m_outgoingMessage.priority = priority;
    m_outgoingMessage.active = true;
    m_outgoingMessage.lastSendTime = 0;

    tr_debug("Starting fragmented transmission: ID=%u, size=%u",
             m_outgoingMessage.messageId, len);

    return true;
}
```

Let's break this down step by step:

1. **Parameter validation**: We check that the data pointer is valid, the length is non-zero, and doesn't exceed our maximum message size.

2. **Transmission check**: We ensure we're not already in the middle of sending another message.

3. **Small message optimization**: 
   - If the message fits in a SINGLE fragment (≤ 5 bytes), we send it immediately
   - We construct a buffer with the header (struct_type, messageId, dataSize)
   - Then copy the actual data after the header
   - And send it using the communication handler

4. **Fragmented transmission setup**:
   - For larger messages, we prepare the OutgoingMessage structure
   - We generate a unique message ID
   - Set up all the tracking variables (target, type, size, etc.)
   - Mark the message as active
   - The actual sending of fragments happens later in the update cycle

This method returns true if the message was sent (SINGLE) or if the fragmentation process was set up successfully (START/MIDDLE/END).

## Sending Individual Fragments

For fragmented transmissions, we need a method to send the next fragment in sequence:

```cpp
bool FragmentProtocol::sendNextFragment()
{
    // Safety check
    if (!m_outgoingMessage.active) {
        return false;
    }

    // Throttle sending rate
    uint32_t currentTime = getCurrentTimeMs();
    if (currentTime < m_outgoingMessage.lastSendTime + 5) { // 5ms minimum interval
        return false;
    }

    // Determine what kind of fragment to send
    if (m_outgoingMessage.nextSeqNum == 0) {
        // First fragment - send START
        uint8_t buffer[8] = {0};

        // Insert struct_type
        buffer[0] = m_outgoingMessage.structType;

        // Insert message ID
        buffer[1] = m_outgoingMessage.messageId;

        // Insert total size (16-bit)
        buffer[2] = m_outgoingMessage.totalSize & 0xFF;
        buffer[3] = (m_outgoingMessage.totalSize >> 8) & 0xFF;

        // Calculate payload size
        uint8_t payloadSize = std::min<uint16_t>(
                                  m_outgoingMessage.totalSize,
                                  FragProtocol::MAX_START_PAYLOAD
                              );

        // Copy payload
        if (payloadSize > 0) {
            memcpy(buffer + FragProtocol::START_HEADER_SIZE,
                   m_outgoingMessage.data,
                   payloadSize);
        }

        // Send the message
        bool success = m_commHandler.send(
                           m_outgoingMessage.priority,
                           CommProtocol::FRAGMENT,
                           m_outgoingMessage.targetNode,
                           FragProtocol::START,
                           buffer,
                           FragProtocol::START_HEADER_SIZE + payloadSize
                       );

        if (success) {
            m_fragmentsSent++;
            m_outgoingMessage.sentSize = payloadSize;
            m_outgoingMessage.nextSeqNum = 1;
            m_outgoingMessage.lastSendTime = currentTime;

            tr_debug("Sent START fragment: ID=%u, seq=0, size=%u",
                     m_outgoingMessage.messageId, payloadSize);

            return true;
        } else {
            tr_error("Failed to send START fragment");
            return false;
        }
    } else {
        // Calculate offset in source data
        uint16_t offset = 0;

        if (m_outgoingMessage.nextSeqNum == 1) {
            // First MIDDLE fragment comes after START payload
            offset = FragProtocol::MAX_START_PAYLOAD;
        } else {
            // Subsequent fragments
            offset = FragProtocol::MAX_START_PAYLOAD +
                     (m_outgoingMessage.nextSeqNum - 1) * FragProtocol::MAX_MIDDLE_PAYLOAD;
        }

        // Check if this is the last fragment
        uint16_t remaining = m_outgoingMessage.totalSize - offset;
        bool isLastFragment = remaining <= FragProtocol::MAX_END_PAYLOAD;

        // Prepare the buffer
        uint8_t buffer[8] = {0};

        // Insert struct_type
        buffer[0] = m_outgoingMessage.structType;

        // Insert message ID
        buffer[1] = m_outgoingMessage.messageId;

        // Insert sequence number
        buffer[2] = m_outgoingMessage.nextSeqNum;

        // Calculate header size and max payload
        uint8_t headerSize, maxPayload;
        uint8_t fragmentType;

        if (isLastFragment) {
            headerSize = FragProtocol::END_HEADER_SIZE;
            maxPayload = FragProtocol::MAX_END_PAYLOAD;
            fragmentType = FragProtocol::END;
        } else {
            headerSize = FragProtocol::MIDDLE_HEADER_SIZE;
            maxPayload = FragProtocol::MAX_MIDDLE_PAYLOAD;
            fragmentType = FragProtocol::MIDDLE;
        }

        // Calculate payload size
        uint8_t payloadSize = std::min<uint16_t>(remaining, maxPayload);

        // Copy payload
        if (payloadSize > 0 && offset < m_outgoingMessage.totalSize) {
            memcpy(buffer + headerSize,
                   m_outgoingMessage.data + offset,
                   payloadSize);
        }

        // Send the message
        bool success = m_commHandler.send(
                           m_outgoingMessage.priority,
                           CommProtocol::FRAGMENT,
                           m_outgoingMessage.targetNode,
                           fragmentType,
                           buffer,
                           headerSize + payloadSize
                       );

        if (success) {
            m_fragmentsSent++;
            m_outgoingMessage.sentSize += payloadSize;
            m_outgoingMessage.nextSeqNum++;
            m_outgoingMessage.lastSendTime = currentTime;

            // If this was the last fragment, mark transmission complete
            if (isLastFragment) {
                m_outgoingMessage.active = false;
                m_messagesCompleted++;
                tr_info("Completed sending message ID %u as %u fragments",
                        m_outgoingMessage.messageId,
                        m_outgoingMessage.nextSeqNum);
            }

            return true;
        } else {
            tr_error("Failed to send %s fragment",
                     isLastFragment ? "END" : "MIDDLE");
            return false;
        }
    }
}
```

This method handles the complex logic of sending fragments incrementally:

1. **Safety and timing checks**:
   - Verify that there's an active transmission
   - Implement throttling to prevent bus flooding (5ms minimum interval between fragments)

2. **START fragment handling** (nextSeqNum == 0):
   - Construct the header with struct_type, messageId, and totalSize
   - Calculate and copy the payload (first chunk of data)
   - Send the fragment
   - Update tracking variables (sentSize, nextSeqNum, lastSendTime)

3. **MIDDLE/END fragment handling**:
   - Calculate the correct offset in the source data
   - Determine if this is the last fragment based on remaining bytes
   - Prepare the correct header (MIDDLE vs END)
   - Copy the payload data from the correct offset
   - Send the fragment
   - Update tracking variables
   - If it was the last fragment, mark the transmission as complete

This incremental approach allows us to send large messages piece by piece without blocking the system. Each call to `sendNextFragment()` sends just one fragment, with the `update()` method (discussed later) calling it repeatedly until the entire message is sent.

## Receiving and Processing Fragments

Now let's look at the receiving side of our protocol, which is responsible for collecting fragments and reassembling the original message:

```cpp
void FragmentProtocol::processFragment(
    FragProtocol::FragmentType fragType,
    const uint8_t* data, uint16_t len,
    uint8_t senderId)
{
    m_fragmentsReceived++;

    // Sanity check
    if (!data || len < 1) {
        tr_warn("Received invalid fragment: too short");
        return;
    }

    // Dispatch to appropriate handler
    switch (fragType) {
        case FragProtocol::START:
            processStartFragment(data, len, senderId);
            break;
        case FragProtocol::MIDDLE:
            processMiddleFragment(data, len, senderId);
            break;
        case FragProtocol::END:
            processEndFragment(data, len, senderId);
            break;
        case FragProtocol::SINGLE:
            processSingleFragment(data, len, senderId);
            break;
        default:
            tr_warn("Unknown fragment type: %u", fragType);
            break;
    }
}
```

This main dispatcher function increments our fragment counter, performs a basic validation check, and then routes the fragment to the appropriate handler based on its type.

Let's examine the handler for START fragments in detail:

```cpp
void FragmentProtocol::processStartFragment(
    const uint8_t* data, uint16_t len, uint8_t senderId)
{
    // Check minimum length
    if (len < FragProtocol::START_HEADER_SIZE) {
        tr_warn("START fragment too short: %u < %u",
                len, FragProtocol::START_HEADER_SIZE);
        return;
    }

    // Extract header fields
    uint8_t structType = data[0];
    uint8_t messageId = data[1];
    uint16_t totalSize = data[2] | (data[3] << 8);

    // Validate total size
    if (totalSize == 0 || totalSize > FragProtocol::MAX_MESSAGE_SIZE) {
        tr_warn("Invalid message size in START fragment: %u", totalSize);
        return;
    }

    // Check for existing message with same ID
    IncomingMessage* existing = findIncomingMessage(messageId, senderId);
    if (existing && existing->active) {
        tr_warn("Duplicate START fragment, resetting: ID=%u", messageId);
        existing->reset();
    }

    // Create new message
    IncomingMessage* msg = createIncomingMessage();
    if (!msg) {
        tr_error("No free message slots for START fragment");
        return;
    }

    // Initialize message
    msg->messageId = messageId;
    msg->senderId = senderId;
    msg->structType = structType;
    msg->totalSize = totalSize;
    msg->receivedSize = 0;
    msg->expectedSeqNum = 1;  // Next expected is sequence 1
    msg->lastFragmentTime = getCurrentTimeMs();
    msg->active = true;

    // Extract payload
    uint16_t payloadLen = len - FragProtocol::START_HEADER_SIZE;
    if (payloadLen > 0) {
        // Copy payload
        const uint8_t* payload = data + FragProtocol::START_HEADER_SIZE;
        memcpy(msg->buffer, payload, payloadLen);
        msg->receivedSize = payloadLen;
    }

    tr_debug("Received START fragment: ID=%u, size=%u, received=%u",
             messageId, totalSize, payloadLen);

    // Check if message is already complete
    if (msg->isComplete()) {
        tr_debug("Message completed with single START fragment");
        handleCompleteMessage(*msg);
        msg->reset();
    }
}
```

This handler for START fragments:

1. **Validates the fragment**: Checks that it's long enough to contain a complete header

2. **Extracts header fields**:
   - Extracts structType, messageId, and totalSize
   - Validates that totalSize is reasonable

3. **Manages message slots**:
   - Checks for an existing message with the same ID (potential retransmission)
   - Finds or creates a slot for the new message

4. **Initializes the message state**:
   - Sets all tracking variables (ID, sender, type, size, etc.)
   - Sets expectedSeqNum to 1 (for the first MIDDLE fragment)
   - Records the current time for timeout tracking
   - Marks the slot as active

5. **Processes payload data**:
   - Extracts and copies any payload data present in the START fragment
   - Updates the receivedSize counter

6. **Checks for completion**:
   - If this START fragment already contains the entire message (small messages),
     it immediately handles the complete message and frees the slot

The handlers for MIDDLE, END, and SINGLE fragments follow similar patterns, with appropriate adjustments for their specific roles in the protocol.

## Handling Complete Messages

When all fragments have been received, we call a function to process the complete message:

```cpp
void FragmentProtocol::handleCompleteMessage(IncomingMessage &msg)
{
    // Verify that message is actually complete
    if (msg.receivedSize < msg.totalSize) {
        tr_warn("Incomplete message marked as complete: %u/%u bytes",
                msg.receivedSize, msg.totalSize);
    }

    // Call the callback if registered
    if (m_callbacks[msg.structType]) {
        // Calculate actual size to pass to callback
        uint16_t callbackSize = std::min(msg.receivedSize, msg.totalSize);

        // Call the callback
        m_callbacks[msg.structType](
            msg.buffer,
            callbackSize,
            msg.messageId,
            msg.senderId);

        m_messagesCompleted++;

        tr_info("Message completed: ID=%u, type=%u, size=%u",
                msg.messageId, msg.structType, callbackSize);
    } else {
        tr_warn("No callback for struct type %u", msg.structType);
    }
}
```

This function:

1. **Verifies completion**: Double-checks that we have enough data to satisfy the expected totalSize
2. **Finds the appropriate callback**: Based on the structType identifier
3. **Calculates the callback size**: Uses the minimum of receivedSize and totalSize for safety
4. **Calls the callback**: Passes the reassembled data to the registered handler
5. **Updates statistics**: Increments the messagesCompleted counter

This callback-based design allows the protocol to be modular and extensible. Application code registers callbacks for specific structure types, and the protocol handles all the fragmentation/reassembly details.

## Timeout Handling

To prevent resource leaks, we need to handle timeouts for incomplete messages:

```cpp
void FragmentProtocol::checkTimeouts()
{
    uint32_t currentTime = getCurrentTimeMs();

    // Check each active message
    for (auto &msg : m_incomingMessages) {
        if (msg.active && (currentTime - msg.lastFragmentTime > m_timeoutMs)) {
            tr_warn("Message timed out: ID=%u, sender=%u, received=%u/%u",
                    msg.messageId, msg.senderId, msg.receivedSize, msg.totalSize);

            // Try to salvage mostly complete messages
            if (msg.receivedSize >= msg.totalSize * 0.9f) {
                tr_warn("Trying to complete timed-out message");
                handleCompleteMessage(msg);
            }

            msg.reset();
            m_messagesTimedOut++;
        }
    }
}
```

This function:

1. **Checks all active message slots**: Iterates through our IncomingMessage array
2. **Identifies timeouts**: Compares the elapsed time since the last fragment to our timeout threshold
3. **Implements a salvage mechanism**: If a message is at least 90% complete, attempts to deliver it anyway
4. **Cleans up**: Resets the message slot and updates the timeout counter

This graceful handling of timeouts is essential for robustness in real-world environments where fragments might be lost.

## The Main Update Loop

To tie everything together, we implement an `update()` method that performs regular maintenance tasks:

```cpp
bool FragmentProtocol::update()
{
    // Check for timeouts
    checkTimeouts();

    // Send next fragment if needed
    if (m_outgoingMessage.active) {
        return sendNextFragment();
    }

    return false;
}
```

This method:

1. **Checks for timeouts**: Cleans up any stalled incoming messages
2. **Handles outgoing fragments**: If there's an active outgoing message, sends the next fragment
3. **Returns activity status**: Indicates whether any action was taken

The application should call this method regularly (typically in its main loop) to keep the protocol functioning smoothly.

## Using the Protocol in Your Application

Now let's see how to integrate this protocol into a real application:

### Initialization

```cpp
// First initialize the communication handler
CANHandler canHandler(CAN1_RX_PIN, CAN1_TX_PIN, NODE_ID);
if (!canHandler.initialize()) {
    tr_error("Failed to initialize CAN handler");
    return false;
}

// Then create and initialize the fragment protocol
FragmentProtocol fragProtocol(canHandler);
if (!fragProtocol.initialize()) {
    tr_error("Failed to initialize fragment protocol");
    return false;
}
```

### Registering Callbacks for Data Types

```cpp
// Define a data structure
#pragma pack(push, 1)  // Ensure no padding
struct SensorData {
    uint32_t timestamp;
    float temperature;
    float pressure;
    float humidity;
    uint8_t status;
};
#pragma pack(pop)

// Create a unique type code
constexpr uint8_t SENSOR_DATA_TYPE = 10;

// Register a callback for this data type
fragProtocol.registerCallback<SensorData>(
    SENSOR_DATA_TYPE,
    [](const SensorData& data, uint8_t msgId, uint8_t senderId) {
        printf("Received sensor data from node %d:\n", senderId);
        printf("  Timestamp: %u\n", data.timestamp);
        printf("  Temperature: %.1f°C\n", data.temperature);
        printf("  Pressure: %.1f hPa\n", data.pressure);
        printf("  Humidity: %.1f%%\n", data.humidity);
        printf("  Status: 0x%02X\n", data.status);
    }
);
```

### Sending Data Using the Protocol

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
            MASTER_NODE_ID,    // Target node
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

### Regular Updates in Main Loop

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

## Conclusion

Implementing a CAN fragmentation protocol requires careful design and attention to detail, but the result is a robust solution for transmitting data structures much larger than classical CAN's native 8-byte limit (or even CAN FD's 64-byte limit).

By understanding the core concepts—fragment types, message tracking, reassembly, and error handling—you can implement a reliable protocol tailored to your specific application needs.

Remember these key principles:

1. **Use CAN FD when possible** for improved efficiency with payloads up to 64 bytes
2. **Consider fragmentation** for larger payloads or when retrofitting classic CAN systems
3. **Manage resources carefully**, especially memory for reassembly buffers
4. **Implement robust timeout handling** to prevent resource leaks
5. **Test thoroughly** with realistic network conditions and edge cases

With these tools and techniques, you can overcome the fundamental payload limitations of CAN bus and build sophisticated, data-rich embedded systems.

---

## Resources
1. [J1939 Standard Documentation](https://www.sae.org/standards/content/j1939/)
2. [UAVCAN Protocol Specification](https://uavcan.org/)
3. [CAN in Automation (CiA) Standards](https://www.can-cia.org/)
4. [http://www.hoefner-online.de/home/pdfs/2017GlabbeekHoefnerMars.pdf](http://www.hoefner-online.de/home/pdfs/2017GlabbeekHoefnerMars.pdf)
5. [https://www.csselectronics.com/pages/can-bus-ultimate-guide](https://www.csselectronics.com/pages/can-bus-ultimate-guide)