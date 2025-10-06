import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, DollarSign, TrendingUp, FileText, Users, Building, Clock } from 'lucide-react';
import { Deal, Property, Client, User } from '../../types';
import { cn } from '../ui/utils';
import { toast } from 'sonner@2.0.3';

// Simple date formatter since date-fns isn't available
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

interface DealFormProps {
  deal?: Deal;
  properties: Property[];
  clients: Client[];
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (deal: Partial<Deal>) => void;
}

export function DealForm({ deal, properties, clients, user, isOpen, onClose, onSave }: DealFormProps) {
  const [formData, setFormData] = useState({
    property_id: deal?.property_id || '',
    client_id: deal?.client_id || '',
    type: deal?.type || 'sale' as const,
    status: deal?.status || 'lead' as const,
    offer_amount: deal?.offer_amount || 0,
    closing_date: deal?.closing_date || '',
    commission_rate: deal?.commission_rate || 3.0,
    commission_amount: deal?.commission_amount || 0,
    notes: deal?.notes || '',
    // Additional fields for comprehensive deal management
    lead_source: '',
    estimated_value: 0,
    probability: 50,
    next_action: '',
    next_action_date: '',
    documents: [] as string[],
    timeline: [] as Array<{
      date: string;
      status: string;
      description: string;
      user: string;
    }>,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Update commission amount when offer amount or rate changes
  useEffect(() => {
    if (formData.offer_amount && formData.commission_rate) {
      const commission = (formData.offer_amount * formData.commission_rate) / 100;
      setFormData(prev => ({
        ...prev,
        commission_amount: commission
      }));
    }
  }, [formData.offer_amount, formData.commission_rate]);

  // Update selected property and client
  useEffect(() => {
    if (formData.property_id) {
      const property = properties.find(p => p.id === formData.property_id);
      setSelectedProperty(property || null);
      if (property && !formData.offer_amount) {
        setFormData(prev => ({
          ...prev,
          estimated_value: property.price,
          offer_amount: property.price
        }));
      }
    }
  }, [formData.property_id, properties]);

  useEffect(() => {
    if (formData.client_id) {
      const client = clients.find(c => c.id === formData.client_id);
      setSelectedClient(client || null);
    }
  }, [formData.client_id, clients]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.property_id) {
      newErrors.property_id = 'Please select a property';
    }
    if (!formData.client_id) {
      newErrors.client_id = 'Please select a client';
    }
    if (formData.commission_rate < 0 || formData.commission_rate > 10) {
      newErrors.commission_rate = 'Commission rate should be between 0% and 10%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const dealData: Partial<Deal> = {
        property_id: formData.property_id,
        client_id: formData.client_id,
        agent_id: user.id,
        office_id: user.office_id || '',
        type: formData.type,
        status: formData.status,
        offer_amount: formData.offer_amount || undefined,
        closing_date: formData.closing_date || undefined,
        commission_rate: formData.commission_rate,
        commission_amount: formData.commission_amount,
        notes: formData.notes,
        created_at: deal?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSave(dealData);
      toast.success(deal ? 'Deal updated successfully' : 'Deal created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to save deal');
    } finally {
      setIsSubmitting(false);
    }
  };

  const dealTypes = [
    { value: 'sale', label: 'Sale', icon: DollarSign },
    { value: 'purchase', label: 'Purchase', icon: Building },
    { value: 'lease', label: 'Lease', icon: FileText }
  ];

  const dealStatuses = [
    { value: 'lead', label: 'Lead', color: 'bg-gray-100 text-gray-800' },
    { value: 'showing', label: 'Showing', color: 'bg-blue-100 text-blue-800' },
    { value: 'offer', label: 'Offer Made', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
    { value: 'contract', label: 'Under Contract', color: 'bg-purple-100 text-purple-800' },
    { value: 'closing', label: 'Closing', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'closed', label: 'Closed', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  const leadSources = [
    'Website', 'Referral', 'Cold Call', 'Open House', 'Social Media',
    'Zillow', 'Realtor.com', 'Sign Call', 'Past Client', 'Other'
  ];

  const userClients = clients.filter(client => 
    user.role === 'super_admin' || 
    client.agent_id === user.id || 
    (user.role === 'office_admin' && client.office_id === user.office_id)
  );

  const userProperties = properties.filter(property => 
    user.role === 'super_admin' || 
    property.listing_agent_id === user.id || 
    (user.role === 'office_admin' && property.office_id === user.office_id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {deal ? 'Edit Deal' : 'Create New Deal'}
          </DialogTitle>
          <DialogDescription>
            {deal ? 'Update the deal information and track progress.' : 'Create a new deal by selecting a property and client.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property_id">Property *</Label>
                <Select
                  value={formData.property_id}
                  onValueChange={(value) => handleInputChange('property_id', value)}
                >
                  <SelectTrigger className={errors.property_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                  <SelectContent>
                    {userProperties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        <div className="flex flex-col">
                          <span>{property.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {property.address}, {property.city} - ${property.price.toLocaleString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.property_id && (
                  <p className="text-sm text-red-500">{errors.property_id}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_id">Client *</Label>
                <Select
                  value={formData.client_id}
                  onValueChange={(value) => handleInputChange('client_id', value)}
                >
                  <SelectTrigger className={errors.client_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {userClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        <div className="flex flex-col">
                          <span>{client.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {client.email} - {client.type}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.client_id && (
                  <p className="text-sm text-red-500">{errors.client_id}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Deal Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dealTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dealStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={status.color}>
                            {status.label}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financial Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimated_value">Estimated Value</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="estimated_value"
                    type="number"
                    value={formData.estimated_value}
                    onChange={(e) => handleInputChange('estimated_value', parseFloat(e.target.value) || 0)}
                    placeholder="500000"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="offer_amount">Offer Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="offer_amount"
                    type="number"
                    value={formData.offer_amount}
                    onChange={(e) => handleInputChange('offer_amount', parseFloat(e.target.value) || 0)}
                    placeholder="475000"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="commission_rate">Commission Rate (%)</Label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="commission_rate"
                    type="number"
                    step="0.1"
                    value={formData.commission_rate}
                    onChange={(e) => handleInputChange('commission_rate', parseFloat(e.target.value) || 0)}
                    placeholder="3.0"
                    className={`pl-10 ${errors.commission_rate ? 'border-red-500' : ''}`}
                    min="0"
                    max="10"
                  />
                </div>
                {errors.commission_rate && (
                  <p className="text-sm text-red-500">{errors.commission_rate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="commission_amount">Commission Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="commission_amount"
                    type="number"
                    value={formData.commission_amount}
                    readOnly
                    className="pl-10 bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="probability">Probability (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  value={formData.probability}
                  onChange={(e) => handleInputChange('probability', parseInt(e.target.value) || 0)}
                  placeholder="50"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Timeline & Actions */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline & Actions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Closing Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.closing_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.closing_date ? (
                        formatDate(new Date(formData.closing_date))
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.closing_date ? new Date(formData.closing_date) : undefined}
                      onSelect={(date) => handleInputChange('closing_date', date?.toISOString().split('T')[0])}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead_source">Lead Source</Label>
                <Select
                  value={formData.lead_source}
                  onValueChange={(value) => handleInputChange('lead_source', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select lead source" />
                  </SelectTrigger>
                  <SelectContent>
                    {leadSources.map((source) => (
                      <SelectItem key={source} value={source.toLowerCase()}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="next_action">Next Action</Label>
                <Input
                  id="next_action"
                  value={formData.next_action}
                  onChange={(e) => handleInputChange('next_action', e.target.value)}
                  placeholder="Schedule property showing"
                />
              </div>

              <div className="space-y-2">
                <Label>Next Action Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.next_action_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.next_action_date ? (
                        formatDate(new Date(formData.next_action_date))
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.next_action_date ? new Date(formData.next_action_date) : undefined}
                      onSelect={(date) => handleInputChange('next_action_date', date?.toISOString().split('T')[0])}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Selected Property & Client Info */}
          {(selectedProperty || selectedClient) && (
            <div className="space-y-4">
              <h3 className="font-medium">Deal Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProperty && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Property Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="font-medium">{selectedProperty.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedProperty.address}, {selectedProperty.city}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">${selectedProperty.price.toLocaleString()}</span>
                        {' • '}
                        {selectedProperty.bedrooms}bd/{selectedProperty.bathrooms}ba
                        {' • '}
                        {selectedProperty.square_feet.toLocaleString()} sqft
                      </p>
                    </CardContent>
                  </Card>
                )}

                {selectedClient && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Client Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="font-medium">{selectedClient.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                      <p className="text-sm">
                        <Badge className={
                          selectedClient.type === 'buyer' ? 'bg-green-100 text-green-800' :
                          selectedClient.type === 'seller' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }>
                          {selectedClient.type}
                        </Badge>
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about this deal, important details, or next steps..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : deal ? 'Update Deal' : 'Create Deal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}