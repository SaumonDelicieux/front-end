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

    return (
        <div className="flex h-full w-full text-slate-200 bg-slate-50 dark:bg-slate-900 dark:text-slate-50">
            <Outlet />
        </div>
    )
}

export default Unconnected
