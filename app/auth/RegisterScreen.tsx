/*
 * REACT NATIVE CONVERSION GUIDE - RegisterScreen.tsx
 * ===================================================
 * 
 * 1. IMPORTS TO CHANGE:
 *    - Input → TextInput from 'react-native'
 *    - Select → Use '@react-native-picker/picker' or react-native-modal with options
 *    - Checkbox → Use '@react-native-community/checkbox' or custom TouchableOpacity
 *    - AnimatePresence → Conditional rendering with Reanimated Layout Animations
 * 
 * 2. PASSWORD STRENGTH INDICATOR:
 *    Keep the logic, update visuals:
 *    - Use Animated.View for the progress bar
 *    - Animate width with useSharedValue and withTiming
 *    Example:
 *      const progress = useSharedValue(0);
 *      progress.value = withTiming(passwordStrength.strength / 100);
 *      <Animated.View style={[styles.progressBar, { width: progress.value * 100 + '%' }]} />
 * 
 * 3. CONDITIONAL FORM FIELDS:
 *    - Keep AnimatePresence logic but use LayoutAnimation from 'react-native'
 *    - Or use Reanimated's Layout Animations:
 *      import { Layout } from 'react-native-reanimated';
 *      <Animated.View layout={Layout.springify()} />
 * 
 * 4. CHECKBOX:
 *    Install: npm install @react-native-community/checkbox
 *    <CheckBox
 *      value={acceptedTerms}
 *      onValueChange={setAcceptedTerms}
 *      tintColors={{ true: '#9333ea', false: '#9ca3af' }}
 *    />
 * 
 * 5. SCROLLABLE FORM:
 *    Wrap entire form in ScrollView with KeyboardAvoidingView:
 *    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
 *      <ScrollView contentContainerStyle={styles.scrollContent}>
 *        // Form fields
 *      </ScrollView>
 *    </KeyboardAvoidingView>
 * 
 * 6. FOCUS RING:
 *    Replace border animations with TextInput onFocus/onBlur:
 *    const [isFocused, setIsFocused] = useState(false);
 *    style={[styles.input, isFocused && styles.inputFocused]}
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft, Eye, EyeOff, User, Mail, Phone, Car, IdCard, Briefcase, Check, Sparkles, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { UserRole } from '../../App';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { motion, AnimatePresence } from 'motion/react';

interface RegisterScreenProps {
  onRegister: (role: UserRole) => void;
  onBack: () => void;
  onLoginRedirect: () => void;
}

export function RegisterScreen({ onRegister, onBack, onLoginRedirect }: RegisterScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('passenger');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Driver-specific fields
    vehicleNumber: '',
    licenseNumber: '',
    // Admin-specific fields
    employeeId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!acceptedTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    // Role-specific validation
    if (role === 'driver' && (!formData.vehicleNumber || !formData.licenseNumber)) {
      toast.error('Please provide vehicle and license information');
      return;
    }

    if (role === 'admin' && !formData.employeeId) {
      toast.error('Please provide employee ID');
      return;
    }

    // Mock registration
    toast.success('Registration successful!');
    onRegister(role);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
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
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </motion.div>
        <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create Account</h2>
        <motion.div
          className="ml-auto"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-5 h-5 text-purple-600" />
        </motion.div>
      </motion.div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 py-8 relative z-10">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
          {/* Role Selection */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="role">Register as</Label>
            <div className="grid grid-cols-3 gap-2">
              <RoleCard
                role="passenger"
                selected={role === 'passenger'}
                onClick={() => setRole('passenger')}
                icon={<User className="w-6 h-6" />}
                label="Passenger"
              />
              <RoleCard
                role="driver"
                selected={role === 'driver'}
                onClick={() => setRole('driver')}
                icon={<Car className="w-6 h-6" />}
                label="Driver"
              />
              <RoleCard
                role="admin"
                selected={role === 'admin'}
                onClick={() => setRole('admin')}
                icon={<Briefcase className="w-6 h-6" />}
                label="Admin"
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.p 
                key={role}
                className="text-muted-foreground text-center bg-white/60 backdrop-blur-sm p-3 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {role === 'passenger' && '🚗 Book rides and track your vehicles'}
                {role === 'driver' && '🚐 Manage your vehicle and accept passengers'}
                {role === 'admin' && '📊 Manage operators and monitor the system'}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Common Fields */}
          <AnimatedInput
            icon={<User className="w-4 h-4" />}
            label="Full Name *"
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            delay={0.2}
          />

          <AnimatedInput
            icon={<Mail className="w-4 h-4" />}
            label="Email *"
            id="email"
            type="email"
            placeholder="yourname@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            delay={0.3}
          />

          <AnimatedInput
            icon={<Phone className="w-4 h-4" />}
            label="Phone Number *"
            id="phone"
            type="tel"
            placeholder="+267 123 4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            delay={0.4}
          />

          {/* Driver-specific fields */}
          <AnimatePresence mode="wait">
            {role === 'driver' && (
              <motion.div
                key="driver-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5 overflow-hidden"
              >
                <AnimatedInput
                  icon={<Car className="w-4 h-4" />}
                  label="Vehicle Registration Number *"
                  id="vehicleNumber"
                  type="text"
                  placeholder="B 123 ABC"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  delay={0.5}
                />

                <AnimatedInput
                  icon={<IdCard className="w-4 h-4" />}
                  label="Driver's License Number *"
                  id="licenseNumber"
                  type="text"
                  placeholder="License number"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  delay={0.6}
                />
              </motion.div>
            )}

            {/* Admin-specific fields */}
            {role === 'admin' && (
              <motion.div
                key="admin-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <AnimatedInput
                  icon={<Briefcase className="w-4 h-4" />}
                  label="Employee ID *"
                  id="employeeId"
                  type="text"
                  placeholder="EMP-12345"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  delay={0.5}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Password with Strength Indicator */}
          <PasswordField
            label="Password *"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            showPassword={showPassword}
            onToggleShow={() => setShowPassword(!showPassword)}
            delay={0.7}
          />

          <PasswordField
            label="Confirm Password *"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            showPassword={showConfirmPassword}
            onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
            delay={0.75}
            showStrength={false}
          />

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3">
            <Checkbox 
              id="terms" 
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-muted-foreground cursor-pointer leading-tight">
              I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>
            </label>
          </div>

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
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/50 relative overflow-hidden group"
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
                Create Account
                <Sparkles className="w-4 h-4" />
              </span>
            </Button>
          </motion.div>

          {/* Login Link */}
          <motion.p 
            className="text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Already have an account?{' '}
            <button
              type="button"
              onClick={onLoginRedirect}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:underline"
            >
              Login
            </button>
          </motion.p>
        </form>
      </div>
    </div>
  );
}

