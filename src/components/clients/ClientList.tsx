import { useState } from 'react';
import { Search, Plus, Phone, Mail, User, MoreVertical } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { ClientForm } from './ClientForm';
import { Client, User as UserType } from '../../types';
import { toast } from 'sonner@2.0.3';

interface ClientListProps {
  clients: Client[];
  user: UserType;
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onAdd: () => void;
  onSave?: (client: Partial<Client>) => void;
  onDelete?: (clientId: string) => void;
}

export function ClientList({ 
  clients, 
  user, 
  onView, 
  onEdit, 
  onAdd,
  onSave,
  onDelete
}: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    const matchesType = typeFilter === 'all' || client.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buyer':
        return 'default';
      case 'seller':
        return 'secondary';
      case 'both':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleAdd = () => {
    setSelectedClient(null);
    setIsFormOpen(true);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
    onEdit(client);
  };

  const handleSave = async (clientData: Partial<Client>) => {
    if (onSave) {
      await onSave(clientData);
    }
    setIsFormOpen(false);
    setSelectedClient(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships and track their needs
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="seller">Seller</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredClients.length} of {clients.length} clients
      </div>

      {/* Clients grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{client.name}</h3>
                    <Badge variant={getTypeColor(client.type)} className="text-xs">
                      {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(client)}>
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(client)}>
                      Edit Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
              </div>

              {client.notes && (
                <div className="mt-3 p-3 bg-muted rounded-md">
                  <p className="text-sm line-clamp-2">{client.notes}</p>
                </div>
              )}

              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onView(client)}
                >
                  View Profile
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEdit(client)}
                >
                  Edit
                </Button>
              </div>

              <div className="text-xs text-muted-foreground mt-3">
                Added {new Date(client.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No clients found matching your criteria.</p>
          <Button onClick={handleAdd} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Client
          </Button>
        </div>
      )}

      {/* Client Form Modal */}
      <ClientForm
        client={selectedClient}
        user={user}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSave={handleSave}
      />
    </div>
  );
}