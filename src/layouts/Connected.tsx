import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { urls } from '../helpers/urls'

import AuthContext from '../contexts/AuthContext'

const Connected: React.FC = () => {
    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to={urls.APP.LOGIN} />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default Connected
