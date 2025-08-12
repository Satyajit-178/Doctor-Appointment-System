import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Stethoscope, LogOut, Plus, History } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availability: string[];
  image: string;
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const doctors: Doctor[] = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', rating: 4.9, availability: ['09:00', '10:00', '11:00', '14:00', '15:00'], image: '👩‍⚕️' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.8, availability: ['09:30', '10:30', '13:00', '14:30', '16:00'], image: '👨‍⚕️' },
    { id: '3', name: 'Dr. Emily Davis', specialty: 'Pediatrics', rating: 4.9, availability: ['08:00', '09:00', '10:00', '13:30', '15:30'], image: '👩‍⚕️' },
    { id: '4', name: 'Dr. Robert Wilson', specialty: 'Orthopedics', rating: 4.7, availability: ['09:00', '11:00', '14:00', '15:00', '16:30'], image: '👨‍⚕️' },
  ];

  const appointments: Appointment[] = [
    { id: '1', doctorName: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2024-08-15', time: '10:00', status: 'scheduled' },
    { id: '2', doctorName: 'Dr. Emily Davis', specialty: 'Pediatrics', date: '2024-08-10', time: '09:00', status: 'completed' },
  ];

  const handleScheduleAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a doctor, date, and time.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Scheduled",
      description: `Appointment with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`,
    });

    // Reset form
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-primary';
      case 'completed': return 'bg-success';
      case 'cancelled': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-medical text-white shadow-medical">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Patient Portal</h1>
                <p className="text-white/80">Welcome back, {user?.name}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="border-white/20 text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Book Appointment Section */}
          <div className="space-y-6">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Book New Appointment
                </MedicalCardTitle>
                <MedicalCardDescription>
                  Schedule an appointment with our qualified doctors
                </MedicalCardDescription>
              </MedicalCardHeader>
              <MedicalCardContent className="space-y-6">
                {/* Doctor Selection */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Select Doctor</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-medical ${
                          selectedDoctor?.id === doctor.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{doctor.image}</span>
                          <div className="flex-1">
                            <h4 className="font-medium">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-yellow-500">⭐</span>
                              <span className="text-sm font-medium">{doctor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date and Time Selection */}
                {selectedDoctor && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-medical"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Available Times</label>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedDoctor.availability.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="transition-medical"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={handleScheduleAppointment}
                      className="w-full"
                      variant="medical"
                    >
                      Schedule Appointment
                    </Button>
                  </div>
                )}
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Appointments History */}
          <div className="space-y-6">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  My Appointments
                </MedicalCardTitle>
                <MedicalCardDescription>
                  View your past and upcoming appointments
                </MedicalCardDescription>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{appointment.doctorName}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {appointment.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <MedicalCard>
                <MedicalCardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Total Appointments</div>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
              <MedicalCard>
                <MedicalCardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">2</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;