import { motion } from 'framer-motion';
import { BookOpen, Bot, Lightbulb, Send, Sparkles, Target, User, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Learning Assistant. I can help you with course recommendations, study tips, answer questions about your learning progress, and provide personalized guidance. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickQuestions = [
    { icon: BookOpen, text: "Recommend courses for me", query: "Can you recommend some courses based on my learning history and interests?" },
    { icon: Target, text: "Set learning goals", query: "Help me set effective learning goals for this month." },
    { icon: Lightbulb, text: "Study tips", query: "What are some effective study techniques I should try?" },
    { icon: Sparkles, text: "Optimize my schedule", query: "How can I optimize my learning schedule for better results?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('course') || lowerMessage.includes('recommend')) {
      return "Based on your learning history, I'd recommend exploring 'Advanced React Patterns' and 'Data Science Fundamentals'. These align well with your current progress in web development and your interest in data analysis. Would you like me to provide more details about these courses?";
    }
    
    if (lowerMessage.includes('goal') || lowerMessage.includes('planning')) {
      return "Great question! For effective learning goals, I suggest the SMART framework: Specific, Measurable, Achievable, Relevant, and Time-bound. For example: 'Complete 2 modules of Machine Learning course by end of this week.' What specific area would you like to focus on?";
    }
    
    if (lowerMessage.includes('study') || lowerMessage.includes('tip') || lowerMessage.includes('technique')) {
      return "Here are some proven study techniques that work well with online learning: 1) Pomodoro Technique (25-min focused sessions), 2) Active recall (testing yourself), 3) Spaced repetition for retention, and 4) Taking handwritten notes. Based on your learning patterns, morning sessions seem to work best for you!";
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('optimize')) {
      return "Your data shows you're most productive between 9-11 AM! I'd suggest scheduling your most challenging content during this window. For the rest of the day, lighter review sessions work well. Would you like me to create a personalized weekly schedule?";
    }
    
    if (lowerMessage.includes('progress') || lowerMessage.includes('analytics')) {
      return "Your progress is looking great! You've completed 67% of your current courses with an average score of 87%. Your consistency has improved by 23% this month. The areas where you might want to focus more are data structures and algorithms. Need specific guidance on any topic?";
    }
    
    return "That's an interesting question! As your AI learning assistant, I'm here to help with course recommendations, study strategies, progress tracking, and learning optimization. Could you tell me more about what specific aspect of your learning journey you'd like to improve?";
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (query: string) => {
    setNewMessage(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-card rounded-xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col glass-panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI Learning Assistant</h2>
              <p className="text-sm text-muted-foreground">Your personal learning companion</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'ai' 
                    ? 'bg-gradient-to-br from-accent to-secondary' 
                    : 'bg-primary'
                }`}>
                  {message.sender === 'ai' ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'ai'
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Quick questions to get started:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question.query)}
                  className="justify-start gap-2 h-auto p-2"
                >
                  <question.icon className="w-3 h-3" />
                  <span className="text-xs">{question.text}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-border">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your learning journey..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isTyping}
              className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
