import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';


import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import './index.css'
import Dashboard from './routes/Dashboard.tsx';
import Login from './routes/Login.tsx';
import ErrorPage from './error/ErrorPage.tsx';
import DashHome from './routes/DashHome.tsx';
import Users from './routes/Users.tsx';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql.ts';

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


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <CookiesProvider defaultSetOptions={{ path: "/" }}>
                <RouterProvider router={router} />
            </CookiesProvider>
        </ApolloProvider>
    </React.StrictMode>
);
