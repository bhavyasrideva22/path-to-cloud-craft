import React from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import WISCARRadarChart from './RadarChart';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Users, 
  Award,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

const ResultsSection: React.FC = () => {
  const { state, dispatch } = useAssessment();

  const handleRetakeAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'maybe':
        return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'no':
        return <XCircle className="w-6 h-6 text-destructive" />;
      default:
        return <AlertCircle className="w-6 h-6 text-warning" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return 'bg-success text-success-foreground';
      case 'maybe':
        return 'bg-warning text-warning-foreground';
      case 'no':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-warning text-warning-foreground';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return 'Multi-Cloud Engineering is an excellent fit for you!';
      case 'maybe':
        return 'Multi-Cloud Engineering could be a good fit with some preparation.';
      case 'no':
        return 'Multi-Cloud Engineering may not be the best fit at this time.';
      default:
        return 'Assessment incomplete';
    }
  };

  const careerRoles = [
    { 
      title: 'Multi-Cloud Engineer', 
      match: state.results.overallScore >= 75 ? 'High' : state.results.overallScore >= 60 ? 'Medium' : 'Low',
      description: 'Manage infrastructure across multiple cloud platforms'
    },
    { 
      title: 'Cloud Security Engineer', 
      match: state.wiscarData.cognitive >= 70 ? 'High' : state.wiscarData.cognitive >= 60 ? 'Medium' : 'Low',
      description: 'Ensure compliance and security across clouds'
    },
    { 
      title: 'DevOps Engineer', 
      match: state.wiscarData.skill >= 70 ? 'High' : state.wiscarData.skill >= 60 ? 'Medium' : 'Low',
      description: 'Automate CI/CD pipelines across clouds'
    },
    { 
      title: 'Solutions Architect', 
      match: state.wiscarData.realWorld >= 70 ? 'High' : state.wiscarData.realWorld >= 60 ? 'Medium' : 'Low',
      description: 'Design end-to-end multi-cloud systems'
    },
    { 
      title: 'Site Reliability Engineer', 
      match: state.wiscarData.will >= 70 ? 'High' : state.wiscarData.will >= 60 ? 'Medium' : 'Low',
      description: 'Maintain uptime and performance'
    },
  ];

  const skillsMapping = [
    { skill: 'Networking Basics', match: state.technicalData.prerequisiteScore, gap: 100 - state.technicalData.prerequisiteScore },
    { skill: 'Scripting (Python/Bash)', match: state.wiscarData.skill, gap: 100 - state.wiscarData.skill },
    { skill: 'Cloud Concepts', match: state.technicalData.domainScore, gap: 100 - state.technicalData.domainScore },
    { skill: 'DevOps Tools', match: state.wiscarData.realWorld, gap: 100 - state.wiscarData.realWorld },
  ];

  const learningPath = [
    {
      level: 'Beginner',
      topics: ['Cloud Basics', 'OS fundamentals', 'Basic scripting'],
      recommended: state.results.overallScore < 60
    },
    {
      level: 'Intermediate',
      topics: ['Deep dive into AWS/Azure/GCP', 'Infrastructure as Code', 'Docker/Kubernetes'],
      recommended: state.results.overallScore >= 60 && state.results.overallScore < 80
    },
    {
      level: 'Job-Ready',
      topics: ['Project-based learning', 'CI/CD pipelines', 'Security practices'],
      recommended: state.results.overallScore >= 80
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Main Results Card */}
      <Card className="bg-gradient-hero border-0 shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {getRecommendationIcon(state.results.recommendation)}
            <CardTitle className="text-3xl">Your Assessment Results</CardTitle>
          </div>
          <Badge className={`${getRecommendationColor(state.results.recommendation)} text-lg px-4 py-2`}>
            {getRecommendationText(state.results.recommendation)}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round(state.results.overallScore)}
              </div>
              <div className="text-sm text-muted-foreground">Overall Fit Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round(state.results.confidence)}%
              </div>
              <div className="text-sm text-muted-foreground">Confidence Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {state.results.recommendation.toUpperCase()}
              </div>
              <div className="text-sm text-muted-foreground">Recommendation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WISCAR Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>WISCAR Framework Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <WISCARRadarChart data={state.wiscarData} />
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold mb-3">Dimension Breakdown:</h4>
              {Object.entries(state.wiscarData).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize font-medium">{key}</span>
                    <span className="text-sm text-muted-foreground">{Math.round(value)}/100</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths and Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span>Your Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {state.results.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full mt-2" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-warning">
              <AlertCircle className="w-5 h-5" />
              <span>Areas to Develop</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {state.results.gaps.map((gap, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                  <span className="text-sm">{gap}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Career Roles Match */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Career Role Compatibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {careerRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                <div>
                  <h4 className="font-semibold">{role.title}</h4>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <Badge 
                  variant={role.match === 'High' ? 'default' : role.match === 'Medium' ? 'secondary' : 'outline'}
                  className={role.match === 'High' ? 'bg-success' : role.match === 'Medium' ? 'bg-warning' : ''}
                >
                  {role.match} Match
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Mapping */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Skills Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillsMapping.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.skill}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(skill.match)}% proficiency
                  </span>
                </div>
                <Progress value={skill.match} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Gap: {skill.gap > 40 ? 'High' : skill.gap > 20 ? 'Moderate' : 'Low'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Recommended Learning Path</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath.map((level, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 ${
                  level.recommended 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted bg-muted/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{level.level}</h4>
                  {level.recommended && (
                    <Badge className="bg-primary">Recommended</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {level.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Your Next Steps</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {state.results.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={handleRetakeAssessment}
          variant="outline"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake Assessment
        </Button>
        <Button 
          size="lg"
          className="bg-gradient-primary"
          onClick={() => window.open('https://aws.amazon.com/training/', '_blank')}
        >
          Start Learning
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;