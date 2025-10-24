import { BoardingIntent, CandidateVehicle, Route, Stop, Transaction, Trip, User, Vehicle } from '@/types/models';

// Simple mock dataset for a small Gaborone pilot

export const mockUsers: User[] = [
  { id: 'u1', phone: '+26770000001', role: 'passenger', display_name: 'Sarah', verified: true },
  { id: 'u2', phone: '+26770000002', role: 'driver', display_name: 'Thabo', verified: true },
  { id: 'u3', phone: '+26770000003', role: 'admin', display_name: 'Owner Admin', verified: true },
];

const broadhurstStops: Stop[] = [
  { id: 's1', name: 'Tsholofelo', coords: [-24.616, 25.930] },
  { id: 's2', name: 'Broadhurst Mall', coords: [-24.628, 25.935] },
  { id: 's3', name: 'ABSA Broadhurst', coords: [-24.6295, 25.944] },
];

const mogoditshaneStops: Stop[] = [
  { id: 's4', name: 'Mogoditshane Circle', coords: [-24.633, 25.865] },
  { id: 's5', name: 'Western Bypass', coords: [-24.637, 25.900] },
  { id: 's6', name: 'CBD Station', coords: [-24.653, 25.914] },
];

export const mockRoutes: Route[] = [
  {
    id: 'r1',
    name: 'Broadhurst Corridor',
    polyline: [
      [-24.616, 25.930],
      [-24.622, 25.933],
      [-24.628, 25.935],
      [-24.6295, 25.944],
    ],
    stops: broadhurstStops,
  },
  {
    id: 'r2',
    name: 'Mogoditshane to CBD',
    polyline: [
      [-24.633, 25.865],
      [-24.635, 25.880],
      [-24.637, 25.900],
      [-24.653, 25.914],
    ],
    stops: mogoditshaneStops,
  },
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    owner_id: 'o1',
    plate: 'B 123 ABC',
    capacity: 16,
    route_id: 'r1',
    status: 'online',
    occupancy: 8,
    coords: [-24.621, 25.932],
  },
  {
    id: 'v2',
    owner_id: 'o1',
    plate: 'B 987 XYZ',
    capacity: 16,
    route_id: 'r2',
    status: 'online',
    occupancy: 14,
    coords: [-24.636, 25.895],
  },
  {
    id: 'v3',
    owner_id: 'o2',
    plate: 'TX 45 HJK',
    capacity: 4,
    route_id: undefined, // mobile taxi
    status: 'online',
    occupancy: 1,
    coords: [-24.625, 25.938],
  },
];

export const mockTrips: Trip[] = [
  {
    id: 't1',
    vehicle_id: 'v1',
    route_id: 'r1',
    start_time: new Date().toISOString(),
    status: 'in_progress',
    passenger_ids: ['u1'],
  },
];

export const mockBoardingIntents: BoardingIntent[] = [
  { id: 'b1', passenger_id: 'u1', vehicle_id: 'v1', token: '42AB', confirmed_at: new Date().toISOString() },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'x1',
    trip_id: 't1',
    passenger_id: 'u1',
    amount: 6.0,
    status: 'authorized',
    provider_ref: 'wal_123',
    timestamp: new Date().toISOString(),
    method: 'wallet',
  },
];

// Convenience function to create a few candidate vehicles for UI mocks
export function mockCandidates(): CandidateVehicle[] {
  return mockVehicles.map((v) => {
    const route = mockRoutes.find((r) => r.id === v.route_id);
    const is_over_capacity = v.occupancy >= v.capacity;
    return {
      vehicle: v,
      route,
      eta_to_pickup_min: Math.max(1, Math.round(Math.random() * 8)),
      eta_to_destination_min: Math.max(5, Math.round(Math.random() * 25)),
      fare_estimate: route ? 6 + Math.round(Math.random() * 5) : 25 + Math.round(Math.random() * 15),
      occupancy_pct: Math.round((v.occupancy / v.capacity) * 100),
      will_pass_near_destination: Boolean(route),
      is_over_capacity,
    };
  });
}
