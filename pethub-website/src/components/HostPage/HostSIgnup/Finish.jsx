import Navbar from "../../Utils/Navbar";

function Finish() {

    return (
        <div>
            <Navbar />
            <div className="flex flex-col mt-24">
                <div className="text-black font-bold text-3xl mt-4">
                    ลงทะเบียนโรงแรมสัตว์เลี้ยงของคุณให้สมบูรณ์แบบบน PetHub
                </div>
                <div className="flex justify-center">
                    <div className="max-w-xl mx-auto">
                        <div className="text-gray-800 text-base mt-4">
                            กรุณากรอกแบบฟอร์มด้านล่าง ข้อมูลทุกช่องจำเป็นต้องกรอก
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/2 bg-white border border-neutral-100 drop-shadow-xl p-8 rounded-3xl mt-8 mx-auto">
                    <div className="flex justify-center items-center">
                        <ul className="steps w-full max-w-2xl mt-2">
                            <li className="step step-accent text-gray-800 text-sm">ข้อมูลทั่วไป</li>
                            <li className="step step-accent text-gray-800 text-sm">ห้อง</li>                            
                            <li className="step step-accent text-gray-800 text-sm">ยืนยัน</li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="w-full max-w-xl flex-grow border-t border-gray-300 mt-5 mb-14"></div>
                    </div>
                    <div className="flex justify-center items-center">
                        <svg width="120px" height="120px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path 
                            d="m16 0c8.836556 0 16 7.163444 16 16s-7.163444 16-16 16-16-7.163444-16-16 7.163444-16 16-16zm5.7279221 11-7.0710679 7.0710678-4.2426406-4.2426407-1.4142136 1.4142136 5.6568542 5.6568542 8.4852814-8.4852813z" 
                            fill="#F69A5E" 
                            fillRule="evenodd" 
                            />
                        </svg>
                    </div>
                    <div className="w-full max-w-xl mx-auto text-center text-black font-bold text-xl mt-6">ส่งคำขอสำเร็จแล้ว!</div>
                    <div className="w-full max-w-xl mx-auto text-center text-gray-600 text-sm mt-2 mb-8">การดำเนินการตรวจสอบข้อมูลและติดต่อกลับจะเกิดขึ้นในเร็ว ๆ นี้</div>
                </div>
                <div className="flex justify-end items-center w-full max-w-3xl -mt-4 mb-4 p-6 mx-auto">
                    <button className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        กลับไปยังหน้าหลัก
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Finish