import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'


const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      {/* <Home/> */}
    </div>
  )
}

export default Layout
