import { Plus, Upload, Calendar, Search, Users, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { User } from '../../types';

interface QuickActionsProps {
  user: User;
  onAction: (action: string) => void;
}

export function QuickActions({ user, onAction }: QuickActionsProps) {
  const getActionsForRole = () => {
    const commonActions = [
      { id: 'add-property', label: 'Add Property', icon: Plus },
      { id: 'add-client', label: 'Add Client', icon: Users },
      { id: 'schedule-meeting', label: 'Schedule Meeting', icon: Calendar },
      { id: 'create-deal', label: 'Create Deal', icon: FileText }
    ];

    const roleSpecificActions = {
      super_admin: [
        { id: 'add-office', label: 'Add Office', icon: Plus },
        { id: 'manage-agents', label: 'Manage Agents', icon: Users },
        { id: 'global-search', label: 'Global Search', icon: Search }
      ],
      office_admin: [
        { id: 'bulk-upload', label: 'Bulk Upload', icon: Upload },
        { id: 'manage-agents', label: 'Manage Agents', icon: Users }
      ],
      agent: [
        { id: 'upload-photos', label: 'Upload Photos', icon: Upload }
      ]
    };

    return [...commonActions, ...roleSpecificActions[user.role]];
  };

  const actions = getActionsForRole();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-muted/50"
            onClick={() => onAction(action.id)}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-sm text-center">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}