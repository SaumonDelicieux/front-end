import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { urls } from '../helpers/urls'

import AuthContext from '../contexts/AuthContext'

import Navbar from '../components/Navbar'
import api from '../helpers/api'

const Connected: React.FC = () => {
    const { user } = useContext(AuthContext)

    const [folders, setFolders] = useState<never[]>()
    const [notes, setNotes] = useState<never[]>()

    if (!user?.token) {
        return <Navigate to={urls.APP.LOGIN} />
    }

    const getAllFolders = async () => {
        try {
            const { data } = await api.get(urls.API.GET_ALL_FOLDERS, {
                params: { userId: user.id },
            })

            setFolders(data.folders)
            console.log('Folders receive', data.folders)
        } catch (error) {}
    }

    const getAllNotes = async () => {
        try {
            const { data } = await api.get(urls.API.GET_ALL_NOTES, {
                params: { userId: user.id },
            })

            setNotes(data.notes)
            console.log('Notes receive', data.notes)
        } catch (error) {}
    }

    useEffect(() => {
        getAllNotes()
        getAllFolders()
    }, [])

    return (
        <div className="flex h-full w-full bg-slate-900 text-slate-50">
            <Navbar folders={folders} notes={notes} />
            <Outlet />
        </div>
    )
}

export default Connected
