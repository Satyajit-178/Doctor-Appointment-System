import React from 'react';
import { Button } from '@/components/ui/button';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { useAuth } from '@/context/AuthContext';
import { Shield, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <MedicalCard className="w-full max-w-md backdrop-blur-sm bg-white/95 border-white/20">
        <MedicalCardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-4 mx-auto">
            <Shield className="h-8 w-8 text-destructive" />
          </div>
          <MedicalCardTitle className="text-destructive">Access Denied</MedicalCardTitle>
          <MedicalCardDescription>
            You don't have permission to access this page
          </MedicalCardDescription>
        </MedicalCardHeader>
        <MedicalCardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Please contact your administrator if you believe this is an error.
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button 
              variant="destructive" 
              onClick={logout}
              className="flex-1"
            >
              Logout
            </Button>
          </div>
        </MedicalCardContent>
      </MedicalCard>
    </div>
  );
};

export default Unauthorized;