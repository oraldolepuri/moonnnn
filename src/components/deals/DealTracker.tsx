import { useState } from 'react';
import { Search, Plus, Calendar, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { DealForm } from './DealForm';
import { Deal, User, Property, Client } from '../../types';
import { toast } from 'sonner@2.0.3';

interface DealTrackerProps {
  deals: Deal[];
  properties: Property[];
  clients: Client[];
  user: User;
  onView: (deal: Deal) => void;
  onEdit: (deal: Deal) => void;
  onAdd: () => void;
  onSave?: (deal: Partial<Deal>) => void;
  onDelete?: (dealId: string) => void;
}

const DEAL_STAGES = [
  { id: 'lead', label: 'Lead', progress: 10 },
  { id: 'showing', label: 'Showing', progress: 25 },
  { id: 'offer', label: 'Offer', progress: 40 },
  { id: 'negotiation', label: 'Negotiation', progress: 55 },
  { id: 'contract', label: 'Contract', progress: 70 },
  { id: 'closing', label: 'Closing', progress: 85 },
  { id: 'closed', label: 'Closed', progress: 100 },
  { id: 'cancelled', label: 'Cancelled', progress: 0 }
];

export function DealTracker({ 
  deals, 
  properties, 
  clients, 
  user, 
  onView, 
  onEdit, 
  onAdd,
  onSave,
  onDelete
}: DealTrackerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const filteredDeals = deals.filter(deal => {
    const property = properties.find(p => p.id === deal.property_id);
    const client = clients.find(c => c.id === deal.client_id);
    
    const matchesSearch = property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    const matchesType = typeFilter === 'all' || deal.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead':
        return 'secondary';
      case 'showing':
        return 'default';
      case 'offer':
        return 'outline';
      case 'negotiation':
        return 'default';
      case 'contract':
        return 'secondary';
      case 'closing':
        return 'default';
      case 'closed':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStageInfo = (status: string) => {
    return DEAL_STAGES.find(stage => stage.id === status) || DEAL_STAGES[0];
  };

  const getPropertyInfo = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const getClientInfo = (clientId: string) => {
    return clients.find(c => c.id === clientId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sq-AL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' L';
  };

  const handleAdd = () => {
    setSelectedDeal(null);
    setIsFormOpen(true);
  };

  const handleEdit = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsFormOpen(true);
    onEdit(deal);
  };

  const handleSave = async (dealData: Partial<Deal>) => {
    if (onSave) {
      await onSave(dealData);
    }
    setIsFormOpen(false);
    setSelectedDeal(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedDeal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Ndjekje Marrëveshjesh</h1>
          <p className="text-muted-foreground">
            Monitoroni marrëveshjet tuaja dhe ndiqni progresin e tyre përmes procesit të shitjes
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Krijo Marrëveshje
        </Button>
      </div>

      {/* Deal pipeline overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DEAL_STAGES.slice(0, -1).map((stage) => {
          const stageDeals = deals.filter(deal => deal.status === stage.id);
          const totalValue = stageDeals.reduce((sum, deal) => 
            sum + (deal.offer_amount || 0), 0
          );
          
          return (
            <Card key={stage.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stage.label}</p>
                    <p className="text-2xl">{stageDeals.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(totalValue)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {DEAL_STAGES.map((stage) => (
                <SelectItem key={stage.id} value={stage.id}>
                  {stage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="lease">Lease</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredDeals.length} of {deals.length} deals
      </div>

      {/* Deals list */}
      <div className="space-y-4">
        {filteredDeals.map((deal) => {
          const property = getPropertyInfo(deal.property_id);
          const client = getClientInfo(deal.client_id);
          const stageInfo = getStageInfo(deal.status);
          
          return (
            <Card key={deal.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Deal info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{property?.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property?.address}, {property?.city}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={getStatusColor(deal.status)}>
                            {stageInfo.label}
                          </Badge>
                          <Badge variant="outline">
                            {deal.type.charAt(0).toUpperCase() + deal.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {deal.offer_amount ? formatCurrency(deal.offer_amount) : 'No offer'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Commission: {formatCurrency(deal.commission_amount)}
                        </p>
                      </div>
                    </div>

                    {/* Client info */}
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-xs">
                            {client?.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span>{client?.name}</span>
                      </div>
                      
                      {deal.closing_date && (
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Closing: {new Date(deal.closing_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{stageInfo.progress}%</span>
                      </div>
                      <Progress value={stageInfo.progress} className="h-2" />
                    </div>

                    {deal.notes && (
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm">{deal.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3">
                    <Button 
                      variant="outline" 
                      onClick={() => onView(deal)}
                      className="w-full"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={() => handleEdit(deal)}
                      className="w-full"
                    >
                      Update Deal
                    </Button>
                    
                    <div className="text-xs text-muted-foreground text-center pt-2">
                      Created {new Date(deal.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No deals found matching your criteria.</p>
          <Button onClick={handleAdd} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Deal
          </Button>
        </div>
      )}

      {/* Deal Form Modal */}
      <DealForm
        deal={selectedDeal}
        properties={properties}
        clients={clients}
        user={user}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSave={handleSave}
      />
    </div>
  );
}