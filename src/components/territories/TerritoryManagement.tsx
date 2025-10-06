import { useState } from 'react';
import { Plus, Search, Filter, MapPin, Users, TrendingUp, Edit, Trash2, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { User } from '../../types';

interface Territory {
  id: string;
  name: string;
  description: string;
  boundaries: string;
  assignedAgent: string;
  agentId: string;
  status: 'active' | 'inactive' | 'pending';
  zipCodes: string[];
  neighborhoods: string[];
  performance: {
    activeListings: number;
    totalSales: number;
    avgPrice: number;
    marketPenetration: number;
  };
  demographics: {
    avgIncome: number;
    homeOwnership: number;
    population: number;
  };
}

interface TerritoryManagementProps {
  user: User;
}

export function TerritoryManagement({ user }: TerritoryManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddTerritory, setShowAddTerritory] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock territory data
  const [territories, setTerritories] = useState<Territory[]>([
    {
      id: '1',
      name: 'Downtown Core',
      description: 'Central business district with luxury condos and commercial properties',
      boundaries: 'Bounded by Main St, 1st Ave, Oak St, and Park Ave',
      assignedAgent: 'Sarah Johnson',
      agentId: 'agent_1',
      status: 'active',
      zipCodes: ['10001', '10002', '10003'],
      neighborhoods: ['Financial District', 'Arts Quarter', 'Business Center'],
      performance: {
        activeListings: 24,
        totalSales: 3200000,
        avgPrice: 850000,
        marketPenetration: 85
      },
      demographics: {
        avgIncome: 125000,
        homeOwnership: 45,
        population: 12500
      }
    },
    {
      id: '2',
      name: 'Westside Residential',
      description: 'Family-friendly suburban area with single-family homes',
      boundaries: 'West of Oak St to city limits, north of Highway 50',
      assignedAgent: 'Michael Chen',
      agentId: 'agent_2',
      status: 'active',
      zipCodes: ['90210', '90211', '90212'],
      neighborhoods: ['Maple Heights', 'Oak Grove', 'Pine Valley'],
      performance: {
        activeListings: 18,
        totalSales: 2100000,
        avgPrice: 650000,
        marketPenetration: 72
      },
      demographics: {
        avgIncome: 95000,
        homeOwnership: 78,
        population: 8200
      }
    },
    {
      id: '3',
      name: 'Suburban East',
      description: 'Growing suburban area with new developments',
      boundaries: 'East of Park Ave to county line, south of River Rd',
      assignedAgent: 'Emily Rodriguez',
      agentId: 'agent_3',
      status: 'active',
      zipCodes: ['73301', '73302'],
      neighborhoods: ['Riverside', 'New Town', 'Garden District'],
      performance: {
        activeListings: 15,
        totalSales: 1800000,
        avgPrice: 480000,
        marketPenetration: 68
      },
      demographics: {
        avgIncome: 75000,
        homeOwnership: 82,
        population: 6800
      }
    },
    {
      id: '4',
      name: 'North Hills',
      description: 'Luxury hilltop properties with scenic views',
      boundaries: 'North of Highway 50 to mountain ridge',
      assignedAgent: 'John Smith',
      agentId: 'agent_4',
      status: 'pending',
      zipCodes: ['10101', '10102'],
      neighborhoods: ['Summit View', 'Ridge Point', 'Hilltop Estates'],
      performance: {
        activeListings: 8,
        totalSales: 2400000,
        avgPrice: 1200000,
        marketPenetration: 45
      },
      demographics: {
        avgIncome: 185000,
        homeOwnership: 92,
        population: 3200
      }
    }
  ]);

  const filteredTerritories = territories.filter(territory => {
    const matchesSearch = territory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         territory.assignedAgent.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         territory.neighborhoods.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || territory.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const [newTerritory, setNewTerritory] = useState({
    name: '',
    description: '',
    boundaries: '',
    assignedAgent: '',
    zipCodes: '',
    neighborhoods: ''
  });

  const handleAddTerritory = () => {
    const territory: Territory = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTerritory,
      agentId: 'agent_new',
      status: 'pending',
      zipCodes: newTerritory.zipCodes.split(',').map(z => z.trim()),
      neighborhoods: newTerritory.neighborhoods.split(',').map(n => n.trim()),
      performance: {
        activeListings: 0,
        totalSales: 0,
        avgPrice: 0,
        marketPenetration: 0
      },
      demographics: {
        avgIncome: 0,
        homeOwnership: 0,
        population: 0
      }
    };
    setTerritories([...territories, territory]);
    setNewTerritory({
      name: '',
      description: '',
      boundaries: '',
      assignedAgent: '',
      zipCodes: '',
      neighborhoods: ''
    });
    setShowAddTerritory(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'inactive': return 'outline';
      default: return 'secondary';
    }
  };

  const totalStats = {
    totalTerritories: territories.length,
    activeTerritories: territories.filter(t => t.status === 'active').length,
    totalListings: territories.reduce((sum, t) => sum + t.performance.activeListings, 0),
    totalSales: territories.reduce((sum, t) => sum + t.performance.totalSales, 0),
    avgPenetration: territories.reduce((sum, t) => sum + t.performance.marketPenetration, 0) / territories.length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Territory Management</h1>
          <p className="text-muted-foreground">
            Manage geographical territories, assignments, and track regional performance
          </p>
        </div>
        {(user.role === 'super_admin' || user.role === 'office_admin') && (
          <Dialog open={showAddTerritory} onOpenChange={setShowAddTerritory}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Territory
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Territory</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Territory Name</Label>
                  <Input
                    id="name"
                    value={newTerritory.name}
                    onChange={(e) => setNewTerritory({...newTerritory, name: e.target.value})}
                    placeholder="Downtown Core"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTerritory.description}
                    onChange={(e) => setNewTerritory({...newTerritory, description: e.target.value})}
                    placeholder="Central business district with luxury condos..."
                  />
                </div>
                <div>
                  <Label htmlFor="boundaries">Boundaries</Label>
                  <Textarea
                    id="boundaries"
                    value={newTerritory.boundaries}
                    onChange={(e) => setNewTerritory({...newTerritory, boundaries: e.target.value})}
                    placeholder="Bounded by Main St, 1st Ave, Oak St, and Park Ave"
                  />
                </div>
                <div>
                  <Label htmlFor="assignedAgent">Assigned Agent</Label>
                  <Input
                    id="assignedAgent"
                    value={newTerritory.assignedAgent}
                    onChange={(e) => setNewTerritory({...newTerritory, assignedAgent: e.target.value})}
                    placeholder="Agent Name"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCodes">ZIP Codes (comma-separated)</Label>
                  <Input
                    id="zipCodes"
                    value={newTerritory.zipCodes}
                    onChange={(e) => setNewTerritory({...newTerritory, zipCodes: e.target.value})}
                    placeholder="10001, 10002, 10003"
                  />
                </div>
                <div>
                  <Label htmlFor="neighborhoods">Neighborhoods (comma-separated)</Label>
                  <Input
                    id="neighborhoods"
                    value={newTerritory.neighborhoods}
                    onChange={(e) => setNewTerritory({...newTerritory, neighborhoods: e.target.value})}
                    placeholder="Financial District, Arts Quarter"
                  />
                </div>
                <Button onClick={handleAddTerritory} className="w-full">
                  Add Territory
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="territories">Territories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Map className="h-8 w-8 text-muted-foreground" />
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Total Territories</p>
                    <p className="text-2xl font-semibold">{totalStats.totalTerritories}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-semibold">{totalStats.activeTerritories}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Total Listings</p>
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
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="text-2xl font-semibold">{formatCurrency(totalStats.totalSales)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Avg Penetration</p>
                    <p className="text-2xl font-semibold">{totalStats.avgPenetration.toFixed(0)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Territory Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Territory Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {territories.slice(0, 4).map((territory) => (
                  <div key={territory.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{territory.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{territory.name}</h4>
                        <p className="text-sm text-muted-foreground">{territory.assignedAgent}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Listings</p>
                        <p className="font-semibold">{territory.performance.activeListings}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Sales</p>
                        <p className="font-semibold">{formatCurrency(territory.performance.totalSales)}</p>
                      </div>
                      <div className="text-center min-w-[100px]">
                        <p className="text-sm text-muted-foreground">Penetration</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={territory.performance.marketPenetration} className="w-16 h-2" />
                          <span className="text-sm font-semibold">{territory.performance.marketPenetration}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="territories" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search territories, agents, or neighborhoods..."
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
                <SelectItem value="all">All Territories</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Territory List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTerritories.map((territory) => (
              <Card key={territory.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{territory.name}</CardTitle>
                      <Badge variant={getStatusColor(territory.status)}>
                        {territory.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {(user.role === 'super_admin' || user.role === 'office_admin') && (
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{territory.description}</p>
                    
                    <div className="text-sm">
                      <p><span className="font-medium">Agent:</span> {territory.assignedAgent}</p>
                      <p><span className="font-medium">Boundaries:</span> {territory.boundaries}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">ZIP Codes</p>
                      <div className="flex flex-wrap gap-1">
                        {territory.zipCodes.map((zip, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {zip}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Neighborhoods</p>
                      <div className="flex flex-wrap gap-1">
                        {territory.neighborhoods.map((neighborhood, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {neighborhood}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Listings</p>
                        <p className="font-semibold">{territory.performance.activeListings}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Avg Price</p>
                        <p className="font-semibold text-sm">{formatCurrency(territory.performance.avgPrice)}</p>
                      </div>
                      <div className="text-center col-span-2">
                        <p className="text-sm text-muted-foreground">Market Penetration</p>
                        <div className="flex items-center justify-center space-x-2 mt-1">
                          <Progress value={territory.performance.marketPenetration} className="w-24 h-2" />
                          <span className="font-semibold">{territory.performance.marketPenetration}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Territory Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {territories.map((territory) => (
                    <div key={territory.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{territory.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {territory.demographics.population.toLocaleString()} residents
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Avg Income: </span>
                          <span>{formatCurrency(territory.demographics.avgIncome)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Home Ownership: </span>
                          <span>{territory.demographics.homeOwnership}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Performance by Territory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {territories.map((territory) => (
                    <div key={territory.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{territory.name}</span>
                        <span className="font-semibold">
                          {formatCurrency(territory.performance.totalSales)}
                        </span>
                      </div>
                      <Progress 
                        value={(territory.performance.totalSales / Math.max(...territories.map(t => t.performance.totalSales))) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{territory.performance.activeListings} active listings</span>
                        <span>Avg: {formatCurrency(territory.performance.avgPrice)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}