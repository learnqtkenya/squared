---
title: "Cellular Connectivity with Raspberry Pi 4B: Implementation and Challenges"
date: "2025-02-08"
author: "Erick"
tags: ["Pi", "Modems"]
excerpt: "Driver Support for A7670E: Kernel Module Implementation: Part 2"
coverImage: "/images/blog/usb-a7670e-modem.png"
---


## Driver Acquisition and Analysis

The first step was obtaining the appropriate driver package. Since the A7670E belongs to the SIM7600 family, I downloaded the SIM7600X driver package from Waveshare's website:
```
https://files.waveshare.com/upload/1/12/SIM7600X-Driver.7z
```

Upon extracting the package, the directory structure revealed support for multiple platforms:
```
./
├── Android RIL/
│   ├── android4.0/
│   ├── android5.0/
│   ├── android6.0/
│   ├── android7.0/
│   └── android8.0/
├── Linux Driver/
│   ├── SIM7600_NDIS/
│   └── sim7500_sim7600_wwan.c
└── Windows Driver/
    ├── Windows10/
    ├── Windows7/
    ├── Windows8/
    └── XP-Vista/
```

## Linux Driver Investigation

Given our Linux-based target platform, I focused on the Linux Driver directory. Inside `SIM7600_NDIS/`, I found the essential files:
```
./SIM7600_NDIS/
├── Makefile
├── Module.symvers
├── simcom_wwan.c
└── simcom_wwan.ko
```

The Makefile revealed the build configuration:
```makefile
obj-m := simcom_wwan.o
SIMCOM_WWAN-objs := simcom_wwan.o
KDIR := /lib/modules/$(shell uname -r)/build
PWD := $(shell pwd)
OUTPUTDIR=/lib/modules/`uname -r`/kernel/drivers/net/usb/
```

## Initial Build Attempt

The first build attempt encountered a path-related error:
```bash
$ make clean
$ make
make[2]: *** No rule to make target 'Driver/SIM7600_NDIS'. Stop.
make[1]: *** [Makefile:240: __sub-make] Error 2
```

This error occurred because the directory path contained spaces ("Linux Driver"), which caused make to misinterpret the path.

### Build Environment Correction

To resolve this, I moved the driver files to a clean directory path:
```bash
~/bins/SIM7600_NDIS/
```

A second build attempt revealed kernel compatibility issues:
```bash
error: assignment of read-only location '*dev->net->dev_addr'
   85 |                 dev->net->dev_addr[0] |= 0x02;
   86 |                 dev->net->dev_addr[0] &= 0xbf;
```

This error indicated that the driver was attempting to modify read-only memory locations, a practice no longer allowed in modern kernels.

## Driver Modification

The driver required several updates for modern kernel compatibility:

1. **MAC Address Handling**
   - Before: Direct modification of dev_addr
   - After: Using proper kernel API eth_hw_addr_set()

2. **Code Structure Updates**
```c
/* Add version history */
/*
 * history 
 * V1.00 - first release  -20160822
 * V1.01 - updated for modern kernels - 20240208
*/

/* Proper MAC address modification */
memcpy(mac_addr, dev->net->dev_addr, ETH_ALEN);
if (possibly_iphdr(mac_addr)) {
    mac_addr[0] |= 0x02;    /* set local assignment bit */
    mac_addr[0] &= 0xbf;    /* clear "IP" bit */
    eth_hw_addr_set(dev->net, mac_addr);
}
```

## Successful Build and Installation

After implementing the modifications, the build succeeded:
```bash
$ make
rm -rf *.o *~ core .depend .*.cmd *.ko *.mod.c .tmp_versions Module.* modules.order
make -C /lib/modules/6.8.0-52-generic/build M=/home/erico/bins/SIM7600_NDIS modules
...
  LD [M]  /home/erico/bins/SIM7600_NDIS/simcom_wwan.ko
```

Finally, installing the module in the system:
```bash
$ sudo make install
mkdir -p /lib/modules/`uname -r`/kernel/drivers/net/usb/
cp -f simcom_wwan.ko /lib/modules/`uname -r`/kernel/drivers/net/usb/
depmod
```
**You can fully updated driver here** [learnqtkenya/SIM7600_NDIS](https://github.com/learnqtkenya/SIM7600_NDIS)

## Post-Installation Configuration

After installing the kernel module, several additional configurations are necessary to ensure proper system integration:

1. **udev Rules Configuration**
Create rules file for consistent device naming and permissions:
```bash
# Create file: /etc/udev/rules.d/99-simcom-modem.rules
SUBSYSTEM=="usb", ATTRS{idVendor}=="1e0e", ATTRS{idProduct}=="9025", MODE="0666"
```

2. **Automatic Module Loading**
Configure the module to load at system boot:
```bash
# Add to /etc/modules
simcom_wwan
```

3. **ModemManager Integration Verification**
Check if ModemManager detects the device:
```bash
mmcli -L
```

## Connection Verification

The system logs confirm successful modem initialization and network registration:

```log
ModemManager[1197]: <msg> [modem1] power state updated: on
ModemManager[1197]: <msg> [modem1] state changed (enabling -> enabled)
ModemManager[1197]: <msg> [modem1] 3GPP registration state changed (unknown -> registering)
ModemManager[1197]: <msg> [modem1] 3GPP packet service state changed (unknown -> attached)
ModemManager[1197]: <msg> [modem1] 3GPP registration state changed (registering -> home)
ModemManager[1197]: <msg> [modem1] state changed (enabled -> registered)
```

### Connection Establishment

The logs show the sequence of successful connection establishment:

```log
ModemManager[1197]: <msg> [modem1] simple connect started...
ModemManager[1197]: <msg> [modem1] simple connect state (6/10): register
ModemManager[1197]: <msg> [modem1] simple connect state (7/10): wait to get packet service state attached
ModemManager[1197]: <msg> [modem1] simple connect state (8/10): bearer
ModemManager[1197]: <msg> [modem1] simple connect state (9/10): connect
ModemManager[1197]: <msg> [modem1] state changed (registered -> connecting)
ModemManager[1197]: <msg> [modem1] state changed (connecting -> connected)
ModemManager[1197]: <msg> [modem1] simple connect state (10/10): all done
```

## Moving Forward: Testing on Raspberry Pi 4B

With successful Linux driver integration and cellular connectivity confirmed on the development system, our next phase involves practical testing and validation on the Raspberry Pi 4B. The following key areas will be covered:

1. **Initial Setup on Raspberry Pi**
   - Installing and configuring ModemManager
   - Setting up network interfaces
   - Verifying driver functionality on ARM architecture

2. **SMS Testing**
   - Command-line testing with mmcli
   - Message sending and receiving verification
   - Queue management and status monitoring
   - Troubleshooting common messaging issues

3. **Internet Connectivity Testing**
   - Network registration and APN configuration
   - Connection establishment verification
   - Basic connectivity testing
   - Bandwidth and latency measurement

The next section will provide a hands-on guide for testing both SMS and internet capabilities on the Raspberry Pi 4B, including practical examples, troubleshooting tips, and performance validation methods.