import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Phone, Video, FileText } from 'lucide-react';
import { EventForm } from './EventForm';
import { User } from '../../types';
import { toast } from 'sonner@2.0.3';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'showing' | 'meeting' | 'closing' | 'call' | 'appointment' | 'other';
  date: string;
  time: string;
  duration: number; // in minutes
  location?: string;
  attendees: string[];
  description?: string;
  client_id?: string;
  property_id?: string;
  deal_id?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  created_by: string;
}

interface CalendarViewProps {
  user: User;
}

export function CalendarView({ user }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'week' | 'day'>('month');
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Property Showing - 123 Main St',
      type: 'showing',
      date: '2024-01-16',
      time: '10:00',
      duration: 60,
      location: '123 Main Street, New York, NY',
      attendees: ['john.doe@email.com', 'jane.smith@email.com'],
      description: 'Showing luxury condo to the Johnsons',
      client_id: '1',
      property_id: '1',
      status: 'confirmed',
      created_by: user.id
    },
    {
      id: '2',
      title: 'Client Meeting - Budget Discussion',
      type: 'meeting',
      date: '2024-01-16',
      time: '14:00',
      duration: 90,
      location: 'Office Conference Room',
      attendees: ['client@email.com'],
      description: 'Discuss budget and property preferences',
      client_id: '2',
      status: 'scheduled',
      created_by: user.id
    },
    {
      id: '3',
      title: 'Closing - 456 Oak Ave',
      type: 'closing',
      date: '2024-01-17',
      time: '11:00',
      duration: 120,
      location: 'Title Company Office',
      attendees: ['buyer@email.com', 'seller@email.com', 'lawyer@email.com'],
      description: 'Final closing for Oak Avenue property',
      property_id: '2',
      deal_id: '1',
      status: 'confirmed',
      created_by: user.id
    },
    {
      id: '4',
      title: 'Follow-up Call - Mike Chen',
      type: 'call',
      date: '2024-01-18',
      time: '09:00',
      duration: 30,
      attendees: ['mike.chen@email.com'],
      description: 'Follow up on property search',
      client_id: '3',
      status: 'scheduled',
      created_by: user.id
    }
  ]);

  const handleEventSave = (eventData: Partial<CalendarEvent>) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...eventData, id: selectedEvent.id }
          : event
      ));
      toast.success('Event updated successfully');
    } else {
      // Create new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventData.title || '',
        type: eventData.type || 'appointment',
        date: eventData.date || new Date().toISOString().split('T')[0],
        time: eventData.time || '09:00',
        duration: eventData.duration || 60,
        location: eventData.location,
        attendees: eventData.attendees || [],
        description: eventData.description,
        client_id: eventData.client_id,
        property_id: eventData.property_id,
        deal_id: eventData.deal_id,
        status: eventData.status || 'scheduled',
        created_by: user.id
      };
      
      setEvents(prev => [...prev, newEvent]);
      toast.success('Event created successfully');
    }
    
    setIsEventFormOpen(false);
    setSelectedEvent(null);
  };

  const handleEventEdit = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast.success('Event deleted successfully');
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'showing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'call':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'appointment':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'showing':
        return MapPin;
      case 'meeting':
        return Users;
      case 'closing':
        return FileText;
      case 'call':
        return Phone;
      case 'appointment':
        return Calendar;
      default:
        return Clock;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const getEventsForDateRange = (startDate: Date, endDate: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 h-24"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateString);
      const isToday = dateString === new Date().toISOString().split('T')[0];
      
      days.push(
        <div
          key={day}
          className={`p-2 h-24 border border-gray-100 ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
        >
          <div className={`text-sm ${isToday ? 'font-semibold text-blue-600' : ''}`}>
            {day}
          </div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map(event => {
              const EventIcon = getEventTypeIcon(event.type);
              return (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded cursor-pointer truncate ${getEventTypeColor(event.type)}`}
                  onClick={() => handleEventEdit(event)}
                  title={event.title}
                >
                  <div className="flex items-center gap-1">
                    <EventIcon className="h-3 w-3" />
                    <span className="truncate">{event.title}</span>
                  </div>
                </div>
              );
            })}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {/* Week day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 bg-muted font-medium text-center border-b">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map(day => {
          const dateString = day.toISOString().split('T')[0];
          const dayEvents = getEventsForDate(dateString);
          const isToday = dateString === new Date().toISOString().split('T')[0];
          
          return (
            <Card key={dateString} className={isToday ? 'border-blue-200 bg-blue-50' : ''}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm ${isToday ? 'text-blue-600' : ''}`}>
                  {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {dayEvents.map(event => {
                  const EventIcon = getEventTypeIcon(event.type);
                  return (
                    <div
                      key={event.id}
                      className={`p-2 rounded cursor-pointer ${getEventTypeColor(event.type)}`}
                      onClick={() => handleEventEdit(event)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <EventIcon className="h-3 w-3" />
                        <span className="text-xs font-medium">{formatTime(event.time)}</span>
                      </div>
                      <div className="text-xs">{event.title}</div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dateString = currentDate.toISOString().split('T')[0];
    const dayEvents = getEventsForDate(dateString).sort((a, b) => a.time.localeCompare(b.time));

    return (
      <Card>
        <CardHeader>
          <CardTitle>{formatDate(currentDate)}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dayEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No events scheduled for this day</p>
            </div>
          ) : (
            dayEvents.map(event => {
              const EventIcon = getEventTypeIcon(event.type);
              return (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-shadow ${getEventTypeColor(event.type)}`}
                  onClick={() => handleEventEdit(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <EventIcon className="h-4 w-4" />
                        <span className="font-medium">{event.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(event.time)} ({event.duration} min)</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.attendees.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            <span>{event.attendees.length} attendee(s)</span>
                          </div>
                        )}
                      </div>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <Badge className={
                      event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      event.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {event.status}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1>Calendar</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select value={viewType} onValueChange={(value) => setViewType(value as any)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isEventFormOpen} onOpenChange={setIsEventFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedEvent(null)}>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedEvent ? 'Edit Event' : 'Create New Event'}
                </DialogTitle>
              </DialogHeader>
              <EventForm
                event={selectedEvent}
                onSave={handleEventSave}
                onDelete={selectedEvent ? () => handleEventDelete(selectedEvent.id) : undefined}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Calendar Views */}
      <div>
        {viewType === 'month' && renderMonthView()}
        {viewType === 'week' && renderWeekView()}
        {viewType === 'day' && renderDayView()}
      </div>

      {/* Upcoming Events Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events
              .filter(event => new Date(event.date) >= new Date() && event.status !== 'cancelled')
              .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
              .slice(0, 5)
              .map(event => {
                const EventIcon = getEventTypeIcon(event.type);
                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                    onClick={() => handleEventEdit(event)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${getEventTypeColor(event.type)}`}>
                        <EventIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at {formatTime(event.time)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {event.type}
                    </Badge>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}