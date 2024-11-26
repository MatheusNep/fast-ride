import { getRideHist } from "../api/ride/rideHist"
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { RideHistResponse } from "../schemas/rideHistResponse"
import { defaultOptions } from "../utils/defaultOptions"

type UseRideHistQueryArgs = {
  params:{
    custumer_id?: string
    driver_id?: number
  }  
  options?: UseQueryOptions<unknown, Error, RideHistResponse, ['RIDEHIST', string] >
}

export const RIDEHIST = 'RIDEHIST'

function useRideHist({ params, options}: UseRideHistQueryArgs) {
  const queryFn = async () => {
    if(params.custumer_id == ''){
        return []
    }else {
        return await getRideHist(params)
    }    
  }

  return useQuery({
    queryKey: [RIDEHIST, JSON.stringify(params)],
    queryFn,
    ...defaultOptions,
    ...options
  })
}

export default useRideHist
