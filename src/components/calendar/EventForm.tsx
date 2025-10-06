import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Calendar, Clock, MapPin, Users, Phone, Video, FileText, Trash2, Plus, X } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'showing' | 'meeting' | 'closing' | 'call' | 'appointment' | 'other';
  date: string;
  time: string;
  duration: number;
  location?: string;
  attendees: string[];
  description?: string;
  client_id?: string;
  property_id?: string;
  deal_id?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  created_by: string;
}

interface EventFormProps {
  event?: CalendarEvent | null;
  onSave: (event: Partial<CalendarEvent>) => void;
  onDelete?: () => void;
}

export function EventForm({ event, onSave, onDelete }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    type: event?.type || 'appointment' as const,
    date: event?.date || new Date().toISOString().split('T')[0],
    time: event?.time || '09:00',
    duration: event?.duration || 60,
    location: event?.location || '',
    attendees: event?.attendees || [],
    description: event?.description || '',
    client_id: event?.client_id || '',
    property_id: event?.property_id || '',
    deal_id: event?.deal_id || '',
    status: event?.status || 'scheduled' as const,
    // Additional form fields
    newAttendee: '',
    allDay: false,
    recurring: false,
    recurringType: 'weekly' as const,
    recurringEnd: '',
    reminders: [15], // minutes before event
    priority: 'medium' as const,
    isVirtual: false,
    meetingLink: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }
    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }
    if (!formData.time && !formData.allDay) {
      newErrors.time = 'Event time is required';
    }
    if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const eventData: Partial<CalendarEvent> = {
      title: formData.title,
      type: formData.type,
      date: formData.date,
      time: formData.allDay ? '00:00' : formData.time,
      duration: formData.allDay ? 1440 : formData.duration, // 1440 minutes = 24 hours
      location: formData.location || undefined,
      attendees: formData.attendees,
      description: formData.description || undefined,
      client_id: formData.client_id || undefined,
      property_id: formData.property_id || undefined,
      deal_id: formData.deal_id || undefined,
      status: formData.status,
    };

    onSave(eventData);
  };

  const addAttendee = () => {
    if (formData.newAttendee.trim() && !formData.attendees.includes(formData.newAttendee.trim())) {
      setFormData(prev => ({
        ...prev,
        attendees: [...prev.attendees, prev.newAttendee.trim()],
        newAttendee: ''
      }));
    }
  };

  const removeAttendee = (email: string) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.filter(attendee => attendee !== email)
    }));
  };

  const eventTypes = [
    { value: 'showing', label: 'Property Showing', icon: MapPin, color: 'bg-blue-100 text-blue-800' },
    { value: 'meeting', label: 'Client Meeting', icon: Users, color: 'bg-green-100 text-green-800' },
    { value: 'closing', label: 'Closing', icon: FileText, color: 'bg-purple-100 text-purple-800' },
    { value: 'call', label: 'Phone Call', icon: Phone, color: 'bg-orange-100 text-orange-800' },
    { value: 'appointment', label: 'Appointment', icon: Calendar, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'other', label: 'Other', icon: Clock, color: 'bg-gray-100 text-gray-800' }
  ];

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
    { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  const reminderOptions = [
    { value: 0, label: 'At event time' },
    { value: 5, label: '5 minutes before' },
    { value: 15, label: '15 minutes before' },
    { value: 30, label: '30 minutes before' },
    { value: 60, label: '1 hour before' },
    { value: 120, label: '2 hours before' },
    { value: 1440, label: '1 day before' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Property showing with the Johnsons"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Event Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
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
                {statusOptions.map((status) => (
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

      {/* Date & Time */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Date & Time
        </h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="allDay"
            checked={formData.allDay}
            onCheckedChange={(checked) => handleInputChange('allDay', checked)}
          />
          <Label htmlFor="allDay">All day event</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          {!formData.allDay && (
            <>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className={errors.time ? 'border-red-500' : ''}
                />
                {errors.time && (
                  <p className="text-sm text-red-500">{errors.time}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                  placeholder="60"
                  min="15"
                  max="480"
                  className={errors.duration ? 'border-red-500' : ''}
                />
                {errors.duration && (
                  <p className="text-sm text-red-500">{errors.duration}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Location & Virtual Meeting */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Location
        </h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isVirtual"
            checked={formData.isVirtual}
            onCheckedChange={(checked) => handleInputChange('isVirtual', checked)}
          />
          <Label htmlFor="isVirtual">Virtual meeting</Label>
        </div>

        {formData.isVirtual ? (
          <div className="space-y-2">
            <Label htmlFor="meetingLink">Meeting Link</Label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="meetingLink"
                value={formData.meetingLink}
                onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                placeholder="https://zoom.us/j/123456789"
                className="pl-10"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="123 Main Street, City, State"
                className="pl-10"
              />
            </div>
          </div>
        )}
      </div>

      {/* Attendees */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Users className="h-4 w-4" />
          Attendees
        </h3>
        
        <div className="flex gap-2">
          <Input
            value={formData.newAttendee}
            onChange={(e) => handleInputChange('newAttendee', e.target.value)}
            placeholder="Enter email address"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAttendee())}
          />
          <Button type="button" onClick={addAttendee}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {formData.attendees.length > 0 && (
          <div className="space-y-2">
            <Label>Invited Attendees</Label>
            <div className="flex flex-wrap gap-2">
              {formData.attendees.map((email) => (
                <Badge key={email} variant="secondary" className="flex items-center gap-1">
                  {email}
                  <button
                    type="button"
                    onClick={() => removeAttendee(email)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Details */}
      <div className="space-y-4">
        <h3 className="font-medium">Additional Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => handleInputChange('priority', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center gap-2">
                      <Badge className={priority.color}>
                        {priority.label}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reminder</Label>
            <Select
              value={formData.reminders[0]?.toString() || '15'}
              onValueChange={(value) => handleInputChange('reminders', [parseInt(value)])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reminderOptions.map((reminder) => (
                  <SelectItem key={reminder.value} value={reminder.value.toString()}>
                    {reminder.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Additional details about the event..."
            rows={3}
          />
        </div>
      </div>

      <Separator />

      {/* Form Actions */}
      <div className="flex items-center justify-between">
        <div>
          {event && onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Event
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={onDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Event
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </div>
    </form>
  );
}