import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { BusinessFormPage } from '../pages/BusinessFormPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { MyBusinessesPage } from '../pages/MyBusinessesPage'
import { RegisterPage } from '../pages/RegisterPage'
import { RequireProfessional } from '../features/businesses/guard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/my-businesses',
    element: (
      <RequireProfessional>
        <DashboardLayout />
      </RequireProfessional>
    ),
    children: [
      {
        index: true,
        element: <MyBusinessesPage />,
      },
      {
        path: 'new',
        element: <BusinessFormPage />,
      },
    ],
  },
])
