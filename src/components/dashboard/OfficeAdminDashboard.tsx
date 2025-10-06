import { KPICard } from './KPICard';
import { AnalyticsCharts } from './AnalyticsCharts';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { User } from '../../types';
import { 
  officeAdminKPIs, 
  revenueChartData, 
  propertyTypeData, 
  dealStatusData 
} from '../../data/mockData';

interface OfficeAdminDashboardProps {
  user: User;
  onQuickAction: (action: string) => void;
}

export function OfficeAdminDashboard({ user, onQuickAction }: OfficeAdminDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Office Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your office operations and track performance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {officeAdminKPIs.map((kpi, index) => (
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