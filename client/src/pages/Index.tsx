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
              onClick={() => navigate('/signup')}
              className="text-lg px-8 py-4 shadow-button"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/signin')}
              className="text-lg px-8 py-4 bg-card/95 border-2 border-primary/20 text-primary hover:bg-card hover:border-primary/40 shadow-button backdrop-blur-sm"
            >
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
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
                className="w-full shadow-button"
                onClick={() => navigate('/signup')}
              >
                Join as Patient
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
                className="w-full shadow-button"
                onClick={() => navigate('/signup')}
              >
                Join as Doctor
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
                className="w-full shadow-button"
                onClick={() => navigate('/signin')}
              >
                Admin Portal
              </Button>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-20 space-y-4">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-px bg-primary-foreground/20 flex-1"></div>
            <Stethoscope className="h-5 w-5 text-primary-foreground/60" />
            <div className="h-px bg-primary-foreground/20 flex-1"></div>
          </div>
          <p className="text-primary-foreground/90 text-lg font-medium">
            © 2024 DocCare System
          </p>
          <p className="text-primary-foreground/70 text-sm">
            Professional Healthcare Management Platform
          </p>
          <div className="flex justify-center items-center gap-6 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              Secure
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Reliable
            </span>
            <span className="flex items-center gap-1">
              <UserCheck className="h-4 w-4" />
              Professional
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
