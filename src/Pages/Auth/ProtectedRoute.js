import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function ProtectedRoute() {
    const token = JSON.parse(localStorage.getItem('Token'))
    return (
        <>
            {token ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}
export default ProtectedRoute