import Navbar from "./Utils/Navbar"
import logo from "../../public/logo.svg"

function Login() {
  return (
    <>
     <Navbar /> 
     <div className="absolute top-12 left-0 right-0 bottom-0">
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-10" style={{width: '540px'}}>
                <div className=" flex items-center justify-center gap-3">
                    <h1 className="text-3xl font-bold">Welcome to <span className="text-pethub-color1">Pethub</span></h1>
                    <span className="lg:inline-flex items-center hidden "><img src={logo} alt="logo" width={30}/></span>
                </div>
                <h2 className=" font-medium mt-10 mb-5">Sign in with Pethub account</h2>
                <p className="text-start text-sm my-3">Username</p>
                <input type="text" placeholder="Username" className="input input-bordered w-full bg-gray-100 mb-6" />
                <p className="text-start text-sm my-3">Password</p>
                <input type="password" placeholder="Password" className="input input-bordered w-full bg-gray-100 mb-6" />
                <a href="" className="btn w-full mt-10 bg-pethub-color1 text-white text-base font-normal">sign in</a>
                <p className="mt-16 text-gray-500">Don&apos;t have an account ? <span><a href="/pethub-website/signup" className="text-blue-500">Sign up</a></span></p>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login
