import {useState} from 'react'
import Navbar from './Utils/Navbar'

function HotelApprove() {
  const [isClick, setIsClick] = useState(Array(3).fill(false));

  function handleClick(index) {
    setIsClick((prev) =>
      prev.map((value, i) => (i === index ? !value : false))
    );
  }
  return (
    <>
      <Navbar />
      <div className='mx-auto mt-[5vw] md:mt-8 lg:mt-32 w-11/12 xl:w-10/12 max-w-[1200px] p-5'>
        <div>Hotel Approvment</div>
        <div className="overflow-x-auto mt-16">
          <table className="table text-lg">
            {/* head */}
            <thead className="text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">
              <tr>
                <th>หมายเลขโรงแรม</th>
                {/* <th className="max-md:hidden">เช็คอิน</th>
                <th className="max-md:hidden">เช็คเอาท์</th> */}
                <th className="max-sm:hidden">โรงแรม</th>
                <th>ประเภท</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            {/* row 1 */}
            {Array.from({length: 3}).map((_, index) => (
              <tbody  key={index}>
                <tr className="text-xs lg:text-sm xl:text-base">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-8 lg:h-10 xl:h-14 bg-green-500"></div>
                      <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">B-123-4567890</div>
                    </div>
                  </td>
                  {/* <td  className="max-md:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">10/10/2567</div>
                  </td>
                  <td  className="max-md:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">10/10/2567</div>
                  </td> */}
                  <td className="max-sm:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">Pet Bangmod hotel, soi 45</div>
                  </td>
                  <td className="max-sm:hidden">
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">โรงแรมสัตว์เลี้ยงระดับมืออาชีพ</div>
                  </td>
                  <td className="max-md:pr-0">
                    <span className="badge badge-ghost badge-sm bg-green-100 text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">อนุมัติแล้วแล้ว</span>
                  </td>
                  <th>
                    <button onClick={() => handleClick(index)} className="btn btn-ghost btn-xs"><span className="max-lg:hidden ">รายละเอียด</span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                      </span>
                    </button>
                  </th>
                </tr>
                {/* detail */}
                <tr className={`${isClick[index] ? '' : 'hidden'} bg-slate-50`}>
                  <td colSpan={6} className="text-sm">
                    <div className="flex justify-between items-center text-[2.5vw] md:text-xs lg:text-sm">
                      <div className="flex max-md:justify-between gap-y-[2vw] gap-x-[4vw] md:gap-x-10 my-3 font-semibold flex-wrap">
                        <div>โรงแรม: <span className="font-normal">Pet Bangmod hotel, soi 45</span></div>
                        <div>ประเภทห้อง: <span className="font-normal">ห้องขนาดทั่วไป</span></div>
                        <div>ตำแหน่งที่ต้้ง: <span className="font-normal">ถ.ประชาอุทิศ 45 กรุงเทพ</span></div>
                      </div>
                      <div className="max-lg:hidden">วันที่จอง: <span className="font-normal">13/10/2567</span></div>
                    </div>
                    <div className="flex gap-[3vw] md:gap-10 my-[1vw] md:my-3 font-semibold ">
                      <div className="badge badge-ghost badge-md font-normal text-[2.5vw] md:text-xs lg:text-sm">การจอง: <span>2 คืน</span></div>
                      <div className="badge badge-ghost badge-md font-normal text-[2.5vw] md:text-xs lg:text-sm">เช็คอิน: <span className="font-normal">10/10/2567</span></div>
                      <div className="badge badge-ghost badge-md font-normal text-[2.5vw] md:text-xs lg:text-sm">เช็คเอาท์: <span className="font-normal">10/10/2567</span></div>
                    </div>
                    <div className="mt-[2vw] text-[3vw] md:text-sm md:mt-6 font-semibold">ข้อมูลสัตว์เลี้ยงที่เข้าพัก</div>
                    <div className={`bg-white w-full relative h-28 sm:h-36 lg:h-40 xl:h-44 border-[1px] my-[2vw] md:my-3 rounded-md p-1 flex overflow-y-scroll hide-scrollbar`}>
                      <div className="w-[200px] lg:w-[230px] xl:w-[250px] h-full rounded bg-slate-300 overflow-hidden">
                          <img src="https://s.isanook.com/ca/0/ui/285/1425207/staywithnoppo-20240522_152537-446114668_721839553257673_573084092354014144_n.jpeg" className=" object-cover" alt="" />
                      </div>
                      <div className="w-full overflow-y-hide hide-scrollbar h-full px-2 py-[2vw] md:py-3 xl:p-5 flex flex-col justify-between">
                          <div className="flex justify-between flex-wrap text-[2vw] md:text-[1.2vw] xl:text-xs">
                              <div>ชื่อ: นปโปะ</div>
                              <div>อายุ:1 ปี 2 เดือน</div>
                              <div>ประเภท: สุนัข</div>
                              <div>เพศ: เพศผู้</div>
                          </div>
                          <p className="text-start text-[2vw] md:text-[1.2vw] xl:text-sm my-1 lg:my-3">คำอธิบายลักษณะเพิ่มเติม</p>
                          <textarea className="textarea w-full max-md:p-[1vw] max-h-8 min-h-8 md:max-h-12 md:min-h-12 lg:min-h-16 lg:max-h-16 textarea-bordered hide-scrollbar text-[1.5vw] md:text-[1vw] xl:text-sm text-gray-600" value={"นปโปะหม่ำๆ หม่ำๆ กู๊ดบอย กู๊ดบอยหม่ำๆ หม่ำๆ เก่งมาก  "}></textarea>
                      </div>
      
                  </div>
                    <div className="my-[2vw] md:my-4 w-full flex justify-between gap-5 items-center">
                        <div className="text-[2vw] md:text-xs lg:text-sm">ติดต่อสอบถาม: Pet Bangmod hotel, 094-XXX-XXXX</div>
                      <div className="flex justify-center items-center rounded-md md:btn bg-red-600 md:bg-red-600 text-white md:text-white h-[7vw] w-[15vw] sm:w-36 sm:h-10 md:w-40 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">ยกเลิกการจอง</div>
                    </div>
                  </td>
                </tr>
              </tbody>

            ))}

            
          </table>
        </div>
        
      </div>
    </>
  )
}

export default HotelApprove
