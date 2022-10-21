import React from "react"
import { Routes, Route } from "react-router-dom"

import Connected from "../layouts/Connected"
import Unconnected from "../layouts/Unconnected"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Register from "../pages/Register"
import ForgottenPassword from "../pages/ForgottenPassword"
import Subscribe from "../pages/Subscribe"
import Profile from "../pages/Profile"

import { urls } from "../helpers/urls"

const RoutesStack: React.FC = () => {
    return (
        <Routes>
            <Route element={<Unconnected />}>
                <Route path={urls.APP.LOGIN} element={<Login />} />
                <Route path={urls.APP.FORGOTTEN_PASSWORD} element={<ForgottenPassword />} />
                <Route path={urls.APP.SUBSCRIBE} element={<Subscribe />} />
                <Route path={urls.APP.REGISTER} element={<Register />} />
            </Route>
            <Route path="/" element={<Connected />}>
                <Route path={urls.APP.DASHBOARD} element={<Dashboard />} />
                <Route path={urls.APP.PROFILE} element={<Profile />} />
            </Route>
        </Routes>
    )
}

export default RoutesStack
