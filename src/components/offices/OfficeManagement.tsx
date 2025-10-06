import { useState } from 'react';
import { Plus, Search, Filter, MapPin, Users, TrendingUp, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { OfficeViewDialog } from './OfficeViewDialog';
import { User } from '../../types';

interface Office {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  manager: string;
  agentCount: number;
  activeListings: number;
  monthlyRevenue: number;
  status: 'active' | 'inactive';
  established: string;
}

interface OfficeManagementProps {
  user: User;
}

export function OfficeManagement({ user }: OfficeManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddOffice, setShowAddOffice] = useState(false);
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);
  
  // Mock office data with Albanian content
  const [offices, setOffices] = useState<Office[]>([
    {
      id: '1',
      name: 'Zyra Kryesore Tiranë',
      address: 'Bulevardi "Dëshmorët e Kombit"',
      city: 'Tiranë',
      state: 'Qarku Tiranës',
      zipCode: '1001',
      phone: '+355 4 234 5678',
      email: 'tirana@realestatealbania.com',
      manager: 'Elvira Shehu',
      agentCount: 25,
      activeListings: 87,
      monthlyRevenue: 24500000, // 245,000 EUR in ALL
      status: 'active',
      established: '2020-01-15'
    },
    {
      id: '2',
      name: 'Dega Durrës',
      address: 'Rruga "Pavarësia"',
      city: 'Durrës',
      state: 'Qarku Durrësit',
      zipCode: '2001',
      phone: '+355 52 234 567',
      email: 'durres@realestatealbania.com',
      manager: 'Arjan Hoxha',
      agentCount: 18,
      activeListings: 64,
      monthlyRevenue: 18900000, // 189,000 EUR in ALL
      status: 'active',
      established: '2021-03-10'
    },
    {
      id: '3',
      name: 'Zyra Vlorë',
      address: 'Sheshi "Pavarësia"',
      city: 'Vlorë',
      state: 'Qarku Vlorës',
      zipCode: '9401',
      phone: '+355 33 234 890',
      email: 'vlore@realestatealbania.com',
      manager: 'Mirela Berisha',
      agentCount: 12,
      activeListings: 43,
      monthlyRevenue: 12500000, // 125,000 EUR in ALL
      status: 'active',
      established: '2022-08-20'
    }
  ]);

  const filteredOffices = offices.filter(office => {
    const matchesSearch = office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         office.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         office.manager.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || office.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [newOffice, setNewOffice] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    manager: ''
  });

  const handleAddOffice = () => {
    const office: Office = {
      id: Math.random().toString(36).substr(2, 9),
      ...newOffice,
      agentCount: 0,
      activeListings: 0,
      monthlyRevenue: 0,
      status: 'active',
      established: new Date().toISOString().split('T')[0]
    };
    setOffices([...offices, office]);
    setNewOffice({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      manager: ''
    });
    setShowAddOffice(false);
  };

  const handleDeleteOffice = (officeId: string) => {
    setOffices(offices.filter(office => office.id !== officeId));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sq-AL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' L';
  };

  const totalStats = {
    totalOffices: offices.length,
    totalAgents: offices.reduce((sum, office) => sum + office.agentCount, 0),
    totalListings: offices.reduce((sum, office) => sum + office.activeListings, 0),
    totalRevenue: offices.reduce((sum, office) => sum + office.monthlyRevenue, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Menaxhimi i Zyrave</h1>
          <p className="text-muted-foreground">
            Menaxho zyrat, gjurmo performancën dhe mbikqyr operacionet
          </p>
        </div>
        {user.role === 'super_admin' && (
          <Dialog open={showAddOffice} onOpenChange={setShowAddOffice}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Shto Zyrë
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Office</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Office Name</Label>
                  <Input
                    id="name"
                    value={newOffice.name}
                    onChange={(e) => setNewOffice({...newOffice, name: e.target.value})}
                    placeholder="Downtown Main Office"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newOffice.address}
                    onChange={(e) => setNewOffice({...newOffice, address: e.target.value})}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newOffice.city}
                      onChange={(e) => setNewOffice({...newOffice, city: e.target.value})}
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={newOffice.state}
                      onChange={(e) => setNewOffice({...newOffice, state: e.target.value})}
                      placeholder="NY"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={newOffice.zipCode}
                    onChange={(e) => setNewOffice({...newOffice, zipCode: e.target.value})}
                    placeholder="10001"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newOffice.phone}
                    onChange={(e) => setNewOffice({...newOffice, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newOffice.email}
                    onChange={(e) => setNewOffice({...newOffice, email: e.target.value})}
                    placeholder="office@realestate.com"
                  />
                </div>
                <div>
                  <Label htmlFor="manager">Office Manager</Label>
                  <Input
                    id="manager"
                    value={newOffice.manager}
                    onChange={(e) => setNewOffice({...newOffice, manager: e.target.value})}
                    placeholder="Manager Name"
                  />
                </div>
                <Button onClick={handleAddOffice} className="w-full">
                  Add Office
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Offices</p>
                <p className="text-2xl font-semibold">{totalStats.totalOffices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-semibold">{totalStats.totalAgents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-semibold">{totalStats.totalListings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalStats.totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search offices, cities, or managers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Offices</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Office List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOffices.map((office) => (
          <Card key={office.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{office.name}</CardTitle>
                  <Badge variant={office.status === 'active' ? 'default' : 'secondary'}>
                    {office.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {user.role === 'super_admin' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteOffice(office.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{office.address}, {office.city}, {office.state}</span>
                </div>
                
                <div className="text-sm">
                  <p><span className="font-medium">Manager:</span> {office.manager}</p>
                  <p><span className="font-medium">Phone:</span> {office.phone}</p>
                  <p><span className="font-medium">Email:</span> {office.email}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Agents</p>
                    <p className="font-semibold">{office.agentCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Listings</p>
                    <p className="font-semibold">{office.activeListings}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-semibold text-sm">{formatCurrency(office.monthlyRevenue)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}