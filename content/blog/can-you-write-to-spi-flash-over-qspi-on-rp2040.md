---
title: "RP2040 QSPI Flash & XIP Memory"
date: "2025-05-03"
author: "Erick"
tags: ["SPI", "RP2040", "Zephyr"]
excerpt: "System-level research on RP2040’s XIP and ROM behavior"
coverImage: "/images/blog/qspi-flash.png"
---

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

## Running on Zephyr RTOS (rpi\_pico)

We tried to use Zephyr’s filesystem layers (e.g. LittleFS) on a Pico to test runtime flash writes. In Zephyr’s devicetree one usually defines a partition labeled `"storage"` for the file system. For example, adding a fixed-partitions node under the flash device could set aside the last MB of flash for data, leaving the front for the firmware image.
```overlay
&flash0 {
    partitions {
        compatible = "fixed-partitions";
        #address-cells = <1>;
        #size-cells = <1>;

        storage_partition: partition@100000 {
            label = "storage";
            reg = <0x100000 0x0F0000>;
        };
    };
};

```
In `prj.conf` we enabled:

```conf
# for spi flash r/w
CONFIG_DISK_ACCESS=y
CONFIG_DISK_DRIVERS=y

CONFIG_FLASH=y
CONFIG_FLASH_MAP=y
CONFIG_FLASH_PAGE_LAYOUT=y

CONFIG_FILE_SYSTEM=y
CONFIG_FILE_SYSTEM_LITTLEFS=y

CONFIG_FS_LITTLEFS_BLK_DEV=y
CONFIG_FILE_SYSTEM_MKFS=y
```

On boot, Zephyr’s FS code tried to mount `"storage"` and format it if empty. Indeed we saw LittleFS messages about mounting or formatting. However, as soon as a write was attempted (for example, creating a file), the system hung.

This matches a known Zephyr issue: the RP2040 flash driver would **disable XIP**, perform the write, then try to continue with XIP disabled. If any flash data needed (e.g. the code or data buffer) was still mapped, the CPU would stall. Concretely, a Zephyr issue report notes “by default XIP caching is enabled… \[so] if data to write lies in flash, the driver will attempt to read the flash while writing…this will cause the hangup”. In our experiment we saw just such a hang. The stack trace pointed inside `flash_rpi_write` into Zephyr’s `flash_rpi_pico.c` (similar to issue #68728).

Zephyr’s flash driver was eventually patched to mitigate this: it disables XIP caching in the board init, and buffers any write data that resides in flash into RAM before calling the ROM routines. The patched sequence is essentially the same steps as the SDK: `connect_internal_flash()`, `flash_exit_xip()`, write, `flash_flush_cache()`, then re-enable XIP via the copied-out Boot2. This works, but it shows how fragile it is. In short, our Zephyr attempt was **not plug‑and‑play**. We had to disable caches (`xip_ctrl_hw->ctrl &= ~XIP_CTRL_EN_BITS`) and ensure all flash writes went through these ROM calls. Without that, LittleFS or NVS writes would freeze the core.

## ROM Flash Routines under Firmware

So, can *firmware* safely do flash writes? The answer is *yes, but only in a special mode*. You must execute code from SRAM (or from a cache-safe alias) while manipulating flash. The RP2040’s ROM functions make this possible, and even exposed themselves via lookup codes in the SDK (e.g. `rom_flash_exit_xip_fn`, `rom_flash_flush_cache_fn`). In bare‑metal C one can `rom_func_lookup_inline(ROM_FUNC_FLASH_RANGE_ERASE)` to get a function pointer and call it, just as the SDK and Zephyr driver do.

Under Zephyr or other RTOS control, you’d typically need to do the equivalent: switch off XIP, disable IRQs, call the ROM erase/program functions, then re‑enable XIP and IRQs. This is quite low-level, so most RTOSes treat flash writes as special. In Zephyr’s case, the flash driver and filesystem layers must coordinate carefully (for example, by using asynchronous flash APIs or off‑loading writes).

One unresolved question is whether the *ROM write sequences* can be fully relied on in-field. The datasheet is clear on their function signatures and requirements, but it does not cover all edge cases. For example, if one core is in XIP from flash while the other erases a sector, behavior is undefined. The Zephyr community even suggests disabling one core’s XIP entirely when writing . These are hardware‑specific quirks that aren’t obvious from the high-level docs.

## Discussion and Trade‑offs

In summary, **reading** the SPI flash from RP2040 firmware is easy — it’s memory-mapped XIP. But **writing** is a special operation: it requires suspending XIP and using the chip’s SPI commands via ROM routines. The RP2040 datasheet provides the necessary details (function names, alignment rules). In firmware, you must disable interrupts/other core, call `_flash_exit_xip()`, issue erase/program (e.g. via `flash_range_program`), then `_flash_flush_cache()` to re‑enable execution.

The trade-off is complexity versus convenience. If you really need a built‑in filesystem or data log on RP2040 flash, it *can* be done, but your code must manage the XIP cache and execution location carefully. As the RP2040 forum notes, “code must run from SRAM since flash would not be available for execution” during write. In practice, that means isolating all flash-write logic into routines placed in RAM (or using the BootROM functions), and verifying that no stray XIP access occurs. If done correctly, it works – but it’s easy to get into a deadlock if you miss a detail.

Areas where the documentation is clear include the boot‑time routines and their signatures, and the flash geometry (4 KB sectors, 256 B pages). However, the *runtime* behavior is more nuanced and not exhaustively documented. For example, Zephyr’s experience shows that simply calling the ROM flash functions isn’t enough without also disabling caching. Designers should test on their specific hardware and consider alternatives (e.g. using external I²C/SPI FRAM or an SD card) if the complexity is too high.

---

**Sources:** 
1. [RP2040 datasheet and Pico SDK documentation for QSPI/XIP behavior](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf)
2. [Winbond W25Q128JVS datasheet for flash commands]()
3. https://vanhunteradams.com/Pico/Bootloader/Boot_sequence.html#:~:text=use%20a%20QSPI%20interface%2C%20which,specific%29%20configurations%20are
4. https://www.makermatrix.com/blog/read-and-write-data-with-the-pi-pico-onboard-flash/#:~:text=There%20are%20two%20functions%20in,to%20write%20into%20the%20flash
5. https://www.eevblog.com/forum/microcontrollers/rp2040-writing-and-loading-code-from-qspi-flash-memory/#:~:text=And%20reading%20the%20data%20is,Writing%20is%20harder
6. https://docs.zephyrproject.org/latest/samples/subsys/fs/littlefs/README.html
7. https://github.com/zephyrproject-rtos/zephyr/issues/68728
8. https://www.eevblog.com/forum/microcontrollers/rp2040-writing-and-loading-code-from-qspi-flash-memory/#:~:text=To%20write%20the%20flash%2C%20you,not%20be%20available%20for%20execution
