import Navbar from "./Utils/Navbar";

function Confirm() {

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
                    <div className="w-full max-w-xl mx-auto text-left text-black font-bold text-xl">โปรดตรวจสอบข้อมูลให้ครบถ้วนก่อนยืนยันการสมัคร</div>
                    <div className="w-full max-w-xl mx-auto text-left text-gray-600 text-sm mt-2 mb-2">ก่อนที่จะยืนยันคำขอของคุณ กรุณาตรวจสอบรายละเอียดทั้งหมดอีกครั้ง เพื่อให้มั่นใจว่าไม่มีข้อผิดพลาดหรือข้อมูลที่ขาดหายไป หากต้องการเพิ่มหรือแก้ไขข้อมูลเพิ่มเติม คุณสามารถทำได้หลังจากการยืนยันนี้เสร็จสิ้น</div>
                    <div className="w-full max-w-xl mx-auto text-left text-gray-600 text-sm mt-2 mb-6">*หมายเหตุ : การส่งคำขอของคุณจะเสร็จสิ้นก็ต่อเมื่อได้รับการพิจารณาจากทาง PetHub</div>
                    
                </div>
                <div className="flex justify-between items-center w-full max-w-3xl -mt-4 mb-4 p-6 mx-auto">
                    <button className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        ขั้นตอนก่อนหน้า
                    </button>
                    <button className="bg-black text-white border border-black rounded-2xl mt-6 btn sm:btn-xs md:btn-sm lg:btn-md">
                        ยืนยันส่งคำขอ
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirm