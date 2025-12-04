CREATE TABLE public.app_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.app_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY app_metadata_select ON public.app_metadata FOR SELECT TO public USING (true);

CREATE TABLE public.symptoms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symptom_code text NOT NULL UNIQUE,
  name_en text NOT NULL,
  name_hi text,
  name_bn text,
  name_te text,
  severity_score integer DEFAULT 1 CHECK (severity_score BETWEEN 1 AND 10),
  category text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;

CREATE POLICY symptoms_select ON public.symptoms FOR SELECT TO public USING (true);

CREATE TABLE public.conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  condition_code text NOT NULL UNIQUE,
  name_en text NOT NULL,
  name_hi text,
  name_bn text,
  name_te text,
  description_en text,
  description_hi text,
  description_bn text,
  description_te text,
  urgency_level text NOT NULL CHECK (urgency_level IN ('urgent', 'consult-soon', 'monitor')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;

CREATE POLICY conditions_select ON public.conditions FOR SELECT TO public USING (true);

CREATE TABLE public.symptom_condition_mapping (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symptom_id uuid REFERENCES public.symptoms(id) ON DELETE CASCADE NOT NULL,
  condition_id uuid REFERENCES public.conditions(id) ON DELETE CASCADE NOT NULL,
  probability_weight decimal(3,2) DEFAULT 0.5 CHECK (probability_weight BETWEEN 0 AND 1),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(symptom_id, condition_id)
);

ALTER TABLE public.symptom_condition_mapping ENABLE ROW LEVEL SECURITY;

CREATE POLICY symptom_condition_mapping_select ON public.symptom_condition_mapping FOR SELECT TO public USING (true);

CREATE TABLE public.recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  condition_id uuid REFERENCES public.conditions(id) ON DELETE CASCADE NOT NULL,
  recommendation_en text NOT NULL,
  recommendation_hi text,
  recommendation_bn text,
  recommendation_te text,
  priority integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY recommendations_select ON public.recommendations FOR SELECT TO public USING (true);

CREATE INDEX idx_symptoms_code ON public.symptoms(symptom_code);
CREATE INDEX idx_conditions_code ON public.conditions(condition_code);
CREATE INDEX idx_symptom_condition_symptom ON public.symptom_condition_mapping(symptom_id);
CREATE INDEX idx_symptom_condition_condition ON public.symptom_condition_mapping(condition_id);
CREATE INDEX idx_recommendations_condition ON public.recommendations(condition_id);

CREATE TRIGGER update_app_metadata_updated_at BEFORE UPDATE ON public.app_metadata FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_symptoms_updated_at BEFORE UPDATE ON public.symptoms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_conditions_updated_at BEFORE UPDATE ON public.conditions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_recommendations_updated_at BEFORE UPDATE ON public.recommendations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.app_metadata (key, value, category) VALUES ('framework_1', 'TensorFlow Lite', 'frameworks'), ('framework_2', 'ML Kit', 'frameworks'), ('platform_1', 'Android', 'platforms'), ('platform_2', 'iOS', 'platforms'), ('concept_1', 'Artificial Intelligence', 'concepts'), ('concept_2', 'Mobile & Edge Computing', 'concepts'), ('concept_3', 'Data Privacy', 'concepts'), ('communication', 'REST API for healthcare data sync', 'communication');

INSERT INTO public.symptoms (symptom_code, name_en, name_hi, name_bn, name_te, severity_score, category) VALUES ('FEVER', 'Fever', 'बुखार', 'জ্বর', 'జ్వరం', 6, 'general'), ('COUGH', 'Cough', 'खांसी', 'কাশি', 'దగ్గు', 4, 'respiratory'), ('HEADACHE', 'Headache', 'सिर दर्द', 'মাথাব্যথা', 'తలనొప్పి', 5, 'neurological'), ('FATIGUE', 'Fatigue', 'थकान', 'ক্লান্তি', 'అలసట', 3, 'general'), ('CHEST_PAIN', 'Chest Pain', 'सीने में दर्द', 'বুক ব্যথা', 'ఛాతీ నొప్పి', 9, 'cardiac'), ('SHORTNESS_BREATH', 'Shortness of Breath', 'सांस की तकलीफ', 'শ্বাসকষ্ট', 'ఊపిరాడకపోవడం', 8, 'respiratory'), ('NAUSEA', 'Nausea', 'मतली', 'বমি বমি ভাব', 'వాంతులు', 4, 'gastrointestinal'), ('DIZZINESS', 'Dizziness', 'चक्कर आना', 'মাথা ঘোরা', 'తలతిరగడం', 6, 'neurological');

INSERT INTO public.conditions (condition_code, name_en, name_hi, name_bn, name_te, description_en, description_hi, description_bn, description_te, urgency_level) VALUES ('COMMON_COLD', 'Common Cold', 'सामान्य सर्दी', 'সাধারণ সর্দি', 'సాధారణ జలుబు', 'Viral infection of upper respiratory tract', 'ऊपरी श्वसन तंत्र का वायरल संक्रमण', 'উপরের শ্বাসযন্ত্রের ভাইরাল সংক্রমণ', 'ఎగువ శ్వాసకోశ వైరల్ ఇన్ఫెక్షన్', 'monitor'), ('INFLUENZA', 'Influenza', 'इन्फ्लूएंजा', 'ইনফ্লুয়েঞ্জা', 'ఇన్ఫ్లుఎంజా', 'Viral infection causing fever and body aches', 'बुखार और शरीर में दर्द का कारण बनने वाला वायरल संक्रमण', 'জ্বর এবং শরীর ব্যথা সৃষ্টিকারী ভাইরাল সংক্রমণ', 'జ్వరం మరియు శరీర నొప్పులు కలిగించే వైరల్ ఇన్ఫెక్షన్', 'consult-soon'), ('MIGRAINE', 'Migraine', 'माइग्रेन', 'মাইগ্রেন', 'మైగ్రేన్', 'Severe recurring headache', 'गंभीर आवर्ती सिरदर्द', 'গুরুতর পুনরাবৃত্ত মাথাব্যথা', 'తీవ్రమైన పునరావృత తలనొప్పి', 'consult-soon'), ('CARDIAC_EMERGENCY', 'Cardiac Emergency', 'हृदय आपातकाल', 'হৃদরোগ জরুরী', 'కార్డియాక్ ఎమర్జెన్సీ', 'Potential heart attack or serious heart condition', 'संभावित दिल का दौरा या गंभीर हृदय स्थिति', 'সম্ভাব্য হার্ট অ্যাটাক বা গুরুতর হৃদরোগ', 'సంభావ్య గుండెపోటు లేదా తీవ్రమైన గుండె పరిస్థితి', 'urgent'), ('RESPIRATORY_INFECTION', 'Respiratory Infection', 'श्वसन संक्रमण', 'শ্বাসযন্ত্রের সংক্রমণ', 'శ్వాసకోశ ఇన్ఫెక్షన్', 'Infection affecting breathing', 'श्वास को प्रभावित करने वाला संक्रमण', 'শ্বাসপ্রশ্বাসকে প্রভাবিত করে সংক্রমণ', 'శ్వాసను ప్రభావితం చేసే ఇన్ఫెక్షన్', 'consult-soon');

INSERT INTO public.symptom_condition_mapping (symptom_id, condition_id, probability_weight) VALUES ((SELECT id FROM public.symptoms WHERE symptom_code = 'FEVER'), (SELECT id FROM public.conditions WHERE condition_code = 'COMMON_COLD'), 0.60), ((SELECT id FROM public.symptoms WHERE symptom_code = 'COUGH'), (SELECT id FROM public.conditions WHERE condition_code = 'COMMON_COLD'), 0.70), ((SELECT id FROM public.symptoms WHERE symptom_code = 'FEVER'), (SELECT id FROM public.conditions WHERE condition_code = 'INFLUENZA'), 0.85), ((SELECT id FROM public.symptoms WHERE symptom_code = 'FATIGUE'), (SELECT id FROM public.conditions WHERE condition_code = 'INFLUENZA'), 0.75), ((SELECT id FROM public.symptoms WHERE symptom_code = 'HEADACHE'), (SELECT id FROM public.conditions WHERE condition_code = 'MIGRAINE'), 0.90), ((SELECT id FROM public.symptoms WHERE symptom_code = 'CHEST_PAIN'), (SELECT id FROM public.conditions WHERE condition_code = 'CARDIAC_EMERGENCY'), 0.95), ((SELECT id FROM public.symptoms WHERE symptom_code = 'SHORTNESS_BREATH'), (SELECT id FROM public.conditions WHERE condition_code = 'CARDIAC_EMERGENCY'), 0.85), ((SELECT id FROM public.symptoms WHERE symptom_code = 'COUGH'), (SELECT id FROM public.conditions WHERE condition_code = 'RESPIRATORY_INFECTION'), 0.80), ((SELECT id FROM public.symptoms WHERE symptom_code = 'SHORTNESS_BREATH'), (SELECT id FROM public.conditions WHERE condition_code = 'RESPIRATORY_INFECTION'), 0.75);

INSERT INTO public.recommendations (condition_id, recommendation_en, recommendation_hi, recommendation_bn, recommendation_te, priority) VALUES ((SELECT id FROM public.conditions WHERE condition_code = 'COMMON_COLD'), 'Rest and stay hydrated', 'आराम करें और हाइड्रेटेड रहें', 'বিশ্রাম নিন এবং হাইড্রেটেড থাকুন', 'విశ్రాంతి తీసుకోండి మరియు హైడ్రేటెడ్ గా ఉండండి', 1), ((SELECT id FROM public.conditions WHERE condition_code = 'COMMON_COLD'), 'Take over-the-counter medications if needed', 'यदि आवश्यक हो तो ओवर-द-काउंटर दवाएं लें', 'প্রয়োজনে ওভার-দ্য-কাউন্টার ওষুধ নিন', 'అవసరమైతే ఓవర్-ది-కౌంటర్ మందులు తీసుకోండి', 2), ((SELECT id FROM public.conditions WHERE condition_code = 'INFLUENZA'), 'Consult a doctor within 24-48 hours', '24-48 घंटों के भीतर डॉक्टर से परामर्श करें', '24-48 ঘন্টার মধ্যে ডাক্তারের পরামর্শ নিন', '24-48 గంటల్లో వైద్యుడిని సంప్రదించండి', 1), ((SELECT id FROM public.conditions WHERE condition_code = 'INFLUENZA'), 'Rest and increase fluid intake', 'आराम करें और तरल पदार्थ का सेवन बढ़ाएं', 'বিশ্রাম নিন এবং তরল গ্রহণ বাড়ান', 'విశ్రాంతి తీసుకోండి మరియు ద్రవ తీసుకోవడం పెంచండి', 2), ((SELECT id FROM public.conditions WHERE condition_code = 'MIGRAINE'), 'Rest in a dark, quiet room', 'अंधेरे, शांत कमरे में आराम करें', 'অন্ধকার, শান্ত ঘরে বিশ্রাম নিন', 'చీకటి, నిశ్శబ్ద గదిలో విశ్రాంతి తీసుకోండి', 1), ((SELECT id FROM public.conditions WHERE condition_code = 'MIGRAINE'), 'Schedule appointment with neurologist', 'न्यूरोलॉजिस्ट के साथ अपॉइंटमेंट शेड्यूल करें', 'নিউরোলজিস্টের সাথে অ্যাপয়েন্টমেন্ট নির্ধারণ করুন', 'న్యూరాలజిస్ట్‌తో అపాయింట్‌మెంట్ షెడ్యూల్ చేయండి', 2), ((SELECT id FROM public.conditions WHERE condition_code = 'CARDIAC_EMERGENCY'), 'CALL EMERGENCY SERVICES IMMEDIATELY', 'तुरंत आपातकालीन सेवाओं को कॉल करें', 'অবিলম্বে জরুরী পরিষেবা কল করুন', 'వెంటనే అత్యవసర సేవలకు కాల్ చేయండి', 1), ((SELECT id FROM public.conditions WHERE condition_code = 'CARDIAC_EMERGENCY'), 'Do not drive yourself to hospital', 'स्वयं अस्पताल न जाएं', 'নিজে হাসপাতালে যাবেন না', 'మీరే హాస్పిటల్‌కు డ్రైవ్ చేయవద్దు', 2), ((SELECT id FROM public.conditions WHERE condition_code = 'RESPIRATORY_INFECTION'), 'See a doctor within 48 hours', '48 घंटों के भीतर डॉक्टर को दिखाएं', '48 ঘন্টার মধ্যে ডাক্তার দেখান', '48 గంటల్లో వైద్యుడిని చూడండి', 1), ((SELECT id FROM public.conditions WHERE condition_code = 'RESPIRATORY_INFECTION'), 'Monitor breathing difficulties', 'सांस लेने में कठिनाई पर नज़र रखें', 'শ্বাসকষ্ট পর্যবেক্ষণ করুন', 'శ్వాస ఇబ్బందులను పర్యవేక్షించండి', 2);