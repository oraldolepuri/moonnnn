import { Clock, User, Home, FileText, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Activity {
  id: string;
  type: 'deal' | 'property' | 'client' | 'commission';
  title: string;
  description: string;
  time: string;
  user?: string;
  status?: string;
  amount?: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'deal',
    title: 'New deal created',
    description: 'Luxury Manhattan Penthouse - Emily Rodriguez',
    time: '2 minutes ago',
    user: 'Mike Davis',
    status: 'showing'
  },
  {
    id: '2',
    type: 'property',
    title: 'Property status updated',
    description: 'Brooklyn Townhouse changed to Pending',
    time: '15 minutes ago',
    user: 'Mike Davis',
    status: 'pending'
  },
  {
    id: '3',
    type: 'commission',
    title: 'Commission earned',
    description: 'Deal closed successfully',
    time: '1 hour ago',
    user: 'Sarah Johnson',
    amount: '$28,750'
  },
  {
    id: '4',
    type: 'client',
    title: 'New client added',
    description: 'Robert Chen - Seller inquiry',
    time: '3 hours ago',
    user: 'Mike Davis',
    status: 'active'
  }
];

export function RecentActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'deal':
        return <FileText className="h-4 w-4" />;
      case 'property':
        return <Home className="h-4 w-4" />;
      case 'client':
        return <User className="h-4 w-4" />;
      case 'commission':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'showing':
        return 'secondary';
      case 'pending':
        return 'default';
      case 'active':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm">{activity.title}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <div className="flex items-center space-x-2 mt-1">
                {activity.user && (
                  <div className="flex items-center space-x-1">
                    <Avatar className="h-4 w-4">
                      <AvatarFallback className="text-xs">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                  </div>
                )}
                {activity.status && (
                  <Badge variant={getStatusColor(activity.status)} className="text-xs">
                    {activity.status}
                  </Badge>
                )}
                {activity.amount && (
                  <Badge variant="outline" className="text-xs text-green-600">
                    {activity.amount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}