import Navbar from "./Utils/Navbar"

import './Profile.css';
function Profile() {

  return (
    <>
      <Navbar />
      {/* <div>
      <div className="absolute mt-20 lg:mt-32 top-0 right-5 lg:right-80 left-5 lg:left-80 bottom-2/3 -z-10">

      <img
          src="https://tidypets.store/cdn/shop/files/view-cats-dogs-being-friends.jpg?v=1726648599&width=2000"
          alt=""
          className="w-full h-full object-cover opacity-100"
      />
      </div>

      <div className="ml-48 lg:ml-96" >

      <div class="profileinfo">
      <form>
          <div class="grid gap-10 mt-10  mb-6 lg:grid-cols-2">
              <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                  <label for="first_name" class="block mb-2  text-xl font-medium text-gray-900 dark:text-black text-left">ชื่อ-สกุล</label>
                  <label for="text"  class="w-auto h-10 bg-gray-200 border border-gray-300 text-gray-400 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "> Nutchanon Boonyato </label>
              </div>
              <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                  <label for="first_name" class="block mb-2  text-xl font-medium text-gray-900 dark:text-black text-left">เบอร์โทร</label>
                  <label for="text"  class="w-auto h-10 bg-gray-200 border border-gray-300 text-gray-400 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "> 081-234-5678 </label>
              </div>
              
          </div>
              <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                  <label for="first_name" class="block mb-2  text-xl font-medium text-gray-900 dark:text-black text-left">ที่อยู่</label>
                  <label for="text"  class="w-auto h-10 bg-gray-200 border border-gray-300 text-gray-400 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "> 123/45 ถนนพระรามที่ 4 แขวงบางรัก เขตบางรัก กรุงเทพ 10500  </label>
              </div>
      </form>
      <button type="submit" class="text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">แก้ไขข้อมูล</button>
      </div>
      </div>
      <div class="pettitle" className="mt-20 mb-10">
      <div className="grid gap-0 mb-6 grid-cols-2 absolute ml-20 md:ml-48 lg:ml-96  ">

                  <label for="last_name" class=" block underline decoration-pethub-color1 mb-2 text-xl md:text-2xl lg:text-3xl font-medium text-blue-900 ">สัตว์เลี้ยง</label>
                  <label for="last_name" class="block mb-2 ml-1 text-xl md:text-2xl lg:text-3xl font-medium text-pethub-color1 text-left ">ของฉัน</label>
      </div> 
      </div>
      <div className="ml-96 w-11/12">
      <a href="petregister" class="text-white  ml-96 bg-pethub-color6 hover:bg-pethub-color6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pethub-color6 dark:hover:bg-pethub-color6 dark:focus:ringpethub-color6">เพิ่ม +</a>

      </div>

      <div class="profile" >
      <div class="petframeprofile" >

          <img  src= "Noppo.svg"/> 
          <div class="petprofileinfo">
      <form>
          <div class="grid gap-3  md:grid-cols-5 mt-10 ">
              
              <div className="grid gap-2 mb-6 md:grid-cols-2 ">
                  <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">ชื่อ</label>
                  <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <div className="grid gap-2 mb-6 md:grid-cols-2">
              <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">อายุ</label>
              <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <div className="grid gap-2 mb-6 md:grid-cols-2">
              <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">ประเภท</label>
              <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <div className="grid gap-2 mb-6 md:grid-cols-2">
              <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">เพศ</label>
              <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <div className="grid gap-2 mb-6 md:grid-cols-2">
              <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">น้ำหนัก</label>
              <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <label class="block mb-2 ml-10 text-l text-left font-medium text-blue-950 col-span-2  ">คำอธิบายเพิ่มเติม</label>
          </div>
          <div  className="  w-9/12 h-28 bg-gray-200 border ml-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
        </div>
      </form>
      </div>
      </div>
      </div>
      <div class="profile" >
      <div class="petframeprofile" >

          <img  src= "moodeng.svg"/> 
          <div class="petprofileinfo">
          <form>
          <div class="grid gap-3  md:grid-cols-5 mt-10 ">
              
              <div className="grid gap-2 mb-6 md:grid-cols-2 ">
                  <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">ชื่อ</label>
                  <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <div className="grid gap-2 mb-6 md:grid-cols-2">
              <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">อายุ</label>
              <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <div className="grid gap-2 mb-6 md:grid-cols-2">
              <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">ประเภท</label>
              <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <div className="grid gap-2 mb-6 md:grid-cols-2">
              <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">เพศ</label>
              <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <div className="grid gap-2 mb-6 md:grid-cols-2">
              <label for="last_name" class="block mb-2 text-xl font-medium text-blue-950 text-right ">น้ำหนัก</label>
              <label for="last_name" class="block mb-2 text-xl font-medium text-pethub-color2 text-left ">โน๊ปโปะ</label>
              </div>
              <label class="block mb-2 ml-10 text-l text-left font-medium text-blue-950 col-span-2  ">คำอธิบายเพิ่มเติม</label>
          </div>
          <div  className="  w-9/12 h-28 bg-gray-200 border ml-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
        </div>
      </form>
      </div>
      </div>
      </div>

      <div className="grid gap-0 mb-6 md:grid-cols-2 mt-10 absolute ml-72  ">
      <label for="last_name" class=" block decoration-pethub-color1 mb-2 text-3xl font-medium text-blue-900 ">ประวัติ</label>
      <label for="last_name" class="block mb-2 ml-1 text-3xl font-medium text-pethub-color1 text-left ">การจอง</label>
      </div> 
      <section className="mt-12">
      <div className="overflow-x-auto mt-20">
      <table className="table w-3/4 ml-72">
      <thead>
        <tr>
          <th>หมายเลขการจอง</th>
          <th>เช็คอิน</th>
          <th>เช็คเอาท์</th>
          <th>โรงแรม</th>
          <th>สถานะการจอง</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>B-123-4567890</td>
          <td>10/10/2567</td>
          <td>12/10/2567</td>
          <td>Pet Bangmod hotel, soi 45</td>
          <td className="text-green-500">ชำระเงินแล้ว</td>
        </tr>
        <tr>
          <td>B-987-6543210</td>
          <td>3/11/2567</td>
          <td>5/11/2567</td>
          <td>Pet Bangmod hotel, soi 45</td>
          <td className="text-gray-500">รอการชำระเงิน</td>
        </tr>
        <tr>
          <td>B-543-2167890</td>
          <td>9/12/2567</td>
          <td>10/12/2567</td>
          <td>Pet Bangmod hotel, soi 45</td>
          <td className="text-red-500">ยกเลิกการจอง</td>
        </tr>
      </tbody>
      </table>
      </div>
      </section>

      <footer className="mt-12 p-4 bg-gray-100 text-center">
      <p className="text-gray-600">my Dream Place - Your next goto companion for travel</p>
      <div className="flex justify-center space-x-6 mt-4">
      <a href="#" className="text-gray-500">Privacy Policy</a>
      <a href="#" className="text-gray-500">Terms of Use</a>
      <a href="#" className="text-gray-500">Contact us</a>
      </div>
      </footer>
    </div> */}
    
      <div className="text-start mt-20 lg:mt-32 bg-pethub-color1 w-11/12 xl:w-10/12 max-w-[1200px] h-[30vw] sm:h-[200px] md:h-44 mx-auto p-8 md:py-10 md:px-12 xl:px-28 relative rounded-md z-10 shadow-md max-lg:overflow-hidden">
        <div className="absolute h-1 left-0 right-0 top-0 bg-pethub-color1 z-50"></div>
        <div className="absolute md:top-0 right-0 left-0 bottom-[-5vw] md:bottom-0 z-0">
            <img
                src="https://tidypets.store/cdn/shop/files/view-cats-dogs-being-friends.jpg?v=1726648599&width=2000"
                alt=""
                className="w-full h-full object-cover opacity-80"
            />
        </div>
        <div className="max-lg:hidden absolute top-32 right-8 left-8 h-[330px] xl:h-[360px] flex justify-between gap-16">
          <div className="w-[250px] h-full bg-white shadow-md flex flex-col p-3 rounded-md">
            <div className="w-full h-[30vw] max-h-[250px] bg-[rgb(214,214,214)] rounded-sm">
              <img src="https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=" alt="" />
            </div>
            <div className="text-center text-xl mt-5">คุณ ชัชนันท์ บุญพา</div>
          </div>
          <div className=" lg:w-[700px] xl:w-[780px] pt-20">
            <div className="grid grid-cols-12 gap-x-10">
              <div className="col-span-6">
                <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เบอร์โทร</p>
                <input
                    type="text"
                    name="email"
                    placeholder="เบอร์โทร"
                    className="input input-bordered w-full h-[8vw] max-h-10 shadow-md text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm md:mb-3"
                />
              </div>
              <div className="col-span-6">
                <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เบอร์โทรฉุกเฉิน</p>
                <input
                    type="text"
                    name="email"
                    placeholder="เบอร์โทรฉุกเฉิน"
                    className="input input-bordered w-full h-[8vw] max-h-10 shadow-md text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm md:mb-3"
                />
              </div>
              <div className="col-span-12">
                <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">ที่อยู่</p>
                <input
                    type="text"
                    name="email"
                    placeholder="ที่อยู่"
                    className="input input-bordered w-full h-[8vw] max-h-10 shadow-md text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm md:mb-3"
                />
              </div>
              <div className="col-span-12 flex justify-end xl:mt-10">
                <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color6 md:bg-pethub-color6 text-white md:text-white h-[7vw] w-[15vw] sm:w-36 sm:h-10 md:w-28 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">แก้ไขข้อมูล</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden w-11/12 xl:w-10/12 max-w-[1200px] h-[40vw] md:h-72 mx-auto mt-8 md:px-10">
        <div className="flex max-md:gap-[8vw] md:justify-between w-full h-full">
          <div className="w-[30vw] md:w-[220px] h-full shadow-md flex flex-col p-[1vw]">
            <div className="w-full h-[30vw] bg-[rgb(214,214,214)]">
              <img src="https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=" alt="" />
            </div>
            <div className="text-center text-[2.5vw] md:text-xs lg:text-sm xl:text-sm mt-[3vw] md:my-3">คุณ ชัชนันท์ บุญพา</div>
          </div>
          <div className="w-[53vw] h-full grid grid-cols-12 gap-[2vw] md:gap-x-5">
            <div className=" col-span-6">
              <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เบอร์โทร</p>
              <input
                  type="text"
                  name="email"
                  placeholder="เบอร์โทร"
                  className="input input-bordered w-full h-[8vw] max-h-10 shadow-md text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm md:mb-3"
              />
            </div>
            <div className=" col-span-6">
              <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">เบอร์โทรฉุกเฉิน</p>
              <input
                  type="text"
                  name="email"
                  placeholder="เบอร์โทรฉุกเฉิน"
                  className="input input-bordered w-full h-[8vw] max-h-10 shadow-md text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm md:mb-3"
              />
            </div>
            <div className="col-span-12">
              <p className="text-start text-[2.5vw] md:text-xs lg:text-sm xl:text-sm my-[1vw] md:my-3">ที่อยู่</p>
              <input
                  type="text"
                  name="email"
                  placeholder="ที่อยู่"
                  className="input input-bordered w-full h-[8vw] max-h-10 shadow-md text-[2vw] sm:h-10 xl:h-12 sm:text-xs lg:text-sm md:mb-3"
              />

            </div>
            <div className="col-span-12 flex justify-end mt-[3vw] md:mt-10">
              <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color6 md:bg-pethub-color6 text-white md:text-white h-[7vw] w-[15vw] sm:w-36 sm:h-10 md:w-28 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">แก้ไขข้อมูล</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 xl:w-10/12 mx-auto mb-24 lg:mb-32 mt-10 lg:mt-[400px] max-w-[1200px]">
        <div className="w-full flex justify-between items-center">
          <div className="text-[3vw] md:text-lg lg:text-2xl xl:text-3xl font-bold text-pethub-color6">สัตว์เลี้ยง<span className="text-pethub-color1">ของฉัน</span></div>
        </div>
        <div className="my-[4vw] md:my-5 lg:my-10 max-h-[300px] md:max-h-[500px] overflow-y-scroll hide-scrollbar flex flex-col gap-5">
          <div className="w-full h-[26vw] md:h-52 lg:h-60 xl:h-72 rounded-md p-[1vw] md:p-3 border-[1px] flex gap-[1vw] md:gap-5">
            <div className="w-[240px] lg:w-[300px] xl:w-[350px] h-full bg-slate-100 rounded-md overflow-hidden">
              <img src="https://s.isanook.com/ca/0/ui/285/1425207/staywithnoppo-20240522_152537-446114668_721839553257673_573084092354014144_n.jpeg" className=" object-cover" alt="" />
            </div>
            <div className="w-[600px] lg:grow flex flex-col p-[1vw] md:p-3 lg:p-5 pb-0 justify-between">
              <div className="flex flex-wrap justify-between text-[2vw] md:text-base lx:text-lg font-semibold text-pethub-color6">
                <div>ชื่อ: <span className="text-pethub-color1">นปโปะ</span> </div>
                <div>อายุ: <span className="text-pethub-color1">1 ปี 2 เดือน</span></div>
                <div>ประเภท: <span className="text-pethub-color1">สุนัข</span></div>
                <div>เพศ: <span className="text-pethub-color1">เพศผู้</span></div>
              </div>
              <div>
                <p className="text-start font-semib text-[2vw] md:text-xs xl:text-sm my-1 lg:my-3">คำอธิบายลักษณะเพิ่มเติม</p>
                <p className="overflow-y-scroll hide-scrollbar rounded-md w-full h-[15vw] md:h-20 lg:h-28 xl:h-36 bg-slate-100 p-[1vw] md:p-2 lg:p-4 round-md text-start text-[2vw] md:text-xs xl:text-sm my-1 lg:my-3">นปโปะหม่ำๆ หม่ำๆ กู๊ดบอย กู๊ดบอยหม่ำๆ หม่ำๆ เก่งมาก นปโปะหม่ำๆ หม่ำๆ กู๊ดบอย กู๊ดบอยหม่ำๆ หม่ำๆ เก่งมาก</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex justify-center items-center rounded-md md:btn bg-pethub-color1 md:bg-pethub-color1 text-white md:text-white h-[7vw] w-[15vw] sm:w-36 sm:h-10 md:w-28 lg:w-32 font-medium text-[2vw] md:text-xs lg:text-sm xl:text-base">เพิ่มสัตว์เลี้ยง</div>
        </div>


      </div>
      <div className="w-11/12 xl:w-10/12 max-w-[1200px] mx-auto lg:px-8 -my-16 lg:my-24">
        <div className="w-full text-start text-[3vw] md:text-lg lg:text-2xl xl:text-3xl font-bold text-pethub-color6">ประวัติ<span className="text-pethub-color1">การจองของฉัน</span></div>
        <div className="w-full my-[4vw] md:my-8">
        <div className="overflow-x-auto">
          <table className="table text-lg">
            {/* head */}
            <thead className="text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">
              <tr>
                <th>หมายเลขการจอง</th>
                <th className="max-md:hidden">เช็คอิน</th>
                <th className="max-md:hidden">เช็คเอาท์</th>
                <th className="max-sm:hidden">โรงแรม</th>
                <th>สถานะการจอง</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="text-xs lg:text-sm xl:text-base">
                <td>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 lg:h-10 xl:h-14 bg-green-500"></div>
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">B-123-4567890</div>
                  </div>
                </td>
                <td  className="max-md:hidden">
                  <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">10/10/2567</div>
                </td>
                <td  className="max-md:hidden">
                  <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">10/10/2567</div>
                </td>
                <td className="max-sm:hidden">
                  <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">Pet Bangmod hotel, soi 45</div>
                </td>
                <td className="max-md:pr-0">
                  <span className="badge badge-ghost badge-sm bg-green-100 text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">ชำระเงินแล้ว</span>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs"><span className="max-lg:hidden ">รายละเอียด</span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                    </span>
                  </button>
                </th>
              </tr>
              <tr className=" bg-slate-50">
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
              {/* row 2 */}
              <tr className="text-xs lg:text-sm xl:text-base">
                <td>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 lg:h-10 xl:h-14 bg-green-500"></div>
                    <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">B-123-4567890</div>
                  </div>
                </td>
                <td  className="max-md:hidden">
                  <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">10/10/2567</div>
                </td>
                <td  className="max-md:hidden">
                  <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">10/10/2567</div>
                </td>
                <td className="max-sm:hidden">
                  <div className="transition-all duration-300 ease-in-out line-clamp-1 overflow-hidden">Pet Bangmod hotel, soi 45</div>
                </td>
                <td className="max-md:pr-0">
                  <span className="badge badge-ghost badge-sm bg-green-100 text-[2.5vw] sm:text-xs lg:text-sm xl:text-base">ชำระเงินแล้ว</span>
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs"><span className="max-lg:hidden ">รายละเอียด</span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>
                    </span>
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
        
        
    </>
  )
}

export default Profile
