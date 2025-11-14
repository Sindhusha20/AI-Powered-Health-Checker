import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Stethoscope, History, Settings, Shield, Clock } from 'lucide-react';

interface HomeScreenProps {
  onCheckSymptoms: () => void;
  onViewHistory: () => void;
  onOpenSettings: () => void;
}

export const HomeScreen = ({ onCheckSymptoms, onViewHistory, onOpenSettings }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">AI-Powered Health Checker</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Health Assistant</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Offline
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Welcome Message */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">How are you feeling today?</p>
        </div>

        {/* Main Check Symptoms Button */}
        <Button 
          onClick={onCheckSymptoms} 
          className="w-full h-16 text-lg font-semibold" 
          size="lg"
        >
          <Stethoscope className="w-6 h-6 mr-3" />
          Check Symptoms
        </Button>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewHistory}>
            <CardContent className="p-4 text-center">
              <History className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm text-foreground">History</h3>
              <p className="text-xs text-muted-foreground">Previous checks</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onOpenSettings}>
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm text-foreground">Settings</h3>
              <p className="text-xs text-muted-foreground">Preferences</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-foreground mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total checks</span>
                <span className="text-sm font-medium text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last check</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">2 days ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <div className="text-center text-xs text-muted-foreground px-4">
          <Shield className="w-4 h-4 inline mr-1" />
          All your health data stays securely on your device
        </div>
      </main>
    </div>
  );
};