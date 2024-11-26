import { RideEstimateResponse } from "../../schemas/rideEstimateResponse";
import axiosInstance from "../axios";

export const getRideEstimate = async (
  origin: string,
  destination: string,
  costumer_id: string
): Promise<RideEstimateResponse> => {
  try {
    const response = await axiosInstance.post<RideEstimateResponse>(
      '/ride/estimate',
      {
        origin,
        destination,
        costumer_id,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching ride estimate:', error);
    throw new Error('Could not fetch ride estimate');
  }
};
