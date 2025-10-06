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
import { Progress } from '../ui/progress';
import { 
  DollarSign, 
  Calendar, 
  User, 
  Home,
  Edit,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  MapPin,
  Percent
} from 'lucide-react';
import { Deal, Property, Client } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface DealViewDialogProps {
  deal: Deal | null;
  property?: Property;
  client?: Client;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (deal: Deal) => void;
}

export function DealViewDialog({ 
  deal, 
  property,
  client,
  isOpen, 
  onClose, 
  onEdit 
}: DealViewDialogProps) {
  if (!deal) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'lead': return 'secondary';
      case 'qualified': return 'default';
      case 'proposal': return 'outline';
      case 'negotiation': return 'default';
      case 'contract': return 'default';
      case 'closing': return 'outline';
      case 'closed': return 'default';
      case 'lost': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'lead': return 'Interesim i ri';
      case 'qualified': return 'I kualifikuar';
      case 'proposal': return 'Propozim';
      case 'negotiation': return 'Negocim';
      case 'contract': return 'Kontratë';
      case 'closing': return 'Duke mbyllur';
      case 'closed': return 'E mbyllur';
      case 'lost': return 'E humbur';
      default: return status;
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'lead': return 10;
      case 'qualified': return 25;
      case 'proposal': return 40;
      case 'negotiation': return 60;
      case 'contract': return 80;
      case 'closing': return 95;
      case 'closed': return 100;
      case 'lost': return 0;
      default: return 0;
    }
  };

  const getDealTypeLabel = (type: string) => {
    return type === 'sale' ? 'Shitje' : 'Qira';
  };

  // Mock timeline data
  const timeline = [
    {
      date: '2024-06-01',
      title: 'Marrëveshja u krijua',
      description: 'Klienti shprehu interesim për pronën',
      status: 'completed'
    },
    {
      date: '2024-06-03',
      title: 'Kualifikimi i klientit',
      description: 'Verifikimi i buxhetit dhe preferencave',
      status: 'completed'
    },
    {
      date: '2024-06-10',
      title: 'Propozimi i parë',
      description: 'Oferta fillestare prej ' + formatCurrency(deal.offer_amount || 0),
      status: 'completed'
    },
    {
      date: '2024-06-15',
      title: 'Negocimi aktual',
      description: 'Duke negociuar kushtet e shitjes',
      status: 'active'
    },
    {
      date: '2024-06-25',
      title: 'Nënshkrimi i kontratës',
      description: 'Finalizimi i kushteve të marrëveshjes',
      status: 'pending'
    },
    {
      date: '2024-07-15',
      title: 'Mbyllja e marrëveshjes',
      description: 'Transferimi final i pronësisë',
      status: 'pending'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Marrëveshja #{deal.id}</span>
            <div className="flex items-center space-x-2">
              <Badge variant={getStatusColor(deal.status)}>
                {getStatusLabel(deal.status)}
              </Badge>
              <Badge variant="outline">
                {getDealTypeLabel(deal.type)}
              </Badge>
              {onEdit && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(deal)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Ndrysho
                </Button>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Detajet e plota të marrëveshjes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Përparimi i marrëveshjes</span>
              <span className="text-sm text-muted-foreground">{getStatusProgress(deal.status)}%</span>
            </div>
            <Progress value={getStatusProgress(deal.status)} className="h-2" />
          </div>

          {/* Key Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Oferta</p>
                <p className="text-xl font-semibold">
                  {deal.offer_amount ? formatCurrency(deal.offer_amount) : 'Nuk është specifikuar'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Percent className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Komisioni</p>
                <p className="text-xl font-semibold">
                  {deal.commission_rate}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(deal.commission_amount || 0)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Data e mbylljes</p>
                <p className="text-xl font-semibold">
                  {deal.closing_date 
                    ? new Date(deal.closing_date).toLocaleDateString('sq-AL')
                    : 'Nuk është caktuar'
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Property and Client Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Property Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Prona
                </CardTitle>
              </CardHeader>
              <CardContent>
                {property ? (
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{property.address}, {property.city}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Çmimi:</span>
                        <p className="font-medium">{formatCurrency(property.price)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tipi:</span>
                        <p className="font-medium capitalize">{property.property_type}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Prona nuk u gjet</p>
                )}
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Klienti
                </CardTitle>
              </CardHeader>
              <CardContent>
                {client ? (
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">{client.email}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Telefon:</span>
                        <p className="font-medium">{client.phone}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tipi:</span>
                        <p className="font-medium">
                          {client.type === 'buyer' ? 'Blerës' : 
                           client.type === 'seller' ? 'Shitës' : 'Blerës/Shitës'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Klienti nuk u gjet</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Rrjedha e Marrëveshjes
            </h3>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {event.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : event.status === 'active' ? (
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${
                        event.status === 'completed' ? 'text-green-700' :
                        event.status === 'active' ? 'text-blue-700' : 
                        'text-muted-foreground'
                      }`}>
                        {event.title}
                      </p>
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('sq-AL')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Notes */}
          {deal.notes && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Shënime
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-muted-foreground leading-relaxed">
                  {deal.notes}
                </p>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Hapat e Ardhshëm
            </h3>
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Përfundimi i negocimeve të çmimit</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Përgatitja e dokumenteve të kontratës</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Planifikimi i takimit për nënshkrim</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Mbyll
            </Button>
            {onEdit && (
              <Button onClick={() => onEdit(deal)}>
                <Edit className="h-4 w-4 mr-2" />
                Ndrysho Marrëveshjen
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}