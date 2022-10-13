import React, { useContext } from 'react'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

import AuthContext from '../context/AuthContext'

const Main: React.FC = () => {
    const { user } = useContext(AuthContext)

    return user?.token ? <Dashboard /> : <Login />
}

export default Main
