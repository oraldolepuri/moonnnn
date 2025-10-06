import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { User, Settings, LogOut, Shield, Building, Phone, Mail, Calendar, BarChart3, Edit } from 'lucide-react';
import { UserProfile } from '../profile/UserProfile';
import { User as UserType } from '../../types';

interface ProfileDropdownProps {
  user: UserType;
  onLogout: () => void;
  onSettingsClick: () => void;
}

export function ProfileDropdown({ user, onLogout, onSettingsClick }: ProfileDropdownProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'office_admin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'agent':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatRole = (role: string) => {
    return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleProfileUpdate = (updates: Partial<UserType>) => {
    // In a real app, this would make an API call to update the user
    console.log('Updating user profile:', updates);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80 p-4" align="end" forceMount>
          {/* Profile Header */}
          <div className="space-y-3">
            <DropdownMenuLabel className="p-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground leading-none">
                    {user.email}
                  </p>
                  <Badge className={`${getRoleColor(user.role)} text-xs`}>
                    {formatRole(user.role)}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 p-2 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">
                  {user.totalSales || 0}
                </div>
                <div className="text-xs text-muted-foreground">Total Sales</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">
                  {user.activeDeal || 0}
                </div>
                <div className="text-xs text-muted-foreground">Active Deals</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              {user.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.office && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-3 w-3" />
                  <span>{user.office}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Member since {new Date(user.created_at).getFullYear()}</span>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="my-3" />

          {/* Quick Actions */}
          <div className="space-y-1">
            <DropdownMenuItem 
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setIsProfileOpen(true)}
            >
              <User className="h-4 w-4" />
              <span>View Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem 
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setIsProfileOpen(true)}
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem 
              className="cursor-pointer flex items-center gap-2"
              onClick={onSettingsClick}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            {/* Role-specific options */}
            {user.role === 'super_admin' && (
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </DropdownMenuItem>
            )}

            {(user.role === 'super_admin' || user.role === 'office_admin') && (
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </DropdownMenuItem>
            )}
          </div>

          <DropdownMenuSeparator className="my-3" />

          {/* Logout */}
          <DropdownMenuItem 
            className="cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Profile</DialogTitle>
          </DialogHeader>
          <UserProfile user={user} onUpdate={handleProfileUpdate} />
        </DialogContent>
      </Dialog>
    </>
  );
}