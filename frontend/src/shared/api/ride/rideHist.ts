import { RideHistResponse } from "../../schemas/rideHistResponse";
import axiosInstance from "../axios";

export const getRideHist = async (
    params: {
       customer_id: string,
        driver_id: number 
    }  
): Promise<RideHistResponse> => {
  
  try {
    console.log("PARAMS NO getRideHist: ", params.customer_id)
    const response = await axiosInstance.get<RideHistResponse>(
      `/ride/${params.customer_id}?driver_id=${params.driver_id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching ride estimate:', error);
    throw new Error('Could not fetch ride estimate');
  }
};
