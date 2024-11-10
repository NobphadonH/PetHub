import { useState } from 'react';
import Navbar from './Utils/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for blank fields
    for (let key in formData) {
      if (!formData[key]) {
        toast.error(`Please fill in the ${key}`);
        return;
      }
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // If validation passes, proceed with submission logic
    console.log('Registration Data:', formData);
    // Add API call or other registration logic here
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <div className="absolute top-12 left-0 right-0 md:bottom-0">
        <div className="w-full h-full flex justify-center items-center">
          <div className="py-10 px-12 md:p-10 w-[540px] md:w-[780px]">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-3xl font-bold">
                Create Pethub <span className="text-pethub-color1">Account</span>
              </h1>
            </div>
            <h2 className="font-medium mt-10 mb-5">สมัครเป็นสมาชิกเพื่อรับสิทธิประโยชน์ต่างๆ</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                  <p className="text-start text-sm mb-3">ชื่อ</p>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-gray-100 mb-3"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-start text-sm mb-3">นามสกุล</p>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-gray-100 mb-3"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-start text-sm mb-3">อีเมล</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="input input-bordered w-full bg-gray-100 mb-3"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-start text-sm mb-3">เบอร์โทรศัพท์</p>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-gray-100 mb-3"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-start text-sm mb-3">รหัสผ่าน</p>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-gray-100 mb-3"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-start text-sm mb-3">ยืนยันรหัสผ่าน</p>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-gray-100 mb-3"
                  />
                </div>
                <div className="col-span-2">
                  <p className="text-start text-sm mb-3">ที่อยู่</p>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-gray-100 mb-3"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="btn w-full md:w-7/12 mt-4 bg-pethub-color1 text-white text-base font-normal"
                  >
                    สมัคร
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

