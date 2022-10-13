import React from 'react'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

const Main: React.FC = () => {
    const auth = false

    return auth ? <Dashboard /> : <Login />
}

export default Main
