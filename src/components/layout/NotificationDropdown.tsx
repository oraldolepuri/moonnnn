import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Bell, Check, Clock, Home, Users, DollarSign, Calendar, Mail, Phone, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { User } from '../../types';
import { toast } from 'sonner@2.0.3';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'deal' | 'property' | 'client' | 'calendar' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
  relatedId?: string;
}

interface NotificationDropdownProps {
  user: User;
  notificationCount: number;
}

export function NotificationDropdown({ user, notificationCount }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      category: 'deal',
      title: 'Deal Closed Successfully',
      message: 'Congratulations! The deal for 123 Main St has been closed successfully.',
      timestamp: '2024-01-16T10:30:00Z',
      read: false,
      action: {
        label: 'View Deal',
        url: '/deals/1'
      },
      relatedId: 'deal-1'
    },
    {
      id: '2',
      type: 'info',
      category: 'calendar',
      title: 'Upcoming Property Showing',
      message: 'You have a property showing scheduled for 456 Oak Ave in 2 hours.',
      timestamp: '2024-01-16T09:15:00Z',
      read: false,
      action: {
        label: 'View Calendar',
        url: '/calendar'
      }
    },
    {
      id: '3',
      type: 'warning',
      category: 'client',
      title: 'Client Follow-up Due',
      message: 'Follow-up with Sarah Johnson is overdue by 2 days.',
      timestamp: '2024-01-16T08:00:00Z',
      read: false,
      action: {
        label: 'Contact Client',
        url: '/clients/3'
      },
      relatedId: 'client-3'
    },
    {
      id: '4',
      type: 'info',
      category: 'property',
      title: 'New Property Inquiry',
      message: 'Someone inquired about the property at 789 Pine Street.',
      timestamp: '2024-01-15T16:45:00Z',
      read: true,
      action: {
        label: 'View Property',
        url: '/properties/4'
      }
    },
    {
      id: '5',
      type: 'success',
      category: 'client',
      title: 'New Client Added',
      message: 'Mike Chen has been successfully added as a new client.',
      timestamp: '2024-01-15T14:20:00Z',
      read: true,
      relatedId: 'client-5'
    },
    {
      id: '6',
      type: 'error',
      category: 'system',
      title: 'Document Upload Failed',
      message: 'Failed to upload contract documents for property listing.',
      timestamp: '2024-01-15T11:30:00Z',
      read: true
    },
    {
      id: '7',
      type: 'info',
      category: 'message',
      title: 'New Message Received',
      message: 'You have received a new message from John Smith regarding the downtown condo.',
      timestamp: '2024-01-15T09:15:00Z',
      read: true,
      action: {
        label: 'Read Message',
        url: '/messages/7'
      }
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (category: string, type: string) => {
    if (type === 'error') return AlertCircle;
    if (type === 'warning') return AlertCircle;
    if (type === 'success') return CheckCircle;
    
    switch (category) {
      case 'deal':
        return DollarSign;
      case 'property':
        return Home;
      case 'client':
        return Users;
      case 'calendar':
        return Calendar;
      case 'message':
        return Mail;
      case 'system':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'error':
        return 'bg-red-100';
      default:
        return 'bg-blue-100';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    
    return date.toLocaleDateString();
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
    toast.success('Notification deleted');
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.action) {
      // In a real app, this would navigate to the specified URL
      console.log('Navigate to:', notification.action.url);
      toast.info(`Would navigate to: ${notification.action.label}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-96 p-0" align="end" forceMount>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <DropdownMenuLabel className="p-0 font-semibold">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </DropdownMenuLabel>
          
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-0">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.category, notification.type);
                
                return (
                  <div
                    key={notification.id}
                    className={`relative p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getNotificationBgColor(notification.type)}`}>
                        <Icon className={`h-4 w-4 ${getNotificationColor(notification.type)}`} />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          
                          {notification.action && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotificationClick(notification);
                              }}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />

        {/* Footer */}
        <div className="p-2">
          <DropdownMenuItem className="w-full justify-center cursor-pointer">
            <span className="text-sm">View All Notifications</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}