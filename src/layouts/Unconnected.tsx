import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { urls } from '../helpers/urls'

import AuthContext from '../contexts/AuthContext'

const Unconnected: React.FC = () => {
    const { user } = useContext(AuthContext)

    if (user?.token) {
        return <Navigate to={urls.APP.DASHBOARD} />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default Unconnected
