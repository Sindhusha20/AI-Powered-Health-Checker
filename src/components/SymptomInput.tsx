import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface SymptomInputProps {
  onAnalyze: (symptoms: string[]) => void;
}

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness',
  'Chest Pain', 'Shortness of Breath', 'Stomach Pain', 'Sore Throat',
  'Body Aches', 'Loss of Appetite'
];

export const SymptomInput = ({ onAnalyze }: SymptomInputProps) => {
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const addSymptom = (symptom: string) => {
    if (symptom.trim() && !selectedSymptoms.includes(symptom.trim())) {
      setSelectedSymptoms([...selectedSymptoms, symptom.trim()]);
      setCurrentSymptom('');
    }
  };

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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-foreground">
          Describe Your Symptoms
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Select from common symptoms or add your own
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Custom symptom input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Type a symptom..."
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
          <h3 className="text-sm font-medium text-foreground mb-3">Common Symptoms</h3>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Badge
                key={symptom}
                variant={selectedSymptoms.includes(symptom) ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => addSymptom(symptom)}
              >
                {symptom}
              </Badge>
            ))}
          </div>
        </div>

        {/* Selected symptoms */}
        {selectedSymptoms.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Your Symptoms</h3>
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

        {/* Analyze button */}
        <Button 
          onClick={() => onAnalyze(selectedSymptoms)}
          disabled={selectedSymptoms.length === 0}
          className="w-full"
          size="lg"
        >
          Analyze Symptoms
        </Button>
      </CardContent>
    </Card>
  );
};