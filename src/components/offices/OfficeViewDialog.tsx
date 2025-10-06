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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Calendar,
  Edit,
  Building,
  Users,
  TrendingUp,
  DollarSign,
  Award,
  Clock
} from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

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

interface OfficeViewDialogProps {
  office: Office | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (office: Office) => void;
}

export function OfficeViewDialog({ 
  office, 
  isOpen, 
  onClose, 
  onEdit 
}: OfficeViewDialogProps) {
  if (!office) return null;

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const getStatusLabel = (status: string) => {
    return status === 'active' ? 'Aktive' : 'Joaktive';
  };

  // Mock additional office data
  const mockOfficeData = {
    totalSales: 2450000000, // in ALL
    averageCommission: 3.2,
    customerSatisfaction: 4.7,
    marketShare: 15.3,
    topAgents: [
      { name: 'Arjan Hoxha', deals: 24 },
      { name: 'Elvira Shehu', deals: 19 },
      { name: 'Dritan Berisha', deals: 16 }
    ],
    recentAchievements: [
      'Top performer Q2 2024',
      'Më shumë se 100 shitje këtë vit',
      'Rritje 25% e të ardhurave'
    ],
    operatingHours: {
      weekdays: '09:00 - 18:00',
      saturday: '10:00 - 16:00',
      sunday: 'E mbyllur'
    }
  };

  const yearsInOperation = new Date().getFullYear() - new Date(office.established).getFullYear();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{office.name}</span>
            <div className="flex items-center space-x-2">
              <Badge variant={getStatusColor(office.status)}>
                {getStatusLabel(office.status)}
              </Badge>
              {onEdit && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(office)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Ndrysho
                </Button>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Informacionet e plota të zyrës
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Agjentë</p>
                <p className="text-2xl font-semibold">{office.agentCount}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Building className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Listime Aktive</p>
                <p className="text-2xl font-semibold">{office.activeListings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Të Ardhura Mujore</p>
                <p className="text-xl font-semibold">{formatCurrency(office.monthlyRevenue)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Shitje Totale</p>
                <p className="text-xl font-semibold">{formatCurrency(mockOfficeData.totalSales)}</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Contact and Location Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Lokacioni dhe Kontakti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Adresa</p>
                  <p className="font-medium">{office.address}</p>
                  <p className="text-sm">{office.city}, {office.state} {office.zipCode}</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <p>{office.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{office.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Menaxher</p>
                      <p>{office.manager}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">E themeluar</p>
                      <p>{new Date(office.established).toLocaleDateString('sq-AL')} ({yearsInOperation} vjet)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Orari i Punës
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E hënë - E premte:</span>
                  <span>{mockOfficeData.operatingHours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E shtunë:</span>
                  <span>{mockOfficeData.operatingHours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E diel:</span>
                  <span>{mockOfficeData.operatingHours.sunday}</span>
                </div>

                <Separator className="my-4" />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Metrika të performancës</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Komisioni mesatar:</span>
                      <span>{mockOfficeData.averageCommission}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Kënaqësia e klientëve:</span>
                      <span>{mockOfficeData.customerSatisfaction}/5.0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pjesa e tregut:</span>
                      <span>{mockOfficeData.marketShare}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Top Performers and Achievements */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Agjentët më të Mirë
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockOfficeData.topAgents.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                      <Badge variant="outline">
                        {agent.deals} marrëveshje
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Arritjet e Fundit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockOfficeData.recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Award className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Objektiva të Ardhshme</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Rritje 30% e shitjeve deri në fund të vitit</li>
                    <li>• Shtim i 5 agjentëve të rinj</li>
                    <li>• Hapja e degës së re në Durrës</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Performance Chart would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Performanca 6-Mujore</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Grafiku i performancës do të shfaqet këtu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Mbyll
            </Button>
            {onEdit && (
              <Button onClick={() => onEdit(office)}>
                <Edit className="h-4 w-4 mr-2" />
                Ndrysho Zyrën
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}