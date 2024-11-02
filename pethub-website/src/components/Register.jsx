import Navbar from "./Utils/Navbar"

function Register() {
  return (
    <>
     <Navbar />
     <div className="absolute top-12 left-0 right-0 md:bottom-0">
        <div className="w-full h-full flex justify-center items-center">
            <div className="py-10 px-12 md:p-10 w-[540px] md:w-[780px]">
                <div className=" flex items-center justify-center gap-3">
                    <h1 className="text-3xl font-bold">Create Pethub <span className="text-pethub-color1">Account</span></h1>
                </div>
                <h2 className=" font-medium mt-10 mb-5">สมัครเป็นสมาชิกเพื่อรับสิทธิประโยชน์ต่างๆ</h2>
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-start text-sm mb-3">First name</p>
                        <input type="text" placeholder="" className="input input-bordered w-full bg-gray-100 mb-3" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-start text-sm mb-3">Last name</p>
                        <input type="text" placeholder="" className="input input-bordered w-full bg-gray-100 mb-3" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-start text-sm mb-3">Email Address</p>
                        <input type="email" placeholder="example@gmail.com" className="input input-bordered w-full bg-gray-100 mb-3" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-start text-sm mb-3">Phone number</p>
                        <input type="number" placeholder="" className="input input-bordered w-full bg-gray-100 mb-3" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-start text-sm mb-3">Password</p>
                        <input type="password" placeholder="" className="input input-bordered w-full bg-gray-100 mb-3" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-start text-sm mb-3">Comfirm Password</p>
                        <input type="password" placeholder="" className="input input-bordered w-full bg-gray-100 mb-3" />
                    </div >
                    <div className="col-span-2">
                        <p className="text-start text-sm mb-3">Address</p>
                        <input type="text" placeholder="" className="input input-bordered w-full bg-gray-100 mb-3" />
                    </div>
                    <div className="col-span-2">
                        <a href="" className="btn w-full md:w-7/12 mt-4 bg-pethub-color1 text-white text-base font-normal">sign up</a>

                    </div>
                </div>
            </div>
        </div>
      </div> 
    </>
  )
}

export default Register
