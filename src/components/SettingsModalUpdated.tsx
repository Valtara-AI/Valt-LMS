import { AnimatePresence, motion } from 'framer-motion';
import {
    Bell,
    Calendar,
    Clock,
    Download,
    FileText,
    Globe,
    HelpCircle,
    Key,
    LogOut,
    Mail,
    Monitor,
    RefreshCw,
    Save,
    Shield,
    Smartphone,
    Trash2,
    User,
    Users,
    X
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { PasswordChangeModal } from './PasswordChangeModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onLogout?: () => void;
}

export function SettingsModal({ isOpen, onClose, isDarkMode, onThemeToggle, onLogout }: SettingsModalProps) {
  const [fontSize, setFontSize] = useState([14]);
  const [animationSpeed, setAnimationSpeed] = useState([1]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-8');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const settingsCategories = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Display', icon: Monitor },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'data', label: 'Data', icon: Download },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-border">
                <div>
                  <h2 className="text-2xl font-semibold">Settings</h2>
                  <p className="text-muted-foreground mt-1">Manage your account and application preferences</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex h-[calc(90vh-120px)]">
                <Tabs defaultValue="account" orientation="vertical" className="flex w-full">
                  {/* Sidebar Navigation */}
                  <div className="w-64 border-r border-border p-4">
                    <TabsList className="flex flex-col h-auto w-full space-y-1 bg-transparent">
                      {settingsCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <TabsTrigger
                            key={category.id}
                            value={category.id}
                            className="w-full justify-start gap-3 data-[state=active]:bg-accent/20 data-[state=active]:text-accent"
                          >
                            <Icon className="w-4 h-4" />
                            {category.label}
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 overflow-y-auto">
                    {/* Account Settings */}
                    <TabsContent value="account" className="p-6 m-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input id="firstName" defaultValue="Alex" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" defaultValue="Chen" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input id="email" type="email" defaultValue="alex.chen@university.edu" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input id="phone" defaultValue="+1 (555) 123-4567" />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Password &amp; Security</h3>
                          <div className="space-y-4">
                            <Button 
                              variant="outline" 
                              className="w-full justify-start"
                              onClick={() => setShowPasswordModal(true)}
                            >
                              <Key className="w-4 h-4 mr-2" />
                              Change Password
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Shield className="w-4 h-4 mr-2" />
                              Two-Factor Authentication
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Smartphone className="w-4 h-4 mr-2" />
                              Manage Devices
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="language">Language</Label>
                              <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="es">Español</SelectItem>
                                  <SelectItem value="fr">Français</SelectItem>
                                  <SelectItem value="de">Deutsch</SelectItem>
                                  <SelectItem value="zh">中文</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="timezone">Timezone</Label>
                              <Select value={timezone} onValueChange={setTimezone}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="UTC-8">Pacific (UTC-8)</SelectItem>
                                  <SelectItem value="UTC-7">Mountain (UTC-7)</SelectItem>
                                  <SelectItem value="UTC-6">Central (UTC-6)</SelectItem>
                                  <SelectItem value="UTC-5">Eastern (UTC-5)</SelectItem>
                                  <SelectItem value="UTC+0">UTC</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Notifications */}
                    <TabsContent value="notifications" className="p-6 m-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Course Updates</Label>
                                <p className="text-sm text-muted-foreground">Get notified about new course content and announcements</p>
                              </div>
                              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Assignment Reminders</Label>
                                <p className="text-sm text-muted-foreground">Receive deadline notifications for assignments and quizzes</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Grade Updates</Label>
                                <p className="text-sm text-muted-foreground">Get notified when grades are posted</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Weekly Progress Report</Label>
                                <p className="text-sm text-muted-foreground">Receive a summary of your weekly learning activities</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Enable Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive notifications even when the app is closed</p>
                              </div>
                              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Study Reminders</Label>
                                <p className="text-sm text-muted-foreground">Daily reminders to maintain your learning streak</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Discussion Replies</Label>
                                <p className="text-sm text-muted-foreground">When someone replies to your discussion posts</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Sound Settings</h3>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <Label>Enable Sound Effects</Label>
                              <p className="text-sm text-muted-foreground">Play sounds for notifications and interactions</p>
                            </div>
                            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Display Settings */}
                    <TabsContent value="display" className="p-6 m-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Theme & Appearance</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                              </div>
                              <Switch checked={isDarkMode} onCheckedChange={onThemeToggle} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>High Contrast</Label>
                                <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Typography</h3>
                          <div className="space-y-6">
                            <div>
                              <Label>Font Size</Label>
                              <p className="text-sm text-muted-foreground mb-3">Adjust the base font size throughout the application</p>
                              <Slider
                                value={fontSize}
                                onValueChange={setFontSize}
                                max={20}
                                min={12}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                <span>12px</span>
                                <span className="font-medium text-accent">{fontSize[0]}px</span>
                                <span>20px</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Animations</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Reduce Motion</Label>
                                <p className="text-sm text-muted-foreground">Minimize animations for better accessibility</p>
                              </div>
                              <Switch />
                            </div>
                            <div>
                              <Label>Animation Speed</Label>
                              <p className="text-sm text-muted-foreground mb-3">Control the speed of interface animations</p>
                              <Slider
                                value={animationSpeed}
                                onValueChange={setAnimationSpeed}
                                max={2}
                                min={0.5}
                                step={0.1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                <span>Slow</span>
                                <span className="font-medium text-accent">{animationSpeed[0]}x</span>
                                <span>Fast</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Privacy Settings */}
                    <TabsContent value="privacy" className="p-6 m-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Data &amp; Privacy</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Analytics & Usage Data</Label>
                                <p className="text-sm text-muted-foreground">Help improve the platform by sharing anonymous usage data</p>
                              </div>
                              <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Auto-save Progress</Label>
                                <p className="text-sm text-muted-foreground">Automatically save your learning progress</p>
                              </div>
                              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Show Online Status</Label>
                                <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Session Management</h3>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                              <Clock className="w-4 h-4 mr-2" />
                              View Active Sessions
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Clear All Sessions
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                              <Download className="w-4 h-4 mr-2" />
                              Download My Data
                            </Button>
                            {onLogout && (
                              <Button 
                                variant="outline" 
                                className="w-full justify-start border-warning text-warning hover:bg-warning/10"
                                onClick={() => {
                                  onLogout();
                                  onClose();
                                }}
                              >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                              </Button>
                            )}
                            <Button variant="destructive" className="w-full justify-start">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Data Management */}
                    <TabsContent value="data" className="p-6 m-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Import &amp; Export</h3>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                              <Download className="w-4 h-4 mr-2" />
                              Export Learning Data
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <FileText className="w-4 h-4 mr-2" />
                              Export Certificates
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Calendar className="w-4 h-4 mr-2" />
                              Export Schedule
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Storage</h3>
                          <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-muted/20 border border-muted/30">
                              <div className="flex justify-between items-center mb-2">
                                <span>Offline Content</span>
                                <span className="text-sm text-muted-foreground">2.4 GB</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div className="bg-accent h-2 rounded-full w-3/5"></div>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full">
                              Clear Offline Content
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Sync Settings</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Sync Across Devices</Label>
                                <p className="text-sm text-muted-foreground">Keep your progress synchronized across all devices</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <Label>Offline Mode</Label>
                                <p className="text-sm text-muted-foreground">Download content for offline access</p>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Support */}
                    <TabsContent value="support" className="p-6 m-0">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                              <HelpCircle className="w-4 h-4 mr-2" />
                              Help Center
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Mail className="w-4 h-4 mr-2" />
                              Contact Support
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <FileText className="w-4 h-4 mr-2" />
                              Report a Bug
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Community</h3>
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                              <Users className="w-4 h-4 mr-2" />
                              Discussion Forums
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Globe className="w-4 h-4 mr-2" />
                              Feature Requests
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-4">About</h3>
                          <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-muted/20 border border-muted/30">
                              <h4 className="font-medium mb-2">Valt LMS v2.1.0</h4>
                              <p className="text-sm text-muted-foreground">
                                Your premium learning management system designed for modern education.
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Terms of Service</Button>
                              <Button variant="outline" size="sm">Privacy Policy</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Changes are saved automatically
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button className="gradient-button">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
}
