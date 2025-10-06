import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Calendar, 
  Phone, 
  Mail, 
  Heart, 
  Share2, 
  Camera,
  ChevronLeft,
  ChevronRight,
  Star,
  Building,
  TreePine,
  Utensils,
  GraduationCap,
  ShoppingCart,
  MapIcon
} from 'lucide-react';
import { Property } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

// Mock property data for the landing page
const mockProperty: Property = {
  id: '1',
  title: 'Vilë Moderne Familjare me Pishinë',
  address: 'Rruga "Pjetër Bogdani"',
  city: 'Tirana',
  state: 'Qarku i Tiranës',
  zip: '1001',
  price: 385000000, // 385,000 EUR in ALL
  bedrooms: 5,
  bathrooms: 4.5,
  square_feet: 4200,
  property_type: 'house',
  status: 'active',
  description: 'Përjetoni jetesën luksoze në këtë vilë moderne të dizajnuar me kujdes. Përmban një plan të hapur, kuzhinë gourmet me pajisje premium, dhomë kryesore me banjo spa, dhe oborr me pishinë dhe kuzhinë të jashtme. E vendosur në zonën prestizhoze të Tiranës me shkolla të mira dhe qasje të përshtatshme për shopping dhe restorantë.',
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
  ],
  listing_agent_id: '1',
  office_id: '1',
  listed_date: '2024-01-01',
  created_at: '2024-01-01',
  updated_at: '2024-01-01'
};

const mockAgent = {
  id: '1',
  name: 'Elisabeta Berisha',
  email: 'elisabeta.berisha@realestatealbania.com',
  phone: '+355 69 234 5678',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=150&h=150&fit=crop',
  title: 'Agjente e Lartë Pasurive të Paluajtshme',
  office: 'Real Estate Albania Tirana',
  rating: 4.9,
  reviews: 127,
  experience: '8 vjet'
};

export function PropertyLanding() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property. Please contact me to schedule a showing.',
    preferredContact: 'email'
  });
  const [showingForm, setShowingForm] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Kërkesa juaj u dërgua! Agjenti do të ju kontaktojë së shpejti.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: 'Jam i interesuar për këtë pronë. Ju lutem kontaktoni për të caktuar një vizitë.',
      preferredContact: 'email'
    });
  };

  const handleShowingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Kërkesa për vizitë u dërgua! Do të merrni një email konfirmimi së shpejti.');
    setShowingForm({
      date: '',
      time: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Linku i pronës u kopjua në clipboard!');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === mockProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? mockProperty.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    // Format as Albanian Lek
    return new Intl.NumberFormat('sq-AL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + ' L';
  };

  const features = [
    'Dysheme Parketi',
    'Kuzhinë me Granit',
    'Pajisje Inox',
    'Dollap të Mëdhenj',
    'Kondicionim Qendror',
    'Garazh për dy makina',
    'Pishinë',
    'Kuzhinë e Jashtme',
    'Sistem Sigurimi',
    'Shtëpi Inteligjente'
  ];

  const nearbyAmenities = [
    { icon: GraduationCap, name: 'Shkolla "Petro Nini Luarasi"', distance: '0.5 km' },
    { icon: ShoppingCart, name: 'Tirana East Gate', distance: '1.2 km' },
    { icon: Utensils, name: 'Blloku i Restorantëve', distance: '0.8 km' },
    { icon: TreePine, name: 'Parku i Madh', distance: '2.1 km' },
    { icon: Building, name: 'Qendra e Biznesit', distance: '3.4 km' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="font-semibold">Real Estate Albania</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'E ruajtur' : 'Ruaj'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Shpërndaj
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <ImageWithFallback
                  src={mockProperty.images[currentImageIndex]}
                  alt={`${mockProperty.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation buttons */}
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

                {/* Image counter */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  {currentImageIndex + 1} / {mockProperty.images.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {mockProperty.images.map((image, index) => (
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
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold">{mockProperty.title}</h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {formatPrice(mockProperty.price)}
                  </Badge>
                </div>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{mockProperty.address}, {mockProperty.city}, {mockProperty.state} {mockProperty.zip}</span>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold">{mockProperty.bedrooms}</p>
                  </div>
                  <div className="text-center">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="font-semibold">{mockProperty.bathrooms}</p>
                  </div>
                  <div className="text-center">
                    <Square className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Sq Ft</p>
                    <p className="font-semibold">{mockProperty.square_feet.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Garage</p>
                    <p className="font-semibold">2 Cars</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {mockProperty.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Property Features</h2>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Amenities */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Nearby Amenities</h2>
                <div className="space-y-3">
                  {nearbyAmenities.map((amenity, index) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <span>{amenity.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{amenity.distance}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Map placeholder */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Location</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Interactive map would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mockAgent.avatar} alt={mockAgent.name} />
                    <AvatarFallback>
                      {mockAgent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{mockAgent.name}</h3>
                    <p className="text-sm text-muted-foreground">{mockAgent.title}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{mockAgent.rating}</span>
                      <span className="text-sm text-muted-foreground">({mockAgent.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {mockAgent.phone}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Agent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Showing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule a Showing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShowingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="showing-date">Date</Label>
                      <Input
                        id="showing-date"
                        type="date"
                        value={showingForm.date}
                        onChange={(e) => setShowingForm(prev => ({...prev, date: e.target.value}))}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="showing-time">Time</Label>
                      <Input
                        id="showing-time"
                        type="time"
                        value={showingForm.time}
                        onChange={(e) => setShowingForm(prev => ({...prev, time: e.target.value}))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="showing-name">Full Name</Label>
                    <Input
                      id="showing-name"
                      value={showingForm.name}
                      onChange={(e) => setShowingForm(prev => ({...prev, name: e.target.value}))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="showing-email">Email</Label>
                    <Input
                      id="showing-email"
                      type="email"
                      value={showingForm.email}
                      onChange={(e) => setShowingForm(prev => ({...prev, email: e.target.value}))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="showing-phone">Phone</Label>
                    <Input
                      id="showing-phone"
                      type="tel"
                      value={showingForm.phone}
                      onChange={(e) => setShowingForm(prev => ({...prev, phone: e.target.value}))}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Request Showing
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({...prev, name: e.target.value}))}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({...prev, phone: e.target.value}))}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}