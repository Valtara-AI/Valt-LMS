'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Target, Clock, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsPage() {
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
      title: 'Completion Rate Trend',
      insight: 'Your course completion rate has improved by 26% over the last 6 months.',
      recommendation: 'Continue your current study schedule for optimal progress.',
      icon: TrendingUp,
    },
    {
      title: 'Learning Efficiency',
      insight: 'You learn 35% faster during morning hours (9-11 AM).',
      recommendation: 'Schedule challenging topics during your peak hours.',
      icon: Clock,
    },
    {
      title: 'Skill Development',
      insight: 'Your data analysis skills are advancing rapidly.',
      recommendation: 'Consider taking advanced analytics courses to build on this strength.',
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
          Track your progress and discover insights about your learning journey
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px]">
                  <ResponsiveContainer>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="completion" 
                        stroke="#18d6c8" 
                        strokeWidth={3}
                        name="Course Completion %" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="assessment" 
                        stroke="#9b5cff" 
                        strokeWidth={3}
                        name="Assessment Score %" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Learning Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[250px]">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={learningDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {learningDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {learningDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color } as React.CSSProperties}
                        ></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Patterns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {learningPatterns.map((pattern, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span>{pattern}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {/* Skill Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillData.map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-accent/20 text-accent">
                          <insight.icon className="w-5 h-5" />
                        </div>
                        {insight.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{insight.insight}</p>
                      <div className="p-3 rounded-lg bg-muted/30">
                        <p className="text-sm font-medium">💡 Recommendation:</p>
                        <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
