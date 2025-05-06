---
title: "Testing Cellular Features Using CellularPi: Implementation and Testing"
date: "2025-02-11"
author: "Erick"
tags: ["Pi", "Modems", "ModemManager", "AT Commands"]
excerpt: "Testing A7670E Modem Features with CellularPi: Part 3"
coverImage: "/images/blog/a7670e-with-pi.jpeg"
---

## Introduction

In our previous posts, we covered the physical setup of the A7670E modem and its driver implementation. This final post explores the implementation of our testing interface and the underlying system architecture that enables reliable cellular communication.

## System Architecture Overview

Our implementation requirements demanded a system-wide solution for cellular connectivity:
1. TCP/IP networking accessible to all applications
2. Integration with the Linux networking stack
3. Automated network interface configuration
4. System-wide SMS messaging capabilities

### ModemManager's Role

ModemManager serves as the central control point for modem operations. When our A7670E connects, ModemManager:
1. Detects the modem on USB ports (ttyUSB0, ttyUSB1, ttyUSB2)
2. Identifies the correct ports for:
   - AT command interface
   - Data communication
   - Additional control channels
3. Initializes the modem with proper AT command sequences
4. Manages modem state and network registration

The key benefit is ModemManager's handling of all AT command interactions:
```
AT+CFUN=1    # Enable full functionality
AT+CPIN?     # Check SIM status
AT+CREG?     # Check network registration
AT+CGREG?    # Check GPRS registration
AT+CGDCONT   # Set up PDP context
```

### Network Management Layer

NetworkManager integrates with ModemManager to:
1. Create network interfaces when the modem connects
2. Configure IP settings through DHCP
3. Set up proper routing tables
4. Manage DNS resolution

## CellularPi Implementation

Our testing application interfaces with this architecture through three main components:

### 1. Modem Management Module

The ModemDBusManager class establishes communication with ModemManager:

```cpp
ModemDBusManager::ModemDBusManager(QObject* parent)
    : QObject(parent)
    , m_dbusConnection(QDBusConnection::systemBus())
{
    m_dbusInitTimer = std::make_unique<QTimer>(this);
    m_dbusInitTimer->setInterval(DBUS_INIT_RETRY_INTERVAL);
    
    // Watch for modem service availability
    auto* watcher = new QDBusServiceWatcher(
        "org.freedesktop.ModemManager1",
        m_dbusConnection,
        QDBusServiceWatcher::WatchForRegistration |
        QDBusServiceWatcher::WatchForUnregistration,
        this
    );
}
```

Interface initialization includes:
```cpp
bool ModemDBusManager::initializeDBusInterfaces()
{
    QMutexLocker locker(&m_dbusInitMutex);
    
    // Create ModemManager interface
    QDBusInterface manager("org.freedesktop.ModemManager1",
                         "/org/freedesktop/ModemManager1",
                         "org.freedesktop.DBus.ObjectManager",
                         m_dbusConnection);

    // Get managed objects and find our modem
    QDBusMessage reply = manager.call("GetManagedObjects");
    const QDBusArgument arg = reply.arguments().at(0).value<QDBusArgument>();
    
    // Parse interfaces
    arg.beginMap();
    while (!arg.atEnd()) {
        QString path;
        QVariantMap interfaces;
        arg.beginMapEntry();
        arg >> path >> interfaces;
        arg.endMapEntry();

        if (interfaces.contains(
            "org.freedesktop.ModemManager1.Modem.Messaging")) {
            m_dbusInterfaces.messagingPath = path;
            found = true;
            break;
        }
    }
    arg.endMap();
}
```

### 2. Message Queue Management

We implement a robust message queuing system:

```cpp
void Modem::queueSMS(const QString &phoneNo, const QString &message) {
    QMutexLocker locker(&m_mutex);
    m_smsQueue.enqueue({phoneNo, message});

    if (!m_isProcessing) {
        QMetaObject::invokeMethod(this, "processSMSQueue", 
                                Qt::QueuedConnection);
    }
}

void Modem::processSMSQueue() {
    QMutexLocker locker(&m_mutex);

    if (m_isProcessing || m_smsQueue.isEmpty()) {
        return;
    }

    m_isProcessing = true;
    SMSData smsData = m_smsQueue.dequeue();
    sendSMSOverDBus(smsData);
}
```

### 3. Error Handling and Retries

Our implementation includes comprehensive error handling:

