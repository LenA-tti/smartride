// Core domain models for SmartRide (mock-only types)

export type Role = 'passenger' | 'driver' | 'admin';

export interface User {
  id: string;
  phone: string;
  role: Role;
  display_name: string;
  verified: boolean;
}

export type VehicleStatus = 'offline' | 'online' | 'on_break' | 'maintenance' | 'full';

export interface Vehicle {
  id: string;
  owner_id: string;
  plate: string;
  capacity: number;
  route_id?: string; // undefined for mobile taxis
  status: VehicleStatus;
  occupancy: number;
  coords: [number, number]; // [lat, lng]
}

export interface Stop {
  id: string;
  name: string;
  coords: [number, number];
}

export interface Route {
  id: string;
  name: string;
  polyline: [number, number][]; // simple list of lat/lng pairs for mock
  stops: Stop[];
}

export type TripStatus = 'planned' | 'in_progress' | 'completed' | 'canceled';

export interface Trip {
  id: string;
  vehicle_id: string;
  route_id?: string;
  start_time: string; // ISO string
  end_time?: string; // ISO string
  status: TripStatus;
  passenger_ids: string[];
}

export interface BoardingIntent {
  id: string;
  passenger_id: string;
  vehicle_id: string;
  token: string; // short token like "42AB"
  confirmed_at?: string;
  canceled_at?: string;
}

export type TxStatus = 'authorized' | 'captured' | 'voided' | 'failed' | 'pending';

export interface Transaction {
  id: string;
  trip_id: string;
  passenger_id: string;
  amount: number; // in local currency units
  status: TxStatus;
  provider_ref?: string;
  timestamp: string; // ISO string
  method: 'wallet' | 'qr_fallback';
}

// Lightweight input shapes
export interface DestinationQuery {
  origin: [number, number];
  destination: [number, number];
  radius_m: number;
  include_taxis: boolean;
}

export interface CandidateVehicle {
  vehicle: Vehicle;
  route?: Route;
  eta_to_pickup_min: number;
  eta_to_destination_min: number;
  fare_estimate: number;
  occupancy_pct: number;
  will_pass_near_destination: boolean;
  is_over_capacity: boolean;
}
