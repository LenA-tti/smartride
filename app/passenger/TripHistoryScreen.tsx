import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button-extended';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  MapPin,
  Star
} from 'lucide-react';
import React, { useState } from 'react';
import type { Trip } from './PassengerApp';

interface TripHistoryScreenProps {
  onBack: () => void;
  onOpenSidebar: () => void;
}

// Mock data
const mockTrips: Trip[] = [
  {
    id: '1',
    date: '2025-10-24',
    time: '14:30',
    from: 'Main Mall',
    to: 'Mogoditshane',
    vehicle: 'B 123 ABC',
    driver: 'Thabo Molefe',
    fare: 25,
    status: 'completed',
    rating: 5
  },
  {
    id: '2',
    date: '2025-10-23',
    time: '08:15',
    from: 'Broadhurst',
    to: 'CBD',
    vehicle: 'B 456 DEF',
    driver: 'Keabetswe Kgosi',
    fare: 18,
    status: 'completed',
    rating: 4
  },
  {
    id: '3',
    date: '2025-10-22',
    time: '17:45',
    from: 'Airport Junction',
    to: 'Gaborone West',
    vehicle: 'B 789 GHI',
    driver: 'Mpho Seretse',
    fare: 20,
    status: 'completed',
    rating: 5
  },
  {
    id: '4',
    date: '2025-10-22',
    time: '09:00',
    from: 'Block 8',
    to: 'Main Mall',
    vehicle: 'B 234 JKL',
    driver: 'Lorato Dube',
    fare: 15,
    status: 'cancelled'
  },
  {
    id: '5',
    date: '2025-10-21',
    time: '16:20',
    from: 'Gaborone',
    to: 'Mogoditshane',
    vehicle: 'B 567 MNO',
    driver: 'Neo Mosimane',
    fare: 22,
    status: 'completed',
    rating: 4
  }
];

export function TripHistoryScreen({ onBack }: TripHistoryScreenProps) {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  const completedTrips = mockTrips.filter(t => t.status === 'completed');
  const cancelledTrips = mockTrips.filter(t => t.status === 'cancelled');

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="bg-transparent hover:bg-muted"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2>Trip History</h2>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 bg-accent/50 border-b">
        <div className="grid grid-cols-3 gap-4">
          <StatItem label="Total Trips" value={mockTrips.length.toString()} />
          <StatItem label="This Month" value="12" />
          <StatItem label="Total Spent" value="P 340" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="all" className="h-full flex flex-col">
          <div className="px-6 pt-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="flex-1 overflow-auto px-6 py-4 mt-0">
            <div className="space-y-3">
              {mockTrips.map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  onClick={() => setSelectedTrip(trip)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="flex-1 overflow-auto px-6 py-4 mt-0">
            <div className="space-y-3">
              {completedTrips.map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  onClick={() => setSelectedTrip(trip)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="flex-1 overflow-auto px-6 py-4 mt-0">
            <div className="space-y-3">
              {cancelledTrips.length > 0 ? (
                cancelledTrips.map(trip => (
                  <TripCard 
                    key={trip.id} 
                    trip={trip}
                    onClick={() => setSelectedTrip(trip)}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">No cancelled trips</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Trip Detail Modal */}
      {selectedTrip && (
        <div className="absolute inset-0 bg-background/95 z-50 flex items-end">
          <div className="w-full bg-background rounded-t-3xl border-t shadow-2xl max-h-[80vh] overflow-auto">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3>Trip Details</h3>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent hover:bg-muted"
                onClick={() => setSelectedTrip(null)}
              >
                Close
              </Button>
            </div>
            
            <div className="px-6 py-6 space-y-4">
              {/* Route */}
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <div className="w-0.5 h-12 bg-border"></div>
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-muted-foreground mb-1">From</p>
                      <p>{selectedTrip.from}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">To</p>
                      <p>{selectedTrip.to}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Details */}
              <Card className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedTrip.date).toLocaleDateString()} {selectedTrip.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span>{selectedTrip.vehicle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Driver</span>
                  <span>{selectedTrip.driver}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Fare</span>
                  <span>P {selectedTrip.fare}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={selectedTrip.status === 'completed' ? 'default' : 'destructive'}>
                    {selectedTrip.status}
                  </Badge>
                </div>
                {selectedTrip.rating && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Your Rating</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < selectedTrip.rating!
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Actions */}
              <Button variant="outline" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="mb-1">{value}</p>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
  return (
    <Card className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-primary">{trip.from} → {trip.to}</h4>
            <Badge 
              variant={trip.status === 'completed' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {trip.status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(trip.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {trip.time}
            </span>
          </div>
          <p className="text-muted-foreground mt-2">
            {trip.vehicle} • {trip.driver}
          </p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="mb-2">P {trip.fare}</p>
          {trip.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-muted-foreground">{trip.rating}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
