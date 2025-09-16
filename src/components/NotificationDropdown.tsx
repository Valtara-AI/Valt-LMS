import React from 'react';
import { motion } from 'framer-motion';
import { Bell, BookOpen, Award, MessageCircle, Calendar, Check, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';

export function NotificationDropdown() {
  const notifications = [
    {
      id: 1,
      type: 'course',
      title: 'New module available',
      message: 'Module 5: Advanced Neural Networks is now available in Machine Learning course',
      time: '5 minutes ago',
      icon: BookOpen,
      unread: true,
    },
    {
      id: 2,
      type: 'grade',
      title: 'Assignment graded',
      message: 'Your Data Structures assignment has been graded: A-',
      time: '1 hour ago',
      icon: Award,
      unread: true,
    },
    {
      id: 3,
      type: 'discussion',
      title: 'New reply to your post',
      message: 'Sarah replied to your question in UX Design forum',
      time: '2 hours ago',
      icon: MessageCircle,
      unread: true,
    },
    {
      id: 4,
      type: 'schedule',
      title: 'Upcoming deadline',
      message: 'Cloud Computing project is due tomorrow at 11:59 PM',
      time: '3 hours ago',
      icon: Calendar,
      unread: false,
    },
    {
      id: 5,
      type: 'course',
      title: 'Course completed',
      message: 'Congratulations! You completed UX Design Principles',
      time: '1 day ago',
      icon: Award,
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-500/20 text-blue-300';
      case 'grade': return 'bg-green-500/20 text-green-300';
      case 'discussion': return 'bg-purple-500/20 text-purple-300';
      case 'schedule': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-accent/20 text-accent';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-0 glass-panel border-0" 
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  {unreadCount} new
                </Badge>
              )}
              <Button variant="ghost" size="sm">
                <Check className="w-4 h-4" />
                Mark all read
              </Button>
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors ${
                  notification.unread ? 'bg-accent/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{notification.title}</h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-accent rounded-full ml-2 flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full" size="sm">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
