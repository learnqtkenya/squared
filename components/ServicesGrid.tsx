import { CircuitBoard, Cpu, Settings, Layout, CheckCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface ServiceDetail {
  title: string;
  icon: ReactNode;
  description: string;
  details: string[];
}

interface ServiceCardProps extends ServiceDetail {}

const ServiceCard = ({ icon, title, description, details }: ServiceCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-200 hover:border-emerald-400 transition-all duration-300 group">
    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="space-y-2">
      {details.map((detail) => (
        <li key={detail} className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span className="text-gray-600">{detail}</span>
        </li>
      ))}
    </ul>
  </div>
);

const services: ServiceDetail[] = [
  {
    title: 'Hardware Design & Prototyping',
    icon: <CircuitBoard className="h-8 w-8 text-emerald-600" />,
    description: 'From concept to prototype: custom PCB design, CAD and CAM modeling, and rapid prototyping for your specific needs.',
    details: ['Custom PCB Design', '3D CAD Modeling', 'Rapid Prototyping', 'Component Selection']
  },
  {
    title: 'Firmware Development',
    icon: <Cpu className="h-8 w-8 text-emerald-600" />,
    description: 'Professional C and C++ firmware development for microcontrollers and embedded systems with a focus on reliability.',
    details: ['RTOS Integration', 'Bare Metal Programming', 'Driver Development', 'Performance Optimization']
  },
  {
    title: 'IoT Solutions',
    icon: <Settings className="h-8 w-8 text-emerald-600" />,
    description: 'End-to-end IoT implementation including hardware, firmware, and cloud connectivity solutions.',
    details: ['Wireless Connectivity', 'Cloud Integration', 'Remote Monitoring', 'Data Analytics']
  },
  {
    title: 'Qt Development',
    icon: <Layout className="h-8 w-8 text-emerald-600" />,
    description: 'Cross-platform GUI applications and embedded interfaces using Qt framework.',
    details: ['Custom UI Design', 'Embedded HMI', 'Desktop Applications', 'Touch Interfaces']
  }
];

interface ServicesGridProps {
  className?: string;
}

const ServicesGrid = ({ className = '' }: ServicesGridProps) => (
  <div className={`grid md:grid-cols-2 gap-8 ${className}`}>
    {services.map((service) => (
      <ServiceCard key={service.title} {...service} />
    ))}
  </div>
);

export { ServicesGrid, ServiceCard, type ServiceDetail };