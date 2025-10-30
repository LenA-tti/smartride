import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation,
  Star,
  Users,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import type { Vehicle } from './PassengerApp';

interface VehicleSelectionScreenProps {
  onBack: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    registration: 'B 123 ABC',
    route: 'Gaborone → Mogoditshane',
    driverName: 'Thabo Molefe',
    seats: 14,
    availableSeats: 6,
    fare: 25,
    estimatedArrival: '5 min',
    rating: 4.8,
    vehicleType: 'Minibus'
  },
  {
    id: '2',
    registration: 'B 456 DEF',
    route: 'Main Mall → Block 8',
    driverName: 'Keabetswe Kgosi',
    seats: 14,
    availableSeats: 2,
    fare: 15,
    estimatedArrival: '8 min',
    rating: 4.9,
    vehicleType: 'Minibus'
  },
  {
    id: '3',
    registration: 'B 789 GHI',
    route: 'Airport Junction → Gaborone West',
    driverName: 'Mpho Seretse',
    seats: 14,
    availableSeats: 10,
    fare: 20,
    estimatedArrival: '12 min',
    rating: 4.7,
    vehicleType: 'Minibus'
  },
  {
    id: '4',
    registration: 'B 234 JKL',
    route: 'Broadhurst → CBD',
    driverName: 'Lorato Dube',
    seats: 14,
    availableSeats: 4,
    fare: 18,
    estimatedArrival: '3 min',
    rating: 5.0,
    vehicleType: 'Minibus'
  }
];

export function VehicleSelectionScreen({ onBack, onSelectVehicle }: VehicleSelectionScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const filteredVehicles = mockVehicles.filter(vehicle =>
    vehicle.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.driverName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-primary-foreground">Available Vehicles</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search route, vehicle, or driver"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-12 bg-background"
          />
        </div>
      </div>

      {/* Location Info */}
      <div className="px-6 py-4 bg-accent/50 border-b">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <div className="w-0.5 h-8 bg-border"></div>
            <Navigation className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-muted-foreground mb-1">From</p>
              <p>Current Location (GPS)</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">To</p>
              <p>Select a vehicle below</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b flex items-center gap-2 overflow-x-auto">
        <Button variant="outline" size="sm" className="gap-2 flex-shrink-0">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Badge variant="outline" className="cursor-pointer flex-shrink-0">Nearest First</Badge>
        <Badge variant="outline" className="cursor-pointer flex-shrink-0">Available Seats</Badge>
        <Badge variant="outline" className="cursor-pointer flex-shrink-0">Top Rated</Badge>
      </div>

      {/* Vehicle List */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <p className="text-muted-foreground mb-4">
          {filteredVehicles.length} vehicles available
        </p>
        <div className="space-y-3">
          {filteredVehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={() => onSelectVehicle(vehicle)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VehicleCard({ vehicle, onSelect }: { vehicle: Vehicle; onSelect: () => void }) {
  const isFilling = vehicle.availableSeats <= 3;
  
  return (
    <Card className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={onSelect}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-primary">{vehicle.route}</h4>
          </div>
          <p className="text-muted-foreground mb-2">{vehicle.registration} • {vehicle.driverName}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{vehicle.estimatedArrival}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{vehicle.availableSeats}/{vehicle.seats} available</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{vehicle.rating}</span>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="mb-1">P {vehicle.fare}</p>
          {isFilling && (
            <Badge variant="destructive" className="text-xs">Filling up</Badge>
          )}
        </div>
      </div>
      <Button className="w-full" size="sm">
        Select Vehicle
      </Button>
    </Card>
  );
}
