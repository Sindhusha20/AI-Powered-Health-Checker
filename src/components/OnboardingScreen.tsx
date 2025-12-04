import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Globe, Shield, Smartphone } from 'lucide-react';
import { useLanguage, Language } from '@/hooks/useLanguage';

interface OnboardingScreenProps {
  onComplete: () => void;
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

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (value: string) => {
    // Only set if it's a supported language with full translations
    if (['en', 'hi', 'bn', 'te'].includes(value)) {
      setLanguage(value as Language);
    } else {
      // For other languages, default to English but store preference
      setLanguage('en');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          {/* App Logo */}
          <div className="bg-primary rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
            <Heart className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* App Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">{t.appTitle}</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.appSubtitle}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">{t.feature1}</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-safe" />
              <span className="text-sm text-foreground">{t.feature2}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-warning" />
              <span className="text-sm text-foreground">{t.feature3}</span>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">{t.languageLabel}</label>
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

          {/* Get Started Button */}
          <Button onClick={onComplete} className="w-full" size="lg">
            {t.getStarted}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
