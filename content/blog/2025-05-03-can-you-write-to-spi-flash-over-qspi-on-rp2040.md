---
title: "RP2040 QSPI Flash & XIP Memory"
author: Erick
date: 2025-05-03 08:00:00 +0700
categories: [embedded]
tags: [SPI, RP2040, Zephyr]
image: 
    path: "/images/blog/qspi-flash.png"
    alt: qspi-flash
---

## Introduction

The RP2040 (e.g. on a Raspberry Pi Pico) boots and runs **code directly from its external SPI flash** (“execute-in-place” or XIP). In other words, the entire 128 Mb (16 MB) Winbond W25Q128JVS chip is memory‑mapped starting at address **0x1000 0000**. By default reads from this region are cache‑accelerated (16 kB cache), but there are mirror aliases for non‑cached and no‑allocate accesses at **0x1100 0000**, **0x1200 0000**, and **0x1300 0000**. The upshot is that *reading* the flash is trivial – you can just dereference a pointer into 0x1000 0000 and the hardware handles the SPI transactions transparently.

However, **writing** the flash is much harder. On RP2040 there is no separate “EEPROM”; any writes must go through the same QSPI bus and obey the flash chip’s rules. In general, you must send the usual NOR‑flash commands (like *Write Enable*, *Sector Erase*, *Page Program*, etc.) over the SPI interface. For example, a typical write sequence on Winbond flash is: `WREN` (0x06), then a 256‑byte *Page Program* (0x02) with up to 256 bytes of data, and poll the status register (RDSR, 0x05) until write‑in‑progress clears. Likewise erases use `WREN` followed by a 4 KB Sector Erase (0x20) or 64 KB Block Erase (0xD8). The table below summarizes common commands:

| Operation               | Command (hex)  |
| ----------------------- | -------------- |
| **Write Enable (WREN)** | 0x06           |
| **Page Program (PP)**   | 0x02           |
| **Sector Erase (4 KB)** | 0x20           |
| **Block Erase (64 KB)** | 0xD8           |
| **Chip Erase**          | 0xC7 (or 0x60) |
| **Read Data**           | 0x03           |
| **Read Status (RDSR)**  | 0x05           |

Because the flash **is also the code storage**, the RP2040 cannot execute from flash while a write/erase is in progress. In fact, the datasheet warns that between exiting XIP mode and re‑flushing the cache, no flash fetches can occur – *all* code must run from SRAM during the write/erase. This constraint underlies most of the complexity below.

## BootROM & Boot2 Flash Operations

At reset, the RP2040’s boot ROM brings up the QSPI interface and locates a second-stage bootloader (`boot2`) in flash.  By convention, the very first 256 bytes of flash contain Boot2, which the ROM copies into SRAM and executes. That SRAM loader then configures the SSI/QSPI clock (typically dividing sysclk by 4 to \~31.25 MHz) and jumps into the main flash image (e.g. UF2 bootloader or firmware).

Importantly, **the ROM itself provides built‑in routines for flash writes**. Section 2.8.3 of the datasheet lists public ROM functions: `_connect_internal_flash()`, `_flash_exit_xip()`, `_flash_range_erase()`, `flash_range_program()`, and `_flash_flush_cache()`. For example, to erase a sector one might call:

1. `_connect_internal_flash()` – ensure QSPI pins are in SPI mode.
2. `_flash_exit_xip()` – disengage the XIP cache and prepare the SPI bus for commands.
3. `_flash_range_erase(addr, count, block_size, cmd)` – issue the erase command (it picks the largest block size up to 4 KB sectors by default).
4. `_flash_flush_cache()` – re‑enable the XIP cache and clear any forced-IO overrides.

A typical sequence given in the datasheet is: `_connect_internal_flash`, `_flash_exit_xip`, `_flash_range_erase(addr, 1<<12, 1<<16, 0xD8)`, `_flash_flush_cache`.  (Finally, code can call `_flash_enter_cmd_xip()` or simply let Boot2 reconfigure XIP for normal reads.) The key detail is noted: **during the gap between exit and flush, XIP is off and code must run from SRAM**. In other words, you cannot fetch instructions from flash while it is being reprogrammed.

