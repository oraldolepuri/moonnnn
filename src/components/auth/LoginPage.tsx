import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Eye, EyeOff, Building, Shield, Users, Mail, Lock, ArrowRight } from 'lucide-react';
import { User } from '../../types';
import { mockUsers } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const user = mockUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
      
      if (user) {
        toast.success('Login successful!');
        onLogin(user);
      } else {
        setErrors({ email: 'Invalid email or password' });
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'super_admin' | 'office_admin' | 'agent') => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setFormData({
        email: user.email,
        password: 'demo123',
        rememberMe: false
      });
      toast.success(`Demo login as ${role.replace('_', ' ')}`);
      onLogin(user);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin':
        return Shield;
      case 'office_admin':
        return Building;
      case 'agent':
        return Users;
      default:
        return Users;
    }
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Building className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Real Estate Albania</h1>
            </div>
            <CardTitle className="text-2xl">Mirë se vini përsëri</CardTitle>
            <CardDescription>
              Identifikohuni në llogarinë tuaj për të aksesuar platformën e menaxhimit të pasurive të paluajtshme
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresa Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="emri@example.com"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Fjalëkalimi</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Shkruani fjalëkalimin"
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="px-0 text-sm">
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <Separator />

            <div className="space-y-3">
              <p className="text-sm text-center text-muted-foreground">
                Demo Accounts - Click to login
              </p>
              
              <div className="space-y-2">
                {mockUsers.slice(0, 3).map((user) => {
                  const Icon = getRoleIcon(user.role);
                  return (
                    <Button
                      key={user.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleDemoLogin(user.role)}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{user.name}</span>
                          <Badge className={getRoleColor(user.role)}>
                            {formatRole(user.role)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>
                Don't have an account?{' '}
                <Button variant="link" className="px-0">
                  Contact your administrator
                </Button>
              </p>
              
              <Separator />
              
              <div className="space-y-2">
                <p>Explore other features:</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open('#property-landing', '_blank')}
                  >
                    Property Landing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onLogin(mockUsers[0])}
                  >
                    Quick Demo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right side - Features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Manage your real estate business with ease
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive CRM solution for real estate professionals, offices, and agents.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Property Management</h3>
                <p className="text-sm text-muted-foreground">
                  Track listings, manage property details, and monitor market activity.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Client Relationships</h3>
                <p className="text-sm text-muted-foreground">
                  Manage client interactions, preferences, and communication history.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Deal Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor deals through the sales pipeline and track commission.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Quick Demo Access</h4>
            <p className="text-sm text-muted-foreground">
              Try different user roles to explore the full functionality of our platform.
              No registration required for demo accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}