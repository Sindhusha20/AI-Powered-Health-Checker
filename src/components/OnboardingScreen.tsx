import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Globe, Shield, Smartphone, Cpu, Smartphone as Mobile } from 'lucide-react';

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
    techFrameworks: 'Frameworks: TensorFlow Lite, ML Kit',
    techPlatforms: 'Platforms: Android, iOS',
    techConcepts: 'Concepts: Artificial Intelligence, Mobile & Edge Computing, Data Privacy',
    techCommunication: 'Communication: REST API for healthcare data sync',
  },
  hi: {
    title: 'एआई-संचालित स्वास्थ्य जांचकर्ता',
    subtitle: 'अपने लक्षणों की जांच कभी भी, कहीं भी करें – ऑफ़लाइन भी',
    feature1: 'आपके डिवाइस पर ऑफ़लाइन काम करता है',
    feature2: 'आपका डेटा निजी रहता है',
    feature3: 'कई भाषाओं में उपलब्ध',
    languageLabel: 'भाषा चुनें / Select Language',
    getStarted: 'शुरू करें',
    techFrameworks: 'फ्रेमवर्क: TensorFlow Lite, ML Kit',
    techPlatforms: 'प्लेटफॉर्म: Android, iOS',
    techConcepts: 'अवधारणाएं: कृत्रिम बुद्धिमत्ता, मोबाइल और एज कंप्यूटिंग, डेटा गोपनीयता',
    techCommunication: 'संचार: स्वास्थ्य डेटा सिंक के लिए REST API',
  },
  bn: {
    title: 'এআই-চালিত স্বাস্থ্য পরীক্ষক',
    subtitle: 'যেকোনো সময়, যেকোনো জায়গায় আপনার লক্ষণ পরীক্ষা করুন – এমনকি ऑফলाইন',
    feature1: 'আপনার ডিভাইসে অফলাইনে কাজ করে',
    feature2: 'আপনার ডেটা ব্যক্তিগত থাকে',
    feature3: 'একাধিক ভাষায় উপলব্ধ',
    languageLabel: 'ভাষা নির্বাচন করুন / Select Language',
    getStarted: 'শুরু করুন',
    techFrameworks: 'ফ্রেমওয়ার্ক: TensorFlow Lite, ML Kit',
    techPlatforms: 'প্ল্যাটফর্ম: Android, iOS',
    techConcepts: 'ধারণা: কৃত্রিম বুদ্ধিমত্তা, মোবাইল ও এজ কম্পিউটিং, ডেটা গোপনীয়তা',
    techCommunication: 'যোগাযোগ: স্বাস্থ্যসেবা ডেটা সিঙ্কের জন্য REST API',
  },
  te: {
    title: 'AI-శక్తితో పనిచేసే ఆరోగ్య పరీక్ష',
    subtitle: 'ఎప్పుడైనా, ఎక్కడైనా మీ లక్షణాలను తనిఖీ చేయండి – ఆఫ్‌లైన్‌లో కూడా',
    feature1: 'మీ పరికరంలో ఆఫ్‌లైన్‌లో పనిచేస్తుంది',
    feature2: 'మీ డేటా ప్రైవేట్‌గా ఉంటుంది',
    feature3: 'అనేక భాషలలో అందుబాటులో ఉంది',
    languageLabel: 'భాష ఎంచుకోండి / Select Language',
    getStarted: 'ప్రారంభించండి',
    techFrameworks: 'ఫ్రేమ్‌వర్క్స్: TensorFlow Lite, ML Kit',
    techPlatforms: 'ప్లాట్‌ఫారమ్స్: Android, iOS',
    techConcepts: 'భావనలు: కృత్రిమ మేధస్సు, మొబైల్ & ఎడ్జ్ కంప్యూటింగ్, డేటా ప్రైవసీ',
    techCommunication: 'కమ్యూనికేషన్: ఆరోగ్య డేటా సింక్ కోసం REST API',
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

          {/* Technical Details */}
          <div className="space-y-2 text-left bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Cpu className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{t.techFrameworks}</span>
            </div>
            <div className="flex items-start gap-2">
              <Mobile className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{t.techPlatforms}</span>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{t.techConcepts}</span>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{t.techCommunication}</span>
            </div>
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