The UF2 bootloader (the “drag-and-drop” MS-DOS volume on Pico) uses these ROM routines under the hood. As UF2 blocks are received over USB, the boot code writes them into flash in flash-aligned chunks. The datasheet even remarks that downloaded binaries must respect flash alignment (writes are 256-byte aligned, erases are 4 KB) and that partially-filled sectors can be handled by padding. In practice, tools like **elf2uf2** automatically pad to full sectors.

## Pico SDK Flash APIs and Constraints

In the official Pico SDK (C/C++), two functions encapsulate flash writes:

```c
flash_range_erase(uint32_t flash_offs, size_t count);
flash_range_program(uint32_t flash_offs, const uint8_t *data, size_t count);
```

. These call into the ROM routines above. For example, `flash_range_erase(addr, n)` erases `n` bytes starting at `flash_offs` (where `flash_offs` is an offset within the flash), with `n` **a multiple of 4096** (the sector size). `flash_range_program(addr, data, n)` programs `n` bytes from RAM into flash, with `n` **a multiple of 256** (the page size).  Internally these functions disable XIP, do the SPI commands, and flush the cache.

Critically, these operations are **not interrupt‑safe**. Since the CPU is normally executing instructions out of flash, any flash write *must* be bracketed by disabling interrupts and even stopping the other core. In MakerMatrix’s words, “they are not interrupt‑safe… you must disable interrupts around \[flash\_range\_program]”. Likewise, if Core 1 is running, one must ensure it’s not fetching from flash while Core 0 erases/programs. In short, flash writes require exclusive access and careful sequencing. If an interrupt fired or the other core touched flash during erase/program, execution would freeze or crash.

On the positive side, once these rules are followed, the flash can be reprogrammed reliably. The RP2040 is little‑endian and treats the flash as a linear address space, so after a write one can immediately read back updated bytes via normal pointer loads. However, writing does wear out flash (bits can only be flipped 0→1 by erasing), so designers typically plan writes sparingly (e.g. one sector of 4 KB at a time).

## Running on Zephyr RTOS with Settings API : target (rpi\_pico)

