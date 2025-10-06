export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'office_admin' | 'agent';
  avatar?: string;
  office_id?: string;
  phone?: string;
  created_at: string;
  // Profile fields
  bio?: string;
  address?: string;
  dateOfBirth?: string;
  emergencyContact?: string;
  licenseNumber?: string;
  specializations?: string[];
  yearsExperience?: number;
  office?: string;
  manager?: string;
  totalSales?: number;
  activeDeal?: number;
  // Security & Preferences
  twoFactorEnabled?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  loginAlerts?: boolean;
  dataBackup?: boolean;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  admin_id: string;
  agents_count: number;
  properties_count: number;
  deals_count: number;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: 'house' | 'condo' | 'townhouse' | 'land' | 'commercial';
  status: 'active' | 'pending' | 'sold' | 'off_market';
  listing_agent_id: string;
  office_id: string;
  images: string[];
  description: string;
  listed_date: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'buyer' | 'seller' | 'both';
  agent_id: string;
  office_id: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  property_id: string;
  client_id: string;
  agent_id: string;
  office_id: string;
  type: 'sale' | 'purchase' | 'lease';
  status: 'lead' | 'showing' | 'offer' | 'negotiation' | 'contract' | 'closing' | 'closed' | 'cancelled';
  offer_amount?: number;
  closing_date?: string;
  commission_rate: number;
  commission_amount: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface KPI {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}