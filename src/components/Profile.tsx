import { motion } from 'framer-motion';
import {
    Bell,
    BookOpen,
    Bot,
    GraduationCap,
    Settings,
    User
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { AIChatModal } from './AIChatModal';

export function Profile() {
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
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information and learning preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Alex Chen" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex.chen@university.edu" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" defaultValue="Stanford University" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy">Field of Study</Label>
                  <Input id="fieldOfStudy" defaultValue="Computer Science" />
                </div>
              </div>
              
              <Button className="gradient-button">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent" />
                Learning Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Learning Style */}
              <div>
                <h4 className="font-medium mb-3">Preferred Learning Style</h4>
                <RadioGroup defaultValue="visual" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="visual" id="visual" />
                    <Label htmlFor="visual">Visual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auditory" id="auditory" />
                    <Label htmlFor="auditory">Auditory</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reading" id="reading" />
                    <Label htmlFor="reading">Reading/Writing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                    <Label htmlFor="kinesthetic">Kinesthetic</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Study Time */}
              <div>
                <h4 className="font-medium mb-3">Optimal Study Time (minutes per session)</h4>
                <div className="space-y-3">
                  <Slider
                    value={studyTime}
                    onValueChange={setStudyTime}
                    max={180}
                    min={15}
                    step={15}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>15 min</span>
                    <span className="font-medium text-accent">{studyTime[0]} minutes</span>
                    <span>180 min</span>
                  </div>
                </div>
              </div>

              {/* Learning Style Analysis */}
              <div>
                <h4 className="font-medium mb-3">Learning Style Analysis</h4>
                <div className="space-y-3">
                  {learningPreferences.map((pref, index) => (
                    <motion.div
                      key={pref.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{pref.label}</span>
                        <span className={`text-sm font-medium ${
                          pref.label === 'Visual Learning' ? 'text-blue-500' :
                          pref.label === 'Hands-on Practice' ? 'text-green-500' :
                          pref.label === 'Reading & Research' ? 'text-purple-500' :
                          'text-orange-500'
                        }`}>
                          {pref.value}%
                        </span>
                      </div>
                      <Progress value={pref.value} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Format Preferences */}
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Content Format Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentPreferences.map((pref, index) => (
                  <motion.div
                    key={pref.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{pref.label}</span>
                      <span className="text-sm font-medium text-accent">{pref.value}%</span>
                    </div>
                    <Progress value={pref.value} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Notification Settings */}
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Course Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new content</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Assignment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Deadline notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Study Reminders</Label>
                  <p className="text-sm text-muted-foreground">Daily study time alerts</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Settings */}
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent" />
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Improve text readability</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Screen Reader</Label>
                  <p className="text-sm text-muted-foreground">Enhanced screen reader support</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* AI Assistant Panel */}
          <Card className="glass-panel border-0 border-accent/30 shadow-[0_0_20px_rgba(24,214,200,0.2)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-accent to-secondary">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                AI Learning Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your AI assistant analyzes your learning patterns and provides personalized recommendations.
              </p>
              
              <div className="p-3 rounded-lg bg-muted/20 border border-muted/30">
                <p className="text-sm">
                  <strong>Today&apos;s Tip:</strong> Based on your progress, consider spending more time on interactive exercises to improve retention by 23%.
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-accent text-accent hover:bg-accent/10"
                onClick={() => setShowAIChat(true)}
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
