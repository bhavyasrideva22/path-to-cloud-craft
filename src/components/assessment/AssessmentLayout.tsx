import React from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Code, 
  Target, 
  ChartBar,
  CheckCircle,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

interface AssessmentLayoutProps {
  children: React.ReactNode;
}

const AssessmentLayout: React.FC<AssessmentLayoutProps> = ({ children }) => {
  const { state, dispatch } = useAssessment();

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: BookOpen,
      color: 'assessment-intro',
      completed: state.currentSection !== 'introduction' || state.progress > 0,
    },
    {
      id: 'psychological',
      title: 'Psychological Fit',
      icon: Brain,
      color: 'assessment-psycho',
      completed: state.currentSection === 'technical' || state.currentSection === 'wiscar' || state.currentSection === 'results',
    },
    {
      id: 'technical',
      title: 'Technical Aptitude',
      icon: Code,
      color: 'assessment-technical',
      completed: state.currentSection === 'wiscar' || state.currentSection === 'results',
    },
    {
      id: 'wiscar',
      title: 'WISCAR Analysis',
      icon: Target,
      color: 'assessment-wiscar',
      completed: state.currentSection === 'results',
    },
    {
      id: 'results',
      title: 'Your Results',
      icon: ChartBar,
      color: 'assessment-results',
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card border-b shadow-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Is Multi-Cloud Engineering Right for You?
              </h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive Career Assessment & Guidance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>25-30 minutes</span>
              </Badge>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {Math.round(state.progress)}% Complete
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <Progress value={state.progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = state.currentSection === section.id;
              const isCompleted = section.completed;
              
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={`flex items-center space-x-2 py-6 px-4 border-b-2 transition-colors ${
                    isActive 
                      ? 'border-primary text-primary' 
                      : isCompleted 
                        ? 'border-transparent text-success hover:text-success' 
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => dispatch({ type: 'SET_SECTION', payload: section.id as any })}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="whitespace-nowrap">{section.title}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Personalized Results</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Career Guidance</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Multi-Cloud Engineer Assessment Framework
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AssessmentLayout;