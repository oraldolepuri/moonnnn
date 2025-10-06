import {
  Building2,
  UserCheck,
  User as UserIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { User } from "../types";

interface RoleSelectorProps {
  onRoleSelect: (user: User) => void;
}

const demoUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@realtygroup.com",
    role: "super_admin",
    phone: "(555) 123-4567",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@realtygroup.com",
    role: "office_admin",
    office_id: "office-1",
    phone: "(555) 234-5678",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike@realtygroup.com",
    role: "agent",
    office_id: "office-1",
    phone: "(555) 345-6789",
    created_at: "2024-02-01T00:00:00Z",
  },
];

export function RoleSelector({
  onRoleSelect,
}: RoleSelectorProps) {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Building2 className="h-8 w-8" />;
      case "office_admin":
        return <UserCheck className="h-8 w-8" />;
      case "agent":
        return <UserIcon className="h-8 w-8" />;
      default:
        return <UserIcon className="h-8 w-8" />;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Full access to all offices, agents, properties, and system-wide analytics";
      case "office_admin":
        return "Manage office operations, agents, properties, and local analytics";
      case "agent":
        return "Manage personal listings, clients, deals, and track performance";
      default:
        return "";
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Administrator";
      case "office_admin":
        return "Office Administrator";
      case "agent":
        return "Real Estate Agent";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl">RealtyPro CRM</h1>
          </div>
          <p className="text-muted-foreground">
            Select a role to explore the comprehensive Real
            Estate CRM system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoUsers.map((user) => (
            <Card
              key={user.id}
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
              onClick={() => onRoleSelect(user)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center text-primary mb-4">
                  {getRoleIcon(user.role)}
                </div>
                <CardTitle>{getRoleTitle(user.role)}</CardTitle>
                <CardDescription>
                  {getRoleDescription(user.role)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <Button className="w-full" variant="outline">
                  Access Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            This is a demo application showcasing role-based
            access control
          </p>
          <p>
            Each role has different permissions and features
            tailored to their needs
          </p>
        </div>
      </div>
    </div>
  );
}