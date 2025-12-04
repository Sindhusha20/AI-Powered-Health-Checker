import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, X, Thermometer } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface SymptomInputProps {
  onAnalyze: (symptoms: string[]) => void;
}

export const SymptomInput = ({ onAnalyze }: SymptomInputProps) => {
  const { t } = useLanguage();
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [feverTemperature, setFeverTemperature] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');

  const commonSymptoms = [
    { key: 'headache', en: 'Headache' },
    { key: 'fever', en: 'Fever' },
    { key: 'cough', en: 'Cough' },
    { key: 'fatigue', en: 'Fatigue' },
    { key: 'nausea', en: 'Nausea' },
    { key: 'dizziness', en: 'Dizziness' },
    { key: 'chestPain', en: 'Chest Pain' },
    { key: 'shortnessOfBreath', en: 'Shortness of Breath' },
    { key: 'stomachPain', en: 'Stomach Pain' },
    { key: 'soreThroat', en: 'Sore Throat' },
    { key: 'bodyAches', en: 'Body Aches' },
    { key: 'lossOfAppetite', en: 'Loss of Appetite' },
  ];

  const getSymptomName = (key: string): string => {
    return t[key as keyof typeof t] as string || key;
  };

  const addSymptom = (symptom: string) => {
    if (symptom.trim() && !selectedSymptoms.includes(symptom.trim())) {
      setSelectedSymptoms([...selectedSymptoms, symptom.trim()]);
      setCurrentSymptom('');
    }
  };

  const hasFever = selectedSymptoms.some(s => 
    s.toLowerCase() === 'fever' || s === t.fever
  );

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSymptom.trim()) {
      addSymptom(currentSymptom);
    }
    if (selectedSymptoms.length > 0) {
      onAnalyze(selectedSymptoms);
    }
  };

  const getTemperatureStatus = () => {
    if (!feverTemperature) return null;
    const temp = parseFloat(feverTemperature);
    if (temperatureUnit === 'C') {
      if (temp >= 38) return { status: 'high', text: `🔴 ${t.highFever}` };
      if (temp >= 37.5) return { status: 'mild', text: `🟡 ${t.mildFever}` };
      return { status: 'normal', text: `🟢 ${t.normalTemperature}` };
    } else {
      if (temp >= 100.4) return { status: 'high', text: `🔴 ${t.highFever}` };
      if (temp >= 99.5) return { status: 'mild', text: `🟡 ${t.mildFever}` };
      return { status: 'normal', text: `🟢 ${t.normalTemperature}` };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-semibold text-foreground text-center">{t.symptomCheck}</h1>
          <p className="text-sm text-muted-foreground text-center">{t.selectSymptoms}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl text-foreground">
              {t.howAreYouFeeling}
            </CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              {t.selectFromCommon}
            </p>
          </CardHeader>
      <CardContent className="space-y-6">
        {/* Custom symptom input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder={t.typeSymptom}
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={() => addSymptom(currentSymptom)}
            size="sm"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </form>

        {/* Common symptoms */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">{t.commonSymptoms}</h3>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => {
              const displayName = getSymptomName(symptom.key);
              const isSelected = selectedSymptoms.includes(displayName) || selectedSymptoms.includes(symptom.en);
              return (
                <Badge
                  key={symptom.key}
                  variant={isSelected ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => addSymptom(displayName)}
                >
                  {displayName}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Selected symptoms */}
        {selectedSymptoms.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">{t.yourSymptoms}</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <Badge
                  key={symptom}
                  variant="default"
                  className="flex items-center gap-1"
                >
                  {symptom}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeSymptom(symptom)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Fever temperature input */}
        {hasFever && (
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium text-foreground">
                {t.feverTemperature}
              </Label>
            </div>
            
            <RadioGroup 
              value={temperatureUnit} 
              onValueChange={(value) => setTemperatureUnit(value as 'C' | 'F')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="C" id="celsius" />
                <Label htmlFor="celsius" className="cursor-pointer">{t.celsius}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="F" id="fahrenheit" />
                <Label htmlFor="fahrenheit" className="cursor-pointer">{t.fahrenheit}</Label>
              </div>
            </RadioGroup>

            <div className="flex gap-2 items-center">
              <Input
                type="number"
                step="0.1"
                placeholder={temperatureUnit === 'C' ? 'e.g., 38.5' : 'e.g., 101.3'}
                value={feverTemperature}
                onChange={(e) => setFeverTemperature(e.target.value)}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground">°{temperatureUnit}</span>
            </div>
            
            {feverTemperature && (
              <p className="text-xs text-muted-foreground">
                {getTemperatureStatus()?.text}
              </p>
            )}
          </div>
        )}

        {/* Analyze button */}
        <Button 
          onClick={() => onAnalyze(selectedSymptoms)}
          disabled={selectedSymptoms.length === 0}
          className="w-full"
          size="lg"
        >
          {t.analyzeSymptoms}
        </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
