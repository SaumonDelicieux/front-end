import React, { useContext } from 'react'

import { IFolder } from '../types/IFolder'
import { INote } from '../types/INote'

import AuthContext from '../contexts/AuthContext'

import ProfileCard from './ProfileCard'
import Folder from './Folder'

interface NavbarProps {
    folders?: IFolder[]
    notes?: INote[]
}

const Navbar: React.FC<NavbarProps> = ({ folders, notes }) => {
    const IM_PREMIUM = 'PREMIUM'
    const BE_PREMIUM = 'DEVENIR PREMIUM'

    const { user } = useContext(AuthContext)

    console.log({ folders }, { notes })

    return (
        <nav className="p-2 w-80 h-full flex flex-col justify-between bg-blue-900">
            <div className="flex flex-col text-center mb-10 text-slate-50 font-bold">
                <div className="text-3xl mb-2">Pi'Notes 📌</div>
                <div className="text-xs">
                    <span className="p-1 rounded-lg bg-yellow-600">
                        {user?.isPremium ? IM_PREMIUM : BE_PREMIUM}
                    </span>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="text-slate-50">
                    {
                        <div className="flex flex-col">
                            {folders?.map((folder: IFolder) => {
                                if (!folder.parentId) {
                                    const notesFiltered = notes?.filter(
                                        (note: INote) => folder?._id === note?.folderId,
                                    )
                                    return (
                                        <Folder
                                            title={folder.title}
                                            folders={folders}
                                            id={folder._id}
                                            parentId={folder._id}
                                            key={folder._id}
                                            notes={notesFiltered}
                                        />
                                    )
                                }
                            })}
                        </div>
                    }
                </div>
            </div>
            <ProfileCard />
        </nav>
    )
}

export default Navbar
