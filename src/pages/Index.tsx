import { useState } from 'react';
import { SymptomInput } from '@/components/SymptomInput';
import { AnalysisResult, AnalysisData } from '@/components/AnalysisResult';
import { AppointmentBooking } from '@/components/AppointmentBooking';
import { analyzeSymptoms } from '@/utils/aiAnalysis';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, Smartphone } from 'lucide-react';

type ViewState = 'input' | 'analysis' | 'booking' | 'loading';

const Index = () => {
  const [view, setView] = useState<ViewState>('input');
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  const handleSymptomAnalysis = async (symptoms: string[]) => {
    setView('loading');
    try {
      const result = await analyzeSymptoms(symptoms);
      setAnalysis(result);
      setView('analysis');
    } catch (error) {
      console.error('Analysis failed:', error);
      setView('input');
    }
  };

  const handleBackToInput = () => {
    setView('input');
    setAnalysis(null);
  };

  const handleBookAppointment = () => {
    setView('booking');
  };

  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <h2 className="text-xl font-semibold text-foreground">Analyzing Your Symptoms</h2>
          <p className="text-muted-foreground">Our AI is processing your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg p-2">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">HealthCheck AI</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Symptom Analysis</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Offline Capable
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'input' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Get Instant Health Insights
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Describe your symptoms and get AI-powered health guidance to help you make informed decisions about your care.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center">
                <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">Advanced edge AI provides instant symptom analysis</p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="w-8 h-8 text-safe mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Smart Triage</h3>
                <p className="text-sm text-muted-foreground">Intelligent priority system helps determine urgency</p>
              </Card>
              <Card className="p-6 text-center">
                <Smartphone className="w-8 h-8 text-warning mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Easy Booking</h3>
                <p className="text-sm text-muted-foreground">Connect with local healthcare providers instantly</p>
              </Card>
            </div>

            <SymptomInput onAnalyze={handleSymptomAnalysis} />
          </div>
        )}

        {view === 'analysis' && analysis && (
          <AnalysisResult
            analysis={analysis}
            onBack={handleBackToInput}
            onBookAppointment={handleBookAppointment}
          />
        )}

        {view === 'booking' && (
          <AppointmentBooking onBack={() => setView('analysis')} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              <strong>Medical Disclaimer:</strong> This tool provides general health information only and should not replace professional medical advice.
              Always consult healthcare professionals for medical concerns.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
