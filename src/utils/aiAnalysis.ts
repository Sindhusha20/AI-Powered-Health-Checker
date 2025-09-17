import { AnalysisData, TriageLevel, Condition } from '@/components/AnalysisResult';

// Simulated AI analysis - In a real app, this would connect to an edge AI model
export const analyzeSymptoms = async (symptoms: string[]): Promise<AnalysisData> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simple rule-based analysis for demo
  const urgentKeywords = ['chest pain', 'shortness of breath', 'severe headache', 'difficulty breathing'];
  const warningKeywords = ['fever', 'persistent cough', 'severe fatigue', 'dizziness'];
  
  const symptomsLower = symptoms.map(s => s.toLowerCase());
  
  let triage: TriageLevel = 'monitor';
  let conditions: Condition[] = [];
  let recommendations: string[] = [];

  // Determine triage level
  if (urgentKeywords.some(keyword => symptomsLower.some(symptom => symptom.includes(keyword)))) {
    triage = 'urgent';
  } else if (warningKeywords.some(keyword => symptomsLower.some(symptom => symptom.includes(keyword))) || symptoms.length >= 4) {
    triage = 'consult-soon';
  }

  // Generate conditions based on symptoms
  if (symptomsLower.some(s => s.includes('headache') || s.includes('fever'))) {
    conditions.push({
      name: 'Viral Upper Respiratory Infection',
      probability: 78,
      description: 'Common cold or flu-like illness affecting the upper respiratory tract.'
    });
  }

  if (symptomsLower.some(s => s.includes('chest pain') || s.includes('shortness of breath'))) {
    conditions.push({
      name: 'Respiratory Condition',
      probability: 65,
      description: 'May indicate asthma, bronchitis, or other respiratory issues requiring evaluation.'
    });
  }

  if (symptomsLower.some(s => s.includes('stomach pain') || s.includes('nausea'))) {
    conditions.push({
      name: 'Gastroenteritis',
      probability: 72,
      description: 'Inflammation of the stomach and intestines, often caused by infection.'
    });
  }

  // Default condition if none matched
  if (conditions.length === 0) {
    conditions.push({
      name: 'General Malaise',
      probability: 60,
      description: 'General feeling of discomfort that may resolve with rest and hydration.'
    });
  }

  // Generate recommendations based on triage level
  if (triage === 'urgent') {
    recommendations = [
      'Seek immediate medical attention at an emergency room',
      'Do not drive yourself - call emergency services or have someone drive you',
      'Bring a list of your current medications',
      'Stay calm and monitor your symptoms closely'
    ];
  } else if (triage === 'consult-soon') {
    recommendations = [
      'Schedule an appointment with your primary care physician within 2-3 days',
      'Monitor your symptoms and seek immediate care if they worsen',
      'Stay hydrated and get plenty of rest',
      'Keep a symptom diary to share with your doctor',
      'Consider over-the-counter medications for symptom relief'
    ];
  } else {
    recommendations = [
      'Rest and allow your body to recover naturally',
      'Stay well-hydrated with water and clear fluids',
      'Monitor your symptoms for any changes or worsening',
      'Consider scheduling a routine check-up if symptoms persist beyond a week',
      'Practice good hygiene to prevent spreading illness to others'
    ];
  }

  return {
    triage,
    conditions,
    recommendations,
    symptoms
  };
};