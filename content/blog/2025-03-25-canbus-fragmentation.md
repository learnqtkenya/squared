---
title: "Implementing CAN Bus Fragmentation"
date: 2025-03-25 08:00:00 +0700
author: Erick
categories: [embedded]
tags: [CAN]
image:
    path: "/images/blog/can-fragmentation.png"
    alt: can-fragmentation
---

Classical CAN has an 8-byte payload limit. CAN-FD extends this to 64 bytes, but sometimes you need larger data structures. Fragmentation splits messages across multiple CAN frames.

**Note**: For production systems, consider J1939, CANopen, or UAVCAN. This covers the fundamentals for custom implementations.

## The Problem

Sending multi-sensor data, configuration blocks, or diagnostic dumps often exceeds 8 bytes. Even CAN-FD's 64-byte limit isn't always enough, especially for mixed networks or retrofit scenarios.

## Fragment Protocol Design

The protocol uses four fragment types:
- **START** - First fragment with total size metadata
- **MIDDLE** - Continuation fragments with sequence numbers
- **END** - Final fragment
- **SINGLE** - Complete small messages

### Protocol Constants

```cpp
namespace FragProtocol {
    enum FragmentType : uint8_t {
        START = 0, MIDDLE = 1, END = 2, SINGLE = 3
    };

    constexpr uint16_t MAX_MESSAGE_SIZE = 2048;
    constexpr uint8_t MAX_MESSAGES = 8;  // Concurrent reassembly slots
    constexpr uint32_t DEFAULT_TIMEOUT_MS = 5000;

    constexpr uint8_t START_HEADER_SIZE = 4;   // type + msgId + totalSize(2)
    constexpr uint8_t MIDDLE_HEADER_SIZE = 2;  // type + seqNum
    constexpr uint8_t END_HEADER_SIZE = 2;     // type + seqNum
    constexpr uint8_t SINGLE_HEADER_SIZE = 2;  // type + size

    constexpr uint8_t MAX_START_PAYLOAD = 4;   // 8 - START_HEADER_SIZE
    constexpr uint8_t MAX_MIDDLE_PAYLOAD = 6;  // 8 - MIDDLE_HEADER_SIZE
    constexpr uint8_t MAX_END_PAYLOAD = 6;
    constexpr uint8_t MAX_SINGLE_PAYLOAD = 6;
}
```

### Fragment Structures

**START Fragment:**
```
| struct_type (1) | msgId (1) | totalSize (2) | payload (4) |
```

**MIDDLE/END Fragments:**
```
| struct_type (1) | seqNum (1) | payload (6) |
```

**SINGLE Fragment:**
```
| struct_type (1) | size (1) | payload (up to 6) |
```

## Implementation

### Message Tracking

```cpp
struct IncomingMessage {
    uint8_t buffer[MAX_MESSAGE_SIZE];
    uint16_t totalSize;
    uint16_t receivedSize;
    uint8_t messageId;
    uint8_t senderId;
    uint8_t structType;
    uint8_t expectedSeqNum;
    uint32_t lastFragmentTime;
    bool active;
};

struct OutgoingMessage {
    const uint8_t* data;
    uint16_t totalSize;
    uint16_t sentSize;
    uint8_t messageId;
    uint8_t targetNode;
    uint8_t structType;
    uint8_t nextSeqNum;
    uint32_t lastSendTime;
    bool active;
};
```

Maintain an array of incoming slots (for concurrent reception) and one outgoing slot.

### Sending

1. Validate message size
2. Small messages (≤6 bytes): send SINGLE fragment immediately
3. Large messages: initialize outgoing state, send incrementally

Fragment sending is throttled (e.g., 5ms intervals) to prevent bus overload:
```cpp
bool sendNextFragment() {
    // Check timing
    if (currentTime < lastSendTime + 5ms) return false;

    if (nextSeqNum == 0) {
        // Send START with total size
    } else {
        // Calculate offset, send MIDDLE or END
    }
}
```

### Receiving

Process each fragment type:
- **START**: Allocate slot, store total size, copy payload
- **MIDDLE**: Verify sequence, append to buffer
- **END**: Complete reassembly, call callback
- **SINGLE**: Extract and deliver immediately

Sequence number verification prevents out-of-order assembly.

### Timeout Handling

```cpp
void checkTimeouts() {
    for (auto &msg : incomingMessages) {
        if (msg.active && (currentTime - msg.lastFragmentTime > timeout)) {
            msg.reset();  // Clean up incomplete message
            messagesTimedOut++;
        }
    }
}
```

### Update Loop

Call periodically from main loop:
```cpp
bool update() {
    checkTimeouts();
    if (outgoingMessage.active) {
        return sendNextFragment();
    }
    return false;
}
```

## Usage Example

### Initialization

```cpp
FragmentProtocol fragProtocol(canHandler);
fragProtocol.initialize();
```

### Register Callback

```cpp
struct SensorData {
    uint32_t timestamp;
    float temperature;
    float pressure;
    float humidity;
};

constexpr uint8_t SENSOR_DATA_TYPE = 10;

fragProtocol.registerCallback<SensorData>(
    SENSOR_DATA_TYPE,
    [](const SensorData& data, uint8_t msgId, uint8_t senderId) {
        printf("Temp: %.1f°C, Pressure: %.1fhPa\n",
               data.temperature, data.pressure);
    }
);
```

### Send Data

```cpp
SensorData data = {
    .timestamp = getTimestamp(),
    .temperature = readTemp(),
    .pressure = readPressure(),
    .humidity = readHumidity()
};

fragProtocol.sendFragged<SensorData>(
    TARGET_NODE,
    SENSOR_DATA_TYPE,
    data,
    PRIORITY_NORMAL
);
```

### Main Loop

```cpp
while (true) {
    canHandler.update();    // Process CAN RX
    fragProtocol.update();  // Send fragments, check timeouts
    // ... rest of application
}
```

## Key Considerations

**Buffer Sizing**: Size reassembly buffers for worst-case concurrent messages. 8 slots × 2KB = 16KB RAM usage.

**Timeout Values**: Balance between reliability and resource cleanup. 5 seconds is typical for industrial applications.

**Sequence Numbers**: Limited range (0-255) means wrap-around handling if needed, though most messages complete quickly.

**Bus Loading**: Throttle fragment transmission to avoid overwhelming the bus. 5-10ms intervals work for most applications.

**Error Handling**: Lost fragments trigger timeouts. No automatic retransmission—higher layers should handle this.

## Implementation Reference

A complete working implementation of this fragmentation protocol can be found in the [mbed-CAN-Frag](https://github.com/learnqtkenya) repository

## Resources

- [J1939 Standard](https://www.sae.org/standards/content/j1939/) - Automotive protocol with fragmentation
- [CANopen](https://www.can-cia.org/) - Industrial automation protocol
- [UAVCAN](https://uavcan.org/) - UAV/robotics protocol specification
