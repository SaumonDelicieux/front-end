import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { getUserDetails } from "../features/user/userSlice"

import { getAllFolders } from "../actions/folders"
import { getAllNotes, getSharedNotes } from "../actions/notes"

import { useAppDispatch, useAppSelector } from "../store"

import { urls } from "../helpers/urls"

const Connected: React.FC = () => {
    const { token } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate(urls.APP.LOGIN)
        } else {
            dispatch(getUserDetails())
            dispatch(getAllNotes(token))
            // dispatch(getSharedNotes(token))
            dispatch(getAllFolders(token))
        }
    }, [token])

    return (
        <div className="flex h-full w-full text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-900 transition-colors">
            <Outlet />
        </div>
    )
}

export default Connected
