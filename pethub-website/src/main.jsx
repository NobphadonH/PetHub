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
import HotelProfileManagement from './components/HotelProfileManagement.jsx';
import AddRooms from './components/AddRooms.jsx';
import RoomManagement from './components/RoomManagement.jsx';
import Payment from './components/Payment.jsx';
import HostProfile from './components/HostProfile.jsx';
import HotelApprove from './components/HotelApprove.jsx';
import PetEdit from './components/PetEdit.jsx';



const router = createBrowserRouter([
  {path: "/pethub-website", element: <App />,},
  {path: "/pethub-website/test", element: <Test />,},
  {path: "/pethub-website/profile", element: <Profile />,},
  {path: "/pethub-website/home", element: <Home />,},
  {path: "/pethub-website/signin", element: <Login />,},
  {path: "/pethub-website/signup", element: <Register />,},
  {path: "/pethub-website/listhost", element: <ListHost />,},  //need responsive เคน
  {path: "/pethub-website/hostsignup", element: <HostSignUp />,},
  {path: "/pethub-website/basics", element: <Basics />,}, // ploter
  {path: "/pethub-website/home/:hotelName", element: <HotelDetail />,}, 
  {path: "/pethub-website/home/:hotelName/:roomTypeName", element: <RoomsBooking />,},
  {path: "/pethub-website/rooms", element: <Rooms />,}, //need responsive โต้
  {path: "/pethub-website/confirm", element: <Confirm />,},  //need responsive กัน
  {path: "/pethub-website/finish", element: <Finish />,}, //need responsive กัน
  {path: "/pethub-website/petregister", element: <PetRegister />,},
  {path: "/pethub-website/petedit", element: <PetEdit />,},
  {path: "/pethub-website/hotel-profile", element: <HotelProfileManagement /> }, 
  {path: "/pethub-website/addrooms", element: <AddRooms />,},  //need responsive โต้
  {path: "/pethub-website/hostprofile/:roomID", element: <RoomManagement />,}, 
  {path: "/pethub-website/payment", element: <Payment />,},
  {path: "/pethub-website/hostprofile", element: <HostProfile />,},
  {path: "/pethub-website/hotelapprove", element: <HotelApprove />,},
]);




createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // </StrictMode>,
  <RouterProvider router={router}/>
)
