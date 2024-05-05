import { PrivateRouter } from './PrivateRouter';
import { LoginPage } from '../pages/LoginPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { DashboardPage } from '../pages/DashboardPage';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { AuthContext } from '@/contexts/AuthContext';
import { PublicRouter } from './PublicRouter';
import { MapRoutePage } from '../pages/MapRoutePage';
import { ClientsPage } from '@/pages/ClientsPage';
import { AgentsPage } from '@/pages/AgentsPage';


function Routers() {
  const router = createBrowserRouter([
    {
      path:"/home",
      element:<PrivateRouter><DashboardPage/></PrivateRouter>
    },
    {
      path:"/user",
      element:<PrivateRouter><MapRoutePage/></PrivateRouter>
    },
    {
      path:"/users",
      element:<PrivateRouter><ClientsPage/></PrivateRouter>
    },
    {
      path:"/agents",
      element:<PrivateRouter><AgentsPage/></PrivateRouter>
    },
    {
      path:"/",
      element:<PublicRouter><LoginPage/></PublicRouter>
    },
    {
      path:"/forgot-password",
      element:<ResetPasswordPage></ResetPasswordPage>
    }
  ])
  
  return (
    <AuthContext>
    <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  )
}

export default Routers;