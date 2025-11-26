import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Globe, Shield, Smartphone } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const translations = {
  en: {
    title: 'AI-Powered Health Checker',
    subtitle: 'Check your symptoms anytime, anywhere – even offline',
    feature1: 'Works offline on your device',
    feature2: 'Your data stays private',
    feature3: 'Available in multiple languages',
    languageLabel: 'Select Language / भाषा चुनें',
    getStarted: 'Get Started',
  },
  hi: {
    title: 'एआई-संचालित स्वास्थ्य जांचकर्ता',
    subtitle: 'अपने लक्षणों की जांच कभी भी, कहीं भी करें – ऑफ़लाइन भी',
    feature1: 'आपके डिवाइस पर ऑफ़लाइन काम करता है',
    feature2: 'आपका डेटा निजी रहता है',
    feature3: 'कई भाषाओं में उपलब्ध',
    languageLabel: 'भाषा चुनें / Select Language',
    getStarted: 'शुरू करें',
  },
  bn: {
    title: 'এআই-চালিত স্বাস্থ্য পরীক্ষক',
    subtitle: 'যেকোনো সময়, যেকোনো জায়গায় আপনার লক্ষণ পরীক্ষা করুন – এমনকি ऑফলाইন',
    feature1: 'আপনার ডিভাইসে অফলাইনে কাজ করে',
    feature2: 'আপনার ডেটা ব্যক্তিগত থাকে',
    feature3: 'একাধিক ভাষায় উপলব্ধ',
    languageLabel: 'ভাষা নির্বাচন করুন / Select Language',
    getStarted: 'শুরু করুন',
  },
  te: {
    title: 'AI-శక్తితో పనిచేసే ఆరోగ్య పరీక్ష',
    subtitle: 'ఎప్పుడైనా, ఎక్కడైనా మీ లక్షణాలను తనిఖీ చేయండి – ఆఫ్‌లైన్‌లో కూడా',
    feature1: 'మీ పరికరంలో ఆఫ్‌లైన్‌లో పనిచేస్తుంది',
    feature2: 'మీ డేటా ప్రైవేట్‌గా ఉంటుంది',
    feature3: 'అనేక భాషలలో అందుబాటులో ఉంది',
    languageLabel: 'భాష ఎంచుకోండి / Select Language',
    getStarted: 'ప్రారంభించండి',
  },
};

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

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
            <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.subtitle}
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
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
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