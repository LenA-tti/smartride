/*
 * REACT NATIVE CONVERSION GUIDE - HomeScreen.tsx
 * ===============================================
 * 
 * 1. NAVIGATION:
 *    - Replace onNavigate with navigation.navigate()
 *    - onOpenSidebar → navigation.openDrawer()
 *    - Use navigation hooks from @react-navigation/native
 * 
 * 2. CARD COMPONENTS:
 *    - Replace Card with custom View + shadow styles
 *    - Use TouchableOpacity for clickable cards
 * 
 * 3. HEADER GRADIENT:
 *    - Use LinearGradient from 'react-native-linear-gradient'
 *    - For animated shimmer, use Animated.View with translateX
 * 
 * 4. QUICK ACTION CARDS:
 *    - Map through actions array
 *    - Each card is a TouchableOpacity with icon + text
 *    - Use Pressable for press effects
 * 
 * 5. RECENT TRIPS:
 *    - Use FlatList or ScrollView for list
 *    - Each item is a TouchableOpacity card
 * 
 * 6. SEARCH BAR:
 *    - TextInput with icon
 *    - onFocus for navigation to vehicle selection
 *    Example:
 *      <TouchableOpacity onPress={onFindRide} style={styles.searchBar}>
 *        <Icon name="search" size={20} />
 *        <Text style={styles.searchPlaceholder}>Where to?</Text>
 *      </TouchableOpacity>
 */

import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  MapPin, 
  History, 
  Star, 
  CreditCard, 
  User, 
  Search,
  Navigation,
  Clock,
  TrendingUp,
  Menu
} from 'lucide-react';
import type { PassengerScreen } from './PassengerApp';
import { motion } from 'motion/react';

interface HomeScreenProps {
  onNavigate: (screen: PassengerScreen) => void;
  onFindRide: () => void;
  onOpenSidebar: () => void;
}

export function HomeScreen({ onNavigate, onFindRide, onOpenSidebar }: HomeScreenProps) {
  return (
    <div className="h-screen flex flex-col bg-background dark:bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-[#9B3922] dark:to-[#C62300] text-primary-foreground px-6 py-6 pb-8 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onOpenSidebar}
              className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
            <div>
              <h3 className="text-primary-foreground">Hello, John!</h3>
              <p className="text-primary-foreground/80">Where are you going today?</p>
            </div>
          </div>
          <motion.button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <User className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Search Bar */}
        <motion.button
          onClick={onFindRide}
          className="w-full bg-background dark:bg-[#211832] text-foreground rounded-xl px-4 py-4 flex items-center gap-3 shadow-lg relative z-10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Search className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
          <span className="text-muted-foreground dark:text-gray-400">Search for a route or destination</span>
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6 -mt-4 dark:bg-black">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <QuickActionCard
            icon={<Navigation className="w-6 h-6" />}
            title="Find a Ride"
            subtitle="Near you"
            onClick={onFindRide}
          />
          <QuickActionCard
            icon={<MapPin className="w-6 h-6" />}
            title="Saved Places"
            subtitle="Home, Work..."
            onClick={() => onNavigate('locations')}
          />
        </div>

        {/* Stats Cards */}
        <div className="mb-6">
          <h4 className="mb-3">Your Activity</h4>
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              icon={<History className="w-4 h-4" />}
              value="24"
              label="Trips"
              onClick={() => onNavigate('history')}
            />
            <StatCard
              icon={<Star className="w-4 h-4" />}
              value="4.8"
              label="Rating"
            />
            <StatCard
              icon={<TrendingUp className="w-4 h-4" />}
              value="P 340"
              label="Spent"
            />
          </div>
        </div>

        {/* Recent Trips */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4>Recent Trips</h4>
            <button 
              onClick={() => onNavigate('history')}
              className="text-primary"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            <TripCard
              route="Gaborone → Mogoditshane"
              time="2 hours ago"
              fare="P 25"
            />
            <TripCard
              route="Main Mall → Airport Junction"
              time="Yesterday, 8:30 AM"
              fare="P 18"
            />
          </div>
        </div>

        {/* Payment Method */}
        <Card 
          className="p-4 border-2 border-dashed cursor-pointer hover:bg-accent dark:bg-[#211832] dark:border-[#9B3922]/30 dark:hover:bg-[#181C14]"
          onClick={() => onNavigate('payment')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-[#9B3922]/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary dark:text-[#C62300]" />
            </div>
            <div className="flex-1">
              <p className="dark:text-white">Payment Methods</p>
              <p className="text-muted-foreground dark:text-gray-400">Orange Money •••• 4567</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function QuickActionCard({ 
  icon, 
  title, 
  subtitle, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string;
  onClick?: () => void;
}) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card 
        className="p-4 cursor-pointer hover:bg-accent dark:bg-[#211832] dark:border-[#9B3922]/20 dark:hover:bg-[#181C14] transition-colors"
        onClick={onClick}
      >
        <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-[#9B3922]/20 flex items-center justify-center text-primary dark:text-[#C62300] mb-3">
          {icon}
        </div>
        <h4 className="text-primary dark:text-white mb-1">{title}</h4>
        <p className="text-muted-foreground dark:text-gray-400">{subtitle}</p>
      </Card>
    </motion.div>
  );
}

function StatCard({ 
  icon, 
  value, 
  label,
  onClick 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.div whileHover={{ scale: onClick ? 1.05 : 1 }} whileTap={{ scale: onClick ? 0.95 : 1 }}>
      <Card 
        className={`p-3 text-center dark:bg-[#211832] dark:border-[#9B3922]/20 ${onClick ? 'cursor-pointer hover:bg-accent dark:hover:bg-[#181C14]' : ''}`}
        onClick={onClick}
      >
        <div className="flex justify-center mb-2 text-muted-foreground dark:text-gray-400">
          {icon}
        </div>
        <p className="mb-1 dark:text-white">{value}</p>
        <p className="text-muted-foreground dark:text-gray-400">{label}</p>
      </Card>
    </motion.div>
  );
}

function TripCard({ route, time, fare }: { route: string; time: string; fare: string }) {
  return (
    <Card className="p-4 dark:bg-[#211832] dark:border-[#9B3922]/20">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-[#9B3922]/20 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary dark:text-[#C62300]" />
          </div>
          <div>
            <p className="mb-1 dark:text-white">{route}</p>
            <p className="text-muted-foreground dark:text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </p>
          </div>
        </div>
        <p className="dark:text-white">{fare}</p>
      </div>
    </Card>
  );
}
