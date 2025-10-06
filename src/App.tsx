import { useState, useEffect } from 'react';
import { RoleSelector } from './components/RoleSelector';
import { LoginPage } from './components/auth/LoginPage';
import { PropertyLanding } from './components/public/PropertyLanding';
import { TopNavigation } from './components/layout/TopNavigation';
import { Sidebar } from './components/layout/Sidebar';
import { SuperAdminDashboard } from './components/dashboard/SuperAdminDashboard';
import { OfficeAdminDashboard } from './components/dashboard/OfficeAdminDashboard';
import { AgentDashboard } from './components/dashboard/AgentDashboard';
import { PropertyList } from './components/properties/PropertyList';
import { PropertyViewDialog } from './components/properties/PropertyViewDialog';
import { ClientList } from './components/clients/ClientList';
import { ClientViewDialog } from './components/clients/ClientViewDialog';
import { DealTracker } from './components/deals/DealTracker';
import { DealViewDialog } from './components/deals/DealViewDialog';
import { CalendarView } from './components/calendar/CalendarView';
import { OfficeManagement } from './components/offices/OfficeManagement';
import { AgentManagement } from './components/agents/AgentManagement';
import { AdvancedAnalytics } from './components/analytics/AdvancedAnalytics';
import { GlobalSearch } from './components/search/GlobalSearch';
import { TerritoryManagement } from './components/territories/TerritoryManagement';
import { Settings } from './components/settings/Settings';
import { User, Property, Client, Deal } from './types';
import { 
  mockUsers, 
  mockProperties, 
  mockClients, 
  mockDeals 
} from './data/mockData';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appMode, setAppMode] = useState<'login' | 'role-selector' | 'app' | 'property-landing'>('login');
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  
  // View dialog states
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);
  const [viewingDeal, setViewingDeal] = useState<Deal | null>(null);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Reset to dashboard when user changes
  useEffect(() => {
    if (currentUser) {
      setActiveTab('dashboard');
      setAppMode('app');
    }
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setAppMode('app');
  };

  const handleRoleSelect = (user: User) => {
    setCurrentUser(user);
    setAppMode('app');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
    setAppMode('login');
  };

  const handleShowRoleSelector = () => {
    setAppMode('role-selector');
  };

  const handleShowPropertyLanding = () => {
    setAppMode('property-landing');
  };

  const handleSettingsClick = () => {
    setActiveTab('settings');
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    
    // Navigate to appropriate tab based on action
    switch (action) {
      case 'add-property':
        setActiveTab('properties');
        break;
      case 'add-client':
        setActiveTab('clients');
        break;
      case 'create-deal':
        setActiveTab('deals');
        break;
      case 'schedule-meeting':
        setActiveTab('calendar');
        break;
      case 'add-office':
        setActiveTab('offices');
        break;
      case 'manage-agents':
        setActiveTab('agents');
        break;
      case 'global-search':
        setActiveTab('search');
        break;
      default:
        console.log(`Action ${action} not implemented yet`);
    }
  };

  const handlePropertySave = async (propertyData: Partial<Property>) => {
    try {
      if (propertyData.id) {
        // Update existing property
        setProperties(prev => prev.map(p => 
          p.id === propertyData.id ? { ...p, ...propertyData } : p
        ));
        toast.success('Property updated successfully');
      } else {
        // Create new property
        const newProperty: Property = {
          id: Date.now().toString(),
          title: propertyData.title || '',
          address: propertyData.address || '',
          city: propertyData.city || '',
          state: propertyData.state || '',
          zip: propertyData.zip || '',
          price: propertyData.price || 0,
          bedrooms: propertyData.bedrooms || 0,
          bathrooms: propertyData.bathrooms || 0,
          square_feet: propertyData.square_feet || 0,
          property_type: propertyData.property_type || 'house',
          status: propertyData.status || 'active',
          description: propertyData.description || '',
          images: propertyData.images || [],
          listing_agent_id: currentUser?.id || '',
          office_id: currentUser?.office_id || '',
          listed_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setProperties(prev => [newProperty, ...prev]);
        toast.success('Property created successfully');
      }
    } catch (error) {
      toast.error('Failed to save property');
    }
  };

  const handleClientSave = async (clientData: Partial<Client>) => {
    try {
      if (clientData.id) {
        // Update existing client
        setClients(prev => prev.map(c => 
          c.id === clientData.id ? { ...c, ...clientData } : c
        ));
        toast.success('Client updated successfully');
      } else {
        // Create new client
        const newClient: Client = {
          id: Date.now().toString(),
          name: clientData.name || '',
          email: clientData.email || '',
          phone: clientData.phone || '',
          type: clientData.type || 'buyer',
          notes: clientData.notes || '',
          agent_id: currentUser?.id || '',
          office_id: currentUser?.office_id || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setClients(prev => [newClient, ...prev]);
        toast.success('Client created successfully');
      }
    } catch (error) {
      toast.error('Failed to save client');
    }
  };

  const handleDealSave = async (dealData: Partial<Deal>) => {
    try {
      if (dealData.id) {
        // Update existing deal
        setDeals(prev => prev.map(d => 
          d.id === dealData.id ? { ...d, ...dealData } : d
        ));
        toast.success('Deal updated successfully');
      } else {
        // Create new deal
        const newDeal: Deal = {
          id: Date.now().toString(),
          property_id: dealData.property_id || '',
          client_id: dealData.client_id || '',
          agent_id: currentUser?.id || '',
          office_id: currentUser?.office_id || '',
          type: dealData.type || 'sale',
          status: dealData.status || 'lead',
          offer_amount: dealData.offer_amount,
          closing_date: dealData.closing_date,
          commission_rate: dealData.commission_rate || 3.0,
          commission_amount: dealData.commission_amount || 0,
          notes: dealData.notes || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setDeals(prev => [newDeal, ...prev]);
        toast.success('Deal created successfully');
      }
    } catch (error) {
      toast.error('Failed to save deal');
    }
  };

  const handlePropertyAction = (action: string, property?: Property) => {
    switch (action) {
      case 'view':
        if (property) setViewingProperty(property);
        break;
      case 'edit':
        // Edit functionality would open the form with the property data
        console.log('Edit property:', property);
        break;
      case 'add':
        // Add functionality would open the form empty
        console.log('Add new property');
        break;
      default:
        console.log('Property action:', action, property);
    }
  };

  const handleClientAction = (action: string, client?: Client) => {
    switch (action) {
      case 'view':
        if (client) setViewingClient(client);
        break;
      case 'edit':
        // Edit functionality would open the form with the client data
        console.log('Edit client:', client);
        break;
      case 'add':
        // Add functionality would open the form empty
        console.log('Add new client');
        break;
      default:
        console.log('Client action:', action, client);
    }
  };

  const handleDealAction = (action: string, deal?: Deal) => {
    switch (action) {
      case 'view':
        if (deal) setViewingDeal(deal);
        break;
      case 'edit':
        // Edit functionality would open the form with the deal data
        console.log('Edit deal:', deal);
        break;
      case 'add':
        // Add functionality would open the form empty
        console.log('Add new deal');
        break;
      default:
        console.log('Deal action:', action, deal);
    }
  };

  const renderContent = () => {
    if (!currentUser) return null;

    switch (activeTab) {
      case 'dashboard':
        switch (currentUser.role) {
          case 'super_admin':
            return <SuperAdminDashboard user={currentUser} onQuickAction={handleQuickAction} />;
          case 'office_admin':
            return <OfficeAdminDashboard user={currentUser} onQuickAction={handleQuickAction} />;
          case 'agent':
            return <AgentDashboard user={currentUser} onQuickAction={handleQuickAction} />;
          default:
            return <div>Unknown role</div>;
        }
      
      case 'properties':
        return (
          <>
            <PropertyList
              properties={properties}
              user={currentUser}
              onView={(property) => handlePropertyAction('view', property)}
              onEdit={(property) => handlePropertyAction('edit', property)}
              onAdd={() => handlePropertyAction('add')}
              onSave={handlePropertySave}
            />
            <PropertyViewDialog
              property={viewingProperty}
              isOpen={!!viewingProperty}
              onClose={() => setViewingProperty(null)}
              onEdit={(property) => {
                setViewingProperty(null);
                handlePropertyAction('edit', property);
              }}
            />
          </>
        );
      
      case 'clients':
        return (
          <>
            <ClientList
              clients={clients}
              user={currentUser}
              onView={(client) => handleClientAction('view', client)}
              onEdit={(client) => handleClientAction('edit', client)}
              onAdd={() => handleClientAction('add')}
              onSave={handleClientSave}
            />
            <ClientViewDialog
              client={viewingClient}
              isOpen={!!viewingClient}
              onClose={() => setViewingClient(null)}
              onEdit={(client) => {
                setViewingClient(null);
                handleClientAction('edit', client);
              }}
            />
          </>
        );
      
      case 'deals':
        return (
          <>
            <DealTracker
              deals={deals}
              properties={properties}
              clients={clients}
              user={currentUser}
              onView={(deal) => handleDealAction('view', deal)}
              onEdit={(deal) => handleDealAction('edit', deal)}
              onAdd={() => handleDealAction('add')}
              onSave={handleDealSave}
            />
            <DealViewDialog
              deal={viewingDeal}
              property={viewingDeal ? properties.find(p => p.id === viewingDeal.property_id) : undefined}
              client={viewingDeal ? clients.find(c => c.id === viewingDeal.client_id) : undefined}
              isOpen={!!viewingDeal}
              onClose={() => setViewingDeal(null)}
              onEdit={(deal) => {
                setViewingDeal(null);
                handleDealAction('edit', deal);
              }}
            />
          </>
        );
      
      case 'calendar':
        return <CalendarView user={currentUser} />;
      
      case 'offices':
        return <OfficeManagement user={currentUser} />;
      
      case 'agents':
        return <AgentManagement user={currentUser} />;
      
      case 'analytics':
        return <AdvancedAnalytics user={currentUser} />;
      
      case 'search':
        return <GlobalSearch user={currentUser} />;
      
      case 'territories':
        return <TerritoryManagement user={currentUser} />;
      
      case 'settings':
        return (
          <Settings
            user={currentUser}
            isDarkMode={isDarkMode}
            onThemeToggle={handleThemeToggle}
          />
        );
      
      default:
        return (
          <div className="space-y-6">
            <h1>Page Not Found</h1>
            <p className="text-muted-foreground">
              The requested page is not available.
            </p>
          </div>
        );
    }
  };

  // Render based on app mode
  switch (appMode) {
    case 'login':
      return <LoginPage onLogin={handleLogin} />;
      
    case 'role-selector':
      return <RoleSelector onRoleSelect={handleRoleSelect} />;
      
    case 'property-landing':
      return <PropertyLanding />;
      
    case 'app':
      if (!currentUser) {
        return <LoginPage onLogin={handleLogin} />;
      }
      
      return (
        <div className="h-screen flex flex-col bg-background">
          <TopNavigation
            user={currentUser}
            onThemeToggle={handleThemeToggle}
            isDark={isDarkMode}
            onSearch={handleSearch}
            notificationCount={3}
            onLogout={handleLogout}
            onSettingsClick={handleSettingsClick}
          />
          
          <div className="flex-1 flex overflow-hidden">
            <Sidebar
              user={currentUser}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            
            <main className="flex-1 overflow-auto">
              <div className="p-6 max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      );
      
    default:
      return <LoginPage onLogin={handleLogin} />;
  }
}