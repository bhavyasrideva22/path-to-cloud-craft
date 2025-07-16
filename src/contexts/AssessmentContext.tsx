import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Assessment State Types
export interface AssessmentState {
  currentSection: 'introduction' | 'psychological' | 'technical' | 'wiscar' | 'results';
  progress: number;
  
  // Psychological Assessment Data
  psychologicalData: {
    interestScore: number;
    personalityScore: number;
    cognitiveScore: number;
    motivationScore: number;
    answers: Record<string, number>;
  };
  
  // Technical Assessment Data
  technicalData: {
    aptitudeScore: number;
    prerequisiteScore: number;
    domainScore: number;
    answers: Record<string, number>;
  };
  
  // WISCAR Framework Data
  wiscarData: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  
  // Final Results
  results: {
    overallScore: number;
    recommendation: 'yes' | 'maybe' | 'no';
    confidence: number;
    strengths: string[];
    gaps: string[];
    nextSteps: string[];
  };
}

// Initial State
const initialState: AssessmentState = {
  currentSection: 'introduction',
  progress: 0,
  psychologicalData: {
    interestScore: 0,
    personalityScore: 0,
    cognitiveScore: 0,
    motivationScore: 0,
    answers: {},
  },
  technicalData: {
    aptitudeScore: 0,
    prerequisiteScore: 0,
    domainScore: 0,
    answers: {},
  },
  wiscarData: {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0,
  },
  results: {
    overallScore: 0,
    recommendation: 'no',
    confidence: 0,
    strengths: [],
    gaps: [],
    nextSteps: [],
  },
};

// Action Types
type AssessmentAction = 
  | { type: 'SET_SECTION'; payload: AssessmentState['currentSection'] }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'UPDATE_PSYCHOLOGICAL'; payload: Partial<AssessmentState['psychologicalData']> }
  | { type: 'UPDATE_TECHNICAL'; payload: Partial<AssessmentState['technicalData']> }
  | { type: 'UPDATE_WISCAR'; payload: Partial<AssessmentState['wiscarData']> }
  | { type: 'UPDATE_RESULTS'; payload: Partial<AssessmentState['results']> }
  | { type: 'RESET_ASSESSMENT' };

// Reducer
const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case 'SET_SECTION':
      return { ...state, currentSection: action.payload };
    case 'UPDATE_PROGRESS':
      return { ...state, progress: action.payload };
    case 'UPDATE_PSYCHOLOGICAL':
      return {
        ...state,
        psychologicalData: { ...state.psychologicalData, ...action.payload },
      };
    case 'UPDATE_TECHNICAL':
      return {
        ...state,
        technicalData: { ...state.technicalData, ...action.payload },
      };
    case 'UPDATE_WISCAR':
      return {
        ...state,
        wiscarData: { ...state.wiscarData, ...action.payload },
      };
    case 'UPDATE_RESULTS':
      return {
        ...state,
        results: { ...state.results, ...action.payload },
      };
    case 'RESET_ASSESSMENT':
      return initialState;
    default:
      return state;
  }
};

// Context
const AssessmentContext = createContext<{
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
} | undefined>(undefined);

// Provider
export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
};

// Custom Hook
export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};