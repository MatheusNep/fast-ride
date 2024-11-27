import { RideHistResponse } from "../../schemas/rideHistResponse";
import axiosInstance from "../axios";

export const getRideHist = async (
    params: {
       customer_id: string,
        driver_id: number 
    }  
): Promise<RideHistResponse> => {
  
  try {
    const response = await axiosInstance.get<RideHistResponse>(
      `/ride/${params.customer_id}?driver_id=${params.driver_id}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error_description);
  }
};
