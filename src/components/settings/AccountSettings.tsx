import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Shield, Key, Smartphone, Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { User } from '../../types';
import { toast } from 'sonner@2.0.3';

interface AccountSettingsProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  loginAlerts: boolean;
  dataBackup: boolean;
}

export function AccountSettings({ user, onUpdate }: AccountSettingsProps) {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: user.twoFactorEnabled || false,
    emailNotifications: user.emailNotifications !== false,
    smsNotifications: user.smsNotifications || false,
    loginAlerts: user.loginAlerts !== false,
    dataBackup: user.dataBackup !== false,
  });

  const [sessions] = useState([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: '2024-01-15 14:30',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, NY',
      lastActive: '2024-01-15 09:15',
      current: false
    },
    {
      id: '3',
      device: 'Chrome on MacBook',
      location: 'Boston, MA',
      lastActive: '2024-01-14 16:45',
      current: false
    }
  ]);

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    // Simulate password change
    toast.success('Password updated successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSecurityToggle = (setting: keyof SecuritySettings) => {
    const newSettings = {
      ...securitySettings,
      [setting]: !securitySettings[setting]
    };
    setSecuritySettings(newSettings);
    onUpdate(newSettings);
    
    const settingLabels = {
      twoFactorEnabled: 'Two-factor authentication',
      emailNotifications: 'Email notifications',
      smsNotifications: 'SMS notifications',
      loginAlerts: 'Login alerts',
      dataBackup: 'Data backup'
    };
    
    toast.success(`${settingLabels[setting]} ${newSettings[setting] ? 'enabled' : 'disabled'}`);
  };

  const handleTerminateSession = (sessionId: string) => {
    toast.success('Session terminated successfully');
  };

  const handleDeactivateAccount = () => {
    toast.error('Account deactivation initiated. Please contact support to complete the process.');
  };

  return (
    <div className="space-y-6">
      {/* Password & Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password & Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <Button onClick={handlePasswordChange} className="w-fit">
              Update Password
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Authenticator App</span>
                  {securitySettings.twoFactorEnabled && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                checked={securitySettings.twoFactorEnabled}
                onCheckedChange={() => handleSecurityToggle('twoFactorEnabled')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email Notifications</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive security alerts via email
              </p>
            </div>
            <Switch
              checked={securitySettings.emailNotifications}
              onCheckedChange={() => handleSecurityToggle('emailNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>SMS Notifications</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive security alerts via SMS
              </p>
            </div>
            <Switch
              checked={securitySettings.smsNotifications}
              onCheckedChange={() => handleSecurityToggle('smsNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span>Login Alerts</span>
              <p className="text-sm text-muted-foreground">
                Get notified of new sign-ins to your account
              </p>
            </div>
            <Switch
              checked={securitySettings.loginAlerts}
              onCheckedChange={() => handleSecurityToggle('loginAlerts')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span>Automatic Data Backup</span>
              <p className="text-sm text-muted-foreground">
                Automatically backup your data daily
              </p>
            </div>
            <Switch
              checked={securitySettings.dataBackup}
              onCheckedChange={() => handleSecurityToggle('dataBackup')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your active sessions across different devices
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{session.device}</span>
                  {session.current && (
                    <Badge variant="secondary" className="text-xs">Current</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {session.location} • Last active: {session.lastActive}
                </p>
              </div>
              {!session.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session.id)}
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
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
            <h4 className="font-medium mb-2">Deactivate Account</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Once you deactivate your account, there is no going back. Please be certain.
              Your data will be preserved but you will lose access to the system.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  Deactivate Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will deactivate your account. You will lose access to the system,
                    but your data will be preserved. Contact support to reactivate your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeactivateAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Deactivate Account
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