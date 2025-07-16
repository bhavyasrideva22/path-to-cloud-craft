import React, { useState } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Brain, Heart, Lightbulb, Target } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  category: 'interest' | 'personality' | 'cognitive' | 'motivation';
  options: { value: number; label: string }[];
}

const PsychologicalSection: React.FC = () => {
  const { state, dispatch } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(state.psychologicalData.answers);

  const questions: Question[] = [
    // Interest Scale Questions
    {
      id: 'interest_1',
      text: 'I often explore how cloud systems work in my free time.',
      category: 'interest',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'interest_2',
      text: 'I follow tech trends in cloud infrastructure and DevOps.',
      category: 'interest',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'interest_3',
      text: 'I enjoy learning about different cloud platforms and comparing their features.',
      category: 'interest',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'interest_4',
      text: 'I find automation and infrastructure-as-code concepts fascinating.',
      category: 'interest',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    
    // Personality Questions
    {
      id: 'personality_1',
      text: 'I prefer working on complex, multi-layered technical problems.',
      category: 'personality',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'personality_2',
      text: 'I am comfortable dealing with ambiguous situations and changing requirements.',
      category: 'personality',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'personality_3',
      text: 'I tend to be very detail-oriented and methodical in my approach.',
      category: 'personality',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'personality_4',
      text: 'I enjoy collaborating with teams while also working independently.',
      category: 'personality',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    
    // Cognitive Style Questions
    {
      id: 'cognitive_1',
      text: 'I prefer structured, systematic approaches to problem-solving.',
      category: 'cognitive',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'cognitive_2',
      text: 'I enjoy analyzing patterns and relationships in complex systems.',
      category: 'cognitive',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'cognitive_3',
      text: 'I can effectively balance multiple priorities and contexts.',
      category: 'cognitive',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    
    // Motivation Questions
    {
      id: 'motivation_1',
      text: 'I stay focused even when learning gets challenging and complex.',
      category: 'motivation',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'motivation_2',
      text: 'I am motivated by the opportunity to work with cutting-edge technology.',
      category: 'motivation',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'motivation_3',
      text: 'I value job security and career growth opportunities in technology.',
      category: 'motivation',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'motivation_4',
      text: 'I am driven by curiosity and the desire to master complex concepts.',
      category: 'motivation',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
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
    const interestQuestions = questions.filter(q => q.category === 'interest');
    const personalityQuestions = questions.filter(q => q.category === 'personality');
    const cognitiveQuestions = questions.filter(q => q.category === 'cognitive');
    const motivationQuestions = questions.filter(q => q.category === 'motivation');

    const calculateCategoryScore = (categoryQuestions: Question[]) => {
      const totalScore = categoryQuestions.reduce((sum, q) => {
        return sum + (answers[q.id] || 0);
      }, 0);
      return (totalScore / (categoryQuestions.length * 5)) * 100;
    };

    const interestScore = calculateCategoryScore(interestQuestions);
    const personalityScore = calculateCategoryScore(personalityQuestions);
    const cognitiveScore = calculateCategoryScore(cognitiveQuestions);
    const motivationScore = calculateCategoryScore(motivationQuestions);

    dispatch({
      type: 'UPDATE_PSYCHOLOGICAL',
      payload: {
        interestScore,
        personalityScore,
        cognitiveScore,
        motivationScore,
        answers
      }
    });

    dispatch({ type: 'SET_SECTION', payload: 'technical' });
    dispatch({ type: 'UPDATE_PROGRESS', payload: 50 });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'interest':
        return <Heart className="w-5 h-5 text-assessment-psycho" />;
      case 'personality':
        return <Brain className="w-5 h-5 text-assessment-psycho" />;
      case 'cognitive':
        return <Lightbulb className="w-5 h-5 text-assessment-psycho" />;
      case 'motivation':
        return <Target className="w-5 h-5 text-assessment-psycho" />;
      default:
        return <Brain className="w-5 h-5 text-assessment-psycho" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'interest':
        return 'Interest Scale';
      case 'personality':
        return 'Personality Compatibility';
      case 'cognitive':
        return 'Cognitive Style';
      case 'motivation':
        return 'Motivation Assessment';
      default:
        return 'Assessment';
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

export default PsychologicalSection;