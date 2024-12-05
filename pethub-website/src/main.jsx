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
import EditRooms from './pages/HostPage/EditRooms.jsx';
import RoomManagement from './pages/HostPage/RoomManagement.jsx';

//admin
import HotelApprove from './pages/AdminPage/HotelApprove.jsx';

//guest
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import HotelDetail from './pages/HotelDetail.jsx';



const router = createBrowserRouter([
  {path: "/",  element: <Navigate to="/home" replace />,},
  {path: "/profile", element: <Profile />,},
  {path: "/home", element: <Home />,},
  {path: "/signin", element: <Login />,},
  {path: "/signup", element: <Register />,},
  {path: "/listhost", element: <ListHost />,},
  {path: "/hostsignup", element: <HostSignUp />,},
  {path: "/basics", element: <Basics />,},
  {path: "/home/:hotelName", element: <HotelDetail />,}, 
  {path: "/home/:hotelName/:roomTypeName", element: <RoomsBooking />,},
  {path: "/rooms", element: <Rooms />,},
  {path: "/confirm", element: <Confirm />,}, 
  {path: "/finish", element: <Finish />,}, 
  {path: "/petregister", element: <PetRegister />,},
  {path: "/petedit", element: <PetEdit />,},
  {path: "/addrooms", element: <AddRooms />,}, 
  {path: "/editrooms", element: <EditRooms />,}, 
  {path: "/hostprofile/:roomID", element: <RoomManagement />,}, 
  {path: "/payment", element: <Payment />,},
  {path: "/hostprofile", element: <HostProfile />,},   
  {path: "/hotelapprove", element: <HotelApprove />,},
]);




createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // </StrictMode>,
  <RouterProvider router={router}/>
)
