import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface HistoryItem {
  id: string;
  date: string;
  symptoms: string[];
  triage: 'urgent' | 'warning' | 'safe';
  condition: string;
}

interface HistoryScreenProps {
  onBack: () => void;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    date: '2024-01-15',
    symptoms: ['Headache', 'Fever', 'Fatigue'],
    triage: 'warning',
    condition: 'Possible viral infection'
  },
  {
    id: '2',
    date: '2024-01-10',
    symptoms: ['Stomach pain', 'Nausea'],
    triage: 'safe',
    condition: 'Mild digestive upset'
  },
  {
    id: '3',
    date: '2024-01-05',
    symptoms: ['Chest pain', 'Shortness of breath'],
    triage: 'urgent',
    condition: 'Requires immediate attention'
  }
];

const getTriageIcon = (triage: string) => {
  switch (triage) {
    case 'urgent': return <AlertTriangle className="w-4 h-4" />;
    case 'warning': return <AlertCircle className="w-4 h-4" />;
    case 'safe': return <CheckCircle className="w-4 h-4" />;
    default: return <CheckCircle className="w-4 h-4" />;
  }
};

const getTriageVariant = (triage: string) => {
  switch (triage) {
    case 'urgent': return 'destructive';
    case 'warning': return 'secondary';
    case 'safe': return 'secondary';
    default: return 'secondary';
  }
};

export const HistoryScreen = ({ onBack }: HistoryScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">History</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-4">
        {mockHistory.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">No history yet</h3>
              <p className="text-sm text-muted-foreground">
                Your symptom checks will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          mockHistory.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-foreground">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </CardTitle>
                  <Badge 
                    variant={getTriageVariant(item.triage)}
                    className={`flex items-center gap-1 ${
                      item.triage === 'urgent' ? 'bg-urgent text-urgent-foreground' :
                      item.triage === 'warning' ? 'bg-warning text-warning-foreground' :
                      'bg-safe text-safe-foreground'
                    }`}
                  >
                    {getTriageIcon(item.triage)}
                    {item.triage === 'urgent' ? 'Urgent' :
                     item.triage === 'warning' ? 'Consult Soon' : 'Safe to Monitor'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Symptoms</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Assessment</h4>
                    <p className="text-sm text-muted-foreground">{item.condition}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </main>
    </div>
  );
};