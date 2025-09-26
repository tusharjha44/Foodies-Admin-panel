import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFood from './pages/AddFood/AddFood'
import ListFood from './pages/ListFood/ListFood'
import Orders from './pages/Orders/Orders'
import MenuBar from './components/Menubar/MenuBar'
import SideBar from './components/Sidebar/SideBar'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  return (
    <div className="d-flex" id="wrapper">
      <SideBar isSidebarVisible={isSidebarVisible} />
      <div id="page-content-wrapper">
        <MenuBar toggleSidebar={toggleSidebar} />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<ListFood />} />
            <Route path="/add" element={<AddFood />} />
            <Route path="/list" element={<ListFood />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
