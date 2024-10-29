function Profile() {
  return (
    <>
    <div className="navbar bg-base-100 fixed top-0 left-0 border-b-2 border-orange">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a href='/pethub-website/profile'>Profile</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a href='/pethub-website/' className="btn btn-ghost text-xl">Pethub</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href='/pethub-website/profile'>Profile</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary">Button</a>
      </div>
    </div>
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
