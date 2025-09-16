import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Mail,
  Send,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmailService {
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  validateCurrentPassword: (password: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

// Mock email service (in a real app, this would be API calls)
const emailService: EmailService = {
  sendPasswordResetEmail: async (email: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate 95% success rate
    if (Math.random() > 0.05) {
      return true;
    }
    throw new Error('Email delivery failed');
  },

  validateCurrentPassword: async (password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - in real app, this would verify against backend
    // For demo purposes, accept any password with length >= 6
    return password.length >= 6;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock success - in real app, this would update password in backend
    return true;
  }
};

export function PasswordChangeModal({ isOpen, onClose }: PasswordChangeModalProps) {
  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Reset Password Form State
  const [resetEmail, setResetEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Validation states
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');

  // Password validation rules
  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return 'Password must contain both uppercase and lowercase letters';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return 'Password must contain at least one special character (@$!%*?&)';
    }
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');

    // Validate current password
    if (!currentPassword) {
      setCurrentPasswordError('Current password is required');
      return;
    }

    // Validate new password
    const newPasswordValidation = validatePassword(newPassword);
    if (newPasswordValidation) {
      setNewPasswordError(newPasswordValidation);
      return;
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setNewPasswordError('New password must be different from current password');
      return;
    }

    setIsChangingPassword(true);

    try {
      // Validate current password
      const isCurrentPasswordValid = await emailService.validateCurrentPassword(currentPassword);
      
      if (!isCurrentPasswordValid) {
        setCurrentPasswordError('Current password is incorrect');
        setIsChangingPassword(false);
        return;
      }

      // Change password
      await emailService.changePassword(currentPassword, newPassword);

      // Success
      toast.success('🔒 Password Changed Successfully!', {
        description: 'Your password has been updated. Please use your new password for future logins.',
        duration: 5000,
      });

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      toast.error('Failed to change password', {
        description: 'Please try again later or contact support if the problem persists.',
        duration: 4000,
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setResetEmailError('');

    // Validate email
    if (!resetEmail) {
      setResetEmailError('Email address is required');
      return;
    }

    const emailValidation = validateEmail(resetEmail);
    if (emailValidation) {
      setResetEmailError(emailValidation);
      return;
    }

    setIsSendingReset(true);

    try {
      await emailService.sendPasswordResetEmail(resetEmail);
      
      setResetEmailSent(true);
      
      toast.success('📧 Reset Email Sent!', {
        description: `Password reset instructions have been sent to ${resetEmail}`,
        duration: 6000,
      });

    } catch (error) {
      toast.error('Failed to send reset email', {
        description: 'Please check the email address and try again.',
        duration: 4000,
      });
    } finally {
      setIsSendingReset(false);
    }
  };

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setResetEmail('');
    setResetEmailSent(false);
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    setResetEmailError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    
    return {
      score: strength,
      label: ['Weak', 'Fair', 'Good', 'Strong'][strength - 1] || 'Very Weak',
      color: ['#FF6B6B', '#FFC107', '#18d6c8', '#2ECC71'][strength - 1] || '#FF6B6B'
    };
  };

  const passwordStrength = getPasswordStrength(newPassword);

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
            className="glass-panel rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Password Management</h2>
                  <p className="text-sm text-muted-foreground">Secure your account</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              <Tabs defaultValue="change" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="change">Change Password</TabsTrigger>
                  <TabsTrigger value="reset">Reset via Email</TabsTrigger>
                </TabsList>

                {/* Change Password Tab */}
                <TabsContent value="change" className="space-y-4">
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    {/* Current Password */}
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter your current password"
                          className={currentPasswordError ? 'border-destructive' : ''}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {currentPasswordError && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {currentPasswordError}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter your new password"
                          className={newPasswordError ? 'border-destructive' : ''}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {newPassword && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Password strength</span>
                            <span className={`text-xs font-medium ${
                              passwordStrength.score <= 1 ? 'text-red-500' :
                              passwordStrength.score <= 2 ? 'text-orange-500' :
                              passwordStrength.score <= 3 ? 'text-yellow-500' :
                              'text-green-500'
                            }`}>
                              {passwordStrength.label}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                passwordStrength.score <= 1 ? 'bg-red-500 w-1/4' :
                                passwordStrength.score <= 2 ? 'bg-orange-500 w-2/4' :
                                passwordStrength.score <= 3 ? 'bg-yellow-500 w-3/4' :
                                'bg-green-500 w-full'
                              }`}
                            />
                          </div>
                        </div>
                      )}
                      
                      {newPasswordError && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {newPasswordError}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your new password"
                          className={confirmPasswordError ? 'border-destructive' : ''}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      {confirmPasswordError && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {confirmPasswordError}
                        </p>
                      )}
                    </div>

                    {/* Password Requirements */}
                    <Card className="bg-muted/20 border-muted/30">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium mb-2">Password Requirements:</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li className={`flex items-center gap-2 ${newPassword.length >= 8 ? 'text-green-500' : ''}`}>
                            {newPassword.length >= 8 ? <CheckCircle className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-muted-foreground" />}
                            At least 8 characters
                          </li>
                          <li className={`flex items-center gap-2 ${/(?=.*[a-z])(?=.*[A-Z])/.test(newPassword) ? 'text-green-500' : ''}`}>
                            {/(?=.*[a-z])(?=.*[A-Z])/.test(newPassword) ? <CheckCircle className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-muted-foreground" />}
                            Uppercase and lowercase letters
                          </li>
                          <li className={`flex items-center gap-2 ${/(?=.*\d)/.test(newPassword) ? 'text-green-500' : ''}`}>
                            {/(?=.*\d)/.test(newPassword) ? <CheckCircle className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-muted-foreground" />}
                            At least one number
                          </li>
                          <li className={`flex items-center gap-2 ${/(?=.*[@$!%*?&])/.test(newPassword) ? 'text-green-500' : ''}`}>
                            {/(?=.*[@$!%*?&])/.test(newPassword) ? <CheckCircle className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-muted-foreground" />}
                            Special character (@$!%*?&)
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Button 
                      type="submit" 
                      className="w-full gradient-button"
                      disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                    >
                      {isChangingPassword ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Changing Password...
                        </>
                      ) : (
                        <>
                          <Key className="w-4 h-4 mr-2" />
                          Change Password
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Reset via Email Tab */}
                <TabsContent value="reset" className="space-y-4">
                  {!resetEmailSent ? (
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                      <div className="text-center space-y-2">
                        <Mail className="w-12 h-12 mx-auto text-accent" />
                        <h3 className="font-medium">Forgot your password?</h3>
                        <p className="text-sm text-muted-foreground">
                          Enter your email address and we'll send you a link to reset your password.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email Address</Label>
                        <Input
                          id="reset-email"
                          type="email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className={resetEmailError ? 'border-destructive' : ''}
                        />
                        {resetEmailError && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {resetEmailError}
                          </p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full gradient-button"
                        disabled={isSendingReset || !resetEmail}
                      >
                        {isSendingReset ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending Reset Email...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Reset Email
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-4"
                    >
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Sent!</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          We've sent password reset instructions to <span className="font-medium text-accent">{resetEmail}</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Check your inbox and follow the instructions to reset your password.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => setResetEmailSent(false)}
                        className="w-full"
                      >
                        Send to Different Email
                      </Button>
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