```cpp
void ModemDBusManager::handleCreateSMSResponse(
    const QDBusPendingCallWatcher *watcher,
    const QVariantMap &properties, 
    int retryCount)
{
    QDBusPendingReply<QDBusObjectPath> reply = *watcher;

    if (reply.isError()) {
        if (retryCount < MAX_RETRY_ATTEMPTS && 
            shouldRetryOperation(reply.error())) {
            scheduleRetry(properties, retryCount + 1);
            return;
        }
        emit smsResult(false);
        return;
    }

    // Create SMS interface for sending
    QDBusInterface sms("org.freedesktop.ModemManager1",
                      reply.value().path(),
                      "org.freedesktop.ModemManager1.Sms",
                      m_dbusConnection);

    if (!sms.isValid()) {
        if (retryCount < MAX_RETRY_ATTEMPTS) {
            scheduleRetry(properties, retryCount + 1);
            return;
        }
        emit smsResult(false);
        return;
    }
}
```

## Testing Implementation

### SMS Testing

1. Message Creation:
```cpp
void ModemDBusManager::sendSMS(const QString &phoneNumber, 
                              const QString &message)
{
    QVariantMap properties;
    properties["number"] = phoneNumber;
    properties["text"] = message;

    auto* createWatcher = new QDBusPendingCallWatcher(
        m_dbusInterfaces.messaging->asyncCall("Create", properties),
        this
    );
}
```

2. Status Monitoring:
```cpp
void Modem::handleSMSResult(bool success) {
    if (success) {
        emit smsSent(m_mostRecentRecipient);
    } else {
        emit smsFailed(m_mostRecentRecipient);
    }

    QMutexLocker locker(&m_mutex);
    m_isProcessing = false;

    if (!m_smsQueue.isEmpty()) {
        QMetaObject::invokeMethod(this, "processSMSQueue",
                                Qt::QueuedConnection);
    }
}
```

## Network Testing

Once the cellular interface is up and running, our REST client operates just like any other networked application, utilizing the standard Linux networking stack.

### REST Client Implementation

Our REST client provides a clean interface for testing network connectivity:

```cpp
class RestClient : public QObject
{
    Q_OBJECT
    QML_ELEMENT
    QML_SINGLETON

    Q_PROPERTY(QUrl baseUrl READ baseUrl WRITE setBaseUrl NOTIFY baseUrlChanged)
    Q_PROPERTY(bool sslSupported READ sslSupported CONSTANT)

public:
    explicit RestClient(QObject *parent = nullptr);

    Q_INVOKABLE void get(const QString &endpoint);
    Q_INVOKABLE void post(const QString &endpoint, const QVariantMap &data);
    Q_INVOKABLE void put(const QString &endpoint, const QVariantMap &data);
    Q_INVOKABLE void deleteResource(const QString &endpoint);

signals:
    void responseReceived(const QJsonObject &response);
    void errorOccurred(const QString &error);
    void requestStarted();
    void requestFinished();
};
```

### Request Processing

The client handles requests using Qt's networking classes:

```cpp
void RestClient::get(const QString &endpoint)
{
    try {
        auto request = m_requestFactory->createRequest(endpoint);
        request.setHeader(QNetworkRequest::ContentTypeHeader, 
                         "application/json");
        
        emit requestStarted();
        auto *reply = m_qnam.get(request);
        
        connect(reply, &QNetworkReply::finished, this, [this, reply]() {
            handleResponse(reply);
            reply->deleteLater();
        });
        
    } catch (const std::exception &e) {
        emit errorOccurred(QString("Request failed: %1").arg(e.what()));
        emit requestFinished();
    }
}
```

### Response Handling

We process responses and convert them to a format suitable for our UI:

```cpp
void RestClient::handleResponse(QNetworkReply *reply)
{
    if (reply->error() == QNetworkReply::NoError) {
        QByteArray data = reply->readAll();
        QJsonDocument doc = QJsonDocument::fromJson(data);
        
        if (doc.isObject()) {
            emit responseReceived(doc.object());
        } else if (doc.isArray()) {
            QJsonObject response;
            response["data"] = doc.array();
            emit responseReceived(response);
        }
    } else {
        emit errorOccurred(reply->errorString());
    }
    
    emit requestFinished();
}
```

### Testing Interface

The user interface provides a simple way to test different endpoints and methods:

