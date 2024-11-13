import React from "react";
import Navbar from "./Utils/Navbar";

const HotelProfileManagement = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 text-left">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 pt-36">
        {/* Header */}
        <div className="mb-4">
            <h1 className="text-black text-3xl font-bold">
              <span className="text-pethub-color1">Pethub</span> Hotel Management
            </h1>
            <hr className="border-t-2 border-pethub-color1 w-[11.5rem]" />
          </div>

        {/* Hotel Overview */}
          <section className="bg-white shadow-lg rounded-lg p-6 mb-6 flex items-center relative overflow-hidden">
            {/* Blue Accent Bar */}
            <div className="absolute top-1.5 left-0 w-2 h-[21.3rem] bg-pethub-color6"></div>
          
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Hotel"
                className="rounded-md shadow-md border-4 border-pethub-color6"
              />
            </div>

        {/* Details */}
        <div className="ml-6 flex-grow relative">
          <p className="text-black mb-4">
            <strong>ชื่อจดทะเบียน: <span className="text-pethub-color1 text-lg">Bangmod pet hotel</span></strong>
          </p>
          <p className="mb-4">
            <strong className="text-black">สถานที่ตั้ง:</strong>
            <span className="text-pethub-color6"> 123 ถนนสุขุมวิท, วัฒนา, กรุงเทพมหานคร 10110, (ใกล้ BTS อโศก)</span>
          </p>
          <p className="mb-4">
            <strong className="text-black">ประเภทที่พัก:</strong>
            <span className="text-pethub-color6"> Professional Pet Hotel</span>
          </p>
          <p className="mb-4">
            <strong className="text-black">Cancelation Policy:</strong>
            <span className="text-pethub-color6"> Flexible cancelation</span>
          </p>
          <div className="flex items-center justify-between mt-32">
            <div className="flex space-x-4">
              <p className="text-black">
                <strong>ผู้ดูแล:</strong>
                <span className="text-pethub-color6"> นายกฤษณ์ สมบูรณ์สุข</span>
              </p>
              <p className="text-black">
                <strong>โทรศัพท์:</strong>
                <span className="text-pethub-color6"> +66 2 123 4567</span>
              </p>
            </div>
        
          <button className="text-gray-400 hover:text-gray-600 flex items-center text-xs">
            <i className="fas fa-cog mr-2"></i> ส่งคำร้องแก้ไขข้อมูล
          </button>
        </div>
        
          <p className="absolute top-2 right-2 text-gray-300 text-sm font-semibold">
            C-349-342350
          </p>
        </div>
      
        {/* Orange Accent Bar */}
        <div className="absolute top-1.5 right-0 w-2 h-[21.3rem] bg-pethub-color1"></div>
        </section>
        
        {/* Hotel Details */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-3xl font-semibold text-black mb-6 border-b pb-3">รายละเอียดโรงแรม</h2>
        
          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-black">คำอธิบายโรงแรม (Overview)</h3>
            <div className="bg-gray-50 p-4 rounded-md border text-pethub-color6">
              <p className="mb-4">
                Bangmod Pet Hotel เป็นโรงแรมสัตว์เลี้ยงระดับพรีเมียม ตั้งอยู่ในย่านบางมด กรุงเทพมหานคร ที่ออกแบบมาเพื่อตอบโจทย์ความต้องการของเจ้าของสัตว์เลี้ยงที่มองหาที่พักอันปลอดภัย สะดวกสบาย และทันสมัยสำหรับเพื่อนขนฟูของพวกเขา เราให้บริการที่พักทั้งระยะสั้นและระยะยาว พร้อมสิ่งอำนวยความสะดวกครบครันและการดูแลอย่างใกล้ชิดจากผู้เชี่ยวชาญด้านสัตว์เลี้ยง
              </p>
              <p className="mb-4">
                โรงแรมของเรามีพื้นที่กว้างขวาง รวมถึงห้องพักที่สะอาดและมีระบบควบคุมอุณหภูมิที่เหมาะสม พร้อมสนามวิ่งเล่นสำหรับสัตว์เลี้ยง และโซนกิจกรรมที่ออกแบบมาเพื่อความสนุกสนานและการออกกำลังกายของสัตว์เลี้ยง นอกจากนี้ เรายังมีบริการดูแลพิเศษ เช่น การอาบน้ำ ตัดขน และตรวจสุขภาพเบื้องต้น โดยทีมงานที่มีความรักและประสบการณ์ในการดูแลสัตว์เลี้ยง
              </p>
              <p>
                ไม่ว่าคุณจะมีสุนัข แมว หรือสัตว์เลี้ยงชนิดอื่น ๆ เราพร้อมให้บริการและดูแลพวกเขาด้วยความรักและความใส่ใจ เพื่อให้คุณมั่นใจได้ว่าสัตว์เลี้ยงของคุณจะได้รับการดูแลเป็นอย่างดีระหว่างการเข้าพักที่ Bangmod Pet Hotel.
              </p>
            </div>
        </div>
                    
        {/* Rules */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">ข้อกำหนด</h3>
          <div className="bg-gray-50 p-4 rounded-md border text-pethub-color6">
          <strong>ข้อกำหนดในการเข้าพักที่ Bangmod Pet Hotel</strong><br />
            <ul className="list-decimal pl-5 space-y-4 text-sm text-pethub-color6">
                <li>
                <strong>ประเภทสัตว์เลี้ยงที่รับบริการ:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>รับเฉพาะสุนัขและแมวเท่านั้น (น้ำหนักไม่เกิน 30 กิโลกรัม)</li>
                  <li>สัตว์เลี้ยงต้องมีสุขภาพดี ไม่มีโรคติดต่อหรือปัญหาสุขภาพร้ายแรง</li>
                </ul>
              </li>
              <li>
                <strong>วัคซีนและสุขภาพ:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>สัตว์เลี้ยงต้องได้รับการฉีดวัคซีนครบถ้วนตามกำหนด (เช่น วัคซีนป้องกันโรคพิษสุนัขบ้า หัด หลอดลมอักเสบ และอื่น ๆ ตามประเภทสัตว์)</li>
                  <li>เจ้าของต้องแสดงหลักฐานการฉีดวัคซีนในวันที่เช็คอิน</li>
                  <li>ไม่รับสัตว์เลี้ยงที่มีอาการป่วยหรือแสดงอาการของโรคติดต่อ</li>
                </ul>
              </li>
              <li>
                <strong>พฤติกรรมของสัตว์เลี้ยง:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>สัตว์เลี้ยงต้องไม่มีพฤติกรรมก้าวร้าวหรือเป็นอันตรายต่อสัตว์เลี้ยงตัวอื่น ๆ หรือผู้ดูแล</li>
                  <li>หากสัตว์เลี้ยงมีประวัติการกัดหรือทำร้ายผู้อื่น กรุณาแจ้งให้ทราบล่วงหน้า</li>
                </ul>
              </li>
              <li>
                <strong>การเช็คอินและเช็คเอาท์:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>เวลาเช็คอิน: 09:00 - 18:00 น.</li>
                  <li>เวลาเช็คเอาท์: 09:00 - 12:00 น. หากเช็คเอาท์เกินเวลาอาจมีค่าธรรมเนียมเพิ่มเติม</li>
                  <li>เจ้าของต้องเตรียมอาหารและของใช้ส่วนตัว เช่น ชามอาหาร หรือของเล่นที่สัตว์เลี้ยงชอบมาด้วย</li>
                </ul>
              </li>
              <li>
                <strong>การยกเลิกและคืนเงิน:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>การยกเลิกการเข้าพักต้องแจ้งล่วงหน้าอย่างน้อย 48 ชั่วโมงก่อนวันเช็คอิน</li>
                  <li>หากยกเลิกภายใน 24 ชั่วโมงก่อนการเข้าพัก จะมีค่าธรรมเนียม 50% ของราคาการเข้าพักทั้งหมด</li>
                </ul>
              </li>
              <li>
                <strong>การดูแลพิเศษ:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>หากสัตว์เลี้ยงต้องการการดูแลพิเศษ (เช่น การให้ยาตามเวลา) กรุณาแจ้งให้ทราบล่วงหน้าพร้อมรายละเอียดที่ชัดเจน</li>
                </ul>
              </li>
              <li>
                <strong>ความรับผิดชอบ:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>ทางโรงแรมไม่รับผิดชอบความเสียหายที่เกิดจากพฤติกรรมของสัตว์เลี้ยงในระหว่างการเข้าพัก เช่น การทำลายทรัพย์สินหรือการทำร้ายสัตว์ตัวอื่น</li>
                  <li>
                    ในกรณีฉุกเฉินที่สัตว์เลี้ยงมีอาการป่วย ทางโรงแรมจะติดต่อเจ้าของทันที และจะดำเนินการพาไปพบสัตวแพทย์ตามความจำเป็น ค่าใช้จ่ายต่าง ๆ จะเป็นความรับผิดชอบของเจ้าของสัตว์เลี้ยง
                  </li>
                </ul>
              </li>
              <li>
                <strong>หมายเหตุ:</strong> โปรดทำความเข้าใจและยอมรับข้อกำหนดเหล่านี้ก่อนทำการจองเพื่อประสบการณ์ที่ราบรื่นและปลอดภัยสำหรับสัตว์เลี้ยงของท่าน
              </li>
            </ul>
          </div>
        </div>
        </section>


        {/* Edit Button */}
        <div className="text-right">
          <button className="bg-pethub-color6 text-white px-4 py-2 rounded shadow hover:bg-blue-900">
            แก้ไขข้อมูล
          </button>
        </div>
        
        {/* Room Management */}
            <section className="bg-white shadow-md rounded-lg p-6 mt-6 text-left">
        <h2 className="text-xl font-semibold mb-4">จัดการห้องพัก</h2>

        {/* Room Summary */}
        <div className="flex justify-between items-center mb-6 text-left">
          <p><strong>จำนวนห้องพัก:</strong> <span className="text-red-500">10 ห้อง</span></p>
          <p><strong>Available:</strong> <span className="text-green-500">3 ห้อง</span></p>
          <p><strong>Booked:</strong> <span className="text-blue-500">2 ห้อง</span></p>
          <p><strong>Not Available:</strong> <span className="text-red-500">5 ห้อง</span></p>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {/* Room Card 1 */}
          <div className="bg-gray-50 shadow rounded-md p-4">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Room"
              className="rounded-md mb-4"
            />
            <p><strong>ประเภทห้อง:</strong> ห้องทั่วไป A2</p>
            <p><strong>สถานะ:</strong> <span className="text-red-500">Not available</span></p>
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              จัดการ
            </button>
          </div>
          {/* Room Card 2 */}
          <div className="bg-gray-50 shadow rounded-md p-4">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Room"
              className="rounded-md mb-4"
            />
            <p><strong>ประเภทห้อง:</strong> ห้องทั่วไป A3</p>
            <p><strong>สถานะ:</strong> <span className="text-green-500">Available</span></p>
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              จัดการ
            </button>
          </div>  
          {/* Room Card 3 */}
          <div className="bg-gray-50 shadow rounded-md p-4">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Room"
              className="rounded-md mb-4"
            />
            <p><strong>ประเภทห้อง:</strong> ห้อง VIP A5</p>
            <p><strong>สถานะ:</strong> <span className="text-green-500">Available</span></p>
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
              จัดการ
            </button>
          </div>
        </div>

          {/* Add Room Button */}
          <div className="text-right mt-6">
            <button className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600">
              เพิ่มห้อง +
            </button>
          </div>
        </section>

        {/* Booking Management */}
                <section className="bg-white shadow-md rounded-lg p-6 mt-6 text-left">
          <h2 className="text-xl font-semibold mb-4">จัดการการจอง</h2>

          {/* Booking Summary */}
          <div className="mb-6 ">
            <p className="text-gray-700">
              การจองวันนี้: <span className="text-orange-500">2 รายการ</span>
            </p>
          </div>

          {/* Booking Table */}
          <table className="w-full border-collapse border border-gray-300 ">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border border-gray-300">หมายเลขการจอง</th>
                <th className="p-3 border border-gray-300">วันที่จอง</th>
                <th className="p-3 border border-gray-300">เวลา</th>
                <th className="p-3 border border-gray-300">ประเภทห้อง</th>
                <th className="p-3 border border-gray-300">สถานะการจอง</th>
                <th className="p-3 border border-gray-300">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: รอการชำระเงิน */}
              <tr className="bg-gray-50 text-gray-700">
                <td className="p-3 border border-gray-300">B-987-6543210</td>
                <td className="p-3 border border-gray-300">10/10/2567</td>
                <td className="p-3 border border-gray-300">5/11/2567</td>
                <td className="p-3 border border-gray-300">ห้อง VIP B2</td>
                <td className="p-3 border border-gray-300 text-gray-500">รอการชำระเงิน</td>
                <td className="p-3 border border-gray-300 text-orange-500 cursor-pointer hover:underline">
                  รายละเอียด
                </td>
              </tr>

              {/* Row 2: ชำระเงินแล้ว */}
              <tr className="bg-gray-50 text-gray-700 ">
                <td className="p-3 border border-gray-300">B-233-2308275</td>
                <td className="p-3 border border-gray-300">10/10/2567</td>
                <td className="p-3 border border-gray-300">12/11/2567</td>
                <td className="p-3 border border-gray-300">ห้อง VIP B3</td>
                <td className="p-3 border border-gray-300 text-green-500">ชำระเงินแล้ว</td>
                <td className="p-3 border border-gray-300 text-orange-500 cursor-pointer hover:underline">
                  รายละเอียด
                </td>
              </tr>

              {/* Row 3: รอการยืนยัน */}
              <tr className="bg-gray-50 text-gray-700">
                <td className="p-3 border border-gray-300">B-546-2734815</td>
                <td className="p-3 border border-gray-300">10/10/2567</td>
                <td className="p-3 border border-gray-300">12/11/2567</td>
                <td className="p-3 border border-gray-300">ห้อง VIP B6</td>
                <td className="p-3 border border-gray-300 text-yellow-500">รอการยืนยัน</td>
                <td className="p-3 border border-gray-300 text-orange-500 cursor-pointer hover:underline">
                  รายละเอียด
                </td>
              </tr>
            </tbody>
          </table>
        </section>


        {/* Booking History */}
        <section className="bg-white shadow-md rounded-lg p-6 mt-6 text-left">
          <h2 className="text-xl font-semibold mb-4">ประวัติการจอง</h2>

          {/* Booking History Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border border-gray-300">หมายเลขการจอง</th>
                <th className="p-3 border border-gray-300">วันที่จอง</th>
                <th className="p-3 border border-gray-300">เวลา</th>
                <th className="p-3 border border-gray-300">ประเภทห้อง</th>
                <th className="p-3 border border-gray-300">สถานะการจอง</th>
                <th className="p-3 border border-gray-300">รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700">
                <td className="p-3 border border-gray-300">B-987-6543210</td>
                <td className="p-3 border border-gray-300">10/10/2567</td>
                <td className="p-3 border border-gray-300">5/11/2567</td>
                <td className="p-3 border border-gray-300">ห้อง VIP B2</td>
                <td className="p-3 border border-gray-300 text-gray-500">เช็คเอาท์</td>
                <td className="p-3 border border-gray-300 text-orange-500 cursor-pointer hover:underline">รายละเอียด</td>
              </tr>
              <tr className="text-gray-700">
                <td className="p-3 border border-gray-300">B-233-2308275</td>
                <td className="p-3 border border-gray-300">13/10/2567</td>
                <td className="p-3 border border-gray-300">12/11/2567</td>
                <td className="p-3 border border-gray-300">ห้อง VIP B3</td>
                <td className="p-3 border border-gray-300 text-blue-500">กำลังเช็คอิน</td>
                <td className="p-3 border border-gray-300 text-orange-500 cursor-pointer hover:underline">รายละเอียด</td>
              </tr>
              <tr className="text-gray-700">
                <td className="p-3 border border-gray-300">B-546-2734815</td>
                <td className="p-3 border border-gray-300">10/10/2567</td>
                <td className="p-3 border border-gray-300">12/11/2567</td>
                <td className="p-3 border border-gray-300">ห้อง VIP B6</td>
                <td className="p-3 border border-gray-300 text-red-500">ยกเลิกการจอง</td>
                <td className="p-3 border border-gray-300 text-orange-500 cursor-pointer hover:underline">รายละเอียด</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-300 mt-8 text-left">
          <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-gray-700">
            {/* Logo and Tagline */}
            <div>
              <h3 className="text-blue-500 font-semibold text-lg">my Dream Place</h3>
              <p>Your next goto companion for travel</p>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-medium mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-blue-500">About</a></li>
                <li><a href="#jobs" className="hover:text-blue-500">Jobs</a></li>
                <li><a href="#newsroom" className="hover:text-blue-500">Newsroom</a></li>
                <li><a href="#advertising" className="hover:text-blue-500">Advertising</a></li>
                <li><a href="#contact" className="hover:text-blue-500">Contact us</a></li>
              </ul>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="text-lg font-medium mb-3">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#australia" className="hover:text-blue-500">Australia</a></li>
                <li><a href="#new-zealand" className="hover:text-blue-500">New Zealand</a></li>
                <li><a href="#usa" className="hover:text-blue-500">United States of America (USA)</a></li>
                <li><a href="#greece" className="hover:text-blue-500">Greece</a></li>
                <li><a href="#maldives" className="hover:text-blue-500">Maldives</a></li>
                <li><a href="#singapore" className="hover:text-blue-500">Singapore</a></li>
                <li><a href="#see-more" className="hover:text-blue-500">See more</a></li>
              </ul>
            </div>

            {/* Terms and Policies */}
            <div>
              <h4 className="text-lg font-medium mb-3">Terms and Policies</h4>
              <ul className="space-y-2">
                <li><a href="#privacy-policy" className="hover:text-blue-500">Privacy Policy</a></li>
                <li><a href="#terms-of-use" className="hover:text-blue-500">Terms of use</a></li>
                <li><a href="#accessibility" className="hover:text-blue-500">Accessibility</a></li>
                <li><a href="#reward-policy" className="hover:text-blue-500">Reward system policy</a></li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="text-lg font-medium mb-3">Help</h4>
              <ul className="space-y-2">
                <li><a href="#support" className="hover:text-blue-500">Support</a></li>
                <li><a href="#cancel-bookings" className="hover:text-blue-500">Cancel your bookings</a></li>
                <li><a href="#use-coupon" className="hover:text-blue-500">Use Coupon</a></li>
                <li><a href="#refund-policies" className="hover:text-blue-500">Refund Policies</a></li>
                <li><a href="#international-travel-docs" className="hover:text-blue-500">International Travel Documents</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="bg-orange-200 h-2 mt-6"></div>
        </footer>

      </main>
    </div>
  );
};



export default HotelProfileManagement;
