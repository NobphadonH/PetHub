import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Profile from './components/Profile.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

const router = createBrowserRouter([
  {path: "/pethub-website", element: <App />,},
  {path: "/pethub-website/profile", element: <Profile />,},
  {path: "/pethub-website/home", element: <Home />,},
  {path: "/pethub-website/signin", element: <Login />,},
  {path: "/pethub-website/signup", element: <Register />,},

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
