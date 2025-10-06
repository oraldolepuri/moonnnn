import { User, Office, Property, Client, Deal, KPI } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ardit Hoxha',
    email: 'ardit@realestatealbania.com',
    role: 'super_admin',
    phone: '+355 67 123 4567',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Elisabeta Berisha',
    email: 'elisabeta@realestatealbania.com',
    role: 'office_admin',
    office_id: 'office-1',
    phone: '+355 69 234 5678',
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Blerim Kastrati',
    email: 'blerim@realestatealbania.com',
    role: 'agent',
    office_id: 'office-1',
    phone: '+355 68 345 6789',
    created_at: '2024-02-01T00:00:00Z'
  }
];

export const mockOffices: Office[] = [
  {
    id: 'office-1',
    name: 'Tirana Center',
    address: 'Rruga "Dëshmorët e 4 Shkurtit"',
    city: 'Tirana',
    state: 'Qarku i Tiranës',
    zip: '1001',
    phone: '+355 4 456 7890',
    admin_id: '2',
    agents_count: 12,
    properties_count: 45,
    deals_count: 28,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'office-2',
    name: 'Durrës Coast',
    address: 'Bulevardi "Dyrrah"',
    city: 'Durrës',
    state: 'Qarku i Durrësit',
    zip: '2001',
    phone: '+355 52 345 6789',
    admin_id: '4',
    agents_count: 8,
    properties_count: 32,
    deals_count: 19,
    created_at: '2024-01-15T00:00:00Z'
  }
];

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Apartament Luksoz në Bllok',
    address: 'Rruga "Ibrahim Rugova"',
    city: 'Tirana',
    state: 'Qarku i Tiranës',
    zip: '1001',
    price: 280000000, // 280,000 EUR in ALL (approx 1 EUR = 100 ALL)
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 2200,
    property_type: 'apartment',
    status: 'active',
    listing_agent_id: '3',
    office_id: 'office-1',
    images: ['https://images.unsplash.com/photo-1729433994274-ed910a33fe2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYW5oYXR0YW4lMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk2NTUyODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    description: 'Apartament i bukur me pamje panoramike të qytetit, ambiente luksoze dhe të gjitha komoditeitet moderne në zemër të Tiranës.',
    listed_date: '2024-09-15T00:00:00Z',
    updated_at: '2024-10-01T00:00:00Z'
  },
  {
    id: 'prop-2',
    title: 'Vilë Moderne në Durrës',
    address: 'Rruga "Taulantia"',
    city: 'Durrës',
    state: 'Qarku i Durrësit',
    zip: '2001',
    price: 450000000, // 450,000 EUR in ALL
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2800,
    property_type: 'house',
    status: 'pending',
    listing_agent_id: '3',
    office_id: 'office-1',
    images: ['https://images.unsplash.com/photo-1707095286936-f707109c7b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBicm9va2x5biUyMHRvd25ob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTY1NTI5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'],
    description: 'Vilë e re moderne me oborr të madh, vetëm 500m nga plazhi. Lokacion i shkëlqyer për familjet.',
    listed_date: '2024-08-20T00:00:00Z',
    updated_at: '2024-09-25T00:00:00Z'
  }
];

export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Anxhela Krasniqi',
    email: 'anxhela@email.com',
    phone: '+355 69 777 8888',
    type: 'buyer',
    agent_id: '3',
    office_id: 'office-1',
    notes: 'Kërkon apartament 2-3 dhoma në qendër të Tiranës, buxhet deri në 200,000 EUR',
    created_at: '2024-08-15T00:00:00Z',
    updated_at: '2024-10-01T00:00:00Z'
  },
  {
    id: 'client-2',
    name: 'Driton Shala',
    email: 'driton@email.com',
    phone: '+355 67 999 0000',
    type: 'seller',
    agent_id: '3',
    office_id: 'office-1',
    notes: 'Shit apartamentin në qendër, po transferohet për punë në Gjermani',
    created_at: '2024-09-01T00:00:00Z',
    updated_at: '2024-09-28T00:00:00Z'
  }
];

export const mockDeals: Deal[] = [
  {
    id: 'deal-1',
    property_id: 'prop-1',
    client_id: 'client-1',
    agent_id: '3',
    office_id: 'office-1',
    type: 'purchase',
    status: 'showing',
    commission_rate: 0.03,
    commission_amount: 8400000, // Commission in ALL
    notes: 'Klienti shumë i interesuar, duke planifikuar vizitën e dytë',
    created_at: '2024-09-20T00:00:00Z',
    updated_at: '2024-10-01T00:00:00Z'
  },
  {
    id: 'deal-2',
    property_id: 'prop-2',
    client_id: 'client-2',
    agent_id: '3',
    office_id: 'office-1',
    type: 'sale',
    status: 'contract',
    offer_amount: 425000000, // Offer in ALL
    closing_date: '2024-11-15T00:00:00Z',
    commission_rate: 0.025,
    commission_amount: 10625000, // Commission in ALL
    notes: 'Kontrata e nënshkruar, duke pritur inspektimin',
    created_at: '2024-08-25T00:00:00Z',
    updated_at: '2024-09-30T00:00:00Z'
  }
];

export const superAdminKPIs: KPI[] = [
  { label: 'Të ardhurat totale', value: '420M L', change: 12.5, trend: 'up' },
  { label: 'Prona aktive', value: '156', change: 8.3, trend: 'up' },
  { label: 'Agjentë gjithsej', value: '42', change: 5.0, trend: 'up' },
  { label: 'Marrëveshje të mbyllura', value: '89', change: -2.1, trend: 'down' }
];

export const officeAdminKPIs: KPI[] = [
  { label: 'Të ardhurat e zyrës', value: '180M L', change: 15.2, trend: 'up' },
  { label: 'Lista aktive', value: '45', change: 12.0, trend: 'up' },
  { label: 'Agjentë në zyrë', value: '12', change: 0, trend: 'neutral' },
  { label: 'Marrëveshje mujore', value: '28', change: 7.5, trend: 'up' }
];

export const agentKPIs: KPI[] = [
  { label: 'Komisioni mujor', value: '2.45M L', change: 18.3, trend: 'up' },
  { label: 'Lista aktive', value: '8', change: 2, trend: 'up' },
  { label: 'Klientë aktivë', value: '15', change: 3, trend: 'up' },
  { label: 'Marrëveshje këtë muaj', value: '5', change: 1, trend: 'up' }
];

export const revenueChartData = [
  { name: 'Jan', value: 28000000 },
  { name: 'Shk', value: 32000000 },
  { name: 'Mar', value: 38000000 },
  { name: 'Pri', value: 42000000 },
  { name: 'Maj', value: 39000000 },
  { name: 'Qer', value: 45000000 }
];

export const propertyTypeData = [
  { name: 'Apartamente', value: 45, color: '#8884d8' },
  { name: 'Vila', value: 32, color: '#82ca9d' },
  { name: 'Dyqane', value: 28, color: '#ffc658' },
  { name: 'Komerciale', value: 15, color: '#ff7300' }
];

export const dealStatusData = [
  { name: 'Aktive', value: 34 },
  { name: 'Në pritje', value: 28 },
  { name: 'Të mbyllura', value: 89 },
  { name: 'Të anuluara', value: 12 }
];