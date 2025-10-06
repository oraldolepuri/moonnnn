import { useState } from 'react';
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
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  User, 
  Building,
  Camera,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Phone,
  Mail
} from 'lucide-react';
import { Property } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { formatCurrency } from '../../utils/currency';

interface PropertyViewDialogProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (property: Property) => void;
}

export function PropertyViewDialog({ 
  property, 
  isOpen, 
  onClose, 
  onEdit 
}: PropertyViewDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'sold': return 'outline';
      case 'off_market': return 'destructive';
      default: return 'secondary';
    }
  };

  const nextImage = () => {
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const features = [
    'Dysheme Parketi',
    'Kuzhinë me Granit', 
    'Pajisje Inox',
    'Dollap të Mëdhenj',
    'Kondicionim Qendror',
    'Garazh',
    'Kopsht',
    'Ballkon'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{property.title}</span>
            <div className="flex items-center space-x-2">
              <Badge variant={getStatusColor(property.status)}>
                {property.status.replace('_', ' ').toUpperCase()}
              </Badge>
              {onEdit && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(property)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Ndrysho
                </Button>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Detajet e plota të pronës
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          {property.images && property.images.length > 0 && (
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <ImageWithFallback
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {property.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Çmimi</h3>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(property.price)}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Lokacioni</h3>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p>{property.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {property.city}, {property.state} {property.zip}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Tipi i Pronës</h3>
                <p className="capitalize">{property.property_type.replace('_', ' ')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Karakteristikat</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>{property.bedrooms} dhoma gjumi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span>{property.bathrooms} banjo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="h-4 w-4 text-muted-foreground" />
                    <span>{property.square_feet.toLocaleString()} m²</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>Shtëpi</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data e Listimit</h3>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(property.listed_date).toLocaleDateString('sq-AL')}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          {property.description && (
            <div>
              <h3 className="font-semibold mb-2">Përshkrimi</h3>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>
          )}

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-3">Karakteristikat e Pronës</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Contact Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Kontakti i Agjentit</h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Elizabeta Berisha</p>
                <p className="text-sm text-muted-foreground">Agjente e Lartë Pasurive</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  +355 69 234 5678
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Mbyll
            </Button>
            {onEdit && (
              <Button onClick={() => onEdit(property)}>
                <Edit className="h-4 w-4 mr-2" />
                Ndrysho Pronën
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}