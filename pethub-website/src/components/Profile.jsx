import Navbar from "./Navbar"

import './Profile.css';
function Profile() {
  return (
    <>
      <Navbar />
       <div class="profile" >
            <div class="frameprofile">

                <img  src= "Frame 140.svg"/> 
                
            </div>
            <div class="profileinfo">
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block mb-2  text-m font-medium text-gray-900 dark:text-black text-left">First name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    
                </div>
                <div>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                </div>
            </form>
            <button type="submit" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">แก้ไขข้อมูล</button>
            </div>
        </div>
        <div class="petprofile">
              <h1 className="text-3xl" > สัตว์เลี้ยงของฉัน</h1>  
        </div>
        <div class="profile" >
            <div class="petframeprofile">

                <img  src= "Frame 140.svg"/> 
                
            </div>
            <div class="petprofileinfo">
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-3 mt-10">
                    
                    <div className="grid gap-0 mb-6 md:grid-cols-2 ">
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 text-left ">Last name</label>
                    </div>
                    <div className="grid gap-0 mb-6 md:grid-cols-2">
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 text-left ">Last name</label>
                    </div>
                    <div className="grid gap-0 mb-6 md:grid-cols-2">
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                        <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 text-left ">Last name</label>
                    </div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900  ">คำอธิบายเพิ่มเติม</label>
                </div>
            </form>
            <div class="detail" className=" ml-20 w-3/4 h-28 bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   ">

            </div>
            <button type="submit" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">แก้ไขข้อมูล</button>
            </div>
        </div>
        
        
    </>
  )
}

export default Profile
