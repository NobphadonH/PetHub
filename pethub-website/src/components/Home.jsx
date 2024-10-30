import Navbar from "./Navbar"

function Home() {
  return ( 
    <div>
      <Navbar />
      <div className="text-start mt-32 bg-pethub-color1 w-11/12 xl:w-8/12 h-full mx-auto py-10 px-12 xl:px-28 relative rounded-md overflow-hidden z-10 opacity-80">
        <div className="absolute top-0 right-0 left-0 bottom-0 z-0">
            <img
                src="https://tidypets.store/cdn/shop/files/view-cats-dogs-being-friends.jpg?v=1726648599&width=2000"
                alt=""
                className="w-full h-full object-cover opacity-80"
            />
        </div>
        <h1 className="text-7xl relative z-20 text-pethub-color1  ">PetHub</h1>
        <h4 className="relative z-20">เลือกโรงแรมให้เหมาะสมกับน้องๆของคุณ</h4>
        <div className="grid grid-cols-12 gap-14 mt-24 relative z-20">
            <div className="col-span-3">
                <select className="select select-bordered w-full max-w-xs shadow-xl" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>ประเภทสัตว์</option>
                    <option style={{ color: 'black' }}>สุนัข</option>
                    <option style={{ color: 'black' }}>แมว</option>
                </select>
            </div>
            <div className="col-span-4">
                <input type="text" placeholder="สถานที่ตั้ง" className="input input-bordered w-full relative z-20 shadow-xl" />
            </div>
            <div className="col-span-3">
                <select className="select select-bordered w-full max-w-xs input-shadow" style={{ color: 'gray' }}>
                    <option disabled selected style={{ color: 'gray' }}>ช่วงราคา</option>
                    <option style={{ color: 'black' }}>500-2000 บาท</option>
                    <option style={{ color: 'black' }}>2000-5000 บาท</option>
                </select>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-10">
                <input type="text" placeholder="ค้นหาจากชื่อโรงแรม" className="input input-bordered w-full relative z-20 input-shadow" />
            </div>
            <div className="col-span-2">
                <a href="/" className="btn bg-pethub-color1 text-white relative z-20 ">search</a>
            </div>
        </div>
        <div className="absolute bottom-0 right-0 left-0 h-16 bg-white z-10"></div>
    </div>

    </div>
  )
}

export default Home
