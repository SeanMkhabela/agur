'use client';

import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface StatCardProps {
  title: string;
  value: number | string;
  changePercent?: number;
  icon?: React.ReactNode;
  formatter?: (value: number | string) => string;
  suffix?: string;
}

export default function StatCard({ 
  title, 
  value, 
  changePercent, 
  icon,
  formatter = (val) => String(val),
  suffix = ''
}: StatCardProps) {
  const isPositiveChange = changePercent !== undefined && changePercent > 0;
  const isNegativeChange = changePercent !== undefined && changePercent < 0;

  return (
    <div className="card stat-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="stat-label">{title}</p>
          <p className="stat-value">
            {formatter(value)}
            {suffix && <span className="text-sm ml-1 font-normal text-gray-500">{suffix}</span>}
          </p>
        </div>
        {icon && (
          <div className="p-2 bg-primary-100 rounded-full text-primary-600">
            {icon}
          </div>
        )}
      </div>
      
      {changePercent !== undefined && (
        <div className="flex items-center space-x-1">
          {isPositiveChange && (
            <ArrowUpIcon className="h-4 w-4 text-green-600" />
          )}
          {isNegativeChange && (
            <ArrowDownIcon className="h-4 w-4 text-red-600" />
          )}
          <span className={`text-sm font-medium ${
            isPositiveChange ? 'trend-up' : 
            isNegativeChange ? 'trend-down' : 'text-gray-500'
          }`}>
            {Math.abs(changePercent).toFixed(1)}%
          </span>
          <span className="text-sm text-gray-500">vs prev. month</span>
        </div>
      )}
    </div>
  );
} 