```qml
// Internet testing tab
ColumnLayout {
    spacing: window.height * 0.02

    GroupBox {
        title: "REST API Test"
        Layout.fillWidth: true
        
        ColumnLayout {
            anchors.fill: parent
            spacing: window.height * 0.02

            ComboBox {
                id: endpointCombo
                Layout.fillWidth: true
                model: ["/posts/1", "/users/1", "/todos/1"]
                font.pixelSize: baseSize
            }

            Button {
                text: "GET Request"
                Layout.fillWidth: true
                onClicked: RestClient.get(endpointCombo.currentText)
            }

            ScrollView {
                Layout.fillWidth: true
                Layout.fillHeight: true

                TextArea {
                    id: responseArea
                    readOnly: true
                    font.family: "Monospace"
                    placeholderText: "Response will appear here..."
                }
            }
        }
    }
}
```

### Example Test Scenarios

1. Basic GET Request:
```qml
// Test basic connectivity
RestClient.baseUrl = "https://jsonplaceholder.typicode.com"
RestClient.get("/posts/1")
```

Expected response:
```json
{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident",
    "body": "quia et suscipit\nsuscipit recusandae..."
}
```

2. POST Request with Data:
```qml
RestClient.post("/posts", {
    "title": "Test Post",
    "body": "Testing cellular connectivity",
    "userId": 1
})
```

3. Error Handling Test:
```qml
// Test invalid endpoint
RestClient.get("/invalid-endpoint")
```

### Performance Considerations

1. Request Timeout Settings:
```cpp
void RestClient::setupRequestDefaults()
{
    // Set reasonable timeouts for cellular networks
    m_qnam.setTransferTimeout(30000);  // 30 seconds
    
    // Configure proxy if needed
    QNetworkProxy proxy = QNetworkProxy::applicationProxy();
    if (proxy.type() != QNetworkProxy::NoProxy) {
        m_qnam.setProxy(proxy);
    }
}
```

2. Connection Monitoring:
```cpp
void RestClient::monitorNetworkState()
{
    connect(&m_qnam, &QNetworkAccessManager::networkAccessible,
            this, [this](QNetworkAccessManager::NetworkAccessibility accessible) {
        if (accessible == QNetworkAccessManager::NotAccessible) {
            emit errorOccurred("Network connection lost");
        }
    });
}
```

The REST client provides a clean, reliable way to test network connectivity without needing to know about the underlying cellular connection. This abstraction allows us to focus on testing application-level functionality while the Linux networking stack handles the complexities of the cellular data connection.

## Testing Results and Analysis

### Basic Connectivity Testing

During our testing with Safaricom network in Kenya, we conducted a series of HTTP requests to verify cellular data functionality:

1. **DNS Resolution Test**
```bash
$ ping -c 4 google.com
PING google.com (142.250.196.142) 56(84) bytes of data.
64 bytes from nbo05s06-in-f142.1e100.net (142.250.196.142): icmp_seq=1 ttl=105 time=89.6 ms
64 bytes from nbo05s06-in-f142.1e100.net (142.250.196.142): icmp_seq=2 ttl=105 time=88.4 ms
64 bytes from nbo05s06-in-f142.1e100.net (142.250.196.142): icmp_seq=3 ttl=105 time=87.9 ms
64 bytes from nbo05s06-in-f142.1e100.net (142.250.196.142): icmp_seq=4 ttl=105 time=88.2 ms

--- google.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 87.912/88.525/89.562/0.608 ms
```

2. **Network Interface Statistics**
```bash
$ ifconfig wwan0
wwan0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
        inet 10.158.x.x  netmask 255.255.255.252  destination 10.158.x.x
        inet6 fe80::c851:95ff:fe5d:c516  prefixlen 64  scopeid 0x20<link>
        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 1000
        RX packets 8562  bytes 9519432 (9.5 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 7245  bytes 845623 (845.6 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```


## Recommendations for Production Use

Based on our testing results, we recommend:

1. **Network Resilience**
   - Implement progressive retry delays
   - Cache successful responses where appropriate
   - Monitor signal strength trends

2. **Resource Management**
   - Limit concurrent requests to 5
   - Implement request queuing
   - Monitor memory usage

3. **Error Handling**
   - Log network type changes
   - Implement automatic reconnection
   - Cache failed requests for retry

These findings will inform our future development and deployment strategies for cellular-based IoT applications.

[Part 1: The Implementation Chronicles: A7670E USB Modem](https://squared.co.ke/blog/cellular-connectivity-with-raspberry-pi-4b)

[Part 2: Driver Support for A7670E: Kernel Module Implementation](https://squared.co.ke/blog/driver-support-for-a7670e)

## Resources

1. [learnqtkenya/CellularPi](https://github.com/learnqtkenya/CellularPi)
2. [learnqtkenya/QTonRaspberryPi](https://github.com/learnqtkenya/QTonRaspberryPi)