import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, Star, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Clinic {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  nextAvailable: string;
  phone: string;
  specialties: string[];
}

interface AppointmentBookingProps {
  onBack: () => void;
}

const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'City Medical Center',
    address: '123 Main St, Downtown',
    distance: '0.8 miles',
    rating: 4.8,
    nextAvailable: 'Today 2:30 PM',
    phone: '(555) 123-4567',
    specialties: ['General Practice', 'Emergency Care']
  },
  {
    id: '2',
    name: 'Downtown Health Clinic',
    address: '456 Oak Ave, Central District',
    distance: '1.2 miles',
    rating: 4.6,
    nextAvailable: 'Tomorrow 9:00 AM',
    phone: '(555) 234-5678',
    specialties: ['Family Medicine', 'Urgent Care']
  },
  {
    id: '3',
    name: 'Riverside Family Practice',
    address: '789 River Rd, Riverside',
    distance: '2.1 miles',
    rating: 4.7,
    nextAvailable: 'Tomorrow 11:30 AM',
    phone: '(555) 345-6789',
    specialties: ['Family Medicine', 'Pediatrics']
  }
];

export const AppointmentBooking = ({ onBack }: AppointmentBookingProps) => {
  const { t } = useLanguage();
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    reason: ''
  });

  const handleBooking = () => {
    alert(`Appointment booked at ${selectedClinic?.name}!\nYou will receive a confirmation shortly.`);
    onBack();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToResults}
        </Button>
        <h1 className="text-2xl font-bold text-foreground">{t.bookAppointment}</h1>
      </div>

      {!selectedClinic ? (
        /* Clinic Selection */
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.findNearbyClinics}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {t.selectClinic}
              </p>
            </CardHeader>
          </Card>

          {mockClinics.map((clinic) => (
            <Card key={clinic.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{clinic.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{clinic.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {clinic.address} • {clinic.distance}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {t.nextAvailable}: {clinic.nextAvailable}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {clinic.phone}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {clinic.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedClinic(clinic)}
                    className="ml-4"
                  >
                    {t.select}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Booking Form */
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.bookingAt} {selectedClinic.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedClinic.address} • {t.nextAvailable}: {selectedClinic.nextAvailable}
              </p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.patientInformation}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t.fullName}</Label>
                  <Input
                    id="name"
                    placeholder={t.enterName}
                    value={patientInfo.name}
                    onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t.phoneNumber}</Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={patientInfo.phone}
                    onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">{t.emailAddress}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={patientInfo.email}
                  onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="reason">{t.reasonForVisit}</Label>
                <Input
                  id="reason"
                  placeholder={t.briefDescription}
                  value={patientInfo.reason}
                  onChange={(e) => setPatientInfo({...patientInfo, reason: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedClinic(null)}
              className="flex-1"
            >
              {t.chooseDifferentClinic}
            </Button>
            <Button 
              onClick={handleBooking}
              className="flex-1"
              disabled={!patientInfo.name || !patientInfo.phone}
            >
              {t.confirmAppointment}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
