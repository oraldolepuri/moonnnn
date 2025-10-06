import { MapPin, Bed, Bath, Square, Camera, Eye, Edit, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Property } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PropertyCardProps {
  property: Property;
  onView: (property: Property) => void;
  onEdit: (property: Property) => void;
  showAgentInfo?: boolean;
}

export function PropertyCard({ 
  property, 
  onView, 
  onEdit, 
  showAgentInfo = false 
}: PropertyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'sold':
        return 'outline';
      case 'off_market':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sq-AL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + ' L';
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <ImageWithFallback
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          
          {/* Status badge */}
          <Badge 
            variant={getStatusColor(property.status)} 
            className="absolute top-3 left-3"
          >
            {property.status.replace('_', ' ').toUpperCase()}
          </Badge>

          {/* Actions overlay */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(property)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(property)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Property
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Image count */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
              <Camera className="inline h-3 w-3 mr-1" />
              {property.images.length}
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-primary">
              {formatPrice(property.price)}
            </span>
            <span className="text-sm text-muted-foreground">
              {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-medium line-clamp-1">{property.title}</h3>

          {/* Location */}
          <div className="flex items-start space-x-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">
              {property.address}, {property.city}, {property.state} {property.zip}
            </span>
          </div>

          {/* Property details */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4" />
              <span>{property.square_feet.toLocaleString()} sq ft</span>
            </div>
          </div>

          {/* Agent info (if showAgentInfo is true) */}
          {showAgentInfo && (
            <div className="text-xs text-muted-foreground">
              Agent: Mike Davis • Listed {new Date(property.listed_date).toLocaleDateString()}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onView(property)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => onEdit(property)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}