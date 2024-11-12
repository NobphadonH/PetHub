import React from "react";

const HotelProfileManagement = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">Pethub Hotel Management</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="text-gray-700 hover:text-orange-500">Home</a></li>
              <li><a href="/profile" className="text-gray-700 hover:text-orange-500">Profile</a></li>
              <li><a href="/about" className="text-gray-700 hover:text-orange-500">About</a></li>
              <li><a href="/contact" className="text-gray-700 hover:text-orange-500">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hotel Overview */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex">
            {/* Image */}
            <img
              src="https://via.placeholder.com/400x300"
              alt="Hotel"
              className="w-1/3 rounded-lg shadow-md"
            />
            {/* Details */}
            <div className="ml-6 w-2/3">
              <h2 className="text-xl font-semibold text-orange-500">Bangmod Pet Hotel</h2>
              <p className="mt-2"><strong>สถานที่ตั้ง:</strong> 123 ถนนสุขุมวิท, วัฒนา, กรุงเทพมหานคร 10110, (ใกล้ BTS อโศก)</p>
              <p className="mt-1"><strong>ประเภทที่พัก:</strong> Professional Pet Hotel</p>
              <p className="mt-1"><strong>Cancellation Policy:</strong> Flexible cancellation</p>
              <p className="mt-4"><strong>ผู้ดูแล:</strong> นายกฤษณ์ สมบูรณ์สุข</p>
              <p className="mt-1"><strong>โทรศัพท์:</strong> +66 2 123 4567</p>
            </div>
          </div>
        </section>

        {/* Hotel Details */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">รายละเอียดโรงแรม</h2>

          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">คำอธิบายโรงแรม (Overview)</h3>
            <div className="bg-gray-50 p-4 rounded-md border">
              <p>
                Bangmod Pet Hotel เป็นโรงแรมสัตว์เลี้ยงระดับพรีเมียม ตั้งอยู่ในย่านบางนา กรุงเทพมหานคร
                ที่ออกแบบมาเพื่อความต้องการของเจ้าของสัตว์เลี้ยง...
              </p>
            </div>
          </div>

          {/* Rules */}
          <div>
            <h3 className="text-lg font-medium mb-2">ข้อกำหนด</h3>
            <div className="bg-gray-50 p-4 rounded-md border">
              <ul className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>ประกาศเกี่ยวกับบริการ:</strong>
                  รับเฉพาะสัตว์เลี้ยงและแมวที่น้ำหนักไม่เกิน 30 กิโลกรัม...
                </li>
                <li>
                  <strong>ข้อกำหนดสุขภาพ:</strong>
                  สัตว์เลี้ยงต้องได้รับวัคซีนครบตามที่กำหนด...
                </li>
                <li>
                  <strong>พฤติกรรมของสัตว์เลี้ยง:</strong>
                  ต้องไม่มีพฤติกรรมก้าวร้าว...
                </li>
                <li>
                  <strong>การเช็คอินและเช็คเอาท์:</strong>
                  เวลาเช็คอิน: 09:00-18:00 น.
                </li>
                <li>
                  <strong>การยกเลิกการจอง:</strong>
                  แจ้งยกเลิกล่วงหน้า 24 ชั่วโมง...
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Edit Button */}
        <div className="text-right">
          <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
            แก้ไขข้อมูล
          </button>
        </div>
        
          {/* Room Management */}
                <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">จัดการห้องพัก</h2>

          {/* Room Summary */}
          <div className="flex justify-between items-center mb-6">
            <p><strong>จำนวนห้องพัก:</strong> <span className="text-red-500">10 ห้อง</span></p>
            <p><strong>Available:</strong> <span className="text-green-500">3 ห้อง</span></p>
            <p><strong>Booked:</strong> <span className="text-blue-500">2 ห้อง</span></p>
            <p><strong>Not Available:</strong> <span className="text-red-500">5 ห้อง</span></p>
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">จัดการการจอง</h2>

          {/* Booking Summary */}
          <div className="mb-6">
            <p className="text-gray-700">
              การจองวันนี้: <span className="text-orange-500">2 รายการ</span>
            </p>
          </div>

          {/* Booking Table */}
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
              <tr className="bg-gray-50 text-gray-700">
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
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
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
        <footer className="bg-gray-100 border-t border-gray-300 mt-8">
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
