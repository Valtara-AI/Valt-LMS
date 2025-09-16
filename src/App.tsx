import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/sonner';
import { EnrollmentProvider } from './components/EnrollmentProvider';
import { useTheme } from './components/useTheme';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { MyCourses } from './components/MyCourses';
import { Analytics } from './components/Analytics';
import { Profile } from './components/Profile';
import { OnboardingModal } from './components/OnboardingModal';
import { SettingsModal } from './components/SettingsModalUpdated';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [appState, setAppState] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('user-authenticated');
    if (isAuthenticated) {
      setAppState('dashboard');
      
      // Check if user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('onboarding-complete');
      if (!hasCompletedOnboarding) {
        setTimeout(() => setShowOnboarding(true), 1000);
      }
    }
  }, []);

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'dashboard': return 'Dashboard';
      case 'courses': return 'My Courses';
      case 'analytics': return 'Learning Analytics';
      case 'profile': return 'Profile Settings';
      default: return 'Dashboard';
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveSection} />;
      case 'courses':
        return <MyCourses />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  const handleLogin = () => {
    localStorage.setItem('user-authenticated', 'true');
    setAppState('dashboard');
    
    // Check if user needs onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding-complete');
    if (!hasCompletedOnboarding) {
      setTimeout(() => setShowOnboarding(true), 500);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user-authenticated');
    localStorage.removeItem('onboarding-complete');
    setAppState('landing');
    setActiveSection('dashboard');
    setShowOnboarding(false);
    setShowSettings(false);
  };

  const handleGetStarted = () => {
    setAuthMode('signup');
    setAppState('auth');
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setAppState('auth');
  };

  // Render based on app state
  if (appState === 'landing') {
    return (
      <>
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleLoginClick}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
        />
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          theme={isDarkMode ? 'dark' : 'light'}
          richColors
        />
      </>
    );
  }

  if (appState === 'auth') {
    return (
      <>
        <AuthPage
          onLogin={handleLogin}
          onBack={() => setAppState('landing')}
          initialMode={authMode}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
        />
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          theme={isDarkMode ? 'dark' : 'light'}
          richColors
        />
      </>
    );
  }

  // Main dashboard app
  return (
    <EnrollmentProvider>
      <div className="min-h-screen bg-background text-foreground flex">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <TopBar
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
            title={getSectionTitle(activeSection)}
            onSettingsClick={() => setShowSettings(true)}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Onboarding Modal */}
        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => {
            setShowOnboarding(false);
            localStorage.setItem('onboarding-complete', 'true');
          }}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
          onLogout={handleLogout}
        />

        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          theme={isDarkMode ? 'dark' : 'light'}
          richColors
        />
      </div>
    </EnrollmentProvider>
  );
}
