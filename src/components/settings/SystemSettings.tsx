import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Settings, Database, Shield, Users, Building, MapPin, BarChart, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { User } from '../../types';
import { toast } from 'sonner@2.0.3';

interface SystemSettingsProps {
  user: User;
}

interface SystemConfig {
  maintenanceMode: boolean;
  userRegistration: boolean;
  autoBackup: boolean;
  dataRetention: number;
  maxFileSize: number;
  sessionTimeout: number;
  loginAttempts: number;
  apiRateLimit: number;
}

export function SystemSettings({ user }: SystemSettingsProps) {
  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    maintenanceMode: false,
    userRegistration: true,
    autoBackup: true,
    dataRetention: 365,
    maxFileSize: 50,
    sessionTimeout: 240,
    loginAttempts: 5,
    apiRateLimit: 1000,
  });

  const [backupStatus] = useState({
    lastBackup: '2024-01-15 02:00:00',
    nextBackup: '2024-01-16 02:00:00',
    backupSize: '2.4 GB',
    status: 'completed'
  });

  const [systemStats] = useState({
    totalUsers: 156,
    activeUsers: 89,
    totalProperties: 1247,
    totalDeals: 456,
    storageUsed: 67,
    serverUptime: '99.9%'
  });

  const handleConfigChange = (key: keyof SystemConfig, value: any) => {
    setSystemConfig(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('System configuration updated');
  };

  const handleBackupNow = () => {
    toast.success('Backup initiated. This may take a few minutes.');
  };

  const handleExportData = () => {
    toast.success('Data export started. You will receive an email when complete.');
  };

  const handleImportData = () => {
    toast.success('Data import initiated. Please monitor the progress.');
  };

  const handleClearCache = () => {
    toast.success('System cache cleared successfully');
  };

  const handleSystemMaintenance = () => {
    toast.warning('System maintenance mode activated. Users will see a maintenance message.');
  };

  // Only super admins can access system settings
  if (user.role !== 'super_admin') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-medium">Access Restricted</h3>
              <p className="text-sm text-muted-foreground">
                System settings are only available to Super Administrators.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{systemStats.totalUsers}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{systemStats.totalProperties}</div>
              <div className="text-sm text-muted-foreground">Properties</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{systemStats.totalDeals}</div>
              <div className="text-sm text-muted-foreground">Active Deals</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{systemStats.storageUsed}%</div>
              <div className="text-sm text-muted-foreground">Storage Used</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">{systemStats.serverUptime}</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage Usage</span>
              <span>{systemStats.storageUsed}% of 100 GB</span>
            </div>
            <Progress value={systemStats.storageUsed} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable user access
                  </p>
                </div>
                <Switch
                  checked={systemConfig.maintenanceMode}
                  onCheckedChange={(checked) => {
                    handleConfigChange('maintenanceMode', checked);
                    if (checked) handleSystemMaintenance();
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>User Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow new user registration
                  </p>
                </div>
                <Switch
                  checked={systemConfig.userRegistration}
                  onCheckedChange={(checked) => handleConfigChange('userRegistration', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable daily automatic backups
                  </p>
                </div>
                <Switch
                  checked={systemConfig.autoBackup}
                  onCheckedChange={(checked) => handleConfigChange('autoBackup', checked)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retention">Data Retention (days)</Label>
                <Input
                  id="retention"
                  type="number"
                  value={systemConfig.dataRetention}
                  onChange={(e) => handleConfigChange('dataRetention', parseInt(e.target.value))}
                  min="30"
                  max="2555"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="filesize">Max File Size (MB)</Label>
                <Input
                  id="filesize"
                  type="number"
                  value={systemConfig.maxFileSize}
                  onChange={(e) => handleConfigChange('maxFileSize', parseInt(e.target.value))}
                  min="1"
                  max="500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session">Session Timeout (minutes)</Label>
                <Input
                  id="session"
                  type="number"
                  value={systemConfig.sessionTimeout}
                  onChange={(e) => handleConfigChange('sessionTimeout', parseInt(e.target.value))}
                  min="30"
                  max="1440"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="login-attempts">Max Login Attempts</Label>
              <Input
                id="login-attempts"
                type="number"
                value={systemConfig.loginAttempts}
                onChange={(e) => handleConfigChange('loginAttempts', parseInt(e.target.value))}
                min="3"
                max="10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-limit">API Rate Limit (requests/hour)</Label>
              <Input
                id="api-limit"
                type="number"
                value={systemConfig.apiRateLimit}
                onChange={(e) => handleConfigChange('apiRateLimit', parseInt(e.target.value))}
                min="100"
                max="10000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup & Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup & Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Backup Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Backup:</span>
                  <Badge variant="secondary">{backupStatus.lastBackup}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Next Backup:</span>
                  <span className="text-sm text-muted-foreground">{backupStatus.nextBackup}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Backup Size:</span>
                  <span className="text-sm text-muted-foreground">{backupStatus.backupSize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Status:</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {backupStatus.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Actions</h4>
              <div className="space-y-2">
                <Button onClick={handleBackupNow} className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Backup Now
                </Button>
                <Button onClick={handleExportData} className="w-full" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button onClick={handleImportData} className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
                <Button onClick={handleClearCache} className="w-full" variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                placeholder="smtp.example.com"
                defaultValue="smtp.gmail.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                placeholder="587"
                defaultValue="587"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-user">SMTP Username</Label>
              <Input
                id="smtp-user"
                placeholder="your-email@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtp-pass">SMTP Password</Label>
              <Input
                id="smtp-pass"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="from-email">From Email Address</Label>
            <Input
              id="from-email"
              placeholder="noreply@yourcompany.com"
              defaultValue="noreply@realestatecrm.com"
            />
          </div>
          
          <Button>Test Email Configuration</Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-destructive rounded-lg bg-destructive/5">
            <h4 className="font-medium mb-2">Reset System</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This will reset all system settings to default values. This action cannot be undone.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  Reset System Settings
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will reset all system settings to their default values.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Reset Settings
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}