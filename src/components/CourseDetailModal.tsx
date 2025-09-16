import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Clock, 
  Users, 
  Award, 
  BookOpen,
  CheckCircle,
  Star,
  Calendar,
  FileText,
  Video,
  Headphones,
  Download
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useEnrollment } from './EnrollmentProvider';

interface CourseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    instructor: string;
    duration: string;
    level: string;
    progress: number;
    status: string;
    students?: number;
    description?: string;
    skills?: string[];
    isRecommended?: boolean;
  } | null;
}

export function CourseDetailModal({ isOpen, onClose, course }: CourseDetailModalProps) {
  const [activeModule, setActiveModule] = useState(0);
  const { enrollInCourse, isEnrolled, updateCourseProgress } = useEnrollment();

  if (!course) return null;

  const modules = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      duration: '45 min',
      type: 'video',
      completed: true,
      locked: false,
    },
    {
      id: 2,
      title: 'Supervised Learning Algorithms',
      duration: '60 min',
      type: 'video',
      completed: true,
      locked: false,
    },
    {
      id: 3,
      title: 'Linear Regression Deep Dive',
      duration: '30 min',
      type: 'reading',
      completed: true,
      locked: false,
    },
    {
      id: 4,
      title: 'Hands-on: Building Your First Model',
      duration: '90 min',
      type: 'interactive',
      completed: false,
      locked: false,
      current: true,
    },
    {
      id: 5,
      title: 'Decision Trees and Random Forests',
      duration: '75 min',
      type: 'video',
      completed: false,
      locked: true,
    },
    {
      id: 6,
      title: 'Neural Networks Fundamentals',
      duration: '120 min',
      type: 'video',
      completed: false,
      locked: true,
    },
  ];

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'reading': return FileText;
      case 'interactive': return Play;
      case 'audio': return Headphones;
      default: return BookOpen;
    }
  };

  const getModuleTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-500/20 text-blue-300';
      case 'reading': return 'bg-green-500/20 text-green-300';
      case 'interactive': return 'bg-purple-500/20 text-purple-300';
      case 'audio': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-accent/20 text-accent';
    }
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
            className="glass-panel rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold">{course.title}</h2>
                    <Badge variant="secondary" className="bg-accent/20 text-accent">
                      {course.level}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">by {course.instructor}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{course.students?.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>4.8 (2,847 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-200px)]">
              <Tabs defaultValue="modules" className="flex w-full">
                {/* Sidebar */}
                <div className="w-80 border-r border-border">
                  <TabsList className="grid w-full grid-cols-2 m-4">
                    <TabsTrigger value="modules">Modules</TabsTrigger>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                  </TabsList>

                  <TabsContent value="modules" className="m-0 p-4 space-y-2">
                    {modules.map((module, index) => {
                      const Icon = getModuleIcon(module.type);
                      return (
                        <motion.div
                          key={module.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            module.current ? 'bg-accent/20 border border-accent/30' :
                            module.completed ? 'bg-green-500/10 border border-green-500/20' :
                            module.locked ? 'bg-muted/20 border border-muted/30 opacity-50 cursor-not-allowed' :
                            'bg-muted/10 border border-muted/20 hover:bg-muted/20'
                          }`}
                          onClick={() => !module.locked && setActiveModule(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getModuleTypeColor(module.type)}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{module.title}</h4>
                              <p className="text-xs text-muted-foreground">{module.duration}</p>
                            </div>
                            {module.completed && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            {module.current && (
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </TabsContent>

                  <TabsContent value="overview" className="m-0 p-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Course Description</h4>
                      <p className="text-sm text-muted-foreground">
                        Learn the fundamentals of machine learning with hands-on exercises and real-world applications. 
                        This course covers supervised and unsupervised learning algorithms.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">What You'll Learn</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Machine learning fundamentals</li>
                        <li>• Supervised learning algorithms</li>
                        <li>• Model evaluation techniques</li>
                        <li>• Feature engineering</li>
                        <li>• Neural network basics</li>
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-2">Prerequisites</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Basic Python programming</li>
                        <li>• Statistics fundamentals</li>
                        <li>• Linear algebra basics</li>
                      </ul>
                    </div>
                  </TabsContent>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6">
                  <div className="h-full flex flex-col">
                    {/* Current Module Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{modules[activeModule]?.title}</h3>
                          <p className="text-muted-foreground">Module {activeModule + 1} of {modules.length}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button className="gradient-button">
                            <Play className="w-4 h-4 mr-2" />
                            {modules[activeModule]?.completed ? 'Review' : 'Continue'}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Video/Content Area */}
                    <div className="flex-1 bg-muted/20 rounded-lg border border-muted/30 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                          <Play className="w-8 h-8 text-accent" />
                        </div>
                        <h4 className="font-medium mb-2">Ready to start?</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Click the play button to begin this module
                        </p>
                        <Button className="gradient-button">
                          Start Module
                        </Button>
                      </div>
                    </div>

                    {/* Module Navigation */}
                    <div className="flex justify-between items-center mt-6">
                      <Button 
                        variant="outline" 
                        disabled={activeModule === 0}
                        onClick={() => setActiveModule(Math.max(0, activeModule - 1))}
                      >
                        Previous Module
                      </Button>
                      <div className="flex gap-2">
                        {modules.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === activeModule ? 'bg-accent' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <Button 
                        variant="outline"
                        disabled={activeModule === modules.length - 1}
                        onClick={() => setActiveModule(Math.min(modules.length - 1, activeModule + 1))}
                      >
                        Next Module
                      </Button>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
