import { Search, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ProfileDropdown } from './ProfileDropdown';
import { NotificationDropdown } from './NotificationDropdown';
import { User as UserType } from '../../types';

interface TopNavigationProps {
  user: UserType;
  onThemeToggle: () => void;
  isDark: boolean;
  onSearch: (query: string) => void;
  notificationCount?: number;
  onLogout?: () => void;
  onSettingsClick?: () => void;
}

export function TopNavigation({ 
  user, 
  onThemeToggle, 
  isDark, 
  onSearch, 
  notificationCount = 3,
  onLogout = () => {},
  onSettingsClick = () => {}
}: TopNavigationProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search properties, clients, deals..."
              className="pl-10 bg-muted/50"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={onThemeToggle}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications */}
          <NotificationDropdown 
            user={user} 
            notificationCount={notificationCount} 
          />

          {/* User Profile */}
          <ProfileDropdown 
            user={user} 
            onLogout={onLogout}
            onSettingsClick={onSettingsClick}
          />
        </div>
      </div>
    </header>
  );
}