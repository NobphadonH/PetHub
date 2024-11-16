import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import App from './App.jsx'
import Test from './components/Test.jsx';
import Profile from './components/Profile.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ListHost from './components/ListHost.jsx';
import HostSignUp from './components/HostSignUp.jsx';
import Basics from './components/Basics.jsx';
import HotelDetail from './components/HotelDetail.jsx';
import PetRegister from './components/PetRegister.jsx';
import Rooms from './components/Rooms.jsx';
import Confirm from './components/Confirm.jsx';
import Finish from './components/Finish.jsx';
import RoomsBooking from './components/RoomsBooking.jsx';
import AddRooms from './components/AddRooms.jsx';
import RoomManagement from './components/RoomManagement.jsx';
import Payment from './components/Payment.jsx';



const router = createBrowserRouter([
  {path: "/pethub-website", element: <App />,},
  {path: "/pethub-website/test", element: <Test />,},
  {path: "/pethub-website/profile", element: <Profile />,},
  {path: "/pethub-website/home", element: <Home />,},
  {path: "/pethub-website/signin", element: <Login />,},
  {path: "/pethub-website/signup", element: <Register />,},
  {path: "/pethub-website/listhost", element: <ListHost />,},
  {path: "/pethub-website/hostsignup", element: <HostSignUp />,},
  {path: "/pethub-website/basics", element: <Basics />,},
  {path: "/pethub-website/home/:hotelID", element: <HotelDetail />,},
  {path: "/pethub-website/home/:hotelID/:roomID", element: <RoomsBooking />,},
  {path: "/pethub-website/rooms", element: <Rooms />,},
  {path: "/pethub-website/confirm", element: <Confirm />,},
  {path: "/pethub-website/finish", element: <Finish />,},
  {path: "/pethub-website/petregister", element: <PetRegister />,},
  {path: "/pethub-website/addrooms", element: <AddRooms />,},
  {path: "/pethub-website/hostprofile/:roomID", element: <RoomManagement />,},
  {path: "/pethub-website/payment", element: <Payment />,},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