[samples/subsys/setttings](https://github.com/zephyrproject-rtos/zephyr/tree/main/samples/subsys/settings)

We tried to use Zephyr's Settings API with both NVS and file-based approaches on an RP2040 Pico to test runtime flash operations. In Zephyr's devicetree, we defined a partition labeled `"storage"` for storing settings data:

```overlay
&flash0 {
    partitions {
        compatible = "fixed-partitions";
        #address-cells = <1>;
        #size-cells = <1>;

        storage_partition: partition@1f9000 {
            label = "storage";
            reg = <0x1F9000 0x00007000>;
        };
    };
};
```

### NVS-Based Settings (Working Approach)

First, we tested using NVS (Non-Volatile Storage) with these settings in `prj.conf`:

```conf
# for spi flash r/w
CONFIG_FLASH=y
CONFIG_FLASH_MAP=y
CONFIG_SETTINGS=y
CONFIG_SETTINGS_RUNTIME=y
CONFIG_NVS=y
CONFIG_SETTINGS_NVS=y
CONFIG_HEAP_MEM_POOL_SIZE=256
CONFIG_MPU_ALLOW_FLASH_WRITE=y
```

This approach worked correctly. The settings API could save, load, and delete key-value pairs, and the runtime API for both getting and setting values functioned properly.

### File-Based Settings (Problematic)

When we switched to file-based settings with LittleFS, we used this configuration:

```conf
# File system support
CONFIG_FILE_SYSTEM=y
CONFIG_FILE_SYSTEM_LITTLEFS=y

# Settings configuration
CONFIG_SETTINGS=y
CONFIG_SETTINGS_RUNTIME=y
CONFIG_SETTINGS_FILE=y
CONFIG_SETTINGS_FILE_PATH="/ff/settings.cfg"

# Disable NVS settings
CONFIG_NVS=n
CONFIG_SETTINGS_NVS=n
```

In the initialization code, we used LittleFS to mount a filesystem:

```c
FS_LITTLEFS_DECLARE_DEFAULT_CONFIG(cstorage);
static struct fs_mount_t littlefs_mnt = {
    .type = FS_LITTLEFS,
    .fs_data = &cstorage,
    .storage_dev = (void *)STORAGE_PARTITION_ID,
    .mnt_point = "/ff"
};
rc = fs_mount(&littlefs_mnt);
```

**The Problem:** While we could successfully save settings and perform most operations, the system would hang when using `settings_runtime_get()` to read values back from storage.

### Root Cause: XIP Conflicts

The culprit is the RP2040's XIP (Execute-In-Place) architecture combined with flash access limitations:

1. The RP2040 runs code directly from SPI flash through the XIP cache
2. When accessing flash through file operations, the flash driver must:
   - Disable XIP mode to send SPI commands to the flash
   - Buffer any data from flash into RAM
   - Execute code from SRAM during this period
   - Re-enable XIP mode and flush the cache

With file-based settings, the `settings_runtime_get()` function attempts to read from a file stored in flash. This operation requires sending SPI commands, which requires disabling XIP. However, if the code execution path itself is in flash (not carefully isolated to SRAM), the CPU stalls when it tries to fetch the next instruction.

### Working Solutions

There are several approaches to resolve this issue:

1. **Use NVS instead of file-based settings** - NVS is specifically designed for this use case and manages the XIP conflicts correctly

2. **Use an external storage device** - Connect an external EEPROM, FRAM, or SD card to avoid conflicts with the main program flash

For most applications, using NVS is the simplest and most reliable approach on RP2040, as it's designed to handle the XIP constraints and flash command sequencing properly.

## RP2040 Code Execution

It's important to clarify that by default, code on the RP2040 runs directly from flash memory using XIP (Execute-In-Place), not from SRAM. Looking at the device tree overlay:

```
chosen {
    zephyr,sram = &sram0;
    zephyr,flash = &flash0;
    zephyr,code-partition = &slot0_partition;
};
```

The `zephyr,code-partition = &slot0_partition` line specifies that code is placed in the flash partition, which is at address 0x10000100 (part of the XIP region). This confirms that code runs from flash by default, not SRAM, which explains the hang when XIP is disabled during flash operations.

While solutions exist to place critical code in SRAM to avoid XIP issues during flash operations, implementing these properly requires careful testing and validation specific to the RP2040 platform and Zephyr RTOS.

## Discussion and Trade-Offs

When working with settings storage on RP2040, developers must carefully consider the hardware's limitations:

- **Reading from flash** is easy with XIP, but **writing to flash** requires special handling
- **Flash operations must respect XIP constraints** - code execution must shift to SRAM during flash commands
- **Interrupts must be disabled** during flash operations to prevent code fetches from flash

While file-based approaches (LittleFS) offer more flexibility and a familiar filesystem interface, they introduce complexity when dealing with RP2040's XIP architecture. NVS offers a more direct approach that's better aligned with the hardware constraints.

For applications where settings data is small and infrequently updated, NVS is the recommended approach. For more complex data storage needs, consider:
1. Carefully relocating flash-related code to SRAM
2. Using external storage devices to separate code execution from data storage
3. Implementing custom flash handlers that respect the XIP limitations

---

**Sources:** 
1. [RP2040 datasheet and Pico SDK documentation for QSPI/XIP behavior](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf)
2. [Winbond W25Q128JVS datasheet for flash commands]()
3. https://github.com/zephyrproject-rtos/zephyr/issues/82632
4. https://github.com/zephyrproject-rtos/zephyr/issues/68728
5. https://vanhunteradams.com/Pico/Bootloader/Boot_sequence.html
6. https://www.makermatrix.com/blog/read-and-write-data-with-the-pi-pico-onboard-flash/
7. https://www.eevblog.com/forum/microcontrollers/rp2040-writing-and-loading-code-from-qspi-flash-memory
8. https://docs.zephyrproject.org/latest/samples/subsys/fs/littlefs/README.html

