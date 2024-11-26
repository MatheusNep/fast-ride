import { QueryClient, QueryClientProvider as QueryClientProviderTanstack } from '@tanstack/react-query'
import React from 'react'

export const queryClient = new QueryClient()

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProviderTanstack client={queryClient}>{children}</QueryClientProviderTanstack>
}

export default QueryClientProvider
