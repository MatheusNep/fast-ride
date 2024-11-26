import { getDrivers } from "../api/drivers/getDrivers"
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Drivers } from "../schemas/drivers"
import { defaultOptions } from "../utils/defaultOptions"

type useDriversQueryArgs = {
    options?: UseQueryOptions<unknown, Error, Drivers[], ['DRIVERS'] >
}

export const DRIVERS = 'DRIVERS'

function useDrivers({options}: useDriversQueryArgs) {
  const queryFn = async () => {
    return await getDrivers()
  }

  return useQuery({
    queryKey: [DRIVERS],
    queryFn,
    ...defaultOptions,
    ...options
  })
}

export default useDrivers
