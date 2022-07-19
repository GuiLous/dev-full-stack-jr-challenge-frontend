import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query'
import { AuthProvider } from '../contexts/AuthContext'
import { queryClient } from '../services/queryClient'

import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
