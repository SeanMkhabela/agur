import { Distributor } from './types';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const currentMonth = new Date().getMonth();

// Generate random shipment history for the past 12 months
function generateShipmentHistory(baseQuantity: number) {
  return months.map((month, index) => {
    const randomVariation = Math.random() * 0.3 - 0.15; // -15% to +15%
    const quantity = Math.round(baseQuantity * (1 + randomVariation));
    return {
      month,
      quantity,
    };
  });
}

// Calculate YTD average
function calculateYtdAverage(shipmentHistory: { month: string; quantity: number }[]) {
  const ytdShipments = shipmentHistory.slice(0, currentMonth + 1);
  const total = ytdShipments.reduce((sum, month) => sum + month.quantity, 0);
  return Math.round(total / (currentMonth + 1));
}

export const distributors: Distributor[] = [
  {
    id: '1',
    name: 'Global Distribution Co.',
    lastMonthShipment: 12500,
    forecastedShipment: 13200,
    ytdAverageShipment: 11900,
    shipmentHistory: generateShipmentHistory(12000),
    onTimeDeliveryRate: 0.95,
    customerSatisfaction: 4.7,
    region: 'North America',
    contactPerson: 'John Smith',
    email: 'john.smith@globaldist.com',
    phone: '+1 (555) 123-4567',
    warehouseCapacity: 25000,
    logisticsPartner: 'FastFreight Inc.',
    active: true,
  },
  {
    id: '2',
    name: 'European Logistics Ltd.',
    lastMonthShipment: 8700,
    forecastedShipment: 9100,
    ytdAverageShipment: 8500,
    shipmentHistory: generateShipmentHistory(8500),
    onTimeDeliveryRate: 0.91,
    customerSatisfaction: 4.3,
    region: 'Europe',
    contactPerson: 'Marie Dubois',
    email: 'marie@eurologistics.eu',
    phone: '+33 1 23 45 67 89',
    warehouseCapacity: 18000,
    logisticsPartner: 'EuroTrans',
    active: true,
  },
  {
    id: '3',
    name: 'Pacific Rim Distributors',
    lastMonthShipment: 15800,
    forecastedShipment: 16200,
    ytdAverageShipment: 15300,
    shipmentHistory: generateShipmentHistory(15000),
    onTimeDeliveryRate: 0.97,
    customerSatisfaction: 4.8,
    region: 'Asia-Pacific',
    contactPerson: 'Li Wei',
    email: 'wei.li@pacificrim.com',
    phone: '+81 3 1234 5678',
    warehouseCapacity: 30000,
    logisticsPartner: 'AsiaPac Shipping',
    active: true,
  },
  {
    id: '4',
    name: 'South American Supply Chain',
    lastMonthShipment: 7300,
    forecastedShipment: 7800,
    ytdAverageShipment: 7100,
    shipmentHistory: generateShipmentHistory(7200),
    onTimeDeliveryRate: 0.88,
    customerSatisfaction: 4.1,
    region: 'South America',
    contactPerson: 'Carlos Rodriguez',
    email: 'carlos@sasupply.com',
    phone: '+55 11 1234 5678',
    warehouseCapacity: 15000,
    logisticsPartner: 'LatAm Freight',
    active: true,
  },
  {
    id: '5',
    name: 'Middle East Trading Co.',
    lastMonthShipment: 9200,
    forecastedShipment: 9800,
    ytdAverageShipment: 8900,
    shipmentHistory: generateShipmentHistory(9000),
    onTimeDeliveryRate: 0.93,
    customerSatisfaction: 4.5,
    region: 'Middle East',
    contactPerson: 'Ahmed Hassan',
    email: 'ahmed@metrading.com',
    phone: '+971 4 123 4567',
    warehouseCapacity: 20000,
    logisticsPartner: 'Desert Routes LLC',
    active: true,
  },
  {
    id: '6',
    name: 'African Distribution Network',
    lastMonthShipment: 5600,
    forecastedShipment: 6100,
    ytdAverageShipment: 5400,
    shipmentHistory: generateShipmentHistory(5500),
    onTimeDeliveryRate: 0.85,
    customerSatisfaction: 4.0,
    region: 'Africa',
    contactPerson: 'Nala Okeke',
    email: 'nala@africadist.com',
    phone: '+27 11 123 4567',
    warehouseCapacity: 12000,
    logisticsPartner: 'TransAfrica',
    active: true,
  },
  {
    id: '7',
    name: 'Nordic Supply Solutions',
    lastMonthShipment: 6800,
    forecastedShipment: 7200,
    ytdAverageShipment: 6600,
    shipmentHistory: generateShipmentHistory(6700),
    onTimeDeliveryRate: 0.98,
    customerSatisfaction: 4.9,
    region: 'Northern Europe',
    contactPerson: 'Erik Johansson',
    email: 'erik@nordicsupply.com',
    phone: '+46 8 123 4567',
    warehouseCapacity: 14000,
    logisticsPartner: 'Nordic Freight AS',
    active: true,
  },
  {
    id: '8',
    name: 'Oceania Distributors Pty',
    lastMonthShipment: 4900,
    forecastedShipment: 5300,
    ytdAverageShipment: 4700,
    shipmentHistory: generateShipmentHistory(4800),
    onTimeDeliveryRate: 0.94,
    customerSatisfaction: 4.6,
    region: 'Oceania',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@oceaniadist.com.au',
    phone: '+61 2 1234 5678',
    warehouseCapacity: 10000,
    logisticsPartner: 'AusFreight',
    active: true,
  },
];

// Update YTD averages to be more realistic
export const processedDistributors = distributors.map(distributor => {
  const ytdAverage = calculateYtdAverage(distributor.shipmentHistory);
  return {
    ...distributor,
    ytdAverageShipment: ytdAverage,
  };
}); 