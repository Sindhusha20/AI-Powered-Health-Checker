import { useState } from 'react';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { HomeScreen } from '@/components/HomeScreen';
import { SymptomInput } from '@/components/SymptomInput';
import { ResultsScreen } from '@/components/ResultsScreen';
import { AdviceScreen } from '@/components/AdviceScreen';
import { HistoryScreen } from '@/components/HistoryScreen';
import { SettingsScreen } from '@/components/SettingsScreen';
import { AppointmentBooking } from '@/components/AppointmentBooking';
import { analyzeSymptoms } from '@/utils/aiAnalysis';
import { AnalysisData } from '@/components/AnalysisResult';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage, LanguageProvider } from '@/hooks/useLanguage';

type ViewState = 'onboarding' | 'home' | 'symptoms' | 'results' | 'advice' | 'history' | 'settings' | 'booking' | 'loading';

const IndexContent = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [view, setView] = useState<ViewState>('onboarding');
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  const handleCompleteOnboarding = () => {
    setView('home');
  };

  const handleCheckSymptoms = () => {
    setView('symptoms');
  };

  const handleSymptomAnalysis = async (symptoms: string[]) => {
    setView('loading');
    try {
      const result = await analyzeSymptoms(symptoms, user?.id);
      setAnalysis(result);
      setView('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      setView('symptoms');
    }
  };

  const handleBackToHome = () => {
    setView('home');
    setAnalysis(null);
  };

  const handleViewAdvice = () => {
    setView('advice');
  };

  const handleBookAppointment = () => {
    setView('booking');
  };

  const handleViewHistory = () => {
    setView('history');
  };

  const handleOpenSettings = () => {
    setView('settings');
  };

  // Render appropriate screen based on current view
  switch (view) {
    case 'onboarding':
      return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
    
    case 'home':
      return (
        <HomeScreen 
          onCheckSymptoms={handleCheckSymptoms}
          onViewHistory={handleViewHistory}
          onOpenSettings={handleOpenSettings}
        />
      );
    
    case 'symptoms':
      return <SymptomInput onAnalyze={handleSymptomAnalysis} />;
    
    case 'results':
      return analysis ? (
        <ResultsScreen 
          analysis={analysis}
          onBack={handleBackToHome}
          onBookAppointment={handleBookAppointment}
          onViewAdvice={handleViewAdvice}
        />
      ) : null;
    
    case 'advice':
      return analysis ? (
        <AdviceScreen 
          analysis={analysis}
          onBack={() => setView('results')}
          onBookAppointment={handleBookAppointment}
        />
      ) : null;
    
    case 'history':
      return <HistoryScreen onBack={handleBackToHome} />;
    
    case 'settings':
      return <SettingsScreen onBack={handleBackToHome} />;
    
    case 'booking':
      return <AppointmentBooking onBack={() => setView('results')} />;
    
    case 'loading':
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <h2 className="text-xl font-semibold text-foreground">{t.analyzingSymptoms}</h2>
            <p className="text-muted-foreground">{t.aiProcessing}</p>
          </div>
        </div>
      );
    
    default:
      return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
  }
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
