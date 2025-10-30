/*
 * REACT NATIVE CONVERSION GUIDE - PassengerApp.tsx
 * =================================================
 * 
 * 1. NAVIGATION:
 *    Replace state-based screen switching with React Navigation:
 *    - Install: npm install @react-navigation/native @react-navigation/drawer
 *    - Use Drawer Navigator for sidebar + screens
 *    
 *    Example:
 *    import { createDrawerNavigator } from '@react-navigation/drawer';
 *    const Drawer = createDrawerNavigator();
 *    
 *    <Drawer.Navigator 
 *      drawerContent={(props) => <AnimatedSidebar {...props} />}
 *      screenOptions={{ headerShown: false }}
 *    >
 *      <Drawer.Screen name="Home" component={HomeScreen} />
 *      <Drawer.Screen name="History" component={TripHistoryScreen} />
 *      // ... other screens
 *    </Drawer.Navigator>
 * 
 * 2. STATE MANAGEMENT:
 *    - Keep useState for selectedVehicle and currentTrip
 *    - Or use React Context / Redux for global state
 *    - Sidebar state managed by Drawer Navigator
 * 
 * 3. SCREEN PROPS:
 *    Pass data via navigation params:
 *    navigation.navigate('TripTracking', { vehicle: selectedVehicle });
 *    
 *    Access in screen:
 *    const { vehicle } = route.params;
 */

import { useState } from 'react';
import { HomeScreen } from './HomeScreen';
import { VehicleSelectionScreen } from './VehicleSelectionScreen';
import { TripTrackingScreen } from './TripTrackingScreen';
import { TripHistoryScreen } from './TripHistoryScreen';
import { SavedLocationsScreen } from './SavedLocationsScreen';
import { ProfileScreen } from './ProfileScreen';
import { PaymentScreen } from './PaymentScreen';
import { AnimatedSidebar } from './AnimatedSidebar';

export type PassengerScreen = 'home' | 'vehicle-selection' | 'tracking' | 'history' | 'locations' | 'profile' | 'payment';

interface PassengerAppProps {
  onLogout: () => void;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Vehicle {
  id: string;
  registration: string;
  route: string;
  driverName: string;
  seats: number;
  availableSeats: number;
  fare: number;
  estimatedArrival: string;
  rating: number;
  vehicleType: string;
}

export interface Trip {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  vehicle: string;
  driver: string;
  fare: number;
  status: 'completed' | 'cancelled';
  rating?: number;
}

export function PassengerApp({ onLogout }: PassengerAppProps) {
  const [currentScreen, setCurrentScreen] = useState<PassengerScreen>('home');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentScreen('tracking');
    // Create a trip
    setCurrentTrip({
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      from: 'Current Location',
      to: vehicle.route,
      vehicle: vehicle.registration,
      driver: vehicle.driverName,
      fare: vehicle.fare,
      status: 'completed',
    });
  };

  const handleCompleteTrip = () => {
    setCurrentScreen('home');
    setSelectedVehicle(null);
  };

  return (
    <>
      <AnimatedSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onLogout={onLogout}
      />
      
      {currentScreen === 'home' && (
        <HomeScreen
          onNavigate={setCurrentScreen}
          onFindRide={() => setCurrentScreen('vehicle-selection')}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}
      {currentScreen === 'vehicle-selection' && (
        <VehicleSelectionScreen
          onBack={() => setCurrentScreen('home')}
          onSelectVehicle={handleSelectVehicle}
        />
      )}
      {currentScreen === 'tracking' && selectedVehicle && (
        <TripTrackingScreen
          vehicle={selectedVehicle}
          onComplete={handleCompleteTrip}
          onCancel={() => setCurrentScreen('home')}
        />
      )}
      {currentScreen === 'history' && (
        <TripHistoryScreen
          onBack={() => setCurrentScreen('home')}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}
      {currentScreen === 'locations' && (
        <SavedLocationsScreen
          onBack={() => setCurrentScreen('home')}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}
      {currentScreen === 'payment' && (
        <PaymentScreen
          onBack={() => setCurrentScreen('home')}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen
          onBack={() => setCurrentScreen('home')}
          onLogout={onLogout}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}
    </>
  );
}
