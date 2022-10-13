import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Connected from '../layouts/Connected'
import Unconnected from '../layouts/Unconnected'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

import { urls } from '../helpers/urls'

const RoutesStack: React.FC = () => {
    return (
        <Routes>
            <Route element={<Unconnected />}>
                <Route path={urls.APP.LOGIN} element={<Login />} />
            </Route>
            <Route path="/" element={<Connected />}>
                <Route path={urls.APP.DASHBOARD} element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default RoutesStack
