import React, { useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Connected from "../layouts/Connected"
import Unconnected from "../layouts/Unconnected"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Register from "../pages/Register"
import ForgottenPassword from "../pages/ForgottenPassword"
import UpdatePassword from "../pages/UpdatePassword"
import Subscribe from "../pages/Subscribe"
import Profile from "../pages/Profile"
import Canceled from "../pages/Canceled"
import Success from "../pages/Success"

import { urls } from "../helpers/urls"

import { setThemeMode } from "../features/user/userSlice"

import { useAppDispatch } from "../store"

const RoutesStack: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setThemeMode())
    }, [])

    return (
        <Routes>
            <Route path={urls.APP.SUBSCRIBE} element={<Subscribe />} />
            <Route element={<Unconnected />}>
                <Route path={urls.APP.LOGIN} element={<Login />} />
                <Route path={urls.APP.FORGOTTEN_PASSWORD} element={<ForgottenPassword />} />
                <Route path={urls.APP.UPDATE_PASSWORD} element={<UpdatePassword />} />
                <Route path={urls.APP.REGISTER} element={<Register />} />
            </Route>
            <Route path="/" element={<Connected />}>
                <Route path={urls.APP.DASHBOARD} element={<Dashboard />} />
                <Route path={urls.APP.PROFILE} element={<Profile />} />
                <Route path={urls.APP.SUCCESS} element={<Success />} />
                <Route path={urls.APP.CANCELED} element={<Canceled />} />
            </Route>
        </Routes>
    )
}

export default RoutesStack
