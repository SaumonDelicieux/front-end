import React from "react"
import { FiMoon, FiSun } from "react-icons/fi"

import { switchThemeMode } from "../features/user/userSlice"

import { useAppDispatch, useAppSelector } from "../store"

const DarkMode: React.FC = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(state => state.user.theme)

    return (
        <div
            className="absolute top-0 right-5 z-50 cursor-pointer m-1 text-slate-50 dark:text-slate-900 bg-blue-900 dark:bg-slate-300 rounded-full w-8 h-8 flex items-center justify-center text-s font-bold"
            onClick={() => dispatch(switchThemeMode())}
        >
            {theme === "dark" ? <FiMoon /> : <FiSun />}
        </div>
    )
}

export default DarkMode
