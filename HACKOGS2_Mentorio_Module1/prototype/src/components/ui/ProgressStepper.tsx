import React from 'react';
import './ProgressStepper.css';

interface ProgressStepperProps {
  steps: string[];
  currentStep: number;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <React.Fragment key={step}>
            <div className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-number">
                {isCompleted ? '✓' : `0${index + 1}`}
              </div>
              <div className="step-label">{step}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-divider ${isCompleted ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
