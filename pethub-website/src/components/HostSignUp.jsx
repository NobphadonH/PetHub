import Navbar from "./Utils/Navbar";
import logo from "../../public/logo.svg";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HostSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.confirmPassword) {
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

    console.log("Submitted data:", formData);
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <Navbar />
      <div className="absolute top-12 left-0 right-0 bottom-0">
        <div className="mt-32 lg:mt-0 w-full h-full flex justify-center items-center">
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
              <p className="text-start text-sm my-3">Email</p>
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
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                placeholder="ชื่อ"
                className="input input-bordered w-full bg-gray-100 mb-3"
              />
              <p className="text-start text-sm my-3">นามสกุล</p>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                placeholder="นามสกุล"
                className="input input-bordered w-full bg-gray-100 mb-3"
              />
              <p className="text-start text-sm my-3">Password</p>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                className="input input-bordered w-full bg-gray-100 mb-6"
              />
              <p className="text-start text-sm my-3">Confirm Password</p>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                className="input input-bordered w-full bg-gray-100 mb-6"
              />
              <button
                type="submit"
                className="btn w-full mt-10 bg-pethub-color1 text-white text-base font-normal"
              >
                เข้าสู่ระบบ
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
