import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Shield, Globe, Bell, Trash2 } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="Enter your age" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="w-5 h-5" />
              Privacy & Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-safe/10 border border-safe/20 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-safe" />
                <span className="text-sm font-medium text-safe">All data stays on device</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your health information is processed locally and never sent to external servers.
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Save symptom history</Label>
                <p className="text-xs text-muted-foreground">Keep a record of your checks</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Analytics (Anonymous)</Label>
                <p className="text-xs text-muted-foreground">Help improve the app</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="w-5 h-5" />
              App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Dark mode</Label>
                <p className="text-xs text-muted-foreground">Use dark theme</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Health reminders</Label>
                <p className="text-xs text-muted-foreground">Get reminded to check symptoms</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Appointment reminders</Label>
                <p className="text-xs text-muted-foreground">Reminders for booked appointments</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trash2 className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all history
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>HealthCheck AI v1.0.0</p>
          <p>© 2024 - Made with care for your health</p>
        </div>
      </main>
    </div>
  );
};