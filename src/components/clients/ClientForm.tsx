import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { User, Mail, Phone, MapPin, DollarSign, Calendar, Users } from 'lucide-react';
import { Client, User as UserType } from '../../types';
import { toast } from 'sonner@2.0.3';

interface ClientFormProps {
  client?: Client;
  user: UserType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Partial<Client>) => void;
}

export function ClientForm({ client, user, isOpen, onClose, onSave }: ClientFormProps) {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    type: client?.type || 'buyer' as const,
    notes: client?.notes || '',
    // Additional fields for comprehensive client management
    address: '',
    budget_min: 0,
    budget_max: 0,
    preferred_areas: [] as string[],
    property_preferences: {
      bedrooms: 0,
      bathrooms: 0,
      property_type: 'house' as const,
      must_haves: [] as string[],
      nice_to_haves: [] as string[]
    },
    communication_preferences: {
      email: true,
      phone: true,
      text: false
    },
    referral_source: '',
    priority_level: 'medium' as const,
    follow_up_date: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
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

    if (!formData.name.trim()) {
      newErrors.name = 'Client name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
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
      const clientData: Partial<Client> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        notes: formData.notes,
        agent_id: user.id,
        office_id: user.office_id || '',
        created_at: client?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSave(clientData);
      toast.success(client ? 'Client updated successfully' : 'Client created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to save client');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clientTypes = [
    { value: 'buyer', label: 'Buyer', color: 'bg-green-100 text-green-800' },
    { value: 'seller', label: 'Seller', color: 'bg-blue-100 text-blue-800' },
    { value: 'both', label: 'Buyer & Seller', color: 'bg-purple-100 text-purple-800' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'land', label: 'Land' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const mustHaveOptions = [
    'Garage', 'Pool', 'Fireplace', 'Hardwood Floors', 'Updated Kitchen',
    'Master Suite', 'Basement', 'Deck/Patio', 'Central Air', 'Laundry Room'
  ];

  const handleMustHaveToggle = (feature: string, checked: boolean) => {
    const currentMustHaves = formData.property_preferences.must_haves;
    if (checked) {
      handleInputChange('property_preferences.must_haves', [...currentMustHaves, feature]);
    } else {
      handleInputChange('property_preferences.must_haves', currentMustHaves.filter(f => f !== feature));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {client ? 'Edit Client' : 'Add New Client'}
          </DialogTitle>
          <DialogDescription>
            {client ? 'Update the client information and preferences below.' : 'Fill in the client details and property preferences.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Client Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {clientTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={type.color}>
                            {type.label}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Current Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street, City, State 12345"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Budget & Preferences */}
          {(formData.type === 'buyer' || formData.type === 'both') && (
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Budget & Preferences
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget_min">Minimum Budget</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="budget_min"
                      type="number"
                      value={formData.budget_min}
                      onChange={(e) => handleInputChange('budget_min', parseFloat(e.target.value) || 0)}
                      placeholder="200000"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget_max">Maximum Budget</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="budget_max"
                      type="number"
                      value={formData.budget_max}
                      onChange={(e) => handleInputChange('budget_max', parseFloat(e.target.value) || 0)}
                      placeholder="500000"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Preferred Property Type</Label>
                  <Select
                    value={formData.property_preferences.property_type}
                    onValueChange={(value) => handleInputChange('property_preferences.property_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Input
                    type="number"
                    value={formData.property_preferences.bedrooms}
                    onChange={(e) => handleInputChange('property_preferences.bedrooms', parseInt(e.target.value) || 0)}
                    placeholder="3"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={formData.property_preferences.bathrooms}
                    onChange={(e) => handleInputChange('property_preferences.bathrooms', parseFloat(e.target.value) || 0)}
                    placeholder="2.5"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Must-Have Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {mustHaveOptions.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.property_preferences.must_haves.includes(feature)}
                        onCheckedChange={(checked) => handleMustHaveToggle(feature, checked as boolean)}
                      />
                      <Label htmlFor={feature} className="text-sm">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Communication & Management */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Communication & Management
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Communication Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="comm_email"
                      checked={formData.communication_preferences.email}
                      onCheckedChange={(checked) => handleInputChange('communication_preferences.email', checked)}
                    />
                    <Label htmlFor="comm_email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="comm_phone"
                      checked={formData.communication_preferences.phone}
                      onCheckedChange={(checked) => handleInputChange('communication_preferences.phone', checked)}
                    />
                    <Label htmlFor="comm_phone">Phone Calls</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="comm_text"
                      checked={formData.communication_preferences.text}
                      onCheckedChange={(checked) => handleInputChange('communication_preferences.text', checked)}
                    />
                    <Label htmlFor="comm_text">Text Messages</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select
                    value={formData.priority_level}
                    onValueChange={(value) => handleInputChange('priority_level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div className="flex items-center gap-2">
                            <Badge className={level.color}>
                              {level.label}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="follow_up_date">Follow-up Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="follow_up_date"
                      type="date"
                      value={formData.follow_up_date}
                      onChange={(e) => handleInputChange('follow_up_date', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral_source">Referral Source</Label>
              <Input
                id="referral_source"
                value={formData.referral_source}
                onChange={(e) => handleInputChange('referral_source', e.target.value)}
                placeholder="e.g., Zillow, referral from John Smith, website, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Additional notes about the client, their preferences, or important information..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : client ? 'Update Client' : 'Create Client'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}