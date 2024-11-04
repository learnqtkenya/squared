import { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ className = '', children }: CardProps) => {
  return (
    <div 
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className = '', children }: CardHeaderProps) => {
  return (
    <div 
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ className = '', children }: CardTitleProps) => {
  return (
    <h3 
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};

const CardContent = ({ className = '', children }: CardContentProps) => {
  return (
    <div 
      className={`p-6 pt-0 ${className}`}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };