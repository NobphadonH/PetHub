import Navbar from '../../components/Navbar'
import HotelApproveBox from '../../components/HotelApproveBox'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env

const BASE_URL = process.env.SERVER_API

function HotelApprove() {

  // data state
  const [hotelData, setHotelData] = useState();
  const [actionCnt, setActionCnt] = useState(0);
  // data state

  // API Connection
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/hotel/getHotelByVerification/unverified`, { withCredentials:true})
        console.log(res.data);
        setHotelData(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
    console.log(hotelData);
  }, [actionCnt])

  return (
    <>
      <Navbar />
      <div className='mx-auto mt-[5vw] md:mt-8 lg:mt-32 w-11/12 xl:w-10/12 max-w-[1200px] p-5'>
        <div className='text-3xl'>Hotel Approvment</div>
        <div className='mt-10 flex flex-col gap-5'>
          {hotelData ? (hotelData.map((hotel, index) => (
            <HotelApproveBox
            key={index}
            hotelObj={hotel}
            hotelName={hotel.hotelName}
            hotelType ={hotel.hotelType}
            actionCnt={actionCnt}
            setActionCnt={setActionCnt}
            // reviews={hotel.reviewCount}
            // rating={hotel.avgReviewScore}
            description={hotel.hotelDescription}
            // price={hotel.roomsAvailable[0].pricePerNight}
            imageUrl={hotel.hotelPhoto}
            // petType={hotel.petTypeArray}
            
          />) )): (<div></div>)}
        </div>
        
      </div>
    </>
  )
}

export default HotelApprove
