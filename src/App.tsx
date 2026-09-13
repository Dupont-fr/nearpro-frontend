import { RouterProvider } from 'react-router-dom'
import { useBootstrapAuth } from './features/auth/hooks'
import { router } from './routes'

export default function App() {
  useBootstrapAuth()

  return <RouterProvider router={router} />
}