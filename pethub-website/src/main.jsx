import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import App from './App.jsx'

//client
import Register from './components/ClientPage/Register.jsx';
import Profile from './components/ClientPage/Profile.jsx';
import RoomsBooking from './components/BookingPage/RoomsBooking.jsx';
import Payment from './components/BookingPage/Payment.jsx';
import PetRegister from './components/PetPage/PetRegister.jsx';
import PetEdit from './components/PetPage/PetEdit.jsx';

//host
import HostSignUp from './components/HostPage/HostSIgnup/HostSignUp.jsx';
import ListHost from './components/HostPage/HostSIgnup/ListHost.jsx';
import Basics from './components/HostPage/HostSIgnup/Basics.jsx';
import Rooms from './components/HostPage/HostSIgnup/Rooms.jsx';
import Confirm from './components/HostPage/HostSIgnup/Confirm.jsx';
import Finish from './components/HostPage/HostSIgnup/Finish.jsx';
import HostProfile from './components/HostPage/HostProfile.jsx';
import HotelProfileManagement from './components/HostPage/HotelProfileManagement.jsx';
import AddRooms from './components/HostPage/AddRooms.jsx';
import RoomManagement from './components/HostPage/RoomManagement.jsx';

//admin
import HotelApprove from './components/AdminPage/HotelApprove.jsx';

//guest
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import HotelDetail from './components/HotelDetail.jsx';



const router = createBrowserRouter([
  {path: "/pethub-website", element: <App />,},
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
