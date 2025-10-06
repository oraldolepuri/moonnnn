import { KPICard } from './KPICard';
import { AnalyticsCharts } from './AnalyticsCharts';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { User } from '../../types';
import { 
  agentKPIs, 
  revenueChartData, 
  propertyTypeData, 
  dealStatusData 
} from '../../data/mockData';

interface AgentDashboardProps {
  user: User;
  onQuickAction: (action: string) => void;
}

export function AgentDashboard({ user, onQuickAction }: AgentDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Agent Dashboard</h1>
        <p className="text-muted-foreground">
          Track your personal performance and manage your listings
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentKPIs.map((kpi, index) => (
          <KPICard key={index} kpi={kpi} />
        ))}
      </div>

      {/* Charts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <AnalyticsCharts
            revenueData={revenueChartData}
            propertyTypeData={propertyTypeData}
            dealStatusData={dealStatusData}
          />
        </div>
        <div className="space-y-6">
          <QuickActions user={user} onAction={onQuickAction} />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}