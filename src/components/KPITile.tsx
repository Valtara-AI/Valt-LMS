import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KPITileProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'accent' | 'secondary' | 'success' | 'warning';
  suffix?: string;
}

export function KPITile({ title, value, icon: Icon, trend, color = 'accent', suffix }: KPITileProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'accent':
        return 'text-accent bg-accent/20';
      case 'secondary':
        return 'text-secondary bg-secondary/20';
      case 'success':
        return 'text-green-500 bg-green-500/20';
      case 'warning':
        return 'text-yellow-500 bg-yellow-500/20';
      default:
        return 'text-accent bg-accent/20';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="glass-panel rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${
            trend.isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-3xl font-bold mb-1">{value}{suffix}</h3>
        <p className="text-muted-foreground">{title}</p>
      </div>
    </motion.div>
  );
}
