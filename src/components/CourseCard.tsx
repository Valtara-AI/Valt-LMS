import { motion } from 'framer-motion';
import { CheckCircle, Clock, Play, Users } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

interface CourseCardProps {
  title: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  students?: number;
  isRecommended?: boolean;
  onContinue?: () => void;
  onEnroll?: () => void;
  onClick?: () => void;
  // Allow extra props from Course spread
  [key: string]: unknown;
}

export function CourseCard({
  title,
  instructor,
  duration,
  level,
  progress,
  status,
  students,
  isRecommended = false,
  onContinue,
  onEnroll,
  onClick,
  // Capture and discard extra Course properties
  ...rest
}: CourseCardProps) {
  void rest;
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-300';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300';
      case 'Advanced': return 'bg-red-500/20 text-red-300';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusAction = () => {
    if (status === 'completed') {
      return (
        <Button variant="outline" size="sm" className="w-full">
          <CheckCircle className="w-4 h-4 mr-2" />
          Completed
        </Button>
      );
    }
    
    if (status === 'in-progress') {
      return (
        <Button 
          className="w-full gradient-button" 
          size="sm"
          onClick={onContinue}
        >
          <Play className="w-4 h-4 mr-2" />
          Continue
        </Button>
      );
    }

    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full border-accent text-accent hover:bg-accent/10"
        onClick={onEnroll}
      >
        Enroll Now
      </Button>
    );
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`glass-panel rounded-xl p-6 cursor-pointer transition-all duration-300 flex flex-col h-full ${
        isRecommended ? 'border-accent shadow-[0_0_20px_rgba(24,214,200,0.3)]' : ''
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-3">by {instructor}</p>
        </div>
        {status === 'completed' && (
          <CheckCircle className="w-6 h-6 text-green-500 ml-2" />
        )}
      </div>

      {/* Course Info */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className={getLevelColor(level)}>
          {level}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        {students && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{students.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Progress */}
      {status !== 'not-started' && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2"
          />
        </div>
      )}

      {/* Action */}
      <div className="mt-auto">
        {getStatusAction()}
      </div>

      {isRecommended && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-gradient-to-r from-accent to-secondary px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">Recommended</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
