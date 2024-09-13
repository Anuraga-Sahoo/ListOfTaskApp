import React from 'react'
import { AiFillBook } from "react-icons/ai";

const Header = () => {
  
  return (
    <div>
      <nav className='bg-black h-[5rem] w-[100%] text-white p-5 inline-flex items-center'>
        <h2 className='text-3xl font-bold'>List of Task</h2>
        <AiFillBook className='text-3xl ml-2'/>
      </nav>
    </div>
  )
}

export default Header
