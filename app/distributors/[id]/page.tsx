'use client';

import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import ShipmentChart from '@/components/ShipmentChart';
import { processedDistributors } from '@/lib/mockData';
import { 
  TruckIcon, 
  ChartBarIcon, 
  ClockIcon, 
  MapPinIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function DistributorDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const distributor = processedDistributors.find(d => d.id === id);
  
  if (!distributor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Distributor Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const forecastChangePercent = ((distributor.forecastedShipment - distributor.lastMonthShipment) / distributor.lastMonthShipment) * 100;
  const ytdChangePercent = ((distributor.ytdAverageShipment - distributor.lastMonthShipment) / distributor.lastMonthShipment) * 100;

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <button 
                onClick={() => router.back()}
                className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{distributor.name}</h1>
            </div>
            <p className="text-gray-500">Distributor Details and Analytics</p>
          </div>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              distributor.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {distributor.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 col-span-full lg:col-span-1">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Contact Person</p>
                  <p className="text-sm text-gray-500">{distributor.contactPerson}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">{distributor.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-500">{distributor.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Region</p>
                  <p className="text-sm text-gray-500">{distributor.region}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Logistics Partner</p>
                  <p className="text-sm text-gray-500">{distributor.logisticsPartner}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard 
                title="Last Month Shipments" 
                value={distributor.lastMonthShipment}
                formatter={(val) => Number(val).toLocaleString()}
                suffix="units"
                icon={<TruckIcon className="h-6 w-6" />}
              />
              <StatCard 
                title="Forecasted Shipments" 
                value={distributor.forecastedShipment}
                changePercent={forecastChangePercent}
                formatter={(val) => Number(val).toLocaleString()}
                suffix="units"
                icon={<ChartBarIcon className="h-6 w-6" />}
              />
              <StatCard 
                title="YTD Average Shipments" 
                value={distributor.ytdAverageShipment}
                changePercent={ytdChangePercent}
                formatter={(val) => Number(val).toLocaleString()}
                suffix="units/month"
                icon={<ClockIcon className="h-6 w-6" />}
              />
              <StatCard 
                title="On-Time Delivery Rate" 
                value={(distributor.onTimeDeliveryRate * 100).toFixed(1)}
                suffix="%"
              />
              <StatCard 
                title="Customer Satisfaction" 
                value={distributor.customerSatisfaction.toFixed(1)}
                suffix="/5"
              />
              <StatCard 
                title="Warehouse Capacity" 
                value={distributor.warehouseCapacity}
                formatter={(val) => Number(val).toLocaleString()}
                suffix="units"
              />
            </div>
          </div>
        </div>

        {/* Shipment History Chart */}
        <div className="mb-8">
          <ShipmentChart 
            data={distributor.shipmentHistory} 
            title={`Monthly Shipment History - ${distributor.name}`}
          />
        </div>
      </div>
    </main>
  );
} 