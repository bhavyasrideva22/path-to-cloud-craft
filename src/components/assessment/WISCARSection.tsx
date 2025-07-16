import React, { useState } from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight, Target, Zap, Brain, Code, TrendingUp, Globe } from 'lucide-react';

interface WISCARQuestion {
  id: string;
  text: string;
  dimension: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability' | 'realWorld';
  type: 'likert' | 'slider' | 'scenario';
  options?: { value: number; label: string }[];
}

const WISCARSection: React.FC = () => {
  const { state, dispatch } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const questions: WISCARQuestion[] = [
    // Will (Perseverance/Grit)
    {
      id: 'will_1',
      text: 'I stay focused even when learning gets hard and requires long hours of practice.',
      dimension: 'will',
      type: 'likert',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    {
      id: 'will_2',
      text: 'When facing a complex technical problem, I persist until I find a solution.',
      dimension: 'will',
      type: 'likert',
      options: [
        { value: 1, label: 'Strongly Disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly Agree' }
      ]
    },
    
    // Interest
    {
      id: 'interest_1',
      text: 'I find cloud architecture and multi-platform integration fascinating.',
      dimension: 'interest',
      type: 'likert',
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
      text: 'How interested are you in learning about different cloud platforms and comparing their features?',
      dimension: 'interest',
      type: 'slider'
    },
    
    // Skill
    {
      id: 'skill_1',
      text: 'How comfortable are you with deploying a Kubernetes cluster?',
      dimension: 'skill',
      type: 'likert',
      options: [
        { value: 1, label: 'Not comfortable at all' },
        { value: 2, label: 'Slightly comfortable' },
        { value: 3, label: 'Moderately comfortable' },
        { value: 4, label: 'Very comfortable' },
        { value: 5, label: 'Extremely comfortable' }
      ]
    },
    {
      id: 'skill_2',
      text: 'Rate your current skill level in scripting (Python, Bash, etc.)',
      dimension: 'skill',
      type: 'slider'
    },
    
    // Cognitive Readiness
    {
      id: 'cognitive_1',
      text: 'I can effectively analyze and solve logical problems involving multiple variables.',
      dimension: 'cognitive',
      type: 'likert',
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
      text: 'How well do you handle spatial and systems thinking challenges?',
      dimension: 'cognitive',
      type: 'slider'
    },
    
    // Ability to Learn
    {
      id: 'ability_1',
      text: 'Do you revise your learning methods when you get stuck on a concept?',
      dimension: 'ability',
      type: 'likert',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Always' }
      ]
    },
    {
      id: 'ability_2',
      text: 'How effectively do you adapt your learning strategy based on the complexity of the material?',
      dimension: 'ability',
      type: 'slider'
    },
    
    // Real-World Alignment
    {
      id: 'realWorld_1',
      text: 'Would you enjoy planning a hybrid cloud architecture for a large organization?',
      dimension: 'realWorld',
      type: 'likert',
      options: [
        { value: 1, label: 'Not at all' },
        { value: 2, label: 'Slightly' },
        { value: 3, label: 'Moderately' },
        { value: 4, label: 'Very much' },
        { value: 5, label: 'Extremely' }
      ]
    },
    {
      id: 'realWorld_2',
      text: 'How interested are you in troubleshooting complex multi-cloud deployment issues?',
      dimension: 'realWorld',
      type: 'slider'
    },
    {
      id: 'realWorld_3',
      text: 'Rate your interest in working with teams to implement cloud security policies across multiple platforms.',
      dimension: 'realWorld',
      type: 'slider'
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
      // Calculate WISCAR scores and move to results
      calculateWISCARScores();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateWISCARScores = () => {
    const dimensions = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
    const wiscarScores: Record<string, number> = {};

    dimensions.forEach(dimension => {
      const dimensionQuestions = questions.filter(q => q.dimension === dimension);
      const totalScore = dimensionQuestions.reduce((sum, q) => {
        const answer = answers[q.id] || 0;
        return sum + (q.type === 'slider' ? answer : answer);
      }, 0);
      
      // Normalize to 0-100 scale
      const maxPossibleScore = dimensionQuestions.length * 5;
      wiscarScores[dimension] = (totalScore / maxPossibleScore) * 100;
    });

    // Also incorporate previous assessment data
    const psychoAverage = (
      state.psychologicalData.interestScore +
      state.psychologicalData.personalityScore +
      state.psychologicalData.cognitiveScore +
      state.psychologicalData.motivationScore
    ) / 4;

    const techAverage = (
      state.technicalData.aptitudeScore +
      state.technicalData.prerequisiteScore +
      state.technicalData.domainScore
    ) / 3;

    // Adjust WISCAR scores based on previous assessments
    const adjustedWiscarData = {
      will: wiscarScores.will,
      interest: Math.max(wiscarScores.interest, state.psychologicalData.interestScore),
      skill: Math.max(wiscarScores.skill, techAverage * 0.7),
      cognitive: Math.max(wiscarScores.cognitive, state.technicalData.aptitudeScore),
      ability: wiscarScores.ability,
      realWorld: wiscarScores.realWorld,
    };

    dispatch({
      type: 'UPDATE_WISCAR',
      payload: adjustedWiscarData
    });

    // Calculate overall results
    calculateFinalResults(adjustedWiscarData, psychoAverage, techAverage);
  };

  const calculateFinalResults = (wiscarData: any, psychoAverage: number, techAverage: number) => {
    // Calculate overall score (weighted average)
    const overallScore = 
      (wiscarData.will * 0.15) +
      (wiscarData.interest * 0.20) +
      (wiscarData.skill * 0.25) +
      (wiscarData.cognitive * 0.15) +
      (wiscarData.ability * 0.10) +
      (wiscarData.realWorld * 0.15);

    // Determine recommendation
    let recommendation: 'yes' | 'maybe' | 'no' = 'no';
    let confidence = 0;

    if (overallScore >= 75) {
      recommendation = 'yes';
      confidence = 85 + (overallScore - 75) * 0.6;
    } else if (overallScore >= 60) {
      recommendation = 'maybe';
      confidence = 70 + (overallScore - 60) * 0.8;
    } else {
      recommendation = 'no';
      confidence = 60 + (overallScore / 60) * 0.5;
    }

    // Identify strengths and gaps
    const strengths = [];
    const gaps = [];

    if (wiscarData.interest >= 70) strengths.push('High interest in cloud technology');
    if (wiscarData.cognitive >= 70) strengths.push('Strong analytical thinking');
    if (wiscarData.will >= 70) strengths.push('High perseverance and grit');
    if (wiscarData.skill >= 70) strengths.push('Good technical foundation');

    if (wiscarData.skill < 60) gaps.push('Technical skills need development');
    if (wiscarData.cognitive < 60) gaps.push('Analytical thinking could be improved');
    if (wiscarData.realWorld < 60) gaps.push('Real-world application understanding');

    // Next steps based on recommendation
    const nextSteps = [];
    if (recommendation === 'yes') {
      nextSteps.push('Start with foundational cloud certifications (AWS CCP, Azure Fundamentals)');
      nextSteps.push('Learn Python and Bash scripting');
      nextSteps.push('Practice with hands-on labs (Qwiklabs, A Cloud Guru)');
      nextSteps.push('Build personal cloud projects');
    } else if (recommendation === 'maybe') {
      nextSteps.push('Explore cloud roles via internships or entry-level positions');
      nextSteps.push('Take free cloud fundamentals courses');
      nextSteps.push('Work on small cloud projects to build experience');
      nextSteps.push('Join cloud computing communities and forums');
    } else {
      nextSteps.push('Consider adjacent careers: Technical Project Manager, Data Analyst');
      nextSteps.push('Strengthen foundational IT skills first');
      nextSteps.push('Explore other technology career paths');
    }

    dispatch({
      type: 'UPDATE_RESULTS',
      payload: {
        overallScore,
        recommendation,
        confidence,
        strengths,
        gaps,
        nextSteps
      }
    });

    dispatch({ type: 'SET_SECTION', payload: 'results' });
    dispatch({ type: 'UPDATE_PROGRESS', payload: 100 });
  };

  const getDimensionIcon = (dimension: string) => {
    switch (dimension) {
      case 'will':
        return <Zap className="w-5 h-5 text-assessment-wiscar" />;
      case 'interest':
        return <Target className="w-5 h-5 text-assessment-wiscar" />;
      case 'skill':
        return <Code className="w-5 h-5 text-assessment-wiscar" />;
      case 'cognitive':
        return <Brain className="w-5 h-5 text-assessment-wiscar" />;
      case 'ability':
        return <TrendingUp className="w-5 h-5 text-assessment-wiscar" />;
      case 'realWorld':
        return <Globe className="w-5 h-5 text-assessment-wiscar" />;
      default:
        return <Target className="w-5 h-5 text-assessment-wiscar" />;
    }
  };

  const getDimensionTitle = (dimension: string) => {
    switch (dimension) {
      case 'will':
        return 'Will (Perseverance)';
      case 'interest':
        return 'Interest';
      case 'skill':
        return 'Skill';
      case 'cognitive':
        return 'Cognitive Readiness';
      case 'ability':
        return 'Ability to Learn';
      case 'realWorld':
        return 'Real-World Alignment';
      default:
        return 'WISCAR Assessment';
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
              {getDimensionIcon(currentQuestion.dimension)}
              <div>
                <CardTitle className="text-lg">
                  {getDimensionTitle(currentQuestion.dimension)}
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
            
            {currentQuestion.type === 'likert' && currentQuestion.options && (
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
            )}
            
            {currentQuestion.type === 'slider' && (
              <div className="space-y-4">
                <div className="px-4">
                  <Slider
                    value={[currentAnswer || 50]}
                    onValueChange={([value]) => handleAnswer(currentQuestion.id, value)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Not at all (0)</span>
                  <span>Current: {currentAnswer || 50}</span>
                  <span>Extremely (100)</span>
                </div>
              </div>
            )}
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
              {currentQuestionIndex === questions.length - 1 ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WISCARSection;