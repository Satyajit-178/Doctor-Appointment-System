import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Stethoscope, LogOut, Settings, CheckCircle, XCircle } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const [isAvailable, setIsAvailable] = useState(true);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', patientName: 'John Smith', patientAge: 45, date: '2024-08-13', time: '10:00', status: 'scheduled', reason: 'Regular checkup' },
    { id: '2', patientName: 'Mary Johnson', patientAge: 32, date: '2024-08-13', time: '14:00', status: 'scheduled', reason: 'Follow-up consultation' },
  ]);

  const [recentActivity, setRecentActivity] = useState<Array<{
    id: string;
    type: 'completed' | 'cancelled' | 'scheduled';
    patientName: string;
    time: string;
    action: string;
  }>>([]);

  const todayAppointments = appointments.filter(apt => apt.date === '2024-08-13');
  const completedToday = todayAppointments.filter(apt => apt.status === 'completed').length;

  const handleCompleteAppointment = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;

    // Remove from appointments
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    
    // Add to recent activity
    setRecentActivity(prev => [{
      id: appointmentId,
      type: 'completed',
      patientName: appointment.patientName,
      time: appointment.time,
      action: 'Completed appointment'
    }, ...prev]);

    toast({
      title: "Appointment Completed",
      description: "Appointment marked as completed successfully.",
    });
  };

  const handleCancelAppointment = (appointmentId: string) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;

    // Permanently remove from appointments
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));

    toast({
      title: "Appointment Cancelled",
      description: "Appointment has been permanently cancelled.",
      variant: "destructive",
    });
  };

  const toggleTimeSlot = (time: string) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.time === time ? { ...slot, available: !slot.available } : slot
    ));
    toast({
      title: "Schedule Updated",
      description: `Time slot ${time} availability updated.`,
    });
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
                <h1 className="text-2xl font-bold">Doctor Portal</h1>
                <p className="text-white/80">Dr. {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Available</span>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                  className="data-[state=checked]:bg-white/20"
                />
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="border-white/20 text-white hover:bg-white/10">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <MedicalCard>
              <MedicalCardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{todayAppointments.length}</div>
                  <div className="text-sm text-muted-foreground">Today's Appointments</div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
            <MedicalCard>
              <MedicalCardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{completedToday}</div>
                  <div className="text-sm text-muted-foreground">Completed Today</div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
            <MedicalCard>
              <MedicalCardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">{todayAppointments.length - completedToday}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
            <MedicalCard>
              <MedicalCardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">4.9</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Today's Appointments */}
          <div className="lg:col-span-2 space-y-6">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Appointments
                </MedicalCardTitle>
                <MedicalCardDescription>
                  Manage your appointments for today
                </MedicalCardDescription>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-medium">{appointment.patientName}, {appointment.patientAge}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </span>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                        {appointment.status === 'scheduled' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="success"
                              onClick={() => handleCompleteAppointment(appointment.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Schedule Management */}
          <div className="space-y-6">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Manage Schedule
                </MedicalCardTitle>
                <MedicalCardDescription>
                  Update your availability
                </MedicalCardDescription>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <h4 className="font-medium">Time Slots</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={slot.available ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTimeSlot(slot.time)}
                        className="transition-medical"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click to toggle availability
                  </p>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Recent Activity */}
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle>Recent Activity</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {recentActivity.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                  ) : (
                    recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <div className="text-sm">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-muted-foreground">{activity.patientName} - {activity.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;