import React from "react"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { urls } from "../helpers/urls"

import { logoutUser } from "../features/user/userSlice"
import { unselectNote } from "../features/notes/notesSlice"

import { useAppDispatch, useAppSelector } from "../store"

import Button from "./Button"

const ProfileCard: React.FC = () => {
    const { firstName, lastName, loading } = useAppSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogout = (e: Event) => {
        e.preventDefault()
        dispatch(logoutUser())
    }

    return (
        <div className="flex items-center justify-between">
            <div
                className="flex cursor-pointer"
                title="vers profil"
                onClick={() => {
                    navigate(urls.APP.PROFILE)
                    dispatch(unselectNote())
                }}
            >
                <img
                    className="h-10 w-10 object-cover rounded-full"
                    src="https://wonder-day.com/wp-content/uploads/2020/10/wonder-day-among-us-21.png"
                    alt="Current profile photo"
                />
                <div className="ml-4">
                    <div className="text-xs dark:text-slate-400">Connecté en tant que</div>
                    <div className={`text-sm ${!firstName && "underline"}`}>{`${
                        firstName ? firstName + " " + lastName?.[0] + "." : "Compléter son profil"
                    }`}</div>
                </div>
            </div>
            <Button
                icon={<RiLogoutCircleRLine className="text-red-500 " size={26} />}
                onClick={(e: any) => handleLogout(e)}
                isLoading={loading}
            />
        </div>
    )
}

export default ProfileCard
