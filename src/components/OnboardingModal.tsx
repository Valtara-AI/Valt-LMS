import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BookOpen, Briefcase, CheckCircle, GraduationCap, Users, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useEnrollment } from './EnrollmentProvider';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [hasEnrolled, setHasEnrolled] = useState(false);
  const { availableCourses, enrollInCourse, isEnrolled } = useEnrollment();

  const roles = [
    { id: 'high-school', label: 'High School Student', icon: GraduationCap },
    { id: 'college', label: 'College Student', icon: BookOpen },
    { id: 'university', label: 'University Student', icon: Users },
    { id: 'instructor', label: 'Instructor', icon: Briefcase },
  ];

  const learningStyles = [
    { id: 'visual', label: 'Visual', description: 'Learn best with images, diagrams, and videos' },
    { id: 'auditory', label: 'Auditory', description: 'Prefer listening to lectures and discussions' },
    { id: 'reading', label: 'Reading/Writing', description: 'Learn through text and written materials' },
    { id: 'kinesthetic', label: 'Kinesthetic', description: 'Hands-on learning and interactive exercises' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      saveOnboardingData();
      onClose();
    }
  };

  const saveOnboardingData = () => {
    // Save user preferences to localStorage
    const onboardingData = {
      userRole,
      learningStyle,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem('onboarding-data', JSON.stringify(onboardingData));
  };

  const getRecommendedCourse = () => {
    // Logic to recommend course based on user preferences
    const roleBasedRecommendations = {
      'high-school': {
        primary: ['Digital Marketing Strategy', 'UX Design Principles'],
        reason: 'Great foundation courses for exploring different career paths'
      },
      'college': {
        primary: ['Data Visualization', 'Mobile App Development'],
        reason: 'Practical skills that complement your studies and boost employability'
      },
      'university': {
        primary: ['Advanced Data Structures', 'Blockchain Development'],
        reason: 'Advanced topics that align with cutting-edge research and technology'
      },
      'instructor': {
        primary: ['AI Ethics and Governance', 'Cybersecurity Fundamentals'],
        reason: 'Essential knowledge for modern educators and curriculum development'
      }
    };

    const styleBasedRecommendations = {
      'visual': {
        boost: ['Data Visualization', 'UX Design Principles'],
        reason: 'courses with rich visual content and interactive designs'
      },
      'auditory': {
        boost: ['AI Ethics and Governance', 'Digital Marketing Strategy'],
        reason: 'courses with discussion-based learning and audio content'
      },
      'reading': {
        boost: ['Blockchain Development', 'Cybersecurity Fundamentals'],
        reason: 'comprehensive reading materials and documentation-heavy subjects'
      },
      'kinesthetic': {
        boost: ['Mobile App Development', 'Advanced Data Structures'],
        reason: 'hands-on coding and practical implementation projects'
      }
    };

    // Get recommendations based on role
    const roleData = roleBasedRecommendations[userRole as keyof typeof roleBasedRecommendations];
    const styleData = styleBasedRecommendations[learningStyle as keyof typeof styleBasedRecommendations];
    
    if (!roleData) {
      return availableCourses.find(c => !isEnrolled(c.title)) ?? availableCourses[0];
    }

    // Try role-based recommendations first
    for (const title of roleData.primary) {
      const course = availableCourses.find(c => c.title === title);
      if (course && !isEnrolled(course.title)) {
        return {
          ...course,
          recommendationReason: `Recommended for ${roles.find(r => r.id === userRole)?.label.toLowerCase()}s - ${roleData.reason}`
        };
      }
    }

    // Try style-based recommendations
    if (styleData) {
      for (const title of styleData.boost) {
        const course = availableCourses.find(c => c.title === title);
        if (course && !isEnrolled(course.title)) {
          return {
            ...course,
            recommendationReason: `Perfect for ${learningStyles.find(s => s.id === learningStyle)?.label.toLowerCase()} learners - ${styleData.reason}`
          };
        }
      }
    }

    // Fallback to first available course
    const fallbackCourse = availableCourses.find(c => !isEnrolled(c.title)) ?? availableCourses[0];
    return {
      ...fallbackCourse,
      recommendationReason: 'A great starting point for your learning journey'
    };
  };

  const handleEnrollment = () => {
    const recommendedCourse = getRecommendedCourse();
    if (recommendedCourse) {
      enrollInCourse(recommendedCourse);
      setHasEnrolled(true);
      
      // Show additional success message
      setTimeout(() => {
        toast.success("🎯 Perfect match!", {
          description: "This course is tailored to your learning preferences. You're ready to start your journey!",
          duration: 4000,
        });
      }, 1000);
    }
  };

  const canProceed = () => {
    if (step === 1) return userRole !== '';
    if (step === 2) return learningStyle !== '';
    return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-panel rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold gradient-text">Welcome to Valt LMS</h2>
                <p className="text-muted-foreground mt-2">Let&apos;s personalize your learning experience</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s <= step ? 'bg-gradient-to-r from-accent to-secondary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      s < step ? 'bg-gradient-to-r from-accent to-secondary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">What&apos;s your role?</h3>
                    <p className="text-muted-foreground">Help us customize your experience</p>
                  </div>
                  
                  <RadioGroup value={userRole} onValueChange={setUserRole}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                          <Label
                            key={role.id}
                            htmlFor={role.id}
                            className="cursor-pointer"
                          >
                            <Card className={`p-4 transition-all duration-200 hover:shadow-lg ${
                              userRole === role.id ? 'border-accent shadow-[0_0_10px_rgba(24,214,200,0.3)]' : ''
                            }`}>
                              <CardContent className="flex items-center space-x-3 p-0">
                                <Icon className="w-6 h-6 text-accent" />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value={role.id} id={role.id} />
                                    <span className="font-medium">{role.label}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Label>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">How do you learn best?</h3>
                    <p className="text-muted-foreground">Choose your preferred learning style</p>
                  </div>
                  
                  <RadioGroup value={learningStyle} onValueChange={setLearningStyle}>
                    <div className="space-y-3">
                      {learningStyles.map((style) => (
                        <Label
                          key={style.id}
                          htmlFor={style.id}
                          className="cursor-pointer"
                        >
                          <Card className={`p-4 transition-all duration-200 hover:shadow-lg ${
                            learningStyle === style.id ? 'border-accent shadow-[0_0_10px_rgba(24,214,200,0.3)]' : ''
                          }`}>
                            <CardContent className="flex items-start space-x-3 p-0">
                              <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
                              <div className="flex-1">
                                <div className="font-medium mb-1">{style.label}</div>
                                <p className="text-sm text-muted-foreground">{style.description}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Based on your preferences as a <span className="text-accent font-medium">{roles.find(r => r.id === userRole)?.label.toLowerCase()}</span> with <span className="text-accent font-medium">{learningStyles.find(s => s.id === learningStyle)?.label.toLowerCase()}</span> learning style, here&apos;s our top recommendation:
                    </p>
                  </div>
                  
                  <Card className="glass-panel border-accent/30 shadow-[0_0_20px_rgba(24,214,200,0.2)]">
                    <CardContent className="p-6">
                      {(() => {
                        const recommendedCourse = getRecommendedCourse();
                        const isAlreadyEnrolled = recommendedCourse ? isEnrolled(recommendedCourse.title) : false;
                        
                        return (
                          <>
                            <h4 className="font-semibold mb-2">
                              {recommendedCourse?.title || 'Introduction to Machine Learning'}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              by {recommendedCourse?.instructor || 'Dr. Sarah Chen'}
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              {recommendedCourse?.description ?? 'Perfect for your learning style with interactive visualizations and hands-on exercises.'}
                            </p>
                            
                            {recommendedCourse?.recommendationReason && (
                              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
                                <p className="text-xs text-accent font-medium mb-1">Why this course?</p>
                                <p className="text-xs text-muted-foreground">
                                  {recommendedCourse.recommendationReason}
                                </p>
                              </div>
                            )}
                            
                            {recommendedCourse?.skills && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {recommendedCourse.skills.slice(0, 3).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}

                            <Button 
                              className={`w-full ${hasEnrolled ? 'bg-green-500 hover:bg-green-600' : 'gradient-button'}`}
                              onClick={handleEnrollment}
                              disabled={hasEnrolled || isAlreadyEnrolled}
                            >
                              {hasEnrolled ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Enrolled Successfully!
                                </>
                              ) : isAlreadyEnrolled ? (
                                'Already Enrolled'
                              ) : (
                                'Enroll in Recommended Course'
                              )}
                            </Button>

                            {(hasEnrolled || isAlreadyEnrolled) && (
                              <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-green-400 mt-2 text-center"
                              >
                                🎉 Great choice! Check your dashboard to start learning.
                              </motion.p>
                            )}
                          </>
                        );
                      })()}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              <Button
                className="gradient-button"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {step === 3 ? (hasEnrolled ? 'Start Learning!' : 'Get Started') : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
