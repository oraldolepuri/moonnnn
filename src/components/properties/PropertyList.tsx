import { useState } from 'react';
import { Search, Filter, Plus, Grid, List } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { Badge } from '../ui/badge';
import { PropertyCard } from './PropertyCard';
import { PropertyForm } from './PropertyForm';
import { Property, User } from '../../types';
import { toast } from 'sonner@2.0.3';

interface PropertyListProps {
  properties: Property[];
  user: User;
  onView: (property: Property) => void;
  onEdit: (property: Property) => void;
  onAdd: () => void;
  onSave?: (property: Partial<Property>) => void;
  onDelete?: (propertyId: string) => void;
}

export function PropertyList({ 
  properties, 
  user, 
  onView, 
  onEdit, 
  onAdd,
  onSave,
  onDelete
}: PropertyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesType = typeFilter === 'all' || property.property_type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusCounts = () => {
    return properties.reduce((acc, property) => {
      acc[property.status] = (acc[property.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const statusCounts = getStatusCounts();

  const handleAdd = () => {
    setSelectedProperty(null);
    setIsFormOpen(true);
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setIsFormOpen(true);
    onEdit(property);
  };

  const handleSave = async (propertyData: Partial<Property>) => {
    if (onSave) {
      await onSave(propertyData);
    }
    setIsFormOpen(false);
    setSelectedProperty(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedProperty(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Properties</h1>
          <p className="text-muted-foreground">
            Manage your property listings and track their status
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Status overview */}
      <div className="flex space-x-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Badge key={status} variant="outline" className="text-sm py-1">
            {status.replace('_', ' ').toUpperCase()}: {count}
          </Badge>
        ))}
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search properties..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="off_market">Off Market</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProperties.length} of {properties.length} properties
      </div>

      {/* Properties grid/list */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onView={onView}
              onEdit={handleEdit}
              showAgentInfo={user.role === 'super_admin'}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4">
              {/* List view implementation would go here */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${property.price.toLocaleString()}</p>
                  <Badge variant="outline">{property.status}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No properties found matching your criteria.</p>
          <Button onClick={handleAdd} className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Property
          </Button>
        </div>
      )}

      {/* Property Form Modal */}
      <PropertyForm
        property={selectedProperty}
        user={user}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSave={handleSave}
      />
    </div>
  );
}