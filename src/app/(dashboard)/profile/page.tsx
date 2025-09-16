'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Settings, 
  Bell, 
  Eye, 
  Volume2, 
  BookOpen, 
  Clock,
  Bot
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { AIChatModal } from '@/components/AIChatModal';

export default function ProfilePage() {
  const [studyTime, setStudyTime] = useState([60]);
  const [showAIChat, setShowAIChat] = useState(false);
  
  const learningPreferences = [
    { label: 'Visual', value: 85, color: '#18d6c8' },
    { label: 'Auditory', value: 65, color: '#9b5cff' },
    { label: 'Reading', value: 70, color: '#2ECC71' },
    { label: 'Kinesthetic', value: 45, color: '#FFC107' },
  ];

  const contentPreferences = [
    { label: 'Video Lectures', value: 90 },
    { label: 'Interactive Exercises', value: 80 },
    { label: 'Reading Materials', value: 65 },
    { label: 'Quizzes & Tests', value: 70 },
    { label: 'Group Discussions', value: 55 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Profile & Preferences</h1>
        <p className="text-muted-foreground">
          Manage your account settings and customize your learning experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Alex Chen</h3>
                  <p className="text-sm text-muted-foreground">Computer Science Student</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Alex Chen" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="alex.chen@university.edu" />
                </div>
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" defaultValue="Tech University" />
                </div>
              </div>
              
              <Button className="w-full">Update Profile</Button>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Learning Style
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningPreferences.map((pref) => (
                <div key={pref.label} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{pref.label}</span>
                    <span className="text-sm text-muted-foreground">{pref.value}%</span>
                  </div>
                  <Progress value={pref.value} className="h-2" />
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Label>Preferred Study Duration (minutes)</Label>
                <div className="pt-4">
                  <Slider
                    value={studyTime}
                    onValueChange={setStudyTime}
                    max={180}
                    min={15}
                    step={15}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>15 min</span>
                    <span className="font-medium">{studyTime[0]} min</span>
                    <span>180 min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings & Preferences */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Course Updates</p>
                  <p className="text-sm text-muted-foreground">New lessons and assignments</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Study Reminders</p>
                  <p className="text-sm text-muted-foreground">Daily learning notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Progress Reports</p>
                  <p className="text-sm text-muted-foreground">Weekly achievement summaries</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Content Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Content Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contentPreferences.map((pref) => (
                <div key={pref.label} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{pref.label}</span>
                    <span className="text-sm text-muted-foreground">{pref.value}%</span>
                  </div>
                  <Progress value={pref.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">High Contrast Mode</p>
                  <p className="text-sm text-muted-foreground">Improve text readability</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Large Text</p>
                  <p className="text-sm text-muted-foreground">Increase font size</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reduced Motion</p>
                  <p className="text-sm text-muted-foreground">Minimize animations</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI Learning Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized help and recommendations from your AI learning assistant.
              </p>
              <Button 
                onClick={() => setShowAIChat(true)}
                className="w-full"
              >
                Chat with AI Assistant
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Chat Modal */}
      <AIChatModal
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
      />
    </div>
  );
}
