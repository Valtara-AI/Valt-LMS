import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    Apple,
    ArrowLeft,
    CheckCircle,
    Chrome,
    Eye,
    EyeOff,
    Github,
    Loader2,
    Lock,
    Mail,
    User
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { ThemeToggle } from './ThemeToggle';
import Logo from './ui/Logo';

interface AuthPageProps {
  onLogin: () => void;
  onBack: () => void;
  initialMode?: 'login' | 'signup';
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export function AuthPage({ onLogin, onBack, initialMode = 'login', isDarkMode, onThemeToggle }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    institution: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  const handleSocialAuth = (_provider: string) => {
    setIsLoading(true);
    // Simulate social auth
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return 'bg-destructive';
    if (strength <= 3) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-accent/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            {isDarkMode !== undefined && onThemeToggle && (
              <ThemeToggle 
                isDarkMode={isDarkMode}
                onThemeToggle={onThemeToggle}
                size="sm"
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Logo width={48} height={48} />
            <span className="text-2xl font-bold gradient-text">Valt LMS</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-2">
                {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground">
                {mode === 'login' 
                  ? 'Sign in to continue your learning journey'
                  : 'Join thousands of learners worldwide'
                }
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-panel border-accent/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">
                {mode === 'login' ? 'Sign In' : 'Create Your Account'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Social Auth Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12 border-border/50 hover:bg-accent/10"
                  onClick={() => handleSocialAuth('google')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Chrome className="w-5 h-5 mr-3" />
                  )}
                  Continue with Google
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 border-border/50 hover:bg-accent/10"
                    onClick={() => handleSocialAuth('github')}
                    disabled={isLoading}
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 border-border/50 hover:bg-accent/10"
                    onClick={() => handleSocialAuth('apple')}
                    disabled={isLoading}
                  >
                    <Apple className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Separator className="my-6" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-sm text-muted-foreground">
                  or continue with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="pl-10"
                            disabled={isLoading}
                          />
                        </div>
                        {errors.fullName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-destructive flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {errors.fullName}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution (Optional)</Label>
                        <Input
                          id="institution"
                          type="text"
                          placeholder="University or Company"
                          value={formData.institution}
                          onChange={(e) => handleInputChange('institution', e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  
                  {mode === 'signup' && formData.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Password strength</span>
                        <span className={`font-medium ${
                          passwordStrength() <= 2 ? 'text-destructive' :
                          passwordStrength() <= 3 ? 'text-warning' : 'text-success'
                        }`}>
                          {getStrengthText(passwordStrength())}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-full transition-colors ${
                              i < passwordStrength() 
                                ? getStrengthColor(passwordStrength())
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                <AnimatePresence>
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="pl-10 pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-success flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Passwords match
                        </motion.p>
                      )}
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {mode === 'login' && (
                  <div className="flex items-center justify-between">
                    <Button variant="link" className="h-auto p-0 text-sm text-accent hover:text-accent/80">
                      Forgot Password?
                    </Button>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 gradient-button text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    mode === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>

              {/* Toggle Mode */}
              <div className="text-center pt-4">
                <span className="text-sm text-muted-foreground">
                  {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                </span>
                <Button
                  variant="link"
                  className="h-auto p-0 text-sm text-accent hover:text-accent/80"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  disabled={isLoading}
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </Button>
              </div>

              {mode === 'signup' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground text-center pt-4"
                >
                  By creating an account, you agree to our{' '}
                  <Button variant="link" className="h-auto p-0 text-xs text-accent hover:text-accent/80">
                    Terms of Service
                  </Button>{' '}
                  and{' '}
                  <Button variant="link" className="h-auto p-0 text-xs text-accent hover:text-accent/80">
                    Privacy Policy
                  </Button>
                </motion.p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center mx-auto">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <p className="text-lg font-medium">
                  {mode === 'login' ? 'Signing you in...' : 'Setting up your account...'}
                </p>
                <p className="text-sm text-muted-foreground">
                  This will only take a moment
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
