import { 
  BarChart3, 
  Building2, 
  Users, 
  Home, 
  FileText, 
  Settings,
  Calendar,
  Search,
  UserCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { User } from '../../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  roles: Array<'super_admin' | 'office_admin' | 'agent'>;
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    roles: ['super_admin', 'office_admin', 'agent']
  },
  {
    id: 'properties',
    label: 'Properties',
    icon: Home,
    roles: ['super_admin', 'office_admin', 'agent']
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: Users,
    roles: ['super_admin', 'office_admin', 'agent']
  },
  {
    id: 'deals',
    label: 'Deals',
    icon: FileText,
    badge: '12',
    roles: ['super_admin', 'office_admin', 'agent']
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
    roles: ['office_admin', 'agent']
  },
  {
    id: 'offices',
    label: 'Offices',
    icon: Building2,
    roles: ['super_admin']
  },
  {
    id: 'agents',
    label: 'Agents',
    icon: UserCheck,
    roles: ['super_admin', 'office_admin']
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: TrendingUp,
    roles: ['super_admin', 'office_admin']
  },
  {
    id: 'search',
    label: 'Global Search',
    icon: Search,
    roles: ['super_admin']
  },
  {
    id: 'territories',
    label: 'Territories',
    icon: MapPin,
    roles: ['super_admin', 'office_admin']
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    roles: ['super_admin', 'office_admin', 'agent']
  }
];

export function Sidebar({ user, activeTab, onTabChange }: SidebarProps) {
  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="w-64 border-r bg-muted/30 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h2 className="tracking-tight">RealtyPro CRM</h2>
            <p className="text-muted-foreground text-sm">
              {user.role === 'super_admin' && 'Super Admin'}
              {user.role === 'office_admin' && 'Office Admin'}
              {user.role === 'agent' && 'Agent Portal'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start h-10 px-3",
              activeTab === item.id && "bg-secondary"
            )}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="mr-3 h-4 w-4" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* User info footer */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}