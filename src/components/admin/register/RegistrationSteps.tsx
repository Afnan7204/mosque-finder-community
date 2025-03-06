
import React from "react";

interface RegistrationStepsProps {
  currentStep: number;
}

export const RegistrationSteps = ({ currentStep }: RegistrationStepsProps) => {
  return (
    <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-mosque text-white' : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <span className="text-xs mt-1">Mosque Info</span>
      </div>
      <div className={`h-1 flex-grow mx-2 ${currentStep >= 2 ? 'bg-mosque' : 'bg-muted'}`} />
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-mosque text-white' : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
        <span className="text-xs mt-1">Details</span>
      </div>
      <div className={`h-1 flex-grow mx-2 ${currentStep >= 3 ? 'bg-mosque' : 'bg-muted'}`} />
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-mosque text-white' : 'bg-muted text-muted-foreground'}`}>
          3
        </div>
        <span className="text-xs mt-1">Account</span>
      </div>
    </div>
  );
};
