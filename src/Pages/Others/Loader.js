import React from 'react'
import logo from '../../Images/logo-main.png'

function Loader() {
    return (
        <>
            <div className='loader'>
                <img src={logo} alt="" width={200} />
            </div>
        </>
    )
}

export default Loader