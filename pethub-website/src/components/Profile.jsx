import Navbar from "./Utils/Navbar"

import './Profile.css';
function Profile() {
  return (
    <>
      <Navbar />
     
        <div className="absolute mt-32 top-0 right-20 left-20 bottom-2/3 -z-10">
            <img
                src="https://tidypets.store/cdn/shop/files/view-cats-dogs-being-friends.jpg?v=1726648599&width=2000"
                alt=""
                className="w-full h-full object-cover opacity-100"
            />
        </div>
        
       <div class="profile" >
            <div class="frameprofile">

                <img  src= "Frame 140.svg"/> 
                
            </div>
            <div class="profileinfo">
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2  text-m font-medium text-gray-900 dark:text-black text-left">First name</label>
                        <label for="text"  class="w-auto h-10 bg-gray-200 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "> Nutchanon Boonyato </label>
                    </div>
                    <div>
                        <label for="first_name" class="block mb-2  text-m font-medium text-gray-900 dark:text-black text-left">First name</label>
                        <label for="text"  class="w-auto h-10 bg-gray-200 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "> Nutchanon Boonyato </label>
                    </div>
                    
                </div>
                    <div>
                        <label for="first_name" class="block mb-2  text-m font-medium text-gray-900 dark:text-black text-left">First name</label>
                        <label for="text"  class="w-auto h-10 bg-gray-200 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "> Nutchanon Boonyato </label>
                    </div>
            </form>
            <button type="submit" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">แก้ไขข้อมูล</button>
            </div>
        </div>
        <div class="pettitle" className="mt-20">
        <div className="grid gap-0 mb-6 md:grid-cols-2 absolute ml-48  ">

                        <label for="last_name" class=" block underline decoration-pethub-color1 mb-2 text-3xl font-medium text-blue-900 ">สัตว์เลี้ยง</label>
                        <label for="last_name" class="block mb-2 ml-1 text-3xl font-medium text-pethub-color1 text-left ">ของฉัน</label>
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
                <div  className="  w-5/6 h-28 bg-gray-200 border ml-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
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
                <div  className="  w-5/6 h-28 bg-gray-200 border ml-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">
               </div>
            </form>
            </div>
            </div>
            </div>
          
     
        
        
    </>
  )
}

export default Profile
