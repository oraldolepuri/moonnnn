import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Card, CardContent } from '../ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin,
  Edit,
  Home,
  DollarSign,
  Clock,
  Star
} from 'lucide-react';
import { Client } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface ClientViewDialogProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (client: Client) => void;
}

export function ClientViewDialog({ 
  client, 
  isOpen, 
  onClose, 
  onEdit 
}: ClientViewDialogProps) {
  if (!client) return null;

  const getClientTypeColor = (type: string) => {
    switch (type) {
      case 'buyer': return 'default';
      case 'seller': return 'secondary';
      case 'both': return 'outline';
      default: return 'secondary';
    }
  };

  const getClientTypeLabel = (type: string) => {
    switch (type) {
      case 'buyer': return 'Blerës';
      case 'seller': return 'Shitës';
      case 'both': return 'Blerës/Shitës';
      default: return type;
    }
  };

  // Mock additional data for demonstration
  const mockClientData = {
    preferredLocations: ['Tirana', 'Durrës', 'Vlorë'],
    budget: { min: 80000000, max: 150000000 }, // in ALL
    propertyTypes: ['house', 'condo'],
    lastActivity: '2024-06-15',
    satisfaction: 4.8,
    totalTransactions: 2,
    totalValue: 125000000,
    referralSource: 'Website',
    interests: ['Modern design', 'Near schools', 'Garden'],
    familySize: 4,
    timeframe: '3-6 muaj'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{client.name}</span>
            <div className="flex items-center space-x-2">
              <Badge variant={getClientTypeColor(client.type)}>
                {getClientTypeLabel(client.type)}
              </Badge>
              {onEdit && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(client)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Ndrysho
                </Button>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Informacionet e plota të klientit
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Informacioni i Kontaktit
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{client.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p>{client.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Regjistruar më</p>
                      <p>{new Date(client.created_at).toLocaleDateString('sq-AL')}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Aktiviteti i fundit</p>
                      <p>{new Date(mockClientData.lastActivity).toLocaleDateString('sq-AL')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  Performanca e Klientit
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Kënaqësia</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{mockClientData.satisfaction}/5.0</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transaksione</span>
                    <span>{mockClientData.totalTransactions}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vlera totale</span>
                    <span>{formatCurrency(mockClientData.totalValue)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Burimi</span>
                    <span>{mockClientData.referralSource}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Preferences */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Preferencat e Pronës
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lokacionet e preferuara</p>
                    <div className="flex flex-wrap gap-1">
                      {mockClientData.preferredLocations.map((location, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tipet e pronave</p>
                    <div className="flex flex-wrap gap-1">
                      {mockClientData.propertyTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type === 'house' ? 'Shtëpi' : type === 'condo' ? 'Apartament' : type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Koha e kërkimit</p>
                    <p>{mockClientData.timeframe}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Buxheti dhe Detaje
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Diapazoni i buxhetit</p>
                    <p>
                      {formatCurrency(mockClientData.budget.min)} - {formatCurrency(mockClientData.budget.max)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Madhësia e familjes</p>
                    <p>{mockClientData.familySize} anëtarë</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Interesat</p>
                    <div className="flex flex-wrap gap-1">
                      {mockClientData.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Notes */}
          {client.notes && (
            <div>
              <h3 className="font-semibold mb-2">Shënime</h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-muted-foreground leading-relaxed">
                  {client.notes}
                </p>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div>
            <h3 className="font-semibold mb-3">Aktiviteti i Fundit</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">E-mail kontakti për pronën në Tiranë</p>
                  <p className="text-xs text-muted-foreground">15 Qershor 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Vizitë e planifikuar për 18 Qershor</p>
                  <p className="text-xs text-muted-foreground">12 Qershor 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">Thirje telefoni - këshillim për hipotekë</p>
                  <p className="text-xs text-muted-foreground">10 Qershor 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Mbyll
            </Button>
            {onEdit && (
              <Button onClick={() => onEdit(client)}>
                <Edit className="h-4 w-4 mr-2" />
                Ndrysho Klientin
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}