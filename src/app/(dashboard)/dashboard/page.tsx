'use client';

import { CourseCard } from '@/components/CourseCard';
import { CourseDetailModal } from '@/components/CourseDetailModal';
import type { Course } from '@/components/EnrollmentProvider';
import { useEnrollment } from '@/components/EnrollmentProvider';
import { KPITile } from '@/components/KPITile';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const { enrolledCourses, availableCourses, enrollInCourse, updateCourseProgress } = useEnrollment();
  const router = useRouter();

  // Calculate KPIs from enrollment data
  const completedCount = enrolledCourses.filter(course => course.status === 'completed').length;
  const inProgressCount = enrolledCourses.filter(course => course.status === 'in-progress').length;
  const totalEnrolled = enrolledCourses.length;
  const averageProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)
    : 0;

  const kpiData = [
    { title: 'Total Courses', value: totalEnrolled, icon: BookOpen, color: 'accent' as const },
    { title: 'Completed', value: completedCount, icon: Award, color: 'success' as const, trend: { value: 15, isPositive: true } },
    { title: 'In Progress', value: inProgressCount, icon: TrendingUp, color: 'warning' as const },
    { title: 'Avg Progress', value: averageProgress, icon: Clock, color: 'secondary' as const, trend: { value: 12, isPositive: true }, suffix: '%' },
  ];

  // Get current courses (in progress and recently completed)
  const currentCourses = enrolledCourses
    .filter(course => course.status === 'in-progress' || course.status === 'completed')
    .slice(0, 4); // Show max 4 on dashboard

  // Get recommended courses (available courses marked as recommended)
  const recommendedCourses = availableCourses
    .filter(course => course.isRecommended)
    .slice(0, 3); // Show max 3 recommendations

  const learningInsights = [
    'Visual learning materials improve retention by 32%',
    'Morning study sessions peak productivity between 9-11 AM',
    'Interactive content engagement increased by 45% this week',
  ];

  const handleNavigate = (section: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    router.push(`/${section}` as any);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">
          Your personalized learning dashboard provides insights and recommendations based on your learning patterns.
        </p>
      </motion.div>

      {/* KPI Tiles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <KPITile {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      {/* Your Courses */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          <Button 
            variant="outline" 
            className="border-accent text-accent hover:bg-accent/10"
            onClick={() => handleNavigate('my-courses')}
          >
            View All Courses
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="h-full"
            >
              <CourseCard 
                {...course} 
                onClick={() => {
                  setSelectedCourse(course);
                  setShowCourseDetail(true);
                }}
                onContinue={() => {
                  // Simulate continuing course - increase progress by 10%
                  const newProgress = Math.min(course.progress + 10, 100);
                  updateCourseProgress(course.title, newProgress);
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recommended for You */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-accent/20 text-accent">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-semibold">Recommended for You</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <CourseCard 
                {...course}
                onEnroll={() => enrollInCourse(course)}
                onClick={() => {
                  setSelectedCourse(course);
                  setShowCourseDetail(true);
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Learning Insights */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-panel rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-secondary/20 text-secondary">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold">Learning Insights</h2>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Based on your learning patterns, you perform best with:
        </p>
        
        <div className="space-y-3">
          {learningInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center gap-3 text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>{insight}</span>
            </motion.div>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="mt-4 border-secondary text-secondary hover:bg-secondary/10"
          onClick={() => handleNavigate('profile')}
        >
          View Learning Preferences
        </Button>
      </motion.section>

      {/* Course Detail Modal */}
      <CourseDetailModal
        isOpen={showCourseDetail}
        onClose={() => setShowCourseDetail(false)}
        course={selectedCourse}
      />
    </div>
  );
}
