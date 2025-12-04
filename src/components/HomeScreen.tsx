import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Stethoscope, History, Settings, Shield, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';

interface HomeScreenProps {
  onCheckSymptoms: () => void;
  onViewHistory: () => void;
  onOpenSettings: () => void;
}

export const HomeScreen = ({ onCheckSymptoms, onViewHistory, onOpenSettings }: HomeScreenProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
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
              <h1 className="text-xl font-semibold text-foreground">{t.appTitle}</h1>
              <p className="text-xs text-muted-foreground">{t.healthAssistant}</p>
            </div>
          </div>
          {!user ? (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                {t.signIn}
              </Button>
            </Link>
          ) : (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {t.signedIn}
            </Badge>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Welcome Message */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{t.welcomeBack}</h2>
          <p className="text-muted-foreground">{t.howFeeling}</p>
        </div>

        {/* Main Check Symptoms Button */}
        <Button 
          onClick={onCheckSymptoms} 
          className="w-full h-16 text-lg font-semibold" 
          size="lg"
        >
          <Stethoscope className="w-6 h-6 mr-3" />
          {t.checkSymptoms}
        </Button>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewHistory}>
            <CardContent className="p-4 text-center">
              <History className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm text-foreground">{t.history}</h3>
              <p className="text-xs text-muted-foreground">{t.previousChecks}</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onOpenSettings}>
            <CardContent className="p-4 text-center">
              <Settings className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-sm text-foreground">{t.settings}</h3>
              <p className="text-xs text-muted-foreground">{t.preferences}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-foreground mb-3">{t.quickStats}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.totalChecks}</span>
                <span className="text-sm font-medium text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.lastCheck}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">2 {t.daysAgo}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <div className="text-center text-xs text-muted-foreground px-4">
          <Shield className="w-4 h-4 inline mr-1" />
          {t.dataPrivacyNotice}
        </div>
      </main>
    </div>
  );
};
