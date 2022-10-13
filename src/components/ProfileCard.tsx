import React, { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import AuthContext from '../contexts/AuthContext'

import Button from './Button'

const ProfileCard: React.FC = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const handleLogout = (e: Event) => {
        e.preventDefault()
        setIsLoading(true)

        setIsLoading(false)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex">
                <img
                    className="h-10 w-10 object-cover rounded-full"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                    alt="Current profile photo"
                />
                <div className="ml-4">
                    <div className="text-xs text-slate-100">Connecté en tant que</div>
                    <div className="text-sm text-slate-50">{`${user?.firstName} ${user?.lastName?.[0]}.`}</div>
                </div>
            </div>
            <Button title="O" onClick={(e: any) => handleLogout(e)} isLoading={isLoading} />
        </div>
    )
}

export default ProfileCard
