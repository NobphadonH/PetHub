import Navbar from "../components/Navbar";
import logo from "../../public/logo.svg";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  
  //router state
  const navigate = useNavigate();
  //router state

  //data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //data state

  //function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
  
    try {
      // Send POST request to the Node.js API endpoint
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData,
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        // Set cookies with user information
        const { token, userRole, fName, lName } = response.data;
        Cookies.set("user-auth", token, { secure: true, sameSite: "Strict" });
        Cookies.set("user-fName", fName, { secure: true, sameSite: "Strict" });
        Cookies.set("user-lName", lName, { secure: true, sameSite: "Strict" });
        Cookies.set("user-role", userRole, { secure: true, sameSite: "Strict" });
  
        toast.success("Signin successful");
        if (userRole == "Host") {
          navigate("/pethub-website/listhost")
        } else {
          navigate("/pethub-website/Home");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  //function
  

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <div className="absolute top-12 left-0 right-0 bottom-0">
        <div className="w-full h-full flex justify-center items-center">
          <div className="p-10" style={{ width: "540px" }}>
            <div className=" flex items-center justify-center gap-3">
              <h1 className="text-3xl font-bold">
                ยินดีต้อนรับสู่{" "}
                <span className="text-pethub-color1">PET HUB</span>
              </h1>
              <span className="lg:inline-flex items-center hidden ">
                <img src={logo} alt="logo" width={30} />
              </span>
            </div>
            <h2 className=" font-medium mt-10 mb-5">
              เข้าสู่ระบบด้วย PET HUB account
            </h2>
            <form onSubmit={handleSubmit}>
              <p className="text-start text-sm my-3">อีเมล</p>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="example@gmail.com"
                className="input input-bordered w-full bg-gray-100 mb-3"
              />
              <p className="text-start text-sm my-3">รหัสผ่าน</p>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="รหัสผ่าน"
                className="input input-bordered w-full bg-gray-100 mb-6"
              />
              <button
                href=""
                type="submit"
                className="btn w-full mt-10 bg-pethub-color1 text-white text-base font-normal"
              >
                เข้าสู่ระบบ
              </button>
              <p className="mt-16 text-gray-500">
                Don&apos;t have an account ?{" "}
                <span>
                  <a href="/pethub-website/signup" className="text-blue-500">
                    Sign up
                  </a>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
