import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { urls } from '../helpers/urls'

import AuthContext from '../contexts/AuthContext'

import Navbar from '../components/Navbar'

const Connected: React.FC = () => {
    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to={urls.APP.LOGIN} />
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Connected
