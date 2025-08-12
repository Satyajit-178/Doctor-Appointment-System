import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { Stethoscope, Users, Calendar, Shield, ArrowRight, Heart, Clock, UserCheck } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Easy Scheduling",
      description: "Book appointments with your preferred doctors instantly"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Access",
      description: "Manage your healthcare appointments anytime, anywhere"
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Professional Care",
      description: "Connect with qualified healthcare professionals"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Your health information is protected and confidential"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-medical mb-8">
            <Stethoscope className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            DocCare System
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Professional Healthcare Management Platform for Patients, Doctors, and Administrators
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="medical"
              onClick={() => navigate('/login')}
              className="text-lg px-8 py-4"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <MedicalCard key={index} className="backdrop-blur-sm bg-white/95 border-white/20 hover:bg-white transition-medical">
              <MedicalCardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </MedicalCardContent>
            </MedicalCard>
          ))}
        </div>

        {/* Role-based Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MedicalCard className="backdrop-blur-sm bg-white/95 border-white/20 hover:scale-105 transition-bounce-custom">
            <MedicalCardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4 mx-auto">
                <Heart className="h-8 w-8 text-success" />
              </div>
              <MedicalCardTitle className="text-success">For Patients</MedicalCardTitle>
              <MedicalCardDescription>
                Book appointments, view medical history, and manage your healthcare
              </MedicalCardDescription>
            </MedicalCardHeader>
            <MedicalCardContent>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                  Schedule appointments online
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                  View doctor profiles and ratings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                  Track appointment history
                </li>
              </ul>
              <Button 
                variant="success" 
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Patient Login
              </Button>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard className="backdrop-blur-sm bg-white/95 border-white/20 hover:scale-105 transition-bounce-custom">
            <MedicalCardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <MedicalCardTitle className="text-primary">For Doctors</MedicalCardTitle>
              <MedicalCardDescription>
                Manage your schedule, view patient appointments, and update availability
              </MedicalCardDescription>
            </MedicalCardHeader>
            <MedicalCardContent>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Manage appointment schedule
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Update availability status
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  View patient information
                </li>
              </ul>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Doctor Login
              </Button>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard className="backdrop-blur-sm bg-white/95 border-white/20 hover:scale-105 transition-bounce-custom">
            <MedicalCardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4 mx-auto">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <MedicalCardTitle className="text-accent">For Administrators</MedicalCardTitle>
              <MedicalCardDescription>
                Manage users, oversee system operations, and monitor healthcare delivery
              </MedicalCardDescription>
            </MedicalCardHeader>
            <MedicalCardContent>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                  Manage user accounts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                  Monitor system performance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                  Generate reports and analytics
                </li>
              </ul>
              <Button 
                variant="accent" 
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Admin Login
              </Button>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-white/80">
          <p className="mb-2">© 2024 DocCare System. Professional Healthcare Management.</p>
          <p className="text-sm">Secure • Reliable • Professional</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
