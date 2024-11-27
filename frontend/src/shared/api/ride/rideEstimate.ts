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
  } catch (error: any) {
    throw new Error(error.response.data.error_description);
  }
};
