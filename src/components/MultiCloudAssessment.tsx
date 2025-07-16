import React from 'react';
import { AssessmentProvider, useAssessment } from '@/contexts/AssessmentContext';
import AssessmentLayout from '@/components/assessment/AssessmentLayout';
import IntroductionSection from '@/components/assessment/IntroductionSection';
import PsychologicalSection from '@/components/assessment/PsychologicalSection';
import TechnicalSection from '@/components/assessment/TechnicalSection';
import WISCARSection from '@/components/assessment/WISCARSection';
import ResultsSection from '@/components/assessment/ResultsSection';

const AssessmentContent: React.FC = () => {
  const { state } = useAssessment();

  const renderCurrentSection = () => {
    switch (state.currentSection) {
      case 'introduction':
        return <IntroductionSection />;
      case 'psychological':
        return <PsychologicalSection />;
      case 'technical':
        return <TechnicalSection />;
      case 'wiscar':
        return <WISCARSection />;
      case 'results':
        return <ResultsSection />;
      default:
        return <IntroductionSection />;
    }
  };

  return (
    <AssessmentLayout>
      {renderCurrentSection()}
    </AssessmentLayout>
  );
};

const MultiCloudAssessment: React.FC = () => {
  return (
    <AssessmentProvider>
      <AssessmentContent />
    </AssessmentProvider>
  );
};

export default MultiCloudAssessment;