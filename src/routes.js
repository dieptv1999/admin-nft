import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Profile from "./pages/Profile";
import constant from "./utils/constant";
import withPermission from "./hooks/withPermission";
import Customer from "./pages/Customer";
import Orders from "./pages/Orders";
import Setting from "./pages/Setting";
import Skus from "./pages/Skus";

// ----------------------------------------------------------------------

function withAuth(children) {
  const token = window.localStorage.getItem(constant.TOKEN)
  const user = window.localStorage.getItem(constant.USER)

  if (token && user) return children
    return <Navigate to="/login" replace />

}

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: withAuth(<DashboardApp />) },
        { path: 'user', element: withAuth(withPermission(['permission::user::list'],<User />, 'page')) },
        { path: 'product', element: withAuth(<Products />) },
        { path: 'skus', element: withAuth(<Skus />) },
        { path: 'customer', element: withAuth(<Customer />) },
        { path: 'order', element: withAuth(<Orders />) },
        { path: 'blog', element: <Blog /> },
        { path: 'profile', element: withAuth(<Profile />),},
        { path: 'setting', element: withAuth(<Setting />),},
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
