import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Slider } from '../ui/slider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Palette, Bell, Layout, Globe, Zap, Monitor } from 'lucide-react';
import { User } from '../../types';
import { toast } from 'sonner@2.0.3';

interface AppPreferencesProps {
  user: User;
  onUpdate: (preferences: any) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

interface Preferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  notificationSound: boolean;
  desktopNotifications: boolean;
  emailDigest: string;
  autoSave: boolean;
  compactView: boolean;
  animationsEnabled: boolean;
  dataRefreshInterval: number;
  defaultView: string;
  itemsPerPage: number;
}

export function AppPreferences({ user, onUpdate, isDarkMode, onThemeToggle }: AppPreferencesProps) {
  const [preferences, setPreferences] = useState<Preferences>({
    theme: isDarkMode ? 'dark' : 'light',
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    notificationSound: true,
    desktopNotifications: true,
    emailDigest: 'daily',
    autoSave: true,
    compactView: false,
    animationsEnabled: true,
    dataRefreshInterval: 30,
    defaultView: 'dashboard',
    itemsPerPage: 20,
  });

  const handlePreferenceChange = (key: keyof Preferences, value: any) => {
    const newPreferences = {
      ...preferences,
      [key]: value
    };
    setPreferences(newPreferences);
    onUpdate(newPreferences);
    
    if (key === 'theme') {
      onThemeToggle();
    }
    
    toast.success('Preferences updated');
  };

  const resetToDefaults = () => {
    const defaultPreferences: Preferences = {
      theme: 'light',
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
      notificationSound: true,
      desktopNotifications: true,
      emailDigest: 'daily',
      autoSave: true,
      compactView: false,
      animationsEnabled: true,
      dataRefreshInterval: 30,
      defaultView: 'dashboard',
      itemsPerPage: 20,
    };
    
    setPreferences(defaultPreferences);
    onUpdate(defaultPreferences);
    toast.success('Preferences reset to defaults');
  };

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'pt', label: 'Português' },
    { value: 'it', label: 'Italiano' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' },
    { value: 'JPY', label: 'Japanese Yen (¥)' }
  ];

  return (
    <div className="space-y-6">
      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Theme</Label>
            <RadioGroup
              value={preferences.theme}
              onValueChange={(value) => handlePreferenceChange('theme', value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system">System</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Compact View</Label>
              <p className="text-sm text-muted-foreground">
                Show more content in less space
              </p>
            </div>
            <Switch
              checked={preferences.compactView}
              onCheckedChange={(checked) => handlePreferenceChange('compactView', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Animations</Label>
              <p className="text-sm text-muted-foreground">
                Enable smooth transitions and animations
              </p>
            </div>
            <Switch
              checked={preferences.animationsEnabled}
              onCheckedChange={(checked) => handlePreferenceChange('animationsEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Localization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Localization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => handlePreferenceChange('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) => handlePreferenceChange('dateFormat', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) => handlePreferenceChange('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show notifications on your desktop
              </p>
            </div>
            <Switch
              checked={preferences.desktopNotifications}
              onCheckedChange={(checked) => handlePreferenceChange('desktopNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Notification Sound</Label>
              <p className="text-sm text-muted-foreground">
                Play sound for notifications
              </p>
            </div>
            <Switch
              checked={preferences.notificationSound}
              onCheckedChange={(checked) => handlePreferenceChange('notificationSound', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Email Digest</Label>
            <Select
              value={preferences.emailDigest}
              onValueChange={(value) => handlePreferenceChange('emailDigest', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Performance & Behavior */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Performance & Behavior
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-save</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save changes as you work
              </p>
            </div>
            <Switch
              checked={preferences.autoSave}
              onCheckedChange={(checked) => handlePreferenceChange('autoSave', checked)}
            />
          </div>
          
          <div className="space-y-3">
            <Label>Data Refresh Interval (seconds)</Label>
            <div className="px-3">
              <Slider
                value={[preferences.dataRefreshInterval]}
                onValueChange={([value]) => handlePreferenceChange('dataRefreshInterval', value)}
                max={300}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>10s</span>
                <span>{preferences.dataRefreshInterval}s</span>
                <span>5m</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Default View</Label>
              <Select
                value={preferences.defaultView}
                onValueChange={(value) => handlePreferenceChange('defaultView', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="properties">Properties</SelectItem>
                  <SelectItem value="clients">Clients</SelectItem>
                  <SelectItem value="deals">Deals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Items per Page</Label>
              <Select
                value={preferences.itemsPerPage.toString()}
                onValueChange={(value) => handlePreferenceChange('itemsPerPage', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Reset Preferences</h4>
              <p className="text-sm text-muted-foreground">
                Restore all preferences to their default values
              </p>
            </div>
            <Button variant="outline" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}