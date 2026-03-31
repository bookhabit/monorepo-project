import { useAtom } from 'jotai';
import { currentStepAtom, FunnelStep } from '../store/account-opening';

const stepOrder: FunnelStep[] = ['identity', 'information', 'terms', 'complete'];

export function useFunnel() {
  const [currentStep, setCurrentStep] = useAtom(currentStepAtom);

  const goToNextStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const goToStep = (step: FunnelStep) => {
    setCurrentStep(step);
  };

  const canGoBack = stepOrder.indexOf(currentStep) > 0;
  const canGoNext = stepOrder.indexOf(currentStep) < stepOrder.length - 1;

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    canGoBack,
    canGoNext,
  };
}
