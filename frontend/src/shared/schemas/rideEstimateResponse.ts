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
    }>;
    routeResponse: object;
}