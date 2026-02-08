import { motion } from 'framer-motion';
import {
    Award,
    BookOpen,
    ChevronRight,
    Clock,
    Globe,
    Play,
    Shield,
    Star,
    Target,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Logo from '../components/ui/Logo';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export function LandingPage({ onGetStarted, onLogin, isDarkMode, onThemeToggle }: LandingPageProps) {
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
    { value: '50K+', label: 'Active Learners' },
    { value: '1,200+', label: 'Expert Courses' },
    { value: '98%', label: 'Success Rate' },
    { value: '24/7', label: 'AI Support' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      content: 'This platform transformed my career. The AI-powered recommendations helped me focus on exactly what I needed to learn.',
      avatar: 'SC',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Data Scientist at Meta',
      content: 'The interactive courses and real-world projects made complex topics accessible. Highly recommend!',
      avatar: 'MJ',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      role: 'UX Designer at Adobe',
      content: 'The collaborative features and peer learning made all the difference in my learning journey.',
      avatar: 'ER',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
              <Logo width={40} height={40} />
              <span className="text-xl font-bold gradient-text">Valt LMS</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-3">
              {isDarkMode !== undefined && onThemeToggle && (
                <ThemeToggle 
                  isDarkMode={isDarkMode}
                  onThemeToggle={onThemeToggle}
                  size="sm"
                />
              )}
              <Button 
                variant="ghost" 
                onClick={onLogin}
                className="hover:bg-accent/10"
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
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30"
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">AI-Powered Learning Platform</span>
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Master New Skills with{' '}
                  <span className="gradient-text">Intelligent Learning</span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Experience personalized education powered by AI. Track progress, collaborate with peers, 
                  and achieve your learning goals faster than ever before.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={onGetStarted}
                  className="gradient-button text-lg px-8 py-4 h-auto"
                >
                  Start Learning Free
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-accent/30 hover:bg-accent/10"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative z-10">
                <Card className="glass-panel border-accent/30 p-8 shadow-2xl">
                  <CardContent className="p-0 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Current Course</h3>
                        <p className="text-sm text-muted-foreground">Machine Learning Fundamentals</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm font-medium text-accent">73%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '73%' }}
                          transition={{ duration: 1, delay: 0.8 }}
                          className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-3 rounded-lg bg-muted/20">
                        <Clock className="w-5 h-5 mx-auto mb-1 text-accent" />
                        <div className="text-sm font-medium">2.5h</div>
                        <div className="text-xs text-muted-foreground">Today</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/20">
                        <Target className="w-5 h-5 mx-auto mb-1 text-secondary" />
                        <div className="text-sm font-medium">7/10</div>
                        <div className="text-xs text-muted-foreground">Modules</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center shadow-lg"
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center shadow-lg"
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>
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
            <h2 className="text-4xl font-bold mb-4">Why Choose Valt LMS?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methodologies 
              to deliver an unparalleled educational experience.
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
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl font-bold mb-4">What Our Learners Say</h2>
                    <p className="text-xl text-muted-foreground">
                      Join thousands of successful learners who&apos;ve transformed their careers
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-panel border-accent/20 h-full">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center font-semibold text-white">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
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
              <h2 className="text-4xl font-bold">Ready to Start Your Learning Journey?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join millions of learners worldwide and unlock your potential with AI-powered education.
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
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                <span>Global Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>24/7 Support</span>
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
              <span className="text-muted-foreground">© 2025 All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
