export interface Distributor {
  id: string;
  name: string;
  lastMonthShipment: number;
  forecastedShipment: number;
  ytdAverageShipment: number;
  shipmentHistory: MonthlyShipment[];
  onTimeDeliveryRate: number;
  customerSatisfaction: number;
  region: string;
  contactPerson: string;
  email: string;
  phone: string;
  warehouseCapacity: number;
  logisticsPartner: string;
  active: boolean;
}

export interface MonthlyShipment {
  month: string;
  quantity: number;
} 