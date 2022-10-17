import React from 'react'
import { AiFillFolderAdd } from 'react-icons/ai'

import Button from './Button'

interface HeaderProps {
    isPremium?: boolean
    displayNewFolder: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ isPremium = false, displayNewFolder }) => {
    const IM_PREMIUM = 'PREMIUM'
    const BE_PREMIUM = 'DEVENIR PREMIUM'

    return (
        <div className="flex flex-col text-center mb-10 text-slate-50 font-bold">
            <div className="text-3xl mb-2">Pi'Notes 📌</div>
            <div className="text-xs">
                <span className="p-1 rounded-lg bg-yellow-600">
                    {isPremium ? IM_PREMIUM : BE_PREMIUM}
                </span>
            </div>
            <div className="my-4">
                <Button
                    icon={<AiFillFolderAdd size={16} />}
                    onClick={() => displayNewFolder(true)}
                    noBg
                />
            </div>
        </div>
    )
}

export default Header
