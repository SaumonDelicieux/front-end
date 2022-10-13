import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiFillCaretRight } from 'react-icons/ai'

import { urls } from '../helpers/urls'

import ProfileCard from './ProfileCard'

const Navbar: React.FC = () => {
    const IM_PREMIUM = 'PREMIUM'
    const BE_PREMIUM = 'DEVENIR PREMIUM'

    const navigate = useNavigate()
    const resolved = useLocation()

    const [isPremium, setIsPremium] = useState(true)

    return (
        <nav className="p-2 w-80 h-full flex flex-col justify-between bg-blue-900">
            <div className="flex flex-col text-center mb-10 text-slate-50 font-bold">
                <div className="text-3xl mb-2">Pi'Notes 📌</div>
                <div className="text-xs">
                    <span className="p-1 rounded-lg bg-yellow-600">
                        {isPremium ? IM_PREMIUM : BE_PREMIUM}
                    </span>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-slate-50">
                    <div className="pl-2 mb-2 flex justify-between items-center">
                        <span>Vacances</span>
                        <AiFillCaretRight
                            className="rotate-90 cursor-pointer"
                            onClick={() => console.log('reduce or explode')}
                        />
                    </div>
                    <div className="pl-4">
                        <div
                            onClick={() => console.log('Show Marseille note')}
                            className="block py-1 px-2 bg-blue-700 rounded-lg mb-1 cursor-pointer"
                            aria-label="Marseille"
                        >
                            <span>Marseille</span>
                        </div>
                        <div
                            onClick={() => console.log('Show Paris note')}
                            className="block py-1 px-2 hover:bg-blue-700 rounded-lg transition-all mb-1 cursor-pointer"
                            aria-label="Paris"
                        >
                            <span>Paris</span>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileCard />
        </nav>
    )
}

export default Navbar
