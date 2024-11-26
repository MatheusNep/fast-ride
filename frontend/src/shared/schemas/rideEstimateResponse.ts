import { DirectionsResponseData } from '@googlemaps/google-maps-services-js';
interface Location {
    latitude: number;
    longitude: number;
}
  
export interface RideEstimateResponse {
    origin: Location;
    destination: Location;
    distance: number;
    duration: string;
    options: Array<{
      id: number;
      name: string;
      description: string;
      vehicle: string;
      review: {
        rating: number;
        comment: string;
      };
      value: number;
      limit: number;
    }>;
    routeResponse: DirectionsResponseData & {request: any};
}

export interface RideRequest {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number,
    name: string
  },
  value: number
}