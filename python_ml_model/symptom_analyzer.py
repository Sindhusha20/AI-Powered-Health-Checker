"""
AI-Powered Health Checker - Python ML Backend
This demonstrates the machine learning model used for symptom analysis
using TensorFlow Lite for mobile deployment.
"""

import tensorflow as tf
import numpy as np
from typing import List, Dict, Tuple
import json

class SymptomAnalyzer:
    """
    Machine Learning model for analyzing symptoms and providing triage recommendations.
    Optimized for mobile deployment using TensorFlow Lite.
    """
    
    def __init__(self, model_path: str = 'models/symptom_model.tflite'):
        """
        Initialize the symptom analyzer with a TensorFlow Lite model.
        
        Args:
            model_path: Path to the TensorFlow Lite model file
        """
        self.interpreter = tf.lite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()
        
        # Get input and output tensors
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()
        
        # Medical knowledge base
        self.symptom_database = self._load_symptom_database()
        self.condition_database = self._load_condition_database()
        
    def _load_symptom_database(self) -> Dict:
        """Load symptom vocabulary and embeddings"""
        return {
            'chest_pain': {'severity': 'high', 'urgency': 'urgent'},
            'shortness_of_breath': {'severity': 'high', 'urgency': 'urgent'},
            'severe_headache': {'severity': 'high', 'urgency': 'urgent'},
            'fever': {'severity': 'medium', 'urgency': 'consult-soon'},
            'persistent_cough': {'severity': 'medium', 'urgency': 'consult-soon'},
            'fatigue': {'severity': 'low', 'urgency': 'monitor'},
            'headache': {'severity': 'low', 'urgency': 'monitor'},
            'stomach_pain': {'severity': 'medium', 'urgency': 'consult-soon'},
            'nausea': {'severity': 'medium', 'urgency': 'monitor'},
            'dizziness': {'severity': 'medium', 'urgency': 'consult-soon'}
        }
    
    def _load_condition_database(self) -> Dict:
        """Load medical conditions database"""
        return {
            'respiratory_infection': {
                'symptoms': ['fever', 'cough', 'fatigue', 'headache'],
                'description': 'Viral Upper Respiratory Infection - Common cold or flu-like illness'
            },
            'gastroenteritis': {
                'symptoms': ['stomach_pain', 'nausea', 'fatigue'],
                'description': 'Inflammation of the stomach and intestines'
            },
            'cardiac_concern': {
                'symptoms': ['chest_pain', 'shortness_of_breath', 'dizziness'],
                'description': 'Potential cardiac condition requiring immediate evaluation'
            },
            'migraine': {
                'symptoms': ['severe_headache', 'nausea', 'dizziness'],
                'description': 'Severe recurring headache condition'
            }
        }
    
    def preprocess_symptoms(self, symptoms: List[str]) -> np.ndarray:
        """
        Convert symptom text to numerical features for ML model.
        
        Args:
            symptoms: List of symptom descriptions
            
        Returns:
            Preprocessed feature vector
        """
        # Create feature vector (simplified for demo)
        feature_vector = np.zeros((1, 100), dtype=np.float32)
        
        for i, symptom in enumerate(symptoms[:10]):  # Limit to 10 symptoms
            # Simple text embedding (in production, use proper word embeddings)
            symptom_normalized = symptom.lower().replace(' ', '_')
            if symptom_normalized in self.symptom_database:
                # Encode symptom properties
                feature_vector[0, i*10:(i+1)*10] = self._encode_symptom(symptom_normalized)
        
        return feature_vector
    
    def _encode_symptom(self, symptom: str) -> np.ndarray:
        """Encode a single symptom into feature vector"""
        encoding = np.zeros(10)
        symptom_data = self.symptom_database.get(symptom, {})
        
        # Severity encoding
        severity_map = {'low': 0.33, 'medium': 0.66, 'high': 1.0}
        encoding[0] = severity_map.get(symptom_data.get('severity', 'low'), 0.33)
        
        # Urgency encoding
        urgency_map = {'monitor': 0.33, 'consult-soon': 0.66, 'urgent': 1.0}
        encoding[1] = urgency_map.get(symptom_data.get('urgency', 'monitor'), 0.33)
        
        # Additional features (symptom type, affected system, etc.)
        encoding[2:] = np.random.rand(8) * 0.1  # Placeholder for other features
        
        return encoding
    
    def analyze(self, symptoms: List[str]) -> Dict:
        """
        Analyze symptoms and generate triage recommendations.
        
        Args:
            symptoms: List of symptom descriptions
            
        Returns:
            Analysis results with triage level, conditions, and recommendations
        """
        # Preprocess input
        input_data = self.preprocess_symptoms(symptoms)
        
        # Run inference
        self.interpreter.set_tensor(self.input_details[0]['index'], input_data)
        self.interpreter.invoke()
        
        # Get predictions
        triage_output = self.interpreter.get_tensor(self.output_details[0]['index'])
        condition_output = self.interpreter.get_tensor(self.output_details[1]['index'])
        
        # Determine triage level
        triage_level = self._determine_triage(triage_output[0], symptoms)
        
        # Identify potential conditions
        conditions = self._identify_conditions(condition_output[0], symptoms)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(triage_level, conditions)
        
        return {
            'triage': triage_level,
            'conditions': conditions,
            'recommendations': recommendations,
            'symptoms': symptoms
        }
    
    def _determine_triage(self, model_output: np.ndarray, symptoms: List[str]) -> str:
        """Determine triage level from model output and symptoms"""
        # Check for urgent keywords
        urgent_keywords = ['chest pain', 'shortness of breath', 'severe headache', 
                          'difficulty breathing', 'severe bleeding']
        
        for symptom in symptoms:
            symptom_lower = symptom.lower()
            if any(keyword in symptom_lower for keyword in urgent_keywords):
                return 'urgent'
        
        # Use model output for classification
        triage_score = float(model_output[0])
        if triage_score > 0.7:
            return 'urgent'
        elif triage_score > 0.4:
            return 'consult-soon'
        else:
            return 'monitor'
    
    def _identify_conditions(self, model_output: np.ndarray, 
                           symptoms: List[str]) -> List[Dict]:
        """Identify potential medical conditions"""
        conditions = []
        symptoms_lower = [s.lower() for s in symptoms]
        
        for condition_name, condition_data in self.condition_database.items():
            # Calculate match score
            matching_symptoms = sum(1 for cs in condition_data['symptoms'] 
                                  if any(cs in s for s in symptoms_lower))
            
            if matching_symptoms > 0:
                probability = min(95, (matching_symptoms / len(condition_data['symptoms'])) * 100)
                conditions.append({
                    'name': condition_name.replace('_', ' ').title(),
                    'probability': int(probability),
                    'description': condition_data['description']
                })
        
        # Sort by probability
        conditions.sort(key=lambda x: x['probability'], reverse=True)
        return conditions[:3]  # Return top 3 conditions
    
    def _generate_recommendations(self, triage_level: str, 
                                 conditions: List[Dict]) -> List[str]:
        """Generate personalized recommendations based on analysis"""
        recommendations = []
        
        if triage_level == 'urgent':
            recommendations = [
                'Seek immediate medical attention at an emergency room',
                'Do not drive yourself - call emergency services',
                'Bring a list of your current medications',
                'Stay calm and monitor your symptoms closely'
            ]
        elif triage_level == 'consult-soon':
            recommendations = [
                'Schedule an appointment with your doctor within 2-3 days',
                'Monitor your symptoms and seek immediate care if they worsen',
                'Stay hydrated and get plenty of rest',
                'Keep a symptom diary to share with your doctor',
                'Consider over-the-counter medications for symptom relief'
            ]
        else:  # monitor
            recommendations = [
                'Rest and allow your body to recover naturally',
                'Stay well-hydrated with water and clear fluids',
                'Monitor your symptoms for any changes or worsening',
                'Consider a routine check-up if symptoms persist beyond a week',
                'Practice good hygiene to prevent spreading illness'
            ]
        
        return recommendations


