/*
 * REACT NATIVE CONVERSION GUIDE - LoginScreen.tsx
 * ================================================
 * 
 * 1. IMPORTS TO CHANGE:
 *    - Button → TouchableOpacity/Pressable from 'react-native'
 *    - Input → TextInput from 'react-native'
 *    - Label → Text from 'react-native'
 *    - lucide-react → react-native-vector-icons
 *    - toast from sonner → Toast from 'react-native-toast-message'
 *    - motion → react-native-reanimated
 * 
 * 2. FORM HANDLING:
 *    - Keep useState for form state
 *    - onSubmit={(e) => e.preventDefault()} → onPress handler
 *    - No need for preventDefault in RN
 * 
 * 3. INPUT COMPONENTS:
 *    Replace Input with TextInput:
 *    <View style={styles.inputContainer}>
 *      <Icon name="mail" size={16} color="#999" style={styles.icon} />
 *      <TextInput
 *        placeholder="yourname@example.com"
 *        value={credentials.email}
 *        onChangeText={(text) => setCredentials({ ...credentials, email: text })}
 *        style={styles.input}
 *        autoCapitalize="none"
 *        keyboardType="email-address"
 *      />
 *    </View>
 * 
 * 4. PASSWORD VISIBILITY:
 *    secureTextEntry={!showPassword} on TextInput
 * 
 * 5. TOAST MESSAGES:
 *    toast.error('message') → Toast.show({ type: 'error', text1: 'message' })
 *    toast.success('message') → Toast.show({ type: 'success', text1: 'message' })
 * 
 * 6. GLASSMORPHISM:
 *    backdrop-blur-sm → Use BlurView from @react-native-community/blur
 *    bg-white/50 → backgroundColor: 'rgba(255, 255, 255, 0.5)'
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Car, Briefcase, LogIn } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { UserRole } from '../../App';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onBack: () => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onBack, onForgotPassword }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('passenger');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  /*
   * RN CONVERSION - Form Submit:
   * Replace with:
   * const handleSubmit = () => {
   *   if (!credentials.email || !credentials.password) {
   *     Toast.show({
   *       type: 'error',
   *       text1: 'Please fill in all fields'
   *     });
   *     return;
   *   }
   *   Toast.show({
   *     type: 'success',
   *     text1: 'Login successful!'
   *   });
   *   onLogin(role);
   * };
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Mock authentication
    toast.success('Login successful!');
    onLogin(role);
  };

  /*
   * RN CONVERSION - Screen Structure:
   * 
   * return (
   *   <LinearGradient colors={['#eff6ff', '#e0e7ff', '#fae8ff']} style={styles.container}>
   *     <SafeAreaView style={styles.safeArea}>
   *       <View style={styles.backgroundContainer}>
   *         <Animated.View style={[styles.orb1, animatedOrb1Style]} />
   *       </View>
   *       <ScrollView contentContainerStyle={styles.content}>
   *         // Form content here
   *       </ScrollView>
   *     </SafeAreaView>
   *   </LinearGradient>
   * );
   * 
   * Use SafeAreaView from 'react-native-safe-area-context' for notch support
   * Use ScrollView for scrollable content (important for keyboard)
   * Use KeyboardAvoidingView for iOS keyboard handling
   */
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      {/* RN: Use Animated.View for background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-indigo-300/30 to-pink-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="px-6 py-4 flex items-center backdrop-blur-sm bg-white/50 border-b border-white/50 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </motion.div>
        <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h2>
      </motion.div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 py-8 relative z-10">
        <motion.form 
          onSubmit={handleSubmit} 
          className="max-w-md mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Role Selection */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="role">Login as</Label>
            <div className="grid grid-cols-3 gap-2">
              <RoleButton
                role="passenger"
                selected={role === 'passenger'}
                onClick={() => setRole('passenger')}
                icon={<User className="w-5 h-5" />}
                label="Passenger"
              />
              <RoleButton
                role="driver"
                selected={role === 'driver'}
                onClick={() => setRole('driver')}
                icon={<Car className="w-5 h-5" />}
                label="Driver"
              />
              <RoleButton
                role="admin"
                selected={role === 'admin'}
                onClick={() => setRole('admin')}
                icon={<Briefcase className="w-5 h-5" />}
                label="Admin"
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor="email">Email or Phone</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="text"
                placeholder="yourname@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="h-12 pl-10 bg-white/60 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="h-12 pl-10 pr-12 bg-white/60 backdrop-blur-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </motion.div>

          {/* Forgot Password */}
          <motion.div 
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:underline"
            >
              Forgot password?
            </button>
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/50 relative overflow-hidden"
              size="lg"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </span>
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}

// Role Button Component
function RoleButton({ 
  role, 
  selected, 
  onClick, 
  icon, 
  label 
}: { 
  role: UserRole; 
  selected: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`p-3 rounded-xl border-2 transition-all ${
        selected 
          ? 'border-purple-500 bg-gradient-to-br from-purple-500/10 to-blue-500/10 shadow-lg' 
          : 'border-gray-200 bg-white/60 backdrop-blur-sm hover:border-purple-300'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className={`mx-auto mb-1 ${selected ? 'text-purple-600' : 'text-gray-600'}`}
        animate={{ rotate: selected ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <p className={`text-xs ${selected ? 'text-purple-600' : 'text-gray-600'}`}>
        {label}
      </p>
    </motion.button>
  );
}
