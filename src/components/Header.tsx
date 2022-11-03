import React from "react"
import { AiFillFolderAdd } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

import { unselectNote } from "../features/notes/notesSlice"

import { urls } from "../helpers/urls"

import { useAppDispatch } from "../store"

import Button from "./Button"

interface HeaderProps {
    isPremium?: boolean
    displayNewFolder: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ isPremium = false, displayNewFolder }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const IM_PREMIUM = "PREMIUM"
    const BE_PREMIUM = "DEVENIR PREMIUM"

    return (
        <div className="flex flex-col text-center mb-4 font-bold">
            <div className="text-3xl mb-2 cursor-pointer" onClick={() => dispatch(unselectNote())}>
                Pi'Notes 📌
            </div>
            <div className="text-xs">
                <span
                    className="py-1 px-3 rounded-lg bg-yellow-600 cursor-pointer"
                    onClick={() => !isPremium && navigate(urls.APP.SUBSCRIBE)}
                >
                    {isPremium ? IM_PREMIUM : BE_PREMIUM}
                </span>
            </div>
            <div className="my-4">
                <Button
                    icon={<AiFillFolderAdd size={16} />}
                    onClick={() => displayNewFolder(true)}
                />
            </div>
        </div>
    )
}

export default Header
