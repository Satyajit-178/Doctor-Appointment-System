import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUserManagement } from '@/context/UserManagementContext';
import { useAppointments } from '@/context/AppointmentContext';
import { Button } from '@/components/ui/button';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Stethoscope, LogOut, Plus, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  availability: string[];
  image: string;
}


const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const { getDoctors, getUserById } = useUserManagement();
  const { addAppointment, getAppointmentsByPatient } = useAppointments();
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get patient's appointments
  const appointments = getAppointmentsByPatient(user?.id || '');

  // Get doctors from UserManagementContext and convert to Doctor format
  const systemDoctors = getDoctors();
  const doctors: Doctor[] = systemDoctors.map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialization || 'General Practice',
    rating: 4.8, // Default rating
    availability: doctor.timeSlots || [],
    image: '👩‍⚕️' // Default image
  }));


  const handleScheduleAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !user) {
      toast({
        title: "Missing Information",
        description: "Please select a doctor, date, and time.",
        variant: "destructive",
      });
      return;
    }

    // Get patient details
    const patient = getUserById(user.id);

    // Create new appointment
    const newAppointment = {
      patientId: user.id,
      patientName: patient?.name || user.name,
      patientAge: 30, // Default age
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: selectedDate,
      time: selectedTime,
      status: 'scheduled' as const,
      reason: 'Consultation',
      specialty: selectedDoctor.specialty
    };

    // Add to appointments
    addAppointment(newAppointment);

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
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-white bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
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
                  {doctors.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No doctors available at the moment.</p>
                      <p className="text-sm">Please check back later or contact admin.</p>
                    </div>
                  ) : (
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
                              <p className="text-xs text-muted-foreground mt-1">
                                {doctor.availability.length} time slots available
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date and Time Selection */}
                {selectedDoctor && selectedDoctor.availability.length > 0 && (
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

                {selectedDoctor && selectedDoctor.availability.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No time slots available for this doctor.</p>
                    <p className="text-sm">Please contact admin to set up availability.</p>
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
                  {appointments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No appointments scheduled yet.</p>
                      <p className="text-sm">Book your first appointment to get started!</p>
                    </div>
                  ) : (
                    appointments.map((appointment) => (
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
                    ))
                  )}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <MedicalCard>
                <MedicalCardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{appointments.length}</div>
                    <div className="text-sm text-muted-foreground">Total Appointments</div>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
              <MedicalCard>
                <MedicalCardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">{appointments.filter(apt => apt.status === 'completed').length}</div>
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