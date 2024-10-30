import Navbar from "./Navbar"

function Profile() {
  return (
    <>
      <Navbar />
        <h1 className="mt-12 pt-5 text-6xl font-bold text-black">
            <span className='text-orange'>profle</span> page
        </h1>
        <div className="mt-10 diff aspect-[16/9]">
        <div className="diff-item-1">
            <div className="bg-primary text-primary-content grid place-content-center text-9xl font-black">
            HUB
            </div>
        </div>
        <div className="diff-item-2">
            <div className="bg-base-200 grid place-content-center text-9xl font-black">PET</div>
        </div>
        <div className="diff-resizer"></div>
        </div>

        
    </>
  )
}

export default Profile
