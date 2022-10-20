import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { urls } from "../helpers/urls"

import { useAppSelector } from "../hooks"

const Unconnected: React.FC = () => {
    const { token } = useAppSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate(urls.APP.DASHBOARD)
        }
    }, [token])

    return <Outlet />
}

export default Unconnected
