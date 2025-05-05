import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';          
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
    ],
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      { path: '', Component: Dashboard },
    ],
  },
]);
