import React from 'react'
import { Outlet } from 'react-router-dom'

function LayoutWithNavbar() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default LayoutWithNavbar