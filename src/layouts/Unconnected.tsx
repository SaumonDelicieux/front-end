import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { urls } from "../helpers/urls"

import { useAppSelector } from "../store"

const Unconnected: React.FC = () => {
    const { token } = useAppSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            navigate(urls.APP.DASHBOARD)
        }
    }, [token])

    return (
        <div className="flex h-full w-full text-slate-800 dark:text-slate-200 bg-slate-400 dark:bg-slate-900 transition-colors">
            <Outlet />
        </div>
    )
}

export default Unconnected
