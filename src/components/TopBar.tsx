import React from 'react';
import { Search, Settings } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { NotificationDropdown } from './NotificationDropdown';
import { ThemeToggle } from './ThemeToggle';

interface TopBarProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  title: string;
  onSettingsClick: () => void;
}

export function TopBar({ isDarkMode, onThemeToggle, title, onSettingsClick }: TopBarProps) {
  return (
    <div className="h-16 glass-panel border-b flex items-center justify-between px-6 z-10">
      {/* Left side - Title/Breadcrumb */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search courses..."
            className="pl-10 w-64 bg-muted/30 border-muted"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle 
          isDarkMode={isDarkMode}
          onThemeToggle={onThemeToggle}
        />

        {/* Notifications */}
        <NotificationDropdown />

        {/* Settings */}
        <Button variant="ghost" size="sm" onClick={onSettingsClick}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
