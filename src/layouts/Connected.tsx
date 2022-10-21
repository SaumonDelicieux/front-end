import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { getUserDetails } from "../features/user/userSlice"

import { getAllFolders } from "../actions/folders"
import { getAllNotes } from "../actions/notes"

import { useAppDispatch, useAppSelector } from "../store"

import { urls } from "../helpers/urls"

import Navbar from "../components/Navbar"

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
            dispatch(getAllFolders(token))
        }
    }, [token])

    return (
        <div className="flex h-full w-full bg-slate-900 text-slate-50">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Connected