class ModelTrainer:
    """
    Trainer for the symptom analysis model using medical datasets.
    """
    
    def __init__(self, dataset_path: str):
        """
        Initialize the model trainer.
        
        Args:
            dataset_path: Path to the medical training dataset
        """
        self.dataset_path = dataset_path
        
    def load_dataset(self) -> Tuple[np.ndarray, np.ndarray]:
        """
        Load and preprocess medical training data.
        Datasets: Synthea synthetic health data, MIMIC-III clinical database
        """
        # Load medical records dataset
        # In production, this would load from real medical datasets
        X_train = np.random.rand(10000, 100)  # Symptom features
        y_train = np.random.rand(10000, 3)    # Triage classifications
        
        return X_train, y_train
    
    def build_model(self) -> tf.keras.Model:
        """Build the neural network model"""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(256, activation='relu', input_shape=(100,)),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(3, activation='softmax')  # 3 triage levels
        ])
        
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def train(self, epochs: int = 50):
        """Train the model on medical data"""
        X_train, y_train = self.load_dataset()
        model = self.build_model()
        
        # Train model
        model.fit(X_train, y_train, epochs=epochs, batch_size=32, validation_split=0.2)
        
        # Convert to TensorFlow Lite for mobile deployment
        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        converter.optimizations = [tf.lite.Optimize.DEFAULT]
        tflite_model = converter.convert()
        
        # Save model
        with open('models/symptom_model.tflite', 'wb') as f:
            f.write(tflite_model)
        
        print("Model trained and converted to TensorFlow Lite format")


# API endpoint for integration
def analyze_symptoms_api(symptoms: List[str]) -> Dict:
    """
    API endpoint that can be called from the mobile app.
    
    Args:
        symptoms: List of symptom descriptions
        
    Returns:
        JSON response with analysis results
    """
    analyzer = SymptomAnalyzer()
    result = analyzer.analyze(symptoms)
    return result


if __name__ == "__main__":
    # Example usage
    analyzer = SymptomAnalyzer()
    
    test_symptoms = [
        "persistent cough",
        "fever",
        "fatigue",
        "headache"
    ]
    
    result = analyzer.analyze(test_symptoms)
    print(json.dumps(result, indent=2))
