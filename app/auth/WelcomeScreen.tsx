/*
 * REACT NATIVE CONVERSION GUIDE - WelcomeScreen.tsx
 * ==================================================
 * 
 * 1. IMPORTS TO CHANGE:
 *    - Button → Use TouchableOpacity or Pressable from 'react-native'
 *    - lucide-react → Use 'react-native-vector-icons' or '@expo/vector-icons'
 *    - motion → Use 'react-native-reanimated'
 *    Install: npm install react-native-reanimated react-native-vector-icons
 * 
 * 2. LAYOUT COMPONENTS:
 *    - div → View from 'react-native'
 *    - All text → Text component from 'react-native'
 *    - className → style prop with StyleSheet
 * 
 * 3. TAILWIND TO REACT NATIVE STYLES:
 *    - h-screen → { flex: 1 }
 *    - flex flex-col → { flex: 1, flexDirection: 'column' }
 *    - bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 → Use 'react-native-linear-gradient'
 *    - rounded-full → { borderRadius: 9999 }
 *    - blur-3xl → Use 'react-native-blur' library
 *    - px-6 → { paddingHorizontal: 24 }
 *    - py-12 → { paddingVertical: 48 }
 *    - gap-2 → { gap: 8 } (requires RN 0.71+) or use marginBottom
 * 
 * 4. GRADIENTS:
 *    Install: npm install react-native-linear-gradient
 *    Example:
 *      import LinearGradient from 'react-native-linear-gradient';
 *      <LinearGradient colors={['#2563eb', '#9333ea', '#4f46e5']} style={styles.container}>
 * 
 * 5. ANIMATIONS:
 *    Replace motion.div with Animated.View:
 *      const scale = useSharedValue(0);
 *      const animatedStyle = useAnimatedStyle(() => ({
 *        transform: [{ scale: withSpring(scale.value) }]
 *      }));
 *      useEffect(() => { scale.value = 1; }, []);
 * 
 * 6. BLUR EFFECT:
 *    Install: npm install @react-native-community/blur
 *    Example:
 *      import { BlurView } from '@react-native-community/blur';
 *      <BlurView blurType="light" blurAmount={10} />
 * 
 * 7. BACKDROP BLUR:
 *    - backdrop-blur-sm → Use BlurView as wrapper
 *    - bg-white/10 → { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
 */

