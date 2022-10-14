import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { urls } from '../helpers/urls'

import AuthContext from '../contexts/AuthContext'

import Navbar from '../components/Navbar'

const Connected: React.FC = () => {
    const { user } = useContext(AuthContext)

    if (!user?.token) {
        return <Navigate to={urls.APP.LOGIN} />
    }

    return (
        <div className="bg-slate-900 h-full w-full">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Connected
