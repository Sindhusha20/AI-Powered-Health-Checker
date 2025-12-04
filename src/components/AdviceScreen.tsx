import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, Calendar, Home, Thermometer, Droplets, Moon, Phone } from 'lucide-react';
import { AnalysisData } from './AnalysisResult';
import { useLanguage } from '@/hooks/useLanguage';

interface AdviceScreenProps {
  analysis: AnalysisData;
  onBack: () => void;
  onBookAppointment: () => void;
}

export const AdviceScreen = ({ analysis, onBack, onBookAppointment }: AdviceScreenProps) => {
  const { t } = useLanguage();

  const getAdviceByTriage = (triage: string) => {
    switch (triage.toLowerCase()) {
      case 'urgent':
        return {
          title: t.immediateActionRequired,
          icon: <AlertTriangle className="w-5 h-5 text-urgent" />,
          advice: [
            t.seekEmergency,
            t.callEmergencyServices,
            t.doNotWait,
            t.haveSomeoneDrive
          ],
          homecare: []
        };
      
      case 'consult-soon':
        return {
          title: t.scheduleMedicalConsultation,
          icon: <Calendar className="w-5 h-5 text-warning" />,
          advice: [
            t.contactProvider,
            t.monitorClosely,
            t.avoidStrenuous,
            t.keepDiary
          ],
          homecare: [
            t.getPlentyRest,
            t.stayHydrated,
            t.maintainComfortable,
            t.takeOTC
          ]
        };
      
      default:
        return {
          title: t.selfCareMonitoring,
          icon: <Home className="w-5 h-5 text-safe" />,
          advice: [
            t.monitorForChanges,
            t.restAndRecover,
            t.contactDoctor,
            t.keepTrack
          ],
          homecare: [
            t.getSleep,
            t.drinkWater,
            t.eatLight,
            t.useHumidifier,
            t.takeWarmBaths
          ]
        };
    }
  };

  const advice = getAdviceByTriage(analysis.triage);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">{t.careAdvice}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Triage Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              {advice.icon}
              <h2 className="text-lg font-semibold text-foreground">{advice.title}</h2>
            </div>
            <Badge 
              variant="outline"
              className={`${
                analysis.triage === 'urgent' ? 'border-urgent text-urgent' :
                analysis.triage === 'consult-soon' ? 'border-warning text-warning' :
                'border-safe text-safe'
              }`}
            >
              {analysis.triage === 'urgent' ? `🟥 ${t.urgentCare}` :
               analysis.triage === 'consult-soon' ? `🟧 ${t.consultSoon.split(' - ')[0]}` :
               `🟩 ${t.safeToMonitor.split(' - ')[0]}`}
            </Badge>
          </CardContent>
        </Card>

        {/* Medical Advice */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t.recommendedNextSteps}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {advice.advice.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Home Care Tips */}
        {advice.homecare.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Home className="w-5 h-5" />
                {t.homeCareTips}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {advice.homecare.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-safe/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index === 0 && <Moon className="w-3 h-3 text-safe" />}
                    {index === 1 && <Droplets className="w-3 h-3 text-safe" />}
                    {index === 2 && <Home className="w-3 h-3 text-safe" />}
                    {index === 3 && <Thermometer className="w-3 h-3 text-safe" />}
                    {index === 4 && <Home className="w-3 h-3 text-safe" />}
                  </div>
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Warning Signs */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-destructive">
              <AlertTriangle className="w-5 h-5" />
              {t.whenToSeekCare}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-foreground">
              <p>• {t.symptomsWorsen}</p>
              <p>• {t.difficultyBreathing}</p>
              <p>• {t.highFeverWarning}</p>
              <p>• {t.severeHeadache}</p>
              <p>• {t.persistentVomiting}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {analysis.triage !== 'monitor' && (
            <Button onClick={onBookAppointment} className="w-full" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              {t.bookAppointment}
            </Button>
          )}
          
          <Button variant="outline" className="w-full" size="lg">
            <Phone className="w-4 h-4 mr-2" />
            {t.callHealthHotline}
          </Button>
        </div>

        {/* Emergency Contact */}
        <Card className="bg-urgent/5 border-urgent/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-urgent" />
              <span className="text-sm font-medium text-urgent">{t.emergency}: 911</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {t.callImmediately}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
