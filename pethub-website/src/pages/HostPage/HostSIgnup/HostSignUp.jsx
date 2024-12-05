import Navbar from "../../../components/Navbar";
import logo from "../../../../public/logo.svg";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from 'js-cookie';


function HostSignUp() {
  
  //router state
  const navigate = useNavigate()
  //router state
  
  //data state
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    userRole: 'Host'
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

  const handleSubmit = async e => {
    e.preventDefault();

    //validation
    if (!formData.email || !formData.password || !formData.fName || !formData.lName || !formData.confirmPassword || !formData.phone || !formData.address) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }


    try {
      const response = await axios.post('https://pethub-3nkk.onrender.com/api/auth/signup', formData, { withCredentials: true });
      toast.success("Signup successful");
      console.log("Response:", response.data);
      const loginres = await axios.post("https://pethub-3nkk.onrender.com/api/auth/signin",{ email: formData.email, password: formData.password }, { withCredentials: true });
      if (loginres.status === 200) {
        const { token, userRole, fName, lName } = response.data;
        Cookies.set("user-auth", token, { secure: true, sameSite: "Strict" });
        Cookies.set("user-fName", fName, { secure: true, sameSite: "Strict" });
        Cookies.set("user-lName", lName, { secure: true, sameSite: "Strict" });
        Cookies.set("user-role", userRole, { secure: true, sameSite: "Strict" });
  
        toast.success("Signin successful");
        navigate('/pethub-website/listhost');
      }
      
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || "Signup failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }

  };
  // function

  useEffect(() => {
    const role = Cookies.get('user-role');

    if (role === "Host"){
      navigate(`/pethub-website/listhost`);
    }else if(role === "Client"){
      navigate('/pethub-website/home');
    }

  }, []);



  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <Navbar />
      <div className="absolute top-12 left-0 right-0 bottom-0">
        <div className="mt-64 md:mt-32 w-full h-full flex justify-center items-center">
          <div className="p-10" style={{ width: "540px" }}>
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-3xl font-bold">
                ลงทะเบียน host
              </h1>
              <span className="lg:inline-flex items-center hidden">
                <img src={logo} alt="logo" width={30} />
              </span>
            </div>
            <h2 className="font-medium mt-8 mb-2">
              สมัคร Host Account
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
              <p className="text-start text-sm my-3">ชื่อ</p>
              <input
                type="text"
                name="fName"
                onChange={handleChange}
                value={formData.fName}
                placeholder="ชื่อ"
                className="input input-bordered w-full bg-gray-100 mb-3"
              />
              <p className="text-start text-sm my-3">นามสกุล</p>
              <input
                type="text"
                name="lName"
                onChange={handleChange}
                value={formData.lName}
                placeholder="นามสกุล"
                className="input input-bordered w-full bg-gray-100 mb-3"
              />
              <p className="text-start text-sm my-3">เบอร์โทรศัพท์</p>
              <input
                type="number"
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                placeholder="เบอร์โทรศัพท์"
                className="input input-bordered w-full bg-gray-100 mb-3"
              />
              <p className="text-start text-sm my-3">ที่อยู่</p>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address}
                placeholder="ที่อยู่"
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
              <p className="text-start text-sm my-3">ยืนยันรหัสผ่าน</p>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                placeholder="ยืนยันรหัสผ่าน"
                className="input input-bordered w-full bg-gray-100 mb-6"
              />
              <button
                type="submit"
                className="btn w-full mt-10 bg-pethub-color1 text-white text-base font-normal"
              >
                ขั้นตอนถัดไป
              </button>
              <p className="mt-8 text-gray-500">
                Already have an account?{" "}
                <span>
                  <a href="/pethub-website/signup" className="text-blue-500">
                    Sign in
                  </a>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostSignUp;
