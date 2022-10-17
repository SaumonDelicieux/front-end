import React from "react"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { urls } from "../helpers/urls"

import { logoutUser } from "../features/user/userSlice"

import { useAppDispatch, useAppSelector } from "../hooks"

import Button from "./Button"

const ProfileCard: React.FC = () => {
    const navigate = useNavigate()

    const { firstName, lastName, loading } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const handleLogout = (e: Event) => {
        e.preventDefault()
        dispatch(logoutUser())
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex" onClick={() => navigate(urls.APP.PROFILE)}>
                <img
                    className="h-10 w-10 object-cover rounded-full"
                    src="https://wonder-day.com/wp-content/uploads/2020/10/wonder-day-among-us-21.png"
                    alt="Current profile photo"
                />
                <div className="ml-4">
                    <div className="text-xs text-slate-400">Connecté en tant que</div>
                    <div className="text-sm text-slate-50">{`${firstName} ${lastName?.[0]}.`}</div>
                </div>
            </div>
            <Button
                icon={<RiLogoutCircleRLine className="text-red-500 " size={26} />}
                onClick={(e: any) => handleLogout(e)}
                isLoading={loading}
                noBg
            />
        </div>
    )
}

export default ProfileCard
