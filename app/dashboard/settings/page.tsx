import { Sidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Lock, Users, Building2 } from 'lucide-react';

export default function SettingsPage() {
  const settingsSections = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage event and maintenance alerts',
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Update your password and security settings',
    },
    {
      icon: Users,
      title: 'Team',
      description: 'Manage team members and permissions',
    },
    {
      icon: Building2,
      title: 'Facility Settings',
      description: 'Configure pavilion and pool settings',
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="mt-2 text-muted-foreground">Manage your account and facility settings.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title} className="cursor-pointer transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle>{section.title}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Facility Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Facility Email</label>
                <input
                  type="email"
                  defaultValue="facility@example.com"
                  className="mt-1 w-full max-w-md rounded border bg-input px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Facility Name</label>
                <input
                  type="text"
                  defaultValue="Event Facility"
                  className="mt-1 w-full max-w-md rounded border bg-input px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="mt-1 w-full max-w-md rounded border bg-input px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <input
                  type="text"
                  defaultValue="123 Event Street, City, State"
                  className="mt-1 w-full max-w-md rounded border bg-input px-3 py-2 text-sm"
                />
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
