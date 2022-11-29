import React from 'react'
import { useRoutes } from 'react-router-dom';
import Home from './Home';
import Authorization from './Authorization';
import AuthPage from './AuthPage';
import Login from './Login';
import AdminDashboard from './AdminDashboard';


function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <AuthPage /> },
    { path: '/adminlogin', element: <Login /> },
    { path: '/admindashboard', element: <AdminDashboard /> },
    { path: '/auth', element: <Authorization /> },
    { path: '/auth-page', element: <AuthPage /> },

  ])
  

return routes;
}

export default App
