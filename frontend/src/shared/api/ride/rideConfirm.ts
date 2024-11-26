import { RideEstimateResponse, RideRequest } from "../../schemas/rideEstimateResponse";
import axiosInstance from "../axios";

export const getRideConfirm = async (
  ride: RideRequest
): Promise<RideEstimateResponse> => {
  try {
    const response = await axiosInstance.post<RideEstimateResponse>(
      '/ride/confirm',
      {
        ride,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching ride save:', error);
    throw new Error('Could not add a ride');
  }
};
