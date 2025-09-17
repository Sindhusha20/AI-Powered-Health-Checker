import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, AlertTriangle, AlertCircle, CheckCircle, Calendar, Info } from 'lucide-react';
import { AnalysisData } from './AnalysisResult';

interface ResultsScreenProps {
  analysis: AnalysisData;
  onBack: () => void;
  onBookAppointment: () => void;
  onViewAdvice: () => void;
}

export const ResultsScreen = ({ analysis, onBack, onBookAppointment, onViewAdvice }: ResultsScreenProps) => {
  const getTriageColor = (triage: string) => {
    switch (triage) {
      case 'urgent': return 'urgent';
      case 'consult-soon': return 'warning';
      case 'monitor': return 'safe';
      default: return 'safe';
    }
  };

  const getTriageIcon = (triage: string) => {
    switch (triage) {
      case 'urgent': return <AlertTriangle className="w-5 h-5" />;
      case 'consult-soon': return <AlertCircle className="w-5 h-5" />;
      case 'monitor': return <CheckCircle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getTriageText = (triage: string) => {
    switch (triage) {
      case 'urgent': return 'Urgent - Seek immediate care';
      case 'consult-soon': return 'Consult Soon - Schedule appointment';
      case 'monitor': return 'Safe to Monitor - Keep an eye on symptoms';
      default: return 'Safe to Monitor';
    }
  };

  const triageColor = getTriageColor(analysis.triage);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Results</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Triage Result Card */}
        <Card className={`border-2 ${
          triageColor === 'urgent' ? 'border-urgent' :
          triageColor === 'warning' ? 'border-warning' : 'border-safe'
        }`}>
          <CardContent className="p-6 text-center">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
              triageColor === 'urgent' ? 'bg-urgent text-urgent-foreground' :
              triageColor === 'warning' ? 'bg-warning text-warning-foreground' :
              'bg-safe text-safe-foreground'
            }`}>
              {getTriageIcon(analysis.triage)}
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-2">
              {getTriageText(analysis.triage)}
            </h2>
            
            <p className="text-muted-foreground text-sm">
              Based on your symptoms, here's our AI assessment
            </p>
          </CardContent>
        </Card>

        {/* Confidence Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Info className="w-5 h-5" />
              Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Conditions analyzed</span>
                <span className="font-medium text-foreground">{analysis.conditions.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Possible Conditions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Possible Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.conditions.map((condition, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-primary' : 'bg-muted'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{condition.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{condition.probability}% match</p>
                  <p className="text-xs text-muted-foreground mt-1">{condition.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Symptoms Analyzed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Symptoms Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.symptoms.map((symptom) => (
                <Badge key={symptom} variant="outline">
                  {symptom}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={onViewAdvice} className="w-full" size="lg">
            View Care Advice
          </Button>
          
          {analysis.triage !== 'monitor' && (
            <Button onClick={onBookAppointment} variant="outline" className="w-full" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          )}
        </div>

        {/* Disclaimer */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Medical Disclaimer:</strong> This AI assessment is for informational purposes only. 
              Always consult healthcare professionals for medical concerns. If experiencing severe symptoms, 
              seek immediate medical attention.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};