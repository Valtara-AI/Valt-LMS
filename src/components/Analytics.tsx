import { motion } from 'framer-motion';
import { Brain, Clock, Target, TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

export function Analytics() {
  const progressData = [
    { month: 'Jan', completion: 65, assessment: 72 },
    { month: 'Feb', completion: 68, assessment: 75 },
    { month: 'Mar', completion: 72, assessment: 78 },
    { month: 'Apr', completion: 75, assessment: 82 },
    { month: 'May', completion: 78, assessment: 85 },
    { month: 'Jun', completion: 82, assessment: 88 },
  ];

  const learningDistribution = [
    { name: 'Video Content', value: 45, color: '#18d6c8' },
    { name: 'Reading', value: 30, color: '#9b5cff' },
    { name: 'Interactive', value: 25, color: '#2ECC71' },
  ];

  const skillData = [
    { skill: 'Data Analysis', progress: 85 },
    { skill: 'Programming', progress: 70 },
    { skill: 'Machine Learning', progress: 60 },
    { skill: 'Cloud Computing', progress: 40 },
  ];

  const learningPatterns = [
    'Peak learning hours: 9 AM - 11 AM',
    'Best performing day: Wednesday',
    'Preferred content: Visual materials (videos and infographics)',
    'Average session length: 45 minutes',
  ];

  const aiInsights = [
    {
      title: 'Skill Focus',
      content: 'Increase focus on Cloud Computing to balance your skill portfolio.',
      icon: Target,
    },
    {
      title: 'Learning Schedule',
      content: 'Allocate more time to interactive exercises to improve retention.',
      icon: Clock,
    },
    {
      title: 'Course Recommendation',
      content: 'Consider "Advanced Machine Learning" based on your current progress.',
      icon: Brain,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Learning Analytics</h1>
        <p className="text-muted-foreground">
          Track your progress and gain insights into your learning patterns
        </p>
      </motion.div>

      {/* Main Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Progress Over Time */}
        <Card className="glass-panel border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Learning Progress Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="completion" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="completion">Course Completion</TabsTrigger>
                <TabsTrigger value="assessment">Assessment Scores</TabsTrigger>
              </TabsList>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--glass-surface)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(12px)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="completion"
                      stroke="#18d6c8"
                      strokeWidth={3}
                      dot={{ fill: '#18d6c8', strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="assessment"
                      stroke="#9b5cff"
                      strokeWidth={3}
                      dot={{ fill: '#9b5cff', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Learning Distribution */}
        <Card className="glass-panel border-0">
          <CardHeader>
            <CardTitle>Learning Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={learningDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {learningDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--glass-surface)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(12px)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle>Skill Development</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillData.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span>{skill.skill}</span>
                    <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle>Learning Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Analyze how you learn best:
              </p>
              <div className="space-y-3">
                {learningPatterns.map((pattern, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span>{pattern}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI-Powered Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass-panel border-0 border-accent/30 shadow-[0_0_20px_rgba(24,214,200,0.2)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-accent to-secondary">
                <Brain className="w-5 h-5 text-white" />
              </div>
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Our AI analyzes your learning behavior to provide personalized recommendations:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-muted/20 border border-muted/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <insight.icon className="w-5 h-5 text-accent" />
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.content}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
