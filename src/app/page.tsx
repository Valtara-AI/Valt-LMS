'use client';

import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Brain,
  ChevronRight,
  Clock,
  Globe,
  Play,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Logo from '../components/ui/Logo';
import { useTheme } from '../components/useTheme';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

function LandingPage({ onGetStarted, onLogin }: LandingPageProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  
  const allCourses = [
    {
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Sarah Johnson',
      category: 'Technology',
      level: 'Beginner',
      duration: '12 weeks',
      students: 15420,
      rating: 4.9,
      price: '$199',
      originalPrice: '$299',
      image: '🚀',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      description: 'Master full-stack web development with hands-on projects and real-world applications.'
    },
    {
      title: 'Machine Learning Fundamentals',
      instructor: 'Prof. Michael Chen',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 8950,
      rating: 4.8,
      price: '$249',
      originalPrice: '$349',
      image: '🤖',
      skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Data Analysis'],
      description: 'Dive deep into machine learning algorithms and build intelligent applications.'
    },
    {
      title: 'UI/UX Design Masterclass',
      instructor: 'Emma Rodriguez',
      category: 'Design',
      level: 'Intermediate',
      duration: '8 weeks',
      students: 12300,
      rating: 4.9,
      price: '$179',
      originalPrice: '$279',
      image: '🎨',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      description: 'Create stunning user interfaces and optimize user experiences with design thinking.'
    },
    {
      title: 'Digital Marketing Strategy',
      instructor: 'James Wilson',
      category: 'Marketing',
      level: 'Beginner',
      duration: '6 weeks',
      students: 9800,
      rating: 4.7,
      price: '$129',
      originalPrice: '$199',
      image: '📈',
      skills: ['SEO', 'Social Media', 'Analytics', 'Content Marketing'],
      description: 'Master digital marketing techniques and create effective campaigns that convert.'
    },
    {
      title: 'Data Science with Python',
      instructor: 'Dr. Lisa Park',
      category: 'Data Science',
      level: 'Advanced',
      duration: '14 weeks',
      students: 6750,
      rating: 4.8,
      price: '$299',
      originalPrice: '$399',
      image: '📊',
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'SQL'],
      description: 'Analyze complex datasets and extract meaningful insights using Python and advanced techniques.'
    },
    {
      title: 'Mobile App Development',
      instructor: 'Alex Thompson',
      category: 'Technology',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 11200,
      rating: 4.8,
      price: '$219',
      originalPrice: '$319',
      image: '📱',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      description: 'Build cross-platform mobile applications with modern frameworks and best practices.'
    },
    {
      title: 'Business Strategy & Management',
      instructor: 'Robert Davis',
      category: 'Business',
      level: 'Intermediate',
      duration: '8 weeks',
      students: 7850,
      rating: 4.6,
      price: '$159',
      originalPrice: '$249',
      image: '💼',
      skills: ['Strategy', 'Leadership', 'Operations', 'Finance'],
      description: 'Learn essential business skills and strategic thinking to advance your career and lead teams effectively.'
    }
  ];

  const filteredCourses = selectedCategory === 'All Courses' 
    ? allCourses 
    : allCourses.filter(course => course.category === selectedCategory);
  
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Engage with dynamic content, quizzes, and hands-on projects designed by industry experts.',
      color: 'accent'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Track your learning journey with detailed analytics and personalized insights.',
      color: 'secondary'
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect with peers, join study groups, and learn together in our global community.',
      color: 'success'
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn recognized certificates and badges to showcase your achievements.',
      color: 'warning'
    }
  ];

  const stats = [
    { value: '5', label: 'Course Categories' },
    { value: '4', label: 'Dashboard Metrics Tracked' },
    { value: '🎓', label: 'Certificate on Completion' },
    { value: '24/7', label: 'AI Support' }
  ];

  const learnerPersonas = [
    {
      icon: BookOpen,
      title: 'Juggling multiple courses at once',
      description: 'Your dashboard tracks progress on every course you enroll in separately, so nothing gets lost in the shuffle.'
    },
    {
      icon: TrendingUp,
      title: 'Wants direction, not just content',
      description: "The AI assistant recommends what to study next, helps you set learning goals, and answers questions about your progress."
    },
    {
      icon: Award,
      title: 'Wants proof when you finish',
      description: 'Complete a course and your certificate is ready immediately — no separate request, no waiting.'
    }
  ];

  return (
    <div id="main" className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass-panel border-0 border-b"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Logo width={40} height={40} />
                <span className="text-xl font-bold gradient-text">Valt LMS</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle 
                isDarkMode={isDarkMode}
                onThemeToggle={toggleTheme}
                size="sm"
              />
              <Button 
                variant="ghost" 
                onClick={onLogin}
                className="hover:bg-accent/10 text-foreground"
              >
                Sign In
              </Button>
              <Button 
                onClick={onGetStarted}
                className="gradient-button"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 min-w-0"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent/10 to-secondary/10 dark:from-accent/20 dark:to-secondary/20 text-foreground border border-accent/10 dark:border-accent/30 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                      <Zap className="w-4 h-4 text-accent" />
                  </motion.div>
                    <span className="text-sm font-medium text-foreground/90 dark:text-foreground">Course tracking + AI study assistant</span>
                </motion.div>

                <motion.h1
                  initial={{ y: 26, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug text-foreground max-w-2xl"
                >
                  <span className="block">Track every course.</span>
                  <span className="block mt-2 relative">
                    <span className="gradient-text">Actually finish them.</span>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 1.05 }}
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent to-secondary rounded-full"
                    />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.85 }}
                  className="text-lg md:text-xl text-foreground leading-snug max-w-xl mt-4"
                >
                  Valt LMS tracks real progress on every course you enroll in.
                  <span className="block mt-2 text-foreground/90">An AI assistant tells you what to study next, and you get a certificate the moment you finish.</span>
                </motion.p>
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    onClick={onGetStarted}
                    className="gradient-button text-lg px-10 py-5 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    🚀 Start Learning Free
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-5 h-auto border-2 border-accent/50 hover:bg-accent/10 hover:border-accent transition-all duration-300"
                    onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="text-center group cursor-pointer"
                  >
                    <motion.div 
                      className="text-3xl lg:text-4xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative lg:pl-8 min-w-0"
            >
              {/* Learning Dashboard Preview */}
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative bg-gradient-to-br from-card/50 to-background/30 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-2xl overflow-hidden"
              >
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-lg shadow-lg"
                />
                <motion.div
                  animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-secondary to-accent rounded-full shadow-lg"
                />
                <motion.div
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-1/2 right-8 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg opacity-60"
                />
                
                {/* Dashboard mockup */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center"
                      >
                        <Brain className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-foreground">AI Learning Dashboard</h3>
                        <p className="text-sm text-muted-foreground">Personalized for you</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-2xl"
                    >
                      🎯
                    </motion.div>
                  </div>

                  {/* Skills Progress Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { skill: "Web Dev", progress: 85, color: "from-blue-500 to-cyan-500" },
                      { skill: "AI/ML", progress: 72, color: "from-purple-500 to-pink-500" },
                      { skill: "Design", progress: 90, color: "from-green-500 to-emerald-500" },
                      { skill: "Data", progress: 68, color: "from-orange-500 to-red-500" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.skill}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                        className="p-3 rounded-xl bg-gradient-to-br from-background/50 to-muted/30 border border-border/30"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-foreground">{item.skill}</span>
                          <span className="text-xs text-muted-foreground">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1.5, delay: 1.5 + index * 0.2 }}
                            className={`h-1.5 bg-gradient-to-r ${item.color} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learning Stats */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 2 }}
                    className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20"
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">12</div>
                      <div className="text-xs text-muted-foreground">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">4.9</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">89%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute inset-0 -z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/4 right-1/4 w-32 h-32 border border-primary/20 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">What you get when you enroll</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No vague promises — here&apos;s exactly what happens: tracked progress on every course,
              an AI assistant that tells you what&apos;s next, and a certificate when you finish.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="glass-panel border-accent/20 h-full hover:border-accent/40 transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
                      feature.color === 'accent' ? 'bg-gradient-to-br from-accent to-secondary' :
                      feature.color === 'secondary' ? 'bg-gradient-to-br from-secondary to-accent' :
                      feature.color === 'success' ? 'bg-gradient-to-br from-green-500 to-accent' :
                      'bg-gradient-to-br from-yellow-500 to-accent'
                    }`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Browse courses by category</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Filter by Technology, Design, Business, Data Science, or Marketing. Every listing shows
              the instructor, duration, level, and skills covered before you enroll.
            </p>
          </motion.div>

          {/* Course Categories */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['All Courses', 'Technology', 'Design', 'Business', 'Data Science', 'Marketing'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-accent to-secondary text-white shadow-md border-transparent'
                    : 'bg-background/60 dark:bg-background/30 text-foreground/85 border border-border/20 dark:border-border/30 hover:bg-accent/10 dark:hover:bg-accent/20'
                }`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Card className="glass-panel border-accent/20 h-full hover:border-accent/40 transition-all duration-300 overflow-hidden flex flex-col min-h-[360px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[460px]">
                  <CardContent className="p-6 space-y-4 flex flex-col flex-1">
                    {/* Course Header */}
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-4xl">{course.image}</div>
                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">{course.rating}</span>
                        </div>
                      </div>
                      
                      {/* Category and Level */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full font-medium">
                          {course.category}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          course.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                          course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                    </div>

                    {/* Course Title and Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Instructor */}
                    <p className="text-sm text-muted-foreground">
                      by <span className="font-medium text-foreground">{course.instructor}</span>
                    </p>

                    {/* Course Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-muted/50 text-xs rounded text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{course.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">{course.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                      </div>
                      <Button size="sm" className="gradient-button" onClick={onGetStarted}>
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All Courses CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-accent/30 hover:bg-accent/10 text-foreground"
              onClick={() => setSelectedCategory('All Courses')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View All Courses
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Built For How You Actually Learn</h2>
            <p className="text-xl text-muted-foreground">
              No borrowed reviews — just what the product does for you
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {learnerPersonas.map((persona, index) => (
              <motion.div
                key={persona.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-panel border-accent/20 h-full">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                      <persona.icon className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{persona.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{persona.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Start a course. Watch your progress add up.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Sign up free, enroll in a course, and track completion in real time — no credit card required.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="gradient-button text-lg px-12 py-4 h-auto"
              >
                Start Learning Today
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={onLogin}
                className="text-lg px-12 py-4 h-auto border-accent/30 hover:bg-accent/10"
              >
                <Shield className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-foreground">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-foreground">Global Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-foreground">24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold gradient-text">Valt LMS</span>
              <span className="text-muted-foreground">© 2026 Valtara Inc. All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  
  const handleGetStarted = () => {
    router.push('/auth');
  };

  const handleLogin = () => {
    router.push('/auth');
  };

  return (
    <LandingPage 
      onGetStarted={handleGetStarted}
      onLogin={handleLogin}
    />
  );
}
