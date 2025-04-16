import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Home },
    ]
  },
])
