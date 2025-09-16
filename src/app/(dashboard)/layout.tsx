'use client';

import { EnrollmentProvider } from '@/components/EnrollmentProvider';
import { OnboardingModal } from '@/components/OnboardingModal';
import { SettingsModal } from '@/components/SettingsModalUpdated';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { useTheme } from '@/components/useTheme';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Get active section from pathname
  const getActiveSection = () => {
    if (pathname.includes('/dashboard')) return 'dashboard';
    if (pathname.includes('/my-courses')) return 'courses';
    if (pathname.includes('/analytics')) return 'analytics';
    if (pathname.includes('/profile')) return 'profile';
    return 'dashboard';
  };

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'dashboard': return 'Dashboard';
      case 'courses': return 'My Courses';
      case 'analytics': return 'Learning Analytics';
      case 'profile': return 'Profile Settings';
      default: return 'Dashboard';
    }
  };

  const handleSectionChange = (section: string) => {
    switch (section) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'courses':
        router.push('/my-courses');
        break;
      case 'analytics':
        router.push('/analytics');
        break;
      case 'profile':
        router.push('/profile');
        break;
      default:
        router.push('/dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user-authenticated');
    localStorage.removeItem('onboarding-complete');
    router.push('/auth');
  };

  return (
    <EnrollmentProvider>
      <div className="h-screen bg-background text-foreground flex overflow-hidden">
        {/* Fixed Sidebar */}
        <div className="shrink-0">
          <Sidebar 
            activeSection={getActiveSection()} 
            onSectionChange={handleSectionChange}
            onLogout={handleLogout}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Fixed Top Bar */}
          <div className="shrink-0">
            <TopBar
              isDarkMode={isDarkMode}
              onThemeToggle={toggleTheme}
              title={getSectionTitle(getActiveSection())}
              onSettingsClick={() => setShowSettings(true)}
            />
          </div>

          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full"
              >
                {children}
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
      </div>
    </EnrollmentProvider>
  );
}
