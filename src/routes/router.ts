// routes.ts
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // 👈 use App as the root
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import PrivateRoute from './privateRoutes';
import PublicRoute from './publicRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        Component: MainLayout,
        children: [
          { index: true, Component: Home },
          {
            Component: PublicRoute,
            children: [
              { path: 'login', Component: Login },
              { path: 'register', Component: Register },
            ],
          },
        ],
      },
      {
        path: 'dashboard',
        Component: PrivateRoute,
        children: [
          {
            Component: DashboardLayout,
            children: [{ index: true, Component: Dashboard }],
          },
        ],
      },
    ],
  },
]);
