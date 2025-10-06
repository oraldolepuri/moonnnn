import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UserProfile } from '../profile/UserProfile';
import { AccountSettings } from './AccountSettings';
import { AppPreferences } from './AppPreferences';
import { SystemSettings } from './SystemSettings';
import { User, Settings2, Shield, Palette, Database } from 'lucide-react';
import { User as UserType } from '../../types';
import { toast } from 'sonner@2.0.3';

interface SettingsProps {
  user: UserType;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function Settings({ user, isDarkMode, onThemeToggle }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');

  const handleUserUpdate = (updates: Partial<UserType>) => {
    // In a real app, this would make an API call to update the user
    console.log('Updating user:', updates);
    toast.success('Profile updated successfully');
  };

  const handlePreferencesUpdate = (preferences: any) => {
    // In a real app, this would save preferences to the backend
    console.log('Updating preferences:', preferences);
  };

  const getAvailableTabs = () => {
    const baseTabs = [
      {
        value: 'profile',
        label: 'Profile',
        icon: User,
        description: 'Manage your personal information and professional details'
      },
      {
        value: 'account',
        label: 'Account',
        icon: Shield,
        description: 'Security settings, password, and authentication'
      },
      {
        value: 'preferences',
        label: 'Preferences',
        icon: Palette,
        description: 'Application preferences and display settings'
      }
    ];

    // Only super admins can access system settings
    if (user.role === 'super_admin') {
      baseTabs.push({
        value: 'system',
        label: 'System',
        icon: Database,
        description: 'System configuration and administration'
      });
    }

    return baseTabs;
  };

  const availableTabs = getAvailableTabs();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1>Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings, preferences, and system configuration.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
          {availableTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Descriptions */}
        <div className="text-center">
          {availableTabs.map((tab) => (
            activeTab === tab.value && (
              <p key={tab.value} className="text-sm text-muted-foreground">
                {tab.description}
              </p>
            )
          ))}
        </div>

        <TabsContent value="profile" className="space-y-6">
          <UserProfile user={user} onUpdate={handleUserUpdate} />
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <AccountSettings user={user} onUpdate={handleUserUpdate} />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <AppPreferences
            user={user}
            onUpdate={handlePreferencesUpdate}
            isDarkMode={isDarkMode}
            onThemeToggle={onThemeToggle}
          />
        </TabsContent>

        {user.role === 'super_admin' && (
          <TabsContent value="system" className="space-y-6">
            <SystemSettings user={user} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}