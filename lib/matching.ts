import { mockRoutes, mockVehicles } from '@/data/mock';
import { CandidateVehicle, DestinationQuery, Route, Vehicle } from '@/types/models';

// Placeholder geospatial helpers (mock only)
const distanceMeters = (a: [number, number], b: [number, number]) => {
  const R = 6371000; // meters
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aHarv = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
  return R * c;
};

const minDistanceToPolyline = (point: [number, number], polyline: [number, number][]) => {
  // Super coarse: min distance to vertices only (fine for mocks)
  return Math.min(...polyline.map((p) => distanceMeters(point, p)));
};

export function findCandidateRoutes(destination: [number, number], radius_m: number): Route[] {
  return mockRoutes.filter((r) => minDistanceToPolyline(destination, r.polyline) <= radius_m);
}

export function findVehiclesNear(origin: [number, number], radius_m: number, routeIds: string[], includeTaxis: boolean): Vehicle[] {
  return mockVehicles.filter((v) => {
    const near = distanceMeters(origin, v.coords) <= radius_m;
    const onRoute = v.route_id ? routeIds.includes(v.route_id) : false;
    const taxi = !v.route_id;
    return near && (onRoute || (includeTaxis && taxi));
  });
}

export function rankCandidates(vehicles: Vehicle[], destination: [number, number]): CandidateVehicle[] {
  return vehicles.map((v) => {
    const route = mockRoutes.find((r) => r.id === v.route_id);
    const eta_to_pickup_min = Math.max(1, Math.round(distanceMeters(v.coords, destination) / 200));
    const eta_to_destination_min = route ? Math.max(5, eta_to_pickup_min + Math.round(Math.random() * 20)) : Math.max(8, Math.round(Math.random() * 25));
    const fare_estimate = route ? 6 + Math.round(Math.random() * 5) : 25 + Math.round(Math.random() * 15);
    const occupancy_pct = Math.round((v.occupancy / v.capacity) * 100);
    return {
      vehicle: v,
      route,
      eta_to_pickup_min,
      eta_to_destination_min,
      fare_estimate,
      occupancy_pct,
      will_pass_near_destination: Boolean(route),
      is_over_capacity: v.occupancy >= v.capacity,
    };
  }).sort((a, b) => a.eta_to_destination_min - b.eta_to_destination_min);
}

export function matchVehicles(query: DestinationQuery): CandidateVehicle[] {
  const routes = findCandidateRoutes(query.destination, query.radius_m);
  const vehicles = findVehiclesNear(query.origin, query.radius_m, routes.map((r) => r.id), query.include_taxis);
  return rankCandidates(vehicles, query.destination);
}
