'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { MonthlyShipment } from '@/lib/types';

interface ShipmentChartProps {
  data: MonthlyShipment[];
  title: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-medium">{label}</p>
        <p className="text-primary-600 font-medium">
          {`${payload[0].value?.toLocaleString()} units`}
        </p>
      </div>
    );
  }
  return null;
};

export default function ShipmentChart({ data, title }: ShipmentChartProps) {
  return (
    <div className="card p-6">
      <h3 className="text-gray-900 font-medium text-lg mb-4">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="quantity"
              stroke="#0EA5E9"
              strokeWidth={3}
              dot={{ r: 4, fill: '#0EA5E9', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#0EA5E9', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 