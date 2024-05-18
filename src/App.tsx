import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import "./styles/global.css"
import { router } from './pages/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { AuthContextProvider } from './contexts/auth-context'

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}