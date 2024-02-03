import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css'
import Dashboard from './routes/Dashboard.tsx';
import Login from './routes/Login.tsx';
import ErrorPage from './error/ErrorPage.tsx';
import DashHome from './routes/DashHome.tsx';
import Users from './routes/Users.tsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    errorElement: <ErrorPage />
  },
  {
    path:"dashboard",
    element:<Dashboard />,
    children:[
      {
        path:"/dashboard/home",
        element:<DashHome />
      },
      {
        path:"/dashboard/users",
        element: <Users />
      }
    ] 
  },
  {
    path:"login",
    element:<Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
