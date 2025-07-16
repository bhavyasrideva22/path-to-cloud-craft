import React from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Code, 
  Shield, 
  Zap, 
  Users, 
  Target, 
  ArrowRight,
  CloudSnow,
  Server,
  GitBranch,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';

const IntroductionSection: React.FC = () => {
  const { dispatch } = useAssessment();

  const handleStartAssessment = () => {
    dispatch({ type: 'SET_SECTION', payload: 'psychological' });
    dispatch({ type: 'UPDATE_PROGRESS', payload: 20 });
  };

  const careerRoles = [
    { title: 'Multi-Cloud Engineer', icon: Cloud, description: 'Manage infrastructure across multiple cloud platforms' },
    { title: 'Cloud Solutions Architect', icon: Server, description: 'Design end-to-end cloud solutions' },
    { title: 'DevOps Engineer', icon: GitBranch, description: 'Automate CI/CD pipelines across clouds' },
    { title: 'Cloud Security Engineer', icon: Shield, description: 'Ensure compliance and security' },
    { title: 'Site Reliability Engineer', icon: Zap, description: 'Maintain uptime and performance' },
  ];

  const idealTraits = [
    'High analytical and logical thinking',
    'Curiosity to explore complex systems',
    'Structured problem-solving approach',
    'Consistent learning attitude',
    'Adaptability in fast-evolving tech',
    'Strong attention to detail',
  ];

  const assessmentModules = [
    {
      number: 1,
      title: 'Psychological Fit Evaluation',
      description: 'Assess your interests, personality, and motivation alignment',
      color: 'assessment-psycho'
    },
    {
      number: 2,
      title: 'Technical Aptitude Testing',
      description: 'Evaluate your technical readiness and aptitude',
      color: 'assessment-technical'
    },
    {
      number: 3,
      title: 'WISCAR Framework Analysis',
      description: 'Comprehensive multi-dimensional assessment',
      color: 'assessment-wiscar'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-hero border-0 shadow-elegant">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <CloudSnow className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                Discover Your Multi-Cloud Engineering Potential
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
              and career alignment for a future in multi-cloud engineering and architecture.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>25-30 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Personalized Results</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Career Guidance</span>
              </div>
            </div>
            
            <Button 
              onClick={handleStartAssessment}
              size="lg"
              className="bg-gradient-primary hover:shadow-elegant transition-all"
            >
              Start Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* What is Multi-Cloud Engineering */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-primary" />
            <span>What is Multi-Cloud Engineering?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            A <strong>Multi-Cloud Engineer</strong> manages applications, workloads, and infrastructure across multiple 
            cloud service providers like AWS, Azure, Google Cloud, and others. The role requires deep understanding 
            of cloud platforms, interoperability, automation, security, and DevOps practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-gradient-card rounded-lg">
              <Cloud className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-semibold">Cloud Platform</h4>
                <p className="text-sm text-muted-foreground">Scalable, secure, and accessible</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gradient-card rounded-lg">
              <Zap className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-semibold">Automation</h4>
                <p className="text-sm text-muted-foreground">Streamline processes and reduce manual work</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gradient-card rounded-lg">
              <Server className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-semibold">Enterprise Scale</h4>
                <p className="text-sm text-muted-foreground">Used by Fortune 500 companies</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Career Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerRoles.map((role, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-card rounded-lg">
                <role.icon className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">{role.title}</h4>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ideal Traits & Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Ideal Traits & Skills</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {idealTraits.map((trait, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What You'll Discover */}
      <Card>
        <CardHeader>
          <CardTitle>What You'll Discover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Assessment Modules:</h4>
              <div className="space-y-3">
                {assessmentModules.map((module) => (
                  <div key={module.number} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {module.number}
                    </div>
                    <div>
                      <h5 className="font-medium">{module.title}</h5>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Your Results Include:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm">Personalized fit score (0-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm">Detailed trait analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm">Technical readiness assessment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm">Career pathway recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm">Next steps and learning resources</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm">WISCAR framework analysis</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntroductionSection;