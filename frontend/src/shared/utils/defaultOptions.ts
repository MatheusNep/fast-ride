export const defaultOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false
} as const