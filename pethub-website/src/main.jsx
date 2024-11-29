import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Navigate } from "react-router-dom";


//client
import Register from './pages/ClientPage/Register.jsx';
import Profile from './pages/ClientPage/Profile.jsx';
import RoomsBooking from './pages/BookingPage/RoomsBooking.jsx';
import Payment from './pages/BookingPage/Payment.jsx';
import PetRegister from './pages/PetPage/PetRegister.jsx';
import PetEdit from './pages/PetPage/PetEdit.jsx';

//host
import HostSignUp from './pages/HostPage/HostSIgnup/HostSignUp.jsx';
import ListHost from './pages/HostPage/HostSIgnup/ListHost.jsx';
import Basics from './pages/HostPage/HostSIgnup/Basics.jsx';
import Rooms from './pages/HostPage/HostSIgnup/Rooms.jsx';
import Confirm from './pages/HostPage/HostSIgnup/Confirm.jsx';
import Finish from './pages/HostPage/HostSIgnup/Finish.jsx';
import HostProfile from './pages/HostPage/HostProfile.jsx';
import HotelProfileManagement from './pages/HostPage/HotelProfileManagement.jsx';
import AddRooms from './pages/HostPage/AddRooms.jsx';
import RoomManagement from './pages/HostPage/RoomManagement.jsx';

//admin
import HotelApprove from './pages/AdminPage/HotelApprove.jsx';

//guest
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import HotelDetail from './pages/HotelDetail.jsx';



const router = createBrowserRouter([
  {path: "/pethub-website",  element: <Navigate to="/pethub-website/home" replace />,},
  {path: "/pethub-website/profile", element: <Profile />,},
  {path: "/pethub-website/home", element: <Home />,},
  {path: "/pethub-website/signin", element: <Login />,},
  {path: "/pethub-website/signup", element: <Register />,},
  {path: "/pethub-website/listhost", element: <ListHost />,},
  {path: "/pethub-website/hostsignup", element: <HostSignUp />,},
  {path: "/pethub-website/basics", element: <Basics />,},
  {path: "/pethub-website/home/:hotelName", element: <HotelDetail />,}, 
  {path: "/pethub-website/home/:hotelName/:roomTypeName", element: <RoomsBooking />,},
  {path: "/pethub-website/rooms", element: <Rooms />,},
  {path: "/pethub-website/confirm", element: <Confirm />,}, 
  {path: "/pethub-website/finish", element: <Finish />,}, 
  {path: "/pethub-website/petregister", element: <PetRegister />,},
  {path: "/pethub-website/petedit", element: <PetEdit />,},
  {path: "/pethub-website/hotel-profile", element: <HotelProfileManagement /> }, 
  {path: "/pethub-website/addrooms", element: <AddRooms />,}, 
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
