import React from "react"
import { FiMoon, FiSun } from "react-icons/fi"

import { switchThemeMode } from "../features/user/userSlice"

import { useAppDispatch, useAppSelector } from "../store"

const DarkMode: React.FC = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(state => state.user.theme)

    return (
        <div
            className="absolute top-0 right-0 cursor-pointer m-1 text-slate-800 dark:text-slate-200"
            onClick={() => dispatch(switchThemeMode())}
        >
            {theme === "dark" ? <FiMoon /> : <FiSun />}
        </div>
    )
}

export default DarkMode
