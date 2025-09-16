import { Moon, Sun } from 'lucide-react';
import { Switch } from '../components/ui/switch';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export function ThemeToggle({ 
  isDarkMode, 
  onThemeToggle, 
  size = 'md',
  showLabels = false 
}: ThemeToggleProps) {
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-3 h-3';
      case 'lg': return 'w-5 h-5';
      default: return 'w-4 h-4';
    }
  };

  const getGapSize = () => {
    switch (size) {
      case 'sm': return 'gap-1.5';
      case 'lg': return 'gap-3';
      default: return 'gap-2';
    }
  };

  return (
    <div
      className={`flex items-center ${getGapSize()} relative px-2 py-1 rounded-md bg-transparent dark:bg-[rgba(255,255,255,0.02)]`} 
      role="group"
      aria-label="Toggle color theme"
    >
      {showLabels && (
        <span className={`text-sm transition-colors ${!isDarkMode ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
          Light
        </span>
      )}
      <span className={`${!isDarkMode ? 'bg-[var(--toggle-icon-bg-light)] border border-[rgba(139,92,246,0.12)] p-1.5 rounded-full' : 'bg-[var(--toggle-icon-bg-dark)] p-1 rounded-full'}`}> 
        <Sun
          className={`${getIconSize()} transition-all duration-200 ${!isDarkMode ? 'text-foreground scale-105' : 'text-muted-foreground scale-95'}`}
          aria-hidden={false}
          aria-label="Light mode"
        />
      </span>
      <Switch
        checked={isDarkMode}
        onCheckedChange={onThemeToggle}
        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-accent data-[state=checked]:to-secondary transition-all duration-200 shadow-sm mx-2"
      />
      <span className={`${isDarkMode ? 'bg-[var(--toggle-icon-bg-dark)] border border-[rgba(255,255,255,0.06)] p-1.5 rounded-full' : 'bg-[var(--toggle-icon-bg-light)] p-1 rounded-full'}`}> 
        <Moon
          className={`${getIconSize()} transition-all duration-200 ${isDarkMode ? 'text-foreground scale-105' : 'text-muted-foreground scale-95'}`}
          aria-hidden={false}
          aria-label="Dark mode"
        />
      </span>
      {showLabels && (
        <span className={`text-sm transition-colors ${isDarkMode ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
          Dark
        </span>
      )}
    </div>
  );
}
