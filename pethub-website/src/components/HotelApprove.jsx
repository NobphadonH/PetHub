import Navbar from './Utils/Navbar'
import HotelApproveBox from './Utils/HotelApproveBox'

function HotelApprove() {

  return (
    <>
      <Navbar />
      <div className='mx-auto mt-[5vw] md:mt-8 lg:mt-32 w-11/12 xl:w-10/12 max-w-[1200px] p-5'>
        <div className='text-3xl'>Hotel Approvment</div>
        <div className='mt-10 flex flex-col gap-5'>
          <HotelApproveBox />
          <HotelApproveBox />
        </div>
        
      </div>
    </>
  )
}

export default HotelApprove
