import { Drivers } from "../../schemas/drivers";
import { RideEstimateResponse } from "../../schemas/rideEstimateResponse";
import axiosInstance from "../axios";

export const getDrivers = async (): Promise<Drivers> => {
  try {
    const response = await axiosInstance.get<Drivers>(
      '/drivers'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw new Error('Could not fetch drivers');
  }
};
