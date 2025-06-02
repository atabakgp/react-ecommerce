import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import Home from '../pages/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';

import PrivateRoute from './privateRoutes';
import PublicRoute from './publicRoutes';

const publicRoutes = [
  {
    path: 'login',
    Component: Login,
  },
  {
    path: 'register',
    Component: Register,
  },
];

const dashboardRoutes = [
  {
    index: true,
    Component: Dashboard,
  },
  {
    path: 'profile',
    Component: Profile,
  },
];

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
            children: publicRoutes,
          },
        ],
      },
      {
        path: 'dashboard',
        Component: PrivateRoute,
        children: [
          {
            Component: DashboardLayout,
            children: dashboardRoutes,
          },
        ],
      },
    ],
  },
]);
