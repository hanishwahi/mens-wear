import React from 'react'
import Navbar from './Navbar'
import TopHead from './TopHead'

function Header() {
  return (
    <>
      <div className='sticky-top'>
        <TopHead />
        <Navbar />
      </div>
    </>
  )
}

export default Header