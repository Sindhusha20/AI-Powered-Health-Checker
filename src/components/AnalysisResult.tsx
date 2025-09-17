import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Shield, Calendar, ArrowLeft } from 'lucide-react';

export type TriageLevel = 'urgent' | 'consult-soon' | 'monitor';

export interface Condition {
  name: string;
  probability: number;
  description: string;
}

export interface AnalysisData {
  triage: TriageLevel;
  conditions: Condition[];
  recommendations: string[];
  symptoms: string[];
}

interface AnalysisResultProps {
  analysis: AnalysisData;
  onBack: () => void;
  onBookAppointment: () => void;
}

const triageConfig = {
  urgent: {
    icon: AlertTriangle,
    color: 'bg-urgent text-urgent-foreground',
    title: 'Seek Urgent Medical Attention',
    description: 'Your symptoms may require immediate medical care',
    action: 'Find Emergency Care'
  },
  'consult-soon': {
    icon: Clock,
    color: 'bg-warning text-warning-foreground',
    title: 'Consult Doctor Soon',
    description: 'Schedule an appointment within the next few days',
    action: 'Book Appointment'
  },
  monitor: {
    icon: Shield,
    color: 'bg-safe text-safe-foreground',
    title: 'Monitor Symptoms',
    description: 'Your symptoms can likely be monitored at home',
    action: 'Schedule Check-up'
  }
};

export const AnalysisResult = ({ analysis, onBack, onBookAppointment }: AnalysisResultProps) => {
  const config = triageConfig[analysis.triage];
  const Icon = config.icon;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Analysis Results</h1>
      </div>

      {/* Triage Level Card */}
      <Card>
        <CardContent className="pt-6">
          <div className={`${config.color} rounded-lg p-6 text-center`}>
            <Icon className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">{config.title}</h2>
            <p className="mb-4">{config.description}</p>
            <Button 
              variant="secondary" 
              onClick={onBookAppointment}
              className="bg-white/20 hover:bg-white/30 text-inherit border-white/30"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {config.action}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Your Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Analyzed Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysis.symptoms.map((symptom, index) => (
              <Badge key={index} variant="secondary">
                {symptom}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Possible Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Possible Conditions</CardTitle>
          <p className="text-sm text-muted-foreground">
            These are AI-generated suggestions. Always consult a healthcare professional for accurate diagnosis.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.conditions.map((condition, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-foreground">{condition.name}</h3>
                <Badge variant="outline">{condition.probability}% match</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{condition.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-foreground">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-muted">
        <CardContent className="pt-4">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and does not constitute medical advice. 
            Always consult with a qualified healthcare professional for proper diagnosis and treatment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};