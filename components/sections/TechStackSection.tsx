'use client';

interface Technology {
  name: string;
  category: string;
}

export const TechStackSection = () => {
  const technologies: Technology[] = [
    { name: 'Qt/QML|LVGL|TouchFx|...', category: 'HMI Framework' },
    { name: 'KiCad|Cadence|Altium', category: 'PCB Design' },
    { name: 'Zephyr|MbedRTOS|FreeRTOS|...', category: 'RTOS' },
    { name: 'CAN|SPI|I2C|RS485|RS232|...', category: 'Protocols' },
    { name: 'Embedded Linux', category: 'OS' },
    { name: 'STM32|Atmel|...', category: 'MCU' },
    { name: 'ARM Cortex', category: 'Architecture' },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Technology Stack</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern tools and proven technologies for reliable embedded systems
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{tech.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{tech.category}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
