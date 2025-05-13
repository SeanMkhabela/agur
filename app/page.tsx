'use client';

import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import ShipmentChart from '@/components/ShipmentChart';
import DistributorTable from '@/components/DistributorTable';
import { processedDistributors } from '@/lib/mockData';
import { 
  TruckIcon, 
  ChartBarIcon, 
  ClockIcon, 
  CubeIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
  // Calculate total values for the dashboard
  const totalLastMonth = processedDistributors.reduce((sum, dist) => sum + dist.lastMonthShipment, 0);
  const totalForecast = processedDistributors.reduce((sum, dist) => sum + dist.forecastedShipment, 0);
  const totalYtdAverage = processedDistributors.reduce((sum, dist) => sum + dist.ytdAverageShipment, 0) / processedDistributors.length;
  
  // Calculate percentages for the metrics
  const forecastChangePercent = ((totalForecast - totalLastMonth) / totalLastMonth) * 100;
  const ytdChangePercent = ((totalYtdAverage - totalLastMonth) / totalLastMonth) * 100;
  
  // Calculate the average on-time delivery rate
  const avgOnTimeDeliveryRate = processedDistributors.reduce((sum, dist) => sum + dist.onTimeDeliveryRate, 0) / processedDistributors.length * 100;

  // Generate aggregate shipment data
  const aggregateShipmentData = processedDistributors[0].shipmentHistory.map((monthData, index) => {
    return {
      month: monthData.month,
      quantity: processedDistributors.reduce((sum, dist) => sum + dist.shipmentHistory[index].quantity, 0)
    };
  });

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Distribution Dashboard</h1>
          <p className="text-gray-500">Overview of all distributor metrics and forecasts</p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Last Month Shipments" 
            value={totalLastMonth}
            formatter={(val) => Number(val).toLocaleString()}
            suffix="units"
            icon={<TruckIcon className="h-6 w-6" />}
          />
          <StatCard 
            title="Forecasted Shipments" 
            value={totalForecast}
            changePercent={forecastChangePercent}
            formatter={(val) => Number(val).toLocaleString()}
            suffix="units"
            icon={<ChartBarIcon className="h-6 w-6" />}
          />
          <StatCard 
            title="YTD Average Shipments" 
            value={Math.round(totalYtdAverage)}
            changePercent={ytdChangePercent}
            formatter={(val) => Number(val).toLocaleString()}
            suffix="units/month"
            icon={<ClockIcon className="h-6 w-6" />}
          />
          <StatCard 
            title="On-Time Delivery Rate" 
            value={avgOnTimeDeliveryRate.toFixed(1)}
            suffix="%"
            icon={<CubeIcon className="h-6 w-6" />}
          />
        </div>

        {/* Charts */}
        <div className="mb-8">
          <ShipmentChart 
            data={aggregateShipmentData} 
            title="Total Monthly Shipments (All Distributors)"
          />
        </div>

        {/* Distributors Table */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Distributors</h2>
          <DistributorTable distributors={processedDistributors} />
        </div>
      </div>
    </main>
  );
} 