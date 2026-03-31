import { ReactElement, ReactNode } from 'react';
import { FunnelStep } from '../../store/account-opening';

interface FunnelProps {
  step: FunnelStep;
  children: ReactNode;
}

export function Funnel({ step, children }: FunnelProps) {
  const steps = Array.isArray(children) ? children : [children];
  const currentStep = steps.find((child) => {
    return (child as ReactElement).props.name === step;
  });

  return <>{currentStep}</>;
}

interface StepProps {
  name: FunnelStep;
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <>{children}</>;
}

Funnel.Step = Step;
