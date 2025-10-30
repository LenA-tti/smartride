import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Phone, 
  MapPin, 
  Navigation,
  Star,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';
import type { Vehicle } from './PassengerApp';
import { Progress } from '../ui/progress';

interface TripTrackingScreenProps {
  vehicle: Vehicle;
  onComplete: () => void;
  onCancel: () => void;
}

export function TripTrackingScreen({ vehicle, onComplete, onCancel }: TripTrackingScreenProps) {
  const [tripStage, setTripStage] = useState<'waiting' | 'boarding' | 'in-transit' | 'arriving'>('waiting');
  const [progress, setProgress] = useState(0);

  // Simulate trip progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tripStage === 'waiting') {
        setTripStage('boarding');
        setProgress(25);
      } else if (tripStage === 'boarding') {
        setTripStage('in-transit');
        setProgress(50);
      } else if (tripStage === 'in-transit') {
        setTripStage('arriving');
        setProgress(90);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [tripStage]);

  const getStageInfo = () => {
    switch (tripStage) {
      case 'waiting':
        return {
          title: 'Vehicle is on the way',
          subtitle: `${vehicle.estimatedArrival} away`,
          color: 'text-blue-600'
        };
      case 'boarding':
        return {
          title: 'Vehicle has arrived',
          subtitle: 'Please board the vehicle',
          color: 'text-green-600'
        };
      case 'in-transit':
        return {
          title: 'Trip in progress',
          subtitle: 'Enjoy your ride',
          color: 'text-primary'
        };
      case 'arriving':
        return {
          title: 'Arriving soon',
          subtitle: 'Prepare to alight',
          color: 'text-orange-600'
        };
    }
  };

  const stageInfo = getStageInfo();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Map Area - Placeholder */}
      <div className="h-[45vh] bg-gradient-to-br from-blue-100 to-green-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-16 h-16 text-primary mx-auto mb-2" />
            <p className="text-muted-foreground">Live tracking map</p>
          </div>
        </div>
        
        {/* Stage Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <Badge className={`${stageInfo.color} bg-background border-2 px-4 py-2`}>
            <Clock className="w-4 h-4 mr-2" />
            {stageInfo.subtitle}
          </Badge>
        </div>

        {/* Trip Progress */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
          <div className="bg-background rounded-xl p-4 shadow-lg">
            <Progress value={progress} className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Pickup</span>
              <span>Drop-off</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* Status */}
        <div className="mb-6">
          <h3 className={`${stageInfo.color} mb-1`}>{stageInfo.title}</h3>
          <p className="text-muted-foreground">Track your vehicle in real-time</p>
        </div>

        {/* Driver Card */}
        <Card className="p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {vehicle.driverName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p>{vehicle.driverName}</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-muted-foreground">{vehicle.rating}</span>
              </div>
            </div>
            <Button size="icon" variant="outline">
              <Phone className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground mb-1">Vehicle</p>
              <p>{vehicle.registration}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Seats</p>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{vehicle.availableSeats} available</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Route Card */}
        <Card className="p-4 mb-4">
          <h4 className="mb-3">Route Details</h4>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-2 pt-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-0.5 h-12 bg-border"></div>
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <p className="text-muted-foreground mb-1">From</p>
                <p>Current Location</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">To</p>
                <p>{vehicle.route.split(' → ')[1]}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Fare Card */}
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Estimated Fare</p>
              <h3 className="text-primary">P {vehicle.fare}</h3>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {tripStage === 'arriving' && (
            <Button onClick={onComplete} className="w-full h-12" size="lg">
              Complete Trip
            </Button>
          )}
          <Button 
            onClick={onCancel} 
            variant="outline" 
            className="w-full h-12"
            size="lg"
          >
            Cancel Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
