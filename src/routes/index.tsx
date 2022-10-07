import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Main from '../layouts/Main'

import Login from '../pages/Dashboard'
import Dashboard from '../pages/Login'

import { urls } from '../helpers/urls'

const RoutesStack: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route path={urls.LOGIN} element={<Login />} />
                <Route path={urls.DASHBOARD} element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default RoutesStack
