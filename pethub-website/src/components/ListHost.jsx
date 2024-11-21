import Navbar from "./Utils/Navbar"

function ListHost() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col mt-24">
                <div className="text-4xl font-bold mb-4">
                    <span className="text-black mr-2">มาเป็น</span>
                    <span className="text-pethub-color1 mr-2">Host</span>
                    <span className="text-black">กับเรา</span>
                </div>
                <div className="text-black text-4xl font-bold">ลงชื่อโรงแรมของคุณบน PetHub ได้เลย</div>
                <div className="flex justify-center">
                    <div className="max-w-xl mx-auto">
                        <div className="text-black text-sm mt-6">
                            เชิญเจ้าของที่พักลงประกาศที่พักที่เป็นมิตรกับสัตว์เลี้ยงของคุณ เพื่อเข้าถึงกลุ่มเจ้าของสัตว์เลี้ยง
                            ลงประกาศฟรี ลงทะเบียนง่าย และชำระเงินปลอดภัย
                        </div>
                    </div>
                </div>
                <div className="mx-10 lg:grid grid-cols-8 gap-4 mt-8">
                    <div className="my-4 col-start-2 col-span-3 bg-neutral-50 drop-shadow-xl p-8 rounded-lg">
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex text-black text-left font-bold text-3xl mb-2">บ้าน</div>
                            <div className="grid grid-cols-4">
                                <div className="flex col-span-3 text-black text-left text-base">
                                    สำหรับเจ้าของที่พักที่เสนอที่พัก หรือ อพาร์ตเมนต์ที่เป็นมิตรกับสัตว์เลี้ยง (เช่น บริการรับฝากสัตว์เลี้ยงหรือเดย์แคร์)
                                    เหมาะสำหรับที่พักแบบยูนิตเดียว เช่น บ้านที่เปิดรับฝากสัตว์เลี้ยง เดย์แคร์ หรืออพาร์ตเมนต์ส่วนตัว
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <button className="bg-black text-white border border-black btn btn-disabled btn-xs sm:btn-xs md:btn-sm lg:btn-md mt-4">ลงทะเบียนบ้านของคุณ</button>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 col-start-5 col-span-3 bg-neutral-50 drop-shadow-xl p-8 rounded-lg">
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex text-black text-left font-bold text-3xl mb-2">โรงแรม</div>
                            <div className="grid grid-cols-4">
                                <div className="flex col-span-3 text-black text-left text-base">
                                    สำหรับธุรกิจโรงแรมสัตว์เลี้ยงหรือที่พักสัตว์เลี้ยงแบบมืออาชีพที่มีหลายยูนิต
                                    เช่น โรงแรมสัตว์เลี้ยงหลายยูนิต เดย์แคร์ สถานรับฝากสัตว์ หรือที่พักสัตว์เลี้ยงที่มีมาตรฐานระดับมืออาชีพ
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <a href="/pethub-website/basics" className="bg-black text-white border border-black btn btn-xs sm:btn-xs md:btn-sm lg:btn-md mt-4">ลงทะเบียนโรงแรมของคุณ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListHost