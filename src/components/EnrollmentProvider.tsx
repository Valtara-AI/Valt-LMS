import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Course {
  title: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  students: number;
  isRecommended?: boolean;
  description?: string;
  skills?: string[];
  enrolledDate?: string;
  recommendationReason?: string;
}

interface EnrollmentContextType {
  enrolledCourses: Course[];
  availableCourses: Course[];
  enrollInCourse: (course: Course) => void;
  updateCourseProgress: (courseTitle: string, progress: number) => void;
  isEnrolled: (courseTitle: string) => boolean;
  getAllCourses: () => Course[];
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
}

interface EnrollmentProviderProps {
  children: React.ReactNode;
}

export function EnrollmentProvider({ children }: EnrollmentProviderProps) {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize data on component mount
  useEffect(() => {
    setMounted(true);
    
    // Load enrolled courses from localStorage
    if (typeof window !== 'undefined') {
      const savedEnrolledCourses = localStorage.getItem('enrolled-courses');
      if (savedEnrolledCourses) {
        setEnrolledCourses(JSON.parse(savedEnrolledCourses));
      } else {
      // Default enrolled courses for demo
      const defaultEnrolled: Course[] = [
        {
          title: 'Introduction to Machine Learning',
          instructor: 'Dr. Sarah Chen',
          duration: '8 weeks',
          level: 'Intermediate',
          progress: 75,
          status: 'in-progress',
          students: 2847,
          enrolledDate: '2024-01-15',
          description: 'Learn the fundamentals of machine learning including supervised and unsupervised learning algorithms.',
          skills: ['Python', 'Data Analysis', 'Algorithms', 'Statistics'],
        },
        {
          title: 'Advanced Data Structures',
          instructor: 'Prof. Michael Johnson',
          duration: '10 weeks',
          level: 'Advanced',
          progress: 45,
          status: 'in-progress',
          students: 1923,
          enrolledDate: '2024-01-20',
          description: 'Master advanced data structures and algorithms for efficient programming.',
          skills: ['Algorithms', 'Data Structures', 'Problem Solving', 'C++'],
        },
        {
          title: 'UX Design Principles',
          instructor: 'Emma Rodriguez',
          duration: '6 weeks',
          level: 'Beginner',
          progress: 90,
          status: 'in-progress',
          students: 3521,
          enrolledDate: '2024-01-10',
          description: 'Learn the core principles of user experience design and create intuitive interfaces.',
          skills: ['Design Thinking', 'Prototyping', 'User Research', 'Figma'],
        },
        {
          title: 'Cloud Computing Essentials',
          instructor: 'James Wilson',
          duration: '12 weeks',
          level: 'Intermediate',
          progress: 30,
          status: 'in-progress',
          students: 2156,
          enrolledDate: '2024-02-01',
          description: 'Understand cloud computing concepts and services from major providers.',
          skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Serverless'],
        },
        {
          title: 'React Development Mastery',
          instructor: 'David Kim',
          duration: '8 weeks',
          level: 'Advanced',
          progress: 100,
          status: 'completed',
          students: 4231,
          enrolledDate: '2023-11-15',
          description: 'Master React development with hooks, context, and modern patterns.',
          skills: ['React', 'JavaScript', 'TypeScript', 'State Management'],
        },
      ];
      setEnrolledCourses(defaultEnrolled);
      localStorage.setItem('enrolled-courses', JSON.stringify(defaultEnrolled));
    }

    // Set available courses (courses that can be enrolled in)
    const available: Course[] = [
      {
        title: 'AI Ethics and Governance',
        instructor: 'Prof. Lisa Park',
        duration: '4 weeks',
        level: 'Intermediate',
        progress: 0,
        status: 'not-started',
        students: 1847,
        isRecommended: true,
        description: 'Explore the ethical implications of AI and learn about governance frameworks.',
        skills: ['Ethics', 'AI Policy', 'Governance', 'Critical Thinking'],
      },
      {
        title: 'Blockchain Development',
        instructor: 'Alex Thompson',
        duration: '8 weeks',
        level: 'Advanced',
        progress: 0,
        status: 'not-started',
        students: 892,
        isRecommended: true,
        description: 'Build decentralized applications using blockchain technology and smart contracts.',
        skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi'],
      },
      {
        title: 'Data Visualization',
        instructor: 'Maria Garcia',
        duration: '6 weeks',
        level: 'Intermediate',
        progress: 0,
        status: 'not-started',
        students: 2341,
        isRecommended: true,
        description: 'Create compelling data visualizations and interactive dashboards.',
        skills: ['D3.js', 'Tableau', 'Data Analysis', 'Storytelling'],
      },
      {
        title: 'Cybersecurity Fundamentals',
        instructor: 'Sarah Johnson',
        duration: '10 weeks',
        level: 'Beginner',
        progress: 0,
        status: 'not-started',
        students: 3456,
        description: 'Learn the basics of cybersecurity including threat detection and prevention.',
        skills: ['Network Security', 'Encryption', 'Risk Assessment', 'Incident Response'],
      },
      {
        title: 'Mobile App Development',
        instructor: 'Carlos Rodriguez',
        duration: '12 weeks',
        level: 'Intermediate',
        progress: 0,
        status: 'not-started',
        students: 2789,
        description: 'Build native mobile applications for iOS and Android platforms.',
        skills: ['React Native', 'Flutter', 'Mobile Design', 'App Store'],
      },
      {
        title: 'Digital Marketing Strategy',
        instructor: 'Jennifer Lee',
        duration: '6 weeks',
        level: 'Beginner',
        progress: 0,
        status: 'not-started',
        students: 4123,
        description: 'Master digital marketing techniques and create effective campaigns.',
        skills: ['SEO', 'Social Media', 'Analytics', 'Content Marketing'],
      },
    ];
    setAvailableCourses(available);
    }
  }, []);

  const enrollInCourse = (course: Course) => {
    // Check if already enrolled
    if (enrolledCourses.some(enrolled => enrolled.title === course.title)) {
      toast.error('You are already enrolled in this course!');
      return;
    }

    // Create enrolled course with enrollment date
    const enrolledCourse: Course = {
      ...course,
      status: 'in-progress',
      progress: 0,
      enrolledDate: new Date().toISOString().split('T')[0],
    };

    // Update enrolled courses
    const updatedEnrolled = [...enrolledCourses, enrolledCourse];
    setEnrolledCourses(updatedEnrolled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('enrolled-courses', JSON.stringify(updatedEnrolled));
    }

    // Remove from available courses
    setAvailableCourses(prev => prev.filter(c => c.title !== course.title));

    // Show success message
    toast.success(`Successfully enrolled in "${course.title}"!`, {
      description: 'You can now access the course materials and start learning.',
      duration: 4000,
    });
  };

  const updateCourseProgress = (courseTitle: string, progress: number) => {
    const updatedCourses = enrolledCourses.map(course => {
      if (course.title === courseTitle) {
        const status: 'not-started' | 'in-progress' | 'completed' = progress === 100 ? 'completed' : 'in-progress';
        return { ...course, progress, status };
      }
      return course;
    });

    setEnrolledCourses(updatedCourses);
    if (typeof window !== 'undefined') {
      localStorage.setItem('enrolled-courses', JSON.stringify(updatedCourses));
    }

    if (progress === 100) {
      toast.success(`🎉 Congratulations! You completed "${courseTitle}"!`, {
        description: 'Your certificate is ready for download.',
        duration: 5000,
      });
    }
  };

  const isEnrolled = (courseTitle: string) => {
    return enrolledCourses.some(course => course.title === courseTitle);
  };

  const getAllCourses = () => {
    return [...enrolledCourses, ...availableCourses];
  };

  const value: EnrollmentContextType = {
    enrolledCourses,
    availableCourses,
    enrollInCourse,
    updateCourseProgress,
    isEnrolled,
    getAllCourses,
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
}