// Role Selection Card Component
function RoleCard({ 
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
      className={`relative p-4 rounded-xl border-2 transition-all ${
        selected 
          ? 'border-purple-500 bg-gradient-to-br from-purple-500/10 to-blue-500/10 shadow-lg' 
          : 'border-gray-200 bg-white/60 backdrop-blur-sm hover:border-purple-300'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        className={`mx-auto mb-2 ${selected ? 'text-purple-600' : 'text-gray-600'}`}
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

// Password Field with Strength Indicator
function PasswordField({
  label,
  id,
  value,
  onChange,
  showPassword,
  onToggleShow,
  delay,
  showStrength = true
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onToggleShow: () => void;
  delay: number;
  showStrength?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: 'bg-gray-200' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'bg-orange-500' };
    if (password.length < 12) return { strength: 75, label: 'Good', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(value);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
    >
      <Label htmlFor={id}>{label}</Label>
      <motion.div 
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
          <Lock className="w-4 h-4" />
        </div>
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder="At least 8 characters"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="h-12 pl-10 pr-12 bg-white/60 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10"
          onClick={onToggleShow}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Eye className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-purple-500 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.95,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      {showStrength && value && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Password strength:</span>
            <span className={passwordStrength.strength === 100 ? 'text-green-600' : 'text-muted-foreground'}>
              {passwordStrength.label}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${passwordStrength.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${passwordStrength.strength}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Animated Input Component
function AnimatedInput({
  icon,
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  delay
}: {
  icon: React.ReactNode;
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  delay: number;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
    >
      <Label htmlFor={id}>{label}</Label>
      <motion.div 
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="h-12 pl-10 bg-white/60 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
        />
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-purple-500 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.95,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}