import { Button } from '../ui/button';
import { Bus, Shield, Users, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function WelcomeScreen({ onLogin, onRegister }: WelcomeScreenProps) {
  /*
   * RN CONVERSION - Component Structure:
   * Replace return with:
   * <LinearGradient colors={['#2563eb', '#9333ea', '#4f46e5']} style={styles.container}>
   *   <View style={styles.backgroundContainer}>
   *     <Animated.View style={[styles.orb1, animatedStyle1]} />
   *   </View>
   * </LinearGradient>
   * 
   * StyleSheet example:
   * const styles = StyleSheet.create({
   *   container: { flex: 1, overflow: 'hidden' },
   *   backgroundContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
   *   orb1: { 
   *     position: 'absolute', 
   *     top: -160, 
   *     left: -160, 
   *     width: 320, 
   *     height: 320, 
   *     backgroundColor: 'rgba(255, 255, 255, 0.1)',
   *     borderRadius: 160
   *   }
   * });
   */
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      {/* RN: Replace div with View, use absolute positioning */}
      <div className="absolute inset-0 overflow-hidden">
        {/* RN: Replace motion.div with Animated.View */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Hero Section */}
      {/* RN: Replace with View, use flexDirection: 'column', alignItems: 'center', justifyContent: 'center' */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Logo */}
        {/* 
          RN ANIMATION:
          const scale = useSharedValue(0);
          const rotate = useSharedValue(-180);
          
          useEffect(() => {
            scale.value = withSpring(1, { stiffness: 200, damping: 15 });
            rotate.value = withSpring(0);
          }, []);
          
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { scale: scale.value },
              { rotate: `${rotate.value}deg` }
            ]
          }));
        */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
        >
          {/* 
            RN GRADIENT:
            <LinearGradient colors={['#ffffff', '#dbeafe']} style={styles.logoBox}>
            
            For shadow in RN:
            ...Platform.select({
              ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, 
                     shadowOpacity: 0.3, shadowRadius: 50 },
              android: { elevation: 25 }
            })
          */}
          <motion.div
            className="w-28 h-28 bg-gradient-to-br from-white to-blue-100 rounded-3xl flex items-center justify-center shadow-2xl relative"
            animate={{
              boxShadow: [
                "0 20px 50px rgba(0,0,0,0.3)",
                "0 25px 60px rgba(255,255,255,0.4)",
                "0 20px 50px rgba(0,0,0,0.3)",
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            {/* RN: Use Icon from react-native-vector-icons or custom SVG */}
            <Bus className="w-14 h-14 text-blue-600" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-3"
        >
          <motion.h1 
            className="text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          >
            SmartRide
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* 
          RN TEXT:
          <Animated.View style={animatedParagraphStyle}>
            <Text style={styles.subtitle}>
              Transforming transport in Botswana. Safe, reliable, and data-driven mobility for everyone.
            </Text>
          </Animated.View>
          
          subtitle: {
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: 380,
            marginBottom: 48
          }
        */}
        <motion.p
          className="text-center text-white/90 max-w-sm mb-12 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Transforming transport in Botswana. Safe, reliable, and data-driven mobility for everyone.
        </motion.p>

        {/* Features */}
        <div className="w-full max-w-md space-y-3 mb-12">
          <FeatureItem 
            icon={<Zap className="w-5 h-5" />}
            title="Real-time Tracking"
            description="See your ride in real-time"
            delay={0.8}
          />
          <FeatureItem 
            icon={<Shield className="w-5 h-5" />}
            title="Safe & Secure"
            description="Verified drivers and vehicles"
            delay={1.0}
          />
          <FeatureItem 
            icon={<TrendingUp className="w-5 h-5" />}
            title="Digital Payments"
            description="Cashless, contactless rides"
            delay={1.2}
          />
        </div>
      </div>

      {/* Action Buttons */}
      {/* 
        RN BUTTONS:
        Replace Button with TouchableOpacity or Pressable:
        
        <TouchableOpacity 
          onPress={onRegister}
          style={styles.primaryButton}
          activeOpacity={0.8}
        >
          <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Get Started</Text>
            <Icon name="sparkles" size={16} color="#2563eb" />
          </LinearGradient>
        </TouchableOpacity>
        
        For hover effect in RN, use Pressable:
        <Pressable 
          onPress={onRegister}
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.98 }] }
          ]}
        >
      */}
      <motion.div 
        className="px-6 pb-8 space-y-3 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={onRegister} 
            className="w-full h-14 bg-white text-blue-600 hover:bg-blue-50 shadow-2xl relative overflow-hidden group"
            size="lg"
          >
            {/* RN: For shimmer effect, use 'react-native-linear-gradient' with animated translateX */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* RN: Use flexDirection: 'row' for icon + text */}
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <Sparkles className="w-4 h-4" />
            </span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={onLogin} 
            variant="outline" 
            className="w-full h-14 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 shadow-xl"
            size="lg"
          >
            Login
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureItem({ 
  icon, 
  title, 
  description,
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) {
  /*
   * RN CONVERSION - FeatureItem Component:
   * 
   * Replace with:
   * const opacity = useSharedValue(0);
   * const translateX = useSharedValue(-50);
   * 
   * useEffect(() => {
   *   opacity.value = withDelay(delay * 1000, withTiming(1));
   *   translateX.value = withDelay(delay * 1000, withSpring(0, { stiffness: 100 }));
   * }, []);
   * 
   * const animatedStyle = useAnimatedStyle(() => ({
   *   opacity: opacity.value,
   *   transform: [{ translateX: translateX.value }]
   * }));
   * 
   * <Pressable onPress={() => {}} style={({ pressed }) => [styles.featureCard, pressed && { transform: [{ scale: 0.98 }] }]}>
   *   <BlurView blurType="light" blurAmount={10} style={styles.blurContainer}>
   *     <View style={styles.iconContainer}>
   *       {icon}
   *     </View>
   *     <View>
   *       <Text style={styles.featureTitle}>{title}</Text>
   *       <Text style={styles.featureDescription}>{description}</Text>
   *     </View>
   *   </BlurView>
   * </Pressable>
   * 
   * Styles:
   * featureCard: { 
   *   flexDirection: 'row', alignItems: 'flex-start', gap: 12,
   *   backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 20,
   *   borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)'
   * }
   */
  return (
    <motion.div 
      className="flex items-start gap-3 bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-lg hover:bg-white/20 transition-colors group"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <motion.div 
        className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      <div>
        <h4 className="text-white mb-1">{title}</h4>
        <p className="text-white/70">{description}</p>
      </div>
    </motion.div>
  );
}
