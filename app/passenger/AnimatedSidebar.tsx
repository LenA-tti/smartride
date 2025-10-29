import {
  ChevronRight,
  CreditCard,
  History,
  Home,
  LogOut,
  MapPin,
  Moon,
  Sun,
  User,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion';
import React from 'react';
import { Button } from '../../components/ui/button';
import { useTheme } from '../../context/ThemeProvider';
import type { PassengerScreen } from './PassengerApp';

interface AnimatedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: PassengerScreen;
  onNavigate: (screen: PassengerScreen) => void;
  onLogout: () => void;
}

export function AnimatedSidebar({ 
  isOpen, 
  onClose, 
  currentScreen, 
  onNavigate,
  onLogout 
}: AnimatedSidebarProps) {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'history', label: 'Trip History', icon: History },
    { id: 'locations', label: 'Saved Places', icon: MapPin },
    { id: 'payment', label: 'Wallet', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  const handleNavigate = (screen: PassengerScreen) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-background dark:bg-[#211832] z-50 shadow-2xl overflow-hidden"
          >
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-[#9B3922]/30 dark:to-[#C62300]/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-[#1B1A55]/30 dark:to-[#9B3922]/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="px-6 pt-8 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-[#9B3922] dark:to-[#C62300] rounded-xl flex items-center justify-center shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Home className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-foreground dark:text-white">SmartRide</h3>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">Navigate with ease</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-muted dark:bg-[#181C14] hover:bg-muted/80 dark:hover:bg-[#1B1A55] flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <X className="w-5 h-5 text-foreground dark:text-white" />
                  </motion.button>
                </div>

                {/* User Info */}
                <motion.div
                  className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-[#9B3922]/20 dark:to-[#C62300]/20 backdrop-blur-sm rounded-2xl p-4 border border-border/50 dark:border-[#9B3922]/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-[#9B3922] dark:to-[#C62300] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-foreground dark:text-white">John Doe</p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400">john@example.com</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 px-6 py-4 space-y-2 overflow-auto">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigate(item.id as PassengerScreen)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-[#9B3922] dark:to-[#C62300] text-white shadow-lg' 
                          : 'hover:bg-muted dark:hover:bg-[#181C14] text-foreground dark:text-gray-300'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}
                      
                      <motion.div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-muted dark:bg-[#181C14] group-hover:bg-primary/10 dark:group-hover:bg-[#9B3922]/20'
                        }`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      
                      <span className="flex-1 text-left">{item.label}</span>
                      
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 space-y-3 border-t dark:border-[#181C14]">
                {/* Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-muted dark:hover:bg-[#181C14] transition-all group"
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 dark:from-indigo-600 dark:to-purple-600 flex items-center justify-center"
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {theme === 'light' ? (
                        <Moon className="w-5 h-5 text-white" />
                      ) : (
                        <Sun className="w-5 h-5 text-white" />
                      )}
                    </motion.div>
                    <span className="flex-1 text-left text-foreground dark:text-gray-300">
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                    <motion.div
                      className="w-12 h-6 rounded-full bg-muted dark:bg-[#181C14] relative"
                      animate={{ 
                        backgroundColor: theme === 'dark' ? '#9B3922' : '#e5e7eb' 
                      }}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                        animate={{ 
                          x: theme === 'dark' ? 26 : 2 
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.div>
                  </button>
                </motion.div>

                {/* Logout Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="w-full bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-[#C62300]/20 dark:to-[#9B3922]/20 border-red-500/30 dark:border-[#C62300]/50 hover:bg-red-500/20 dark:hover:bg-[#C62300]/30 text-red-600 dark:text-[#C62300] hover:text-red-700 dark:hover:text-[#ff4d2e] relative overflow-hidden group h-12"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="relative z-10">Logout</span>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-1/2 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-blue-500/50 dark:via-[#9B3922]/50 to-transparent"
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
