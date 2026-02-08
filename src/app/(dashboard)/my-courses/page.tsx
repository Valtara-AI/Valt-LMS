'use client';

import { CourseCard } from '@/components/CourseCard';
import { CourseDetailModal } from '@/components/CourseDetailModal';
import { useEnrollment, type Course } from '@/components/EnrollmentProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Search } from 'lucide-react';
import { useState } from 'react';

export default function MyCoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const { enrolledCourses, availableCourses, enrollInCourse, updateCourseProgress } = useEnrollment();

  // Use enrolled courses from context
  const allCourses = enrolledCourses;

  // Get recommended courses from available courses
  const recommendedCourses = availableCourses.filter(course => course.isRecommended);

  const filterCourses = (courses: typeof allCourses, status?: string) => {
    let filtered = courses;
    
    if (status && status !== 'all') {
      filtered = courses.filter(course => course.status === status);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const CourseGrid = ({ courses }: { courses: typeof allCourses }) => (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {courses.map((course, index) => (
        <motion.div
          key={course.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
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
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">
          Browse your enrolled courses and track your progress
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
      >
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 bg-muted/30 border-muted"
            />
          </div>

          {/* Filter */}
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Course Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="not-started">Not Started</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <CourseGrid courses={filterCourses(allCourses)} />
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-6">
            <CourseGrid courses={filterCourses(allCourses, 'in-progress')} />
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <CourseGrid courses={filterCourses(allCourses, 'completed')} />
          </TabsContent>

          <TabsContent value="not-started" className="space-y-6">
            <CourseGrid courses={filterCourses(allCourses, 'not-started')} />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        isOpen={showCourseDetail}
        onClose={() => setShowCourseDetail(false)}
        course={selectedCourse}
      />

      {/* Recommended Courses */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
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
    </div>
  );
}
