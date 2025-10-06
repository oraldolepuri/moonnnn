import { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, MapPin, TrendingUp, Star, Edit, UserX, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { User } from '../../types';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  office: string;
  territory: string;
  status: 'active' | 'inactive' | 'on_leave';
  role: 'agent' | 'senior_agent' | 'team_lead';
  hireDate: string;
  avatar?: string;
  performance: {
    totalSales: number;
    activeListings: number;
    monthlyRevenue: number;
    clientSatisfaction: number;
    dealsCompleted: number;
    dealsInProgress: number;
  };
  specializations: string[];
}

interface AgentManagementProps {
  user: User;
}

export function AgentManagement({ user }: AgentManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [officeFilter, setOfficeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddAgent, setShowAddAgent] = useState(false);

  // Mock agent data
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@realestate.com',
      phone: '(555) 123-4567',
      office: 'Downtown Main Office',
      territory: 'Downtown District',
      status: 'active',
      role: 'senior_agent',
      hireDate: '2022-01-15',
      performance: {
        totalSales: 2450000,
        activeListings: 12,
        monthlyRevenue: 98000,
        clientSatisfaction: 4.8,
        dealsCompleted: 24,
        dealsInProgress: 6
      },
      specializations: ['Luxury Homes', 'Commercial Properties']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@realestate.com',
      phone: '(555) 987-6543',
      office: 'Westside Branch',
      territory: 'Westside District',
      status: 'active',
      role: 'team_lead',
      hireDate: '2020-06-10',
      performance: {
        totalSales: 3200000,
        activeListings: 18,
        monthlyRevenue: 128000,
        clientSatisfaction: 4.9,
        dealsCompleted: 32,
        dealsInProgress: 8
      },
      specializations: ['Residential', 'First-Time Buyers']
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael.chen@realestate.com',
      phone: '(555) 456-7890',
      office: 'Suburban Office',
      territory: 'Suburban Area',
      status: 'active',
      role: 'agent',
      hireDate: '2023-03-20',
      performance: {
        totalSales: 1200000,
        activeListings: 8,
        monthlyRevenue: 48000,
        clientSatisfaction: 4.6,
        dealsCompleted: 12,
        dealsInProgress: 4
      },
      specializations: ['Family Homes', 'Investment Properties']
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@realestate.com',
      phone: '(555) 321-0987',
      office: 'Downtown Main Office',
      territory: 'Urban Core',
      status: 'on_leave',
      role: 'agent',
      hireDate: '2022-08-05',
      performance: {
        totalSales: 1800000,
        activeListings: 5,
        monthlyRevenue: 72000,
        clientSatisfaction: 4.7,
        dealsCompleted: 18,
        dealsInProgress: 2
      },
      specializations: ['Condos', 'Urban Living']
    }
  ]);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.territory.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOffice = officeFilter === 'all' || agent.office === officeFilter;
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesOffice && matchesStatus;
  });

  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    phone: '',
    office: '',
    territory: '',
    role: 'agent'
  });

  const handleAddAgent = () => {
    const agent: Agent = {
      id: Math.random().toString(36).substr(2, 9),
      ...newAgent,
      status: 'active',
      hireDate: new Date().toISOString().split('T')[0],
      performance: {
        totalSales: 0,
        activeListings: 0,
        monthlyRevenue: 0,
        clientSatisfaction: 0,
        dealsCompleted: 0,
        dealsInProgress: 0
      },
      specializations: []
    } as Agent;
    setAgents([...agents, agent]);
    setNewAgent({
      name: '',
      email: '',
      phone: '',
      office: '',
      territory: '',
      role: 'agent'
    });
    setShowAddAgent(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'on_leave': return 'outline';
      default: return 'secondary';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'team_lead': return 'destructive';
      case 'senior_agent': return 'default';
      case 'agent': return 'secondary';
      default: return 'secondary';
    }
  };

  const totalStats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    totalSales: agents.reduce((sum, agent) => sum + agent.performance.totalSales, 0),
    avgSatisfaction: agents.reduce((sum, agent) => sum + agent.performance.clientSatisfaction, 0) / agents.length
  };

  const offices = [...new Set(agents.map(agent => agent.office))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Agent Management</h1>
          <p className="text-muted-foreground">
            Manage agents, track performance, and oversee team productivity
          </p>
        </div>
        {(user.role === 'super_admin' || user.role === 'office_admin') && (
          <Dialog open={showAddAgent} onOpenChange={setShowAddAgent}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Agent</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAgent.email}
                    onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                    placeholder="john.smith@realestate.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newAgent.phone}
                    onChange={(e) => setNewAgent({...newAgent, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="office">Office</Label>
                  <Select value={newAgent.office} onValueChange={(value) => setNewAgent({...newAgent, office: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select office" />
                    </SelectTrigger>
                    <SelectContent>
                      {offices.map(office => (
                        <SelectItem key={office} value={office}>{office}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="territory">Territory</Label>
                  <Input
                    id="territory"
                    value={newAgent.territory}
                    onChange={(e) => setNewAgent({...newAgent, territory: e.target.value})}
                    placeholder="Downtown District"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={newAgent.role} onValueChange={(value) => setNewAgent({...newAgent, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="senior_agent">Senior Agent</SelectItem>
                      <SelectItem value="team_lead">Team Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddAgent} className="w-full">
                  Add Agent
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
                <p className="text-sm text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-semibold">{totalStats.activeAgents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-muted-foreground" />
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
              <Star className="h-8 w-8 text-muted-foreground" />
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
                <p className="text-2xl font-semibold">{totalStats.avgSatisfaction.toFixed(1)}</p>
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
            placeholder="Search agents, territories, or emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={officeFilter} onValueChange={setOfficeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by office" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Offices</SelectItem>
            {offices.map(office => (
              <SelectItem key={office} value={office}>{office}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="on_leave">On Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Agent List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={getStatusColor(agent.status)}>
                        {agent.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant={getRoleColor(agent.role)}>
                        {agent.role.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {(user.role === 'super_admin' || user.role === 'office_admin') && (
                    <Button variant="ghost" size="sm">
                      <UserX className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{agent.email}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{agent.territory}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Client Satisfaction</span>
                    <span>{agent.performance.clientSatisfaction}/5.0</span>
                  </div>
                  <Progress value={agent.performance.clientSatisfaction * 20} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Deals</p>
                    <p className="font-semibold">{agent.performance.dealsCompleted}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Listings</p>
                    <p className="font-semibold">{agent.performance.activeListings}</p>
                  </div>
                  <div className="text-center col-span-2">
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                    <p className="font-semibold">{formatCurrency(agent.performance.totalSales)}</p>
                  </div>
                </div>

                {agent.specializations.length > 0 && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Specializations</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}