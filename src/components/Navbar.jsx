import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex m-7 justify-between h-10'>

            <div className="flex justify-center items-center gap-3">
                <a href=".">
                    <img src="/shield.png" className='p-1 rounded-xl cursor-pointer w-9.5 border-[#0e2240] border-2 logo hover:scale-115 transition-scale duration-200' />
                </a>
                <span className='text-white text-[18px] font-bold'>Password Manager</span>
            </div>
            <div className='flex justify-center items-center'>
                <a href="https://github.com/aaryanrpurohit">
                    <lord-icon
                        src="https://cdn.lordicon.com/ioihllwu.json"
                        trigger="hover"
                        colors="primary:#ebe6ef,secondary:#242424"
                        className="hover:scale-125 transition-scale duration-200">
                    </lord-icon>
                </a>
            </div>
        </nav>
    )
}

export default Navbar
