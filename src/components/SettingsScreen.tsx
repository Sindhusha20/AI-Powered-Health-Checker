import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Shield, Globe, Bell, Trash2 } from 'lucide-react';
import { useLanguage, Language } from '@/hooks/useLanguage';

interface SettingsScreenProps {
  onBack: () => void;
}

const languages = [
  { code: 'en', name: 'English (अंग्रेज़ी)' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'as', name: 'অসমীয়া (Assamese)' },
  { code: 'ur', name: 'اردو (Urdu)' },
  { code: 'sa', name: 'संस्कृतम् (Sanskrit)' },
];

export const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    if (['en', 'hi', 'bn', 'te'].includes(value)) {
      setLanguage(value as Language);
    } else {
      setLanguage('en');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">{t.settings}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-5 h-5" />
              {t.profileInformation}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.fullName}</Label>
              <Input id="name" placeholder={t.enterName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">{t.age}</Label>
              <Input id="age" type="number" placeholder={t.enterAge} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">{t.gender}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectGender} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t.male}</SelectItem>
                  <SelectItem value="female">{t.female}</SelectItem>
                  <SelectItem value="other">{t.other}</SelectItem>
                  <SelectItem value="prefer-not-to-say">{t.preferNotToSay}</SelectItem>
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
              {t.privacyData}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-safe/10 border border-safe/20 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-safe" />
                <span className="text-sm font-medium text-safe">{t.allDataOnDevice}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.healthInfoPrivate}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">{t.saveSymptomHistory}</Label>
                <p className="text-xs text-muted-foreground">{t.keepRecord}</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">{t.analyticsAnonymous}</Label>
                <p className="text-xs text-muted-foreground">{t.helpImprove}</p>
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
              {t.appPreferences}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t.language}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">{t.darkMode}</Label>
                <p className="text-xs text-muted-foreground">{t.useDarkTheme}</p>
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
              {t.notifications}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">{t.healthReminders}</Label>
                <p className="text-xs text-muted-foreground">{t.getReminded}</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">{t.appointmentReminders}</Label>
                <p className="text-xs text-muted-foreground">{t.remindersForBooked}</p>
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
              {t.dataManagement}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Trash2 className="w-4 h-4 mr-2" />
              {t.clearAllHistory}
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>{t.appVersion}</p>
          <p>{t.copyright}</p>
        </div>
      </main>
    </div>
  );
};
