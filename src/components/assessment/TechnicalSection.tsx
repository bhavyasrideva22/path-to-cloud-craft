import React, { useState } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Code, Brain, Database, Cloud } from 'lucide-react';

interface TechnicalQuestion {
  id: string;
  text: string;
  category: 'aptitude' | 'prerequisite' | 'domain';
  options: { value: number; label: string; isCorrect?: boolean }[];
}

const TechnicalSection: React.FC = () => {
  const { state, dispatch } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(state.technicalData.answers);

  const questions: TechnicalQuestion[] = [
    // General Aptitude Questions
    {
      id: 'aptitude_1',
      text: 'If Server A can process 100 requests per second and Server B can process 150 requests per second, how many requests can they process together in 10 seconds?',
      category: 'aptitude',
      options: [
        { value: 1, label: '1500 requests' },
        { value: 2, label: '2000 requests' },
        { value: 3, label: '2500 requests', isCorrect: true },
        { value: 4, label: '3000 requests' }
      ]
    },
    {
      id: 'aptitude_2',
      text: 'A cloud service has 99.9% uptime. In a 30-day month, approximately how many minutes of downtime is this?',
      category: 'aptitude',
      options: [
        { value: 1, label: '43 minutes', isCorrect: true },
        { value: 2, label: '72 minutes' },
        { value: 3, label: '144 minutes' },
        { value: 4, label: '216 minutes' }
      ]
    },
    {
      id: 'aptitude_3',
      text: 'If you have 8 servers and each server needs to communicate with every other server, how many connections are needed?',
      category: 'aptitude',
      options: [
        { value: 1, label: '16 connections' },
        { value: 2, label: '28 connections', isCorrect: true },
        { value: 3, label: '32 connections' },
        { value: 4, label: '64 connections' }
      ]
    },
    {
      id: 'aptitude_4',
      text: 'A database query takes 2 seconds to process 1000 records. How long will it take to process 5000 records assuming linear scaling?',
      category: 'aptitude',
      options: [
        { value: 1, label: '8 seconds' },
        { value: 2, label: '10 seconds', isCorrect: true },
        { value: 3, label: '12 seconds' },
        { value: 4, label: '15 seconds' }
      ]
    },

    // Prerequisite Knowledge Questions
    {
      id: 'prerequisite_1',
      text: 'Which of the following is NOT a valid private IP address range?',
      category: 'prerequisite',
      options: [
        { value: 1, label: '192.168.0.0/16' },
        { value: 2, label: '10.0.0.0/8' },
        { value: 3, label: '172.16.0.0/12' },
        { value: 4, label: '192.169.0.0/16', isCorrect: true }
      ]
    },
    {
      id: 'prerequisite_2',
      text: 'What does the "chmod 755" command do in Linux?',
      category: 'prerequisite',
      options: [
        { value: 1, label: 'Gives full permissions to everyone' },
        { value: 2, label: 'Gives read, write, execute to owner; read, execute to group and others', isCorrect: true },
        { value: 3, label: 'Gives read and write to owner only' },
        { value: 4, label: 'Gives execute permission to everyone' }
      ]
    },
    {
      id: 'prerequisite_3',
      text: 'In Python, what does the following code output: print(len([1, 2, 3, 4, 5]))?',
      category: 'prerequisite',
      options: [
        { value: 1, label: '4' },
        { value: 2, label: '5', isCorrect: true },
        { value: 3, label: '6' },
        { value: 4, label: 'Error' }
      ]
    },
    {
      id: 'prerequisite_4',
      text: 'What is the primary purpose of virtualization?',
      category: 'prerequisite',
      options: [
        { value: 1, label: 'To increase hardware performance' },
        { value: 2, label: 'To run multiple operating systems on a single physical machine', isCorrect: true },
        { value: 3, label: 'To improve network security' },
        { value: 4, label: 'To reduce software licensing costs' }
      ]
    },

    // Domain-Specific Questions
    {
      id: 'domain_1',
      text: 'Which of the following is an example of Platform as a Service (PaaS)?',
      category: 'domain',
      options: [
        { value: 1, label: 'Amazon EC2' },
        { value: 2, label: 'Google App Engine', isCorrect: true },
        { value: 3, label: 'Microsoft Office 365' },
        { value: 4, label: 'Dropbox' }
      ]
    },
    {
      id: 'domain_2',
      text: 'What is the primary benefit of a multi-cloud strategy?',
      category: 'domain',
      options: [
        { value: 1, label: 'Lower costs' },
        { value: 2, label: 'Avoiding vendor lock-in and improving redundancy', isCorrect: true },
        { value: 3, label: 'Faster performance' },
        { value: 4, label: 'Easier management' }
      ]
    },
    {
      id: 'domain_3',
      text: 'Which tool is commonly used for Infrastructure as Code (IaC)?',
      category: 'domain',
      options: [
        { value: 1, label: 'Docker' },
        { value: 2, label: 'Kubernetes' },
        { value: 3, label: 'Terraform', isCorrect: true },
        { value: 4, label: 'Jenkins' }
      ]
    },
    {
      id: 'domain_4',
      text: 'What does "high availability" typically mean in cloud computing?',
      category: 'domain',
      options: [
        { value: 1, label: 'Fast processing speed' },
        { value: 2, label: 'Low cost' },
        { value: 3, label: 'System uptime of 99.9% or higher', isCorrect: true },
        { value: 4, label: 'Large storage capacity' }
      ]
    },
    {
      id: 'domain_5',
      text: 'Which of the following is a key principle of DevOps?',
      category: 'domain',
      options: [
        { value: 1, label: 'Waterfall development' },
        { value: 2, label: 'Continuous integration and continuous deployment', isCorrect: true },
        { value: 3, label: 'Manual testing only' },
        { value: 4, label: 'Separate development and operations teams' }
      ]
    },
    {
      id: 'domain_6',
      text: 'What is the main purpose of container orchestration tools like Kubernetes?',
      category: 'domain',
      options: [
        { value: 1, label: 'To write containerized applications' },
        { value: 2, label: 'To manage, scale, and deploy containerized applications', isCorrect: true },
        { value: 3, label: 'To create virtual machines' },
        { value: 4, label: 'To monitor network traffic' }
      ]
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate scores and move to next section
      calculateScores();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScores = () => {
    const aptitudeQuestions = questions.filter(q => q.category === 'aptitude');
    const prerequisiteQuestions = questions.filter(q => q.category === 'prerequisite');
    const domainQuestions = questions.filter(q => q.category === 'domain');

    const calculateCategoryScore = (categoryQuestions: TechnicalQuestion[]) => {
      const correctAnswers = categoryQuestions.reduce((count, q) => {
        const userAnswer = answers[q.id];
        const correctOption = q.options.find(opt => opt.isCorrect);
        return count + (userAnswer === correctOption?.value ? 1 : 0);
      }, 0);
      return (correctAnswers / categoryQuestions.length) * 100;
    };

    const aptitudeScore = calculateCategoryScore(aptitudeQuestions);
    const prerequisiteScore = calculateCategoryScore(prerequisiteQuestions);
    const domainScore = calculateCategoryScore(domainQuestions);

    dispatch({
      type: 'UPDATE_TECHNICAL',
      payload: {
        aptitudeScore,
        prerequisiteScore,
        domainScore,
        answers
      }
    });

    dispatch({ type: 'SET_SECTION', payload: 'wiscar' });
    dispatch({ type: 'UPDATE_PROGRESS', payload: 75 });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'aptitude':
        return <Brain className="w-5 h-5 text-assessment-technical" />;
      case 'prerequisite':
        return <Code className="w-5 h-5 text-assessment-technical" />;
      case 'domain':
        return <Cloud className="w-5 h-5 text-assessment-technical" />;
      default:
        return <Code className="w-5 h-5 text-assessment-technical" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'aptitude':
        return 'General Aptitude';
      case 'prerequisite':
        return 'Prerequisite Knowledge';
      case 'domain':
        return 'Domain-Specific Knowledge';
      default:
        return 'Technical Assessment';
    }
  };

  const currentAnswer = answers[currentQuestion.id];
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getCategoryIcon(currentQuestion.category)}
              <div>
                <CardTitle className="text-lg">
                  {getCategoryTitle(currentQuestion.category)}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {currentQuestion.text}
            </h3>
            
            <RadioGroup
              value={currentAnswer?.toString()}
              onValueChange={(value) => handleAnswer(currentQuestion.id, parseInt(value))}
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                  <Label htmlFor={option.value.toString()} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-gradient-primary"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Complete Section' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalSection;