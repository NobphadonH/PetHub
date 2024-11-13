import Navbar from "./Utils/Navbar"

import './Profile.css';
function Profile() {
  return (
    <>
      <Navbar />
     
<<<<<<< HEAD
        <div className="absolute mt-20 lg:mt-32 top-0 right-5 lg:right-80 left-5 lg:left-80 bottom-2/3 -z-10">
=======
        <div className="absolute mt-32 top-0 right-20 lg:right-80 left-20 lg:left-80 bottom-2/3 -z-10">
>>>>>>> 9001989713a4e187f4db05de7faddff3ffdf9fa2
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

                {/* Booking History Section */}
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

      {/* Footer */}
      <footer className="mt-12 p-4 bg-gray-100 text-center">
        <p className="text-gray-600">my Dream Place - Your next goto companion for travel</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-gray-500">Privacy Policy</a>
          <a href="#" className="text-gray-500">Terms of Use</a>
          <a href="#" className="text-gray-500">Contact us</a>
        </div>
      </footer>
     
        
        
    </>
  )
}

export default Profile
