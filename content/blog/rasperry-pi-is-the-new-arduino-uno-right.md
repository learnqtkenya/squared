---
title: "Raspberry Pi is the New Arduino UNO... Right?"
date: "2025-02-07"
author: "Erick"
tags: ["Pi", "Modems"]
excerpt: "The Implementation Chronicles: A7670E USB Modem: Part 1"
coverImage: "/images/blog/usb-a7670e-modem.png"
---

*Spoiler alert: It's complicated.*

Remember when Arduino UNO was the go-to board for every maker project? Those were simpler times. Now, everyone's reaching for a Raspberry Pi like it's the Swiss Army knife of embedded systems. And hey, with the Pi 4B's quad-core processor and up to 8GB RAM, who can blame them? But as I recently discovered, sometimes more power doesn't mean fewer headaches.

## The Mission: Turn Pi into a Cellular Beast

Picture this: You've got a shiny new Raspberry Pi 4B, and you're feeling invincible. Your mission? Two seemingly simple requirements:
1. Connect to the internet using a SIM card
2. Send SMS messages using the same SIM card

*How hard could it be?* Famous last words.

## The Options: USB vs. GPIO Showdown

With a Pi 4B in hand, I found myself at a crossroads. On one side, we have the convenient USB ports (both 2.0 and 3.0 flavors), beckoning with their plug-and-play promises. On the other, the raw power of GPIO pins, whispering sweet nothings about "true hardware control."

### The USB Route: The Corporate Solution
- **Pros:**
  - Plug and play (theoretically)
  - USB drivers are usually more mature
  - Hot-swappable when things go wrong (and they will)
  - Better power management built-in

- **Cons:**
  - More expensive than GPIO solutions
  - USB modems can be finicky with Linux
  - Takes up precious USB ports
  - Some USB modems are glorified paperweights in Linux

### The GPIO Path: The Hacker's Choice
- **Pros:**
  - Generally cheaper
  - More control over the hardware
  - Feels more "embedded"
  - Better hardware-level debugging options

- **Cons:**
  - Need to handle power requirements carefully
  - More complex wiring
  - Risk of frying your Pi (ask me how I know)
  - AT commands become your new language

## The Reality Check

Here's what they don't tell you in those cheerful Pi tutorials: cellular connectivity is a beast of its own. Whether you go USB or GPIO, you're in for some quality time with:
- PPP configurations that make YAML look friendly
- AT commands that feel like speaking in tongues
- Driver compatibility issues that'll have you questioning your career choices
- Power management surprises that make coffee spills look tame

## My Recommendation

After battling both options, here's my battle-tested advice:

If you're building a prototype or need something reliable quickly, go with a USB modem. Yes, it's more expensive, but your sanity has value too. Look for modems with explicit Linux support and recent kernels. 

If you're building for production or need to optimize costs, the GPIO route with a module like SIM800L or SIM7600 might be your best bet. Just be prepared for some quality time with voltage regulators and level shifters.

## Why A7670E?

After weighing the options, I went with the USB route and chose the SIMCOM A7670E modem. At around $20 on AliExpress, it's becoming the new go-to modem in the IoT world. Why? It's cheap, it's USB plug-and-play (theoretically), and it handles both data and SMS. Perfect, right?

## The First Encounter

Like any good engineer, the first thing I did was plug it in to see what would happen. I grabbed my trusty Safaricom SIM card, popped it into the modem, and plugged it into my Xubuntu machine. And boy, did things happen!

## The Linux Dance: What Actually Happens

When you plug a modem into a Linux system, it triggers a fascinating cascade of events. Here's what the system does:

1. **USB Device Detection**: The kernel immediately recognizes the device:
```
kernel: usb 1-2.1: new high-speed USB device number 15 using xhci_hcd
kernel: usb 1-2.1: New USB device found, idVendor=1e0e, idProduct=9011
kernel: usb 1-2.1: Product: A76XX Series LTE Module
kernel: usb 1-2.1: Manufacturer: SIMCom Wireless Solution
```

2. **Interface Creation**: The system creates multiple interfaces:
```
kernel: cdc_ether 1-2.1:1.0 usb0: register 'cdc_ether' at usb-0000:c4:00.3-2.1
kernel: option 1-2.1:1.2: GSM modem (1-port) converter detected
kernel: usb 1-2.1: GSM modem (1-port) converter now attached to ttyUSB0
```

3. **ModemManager Takes Over**: The ModemManager service springs into action:
```
ModemManager[1238]: <msg> [device] creating modem with plugin 'simtech' and '4' ports
ModemManager[1238]: <msg> [base-manager] modem for device successfully created
```

Here's where it gets interesting. The A7670E is quite... aggressive. It immediately tries to:
- Set up a CDC Ethernet interface
- Create multiple ttyUSB ports (ttyUSB0, ttyUSB1, ttyUSB2)
- Register itself with NetworkManager
- Attempt to get an IP address via DHCP

## The Plot Thickens: NetworkManager's Response

NetworkManager sees all this activity and jumps in:
```
NetworkManager[1146]: <info> [1738925533.8199] manager: (usb0): new Ethernet device
NetworkManager[1146]: <info> [1738925533.8554] settings: created default wired connection
```

It's like watching a tech soap opera unfold in your system logs. The modem announces "I'm here!", NetworkManager says "Let me handle this!", and ModemManager chimes in with "Not so fast, that's my territory!"

## The Reality Check

Remember when I said USB modems were the "corporate solution"? Well, they still come with their own set of challenges:

1. **Multiple Personalities**: The modem presents itself as multiple devices:
   - A network interface (for data)
   - Multiple serial ports (for AT commands and SMS)
   - Sometimes even a virtual CD-ROM (for drivers)

2. **Permission Drama**: You'll notice various AppArmor DENIED messages in the logs:
```
kernel: audit: type=1400 audit(1738925533.832:508): apparmor="DENIED"
```
These are reminders that in Linux, security is always watching.

3. **Service Conflicts**: ModemManager and NetworkManager sometimes fight over who gets to manage what. It's like watching two kids argue over a toy.

## Making Peace with the Modem

To actually use this setup reliably, you'll need to:
1. Configure udev rules to ensure consistent device naming
2. Set up ModemManager permissions correctly
3. Create a proper NetworkManager connection profile
4. Handle the AT command interface for SMS

But those are stories for another post. For now, just remember: when someone tells you USB modems are plug-and-play, they're only telling you half the story. The other half is written in system logs and Stack Overflow posts.

*Stay tuned for Part 2, where we'll dive into taming this beast with proper configuration. Spoiler alert: it involves udev rules, ModemManager configs, and more coffee.*