import React, { useContext, useState } from 'react'
import { AiFillFolderAdd } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr'
import { BsCheck } from 'react-icons/bs'
import { toast } from 'react-toastify'

import { IFolder } from '../types/IFolder'
import { INote } from '../types/INote'

import api from '../helpers/api'
import { urls } from '../helpers/urls'

import AuthContext from '../contexts/AuthContext'

import ProfileCard from './ProfileCard'
import Folder from './Folder'
import Button from './Button'

interface NavbarProps {
    folders?: IFolder[]
    notes?: INote[]
}

const Navbar: React.FC<NavbarProps> = ({ folders, notes }) => {
    const IM_PREMIUM = 'PREMIUM'
    const BE_PREMIUM = 'DEVENIR PREMIUM'

    const { user } = useContext(AuthContext)

    const [newFolder, setNewFolder] = useState('')
    const [isNewFolder, setIsNewFolder] = useState(false)

    const createFolder = async () => {
        try {
            const { data } = await api.post(urls.API.CREATE_FOLDER, {
                title: newFolder,
                parentId: undefined,
                userId: user?.id,
            })
            toast('Dossier créé avec succès !', { type: 'success' })
        } catch (error) {
            toast('Erreur lors de la création du dossier', { type: 'warning' })
        } finally {
            setIsNewFolder(false)
            setNewFolder('')
        }
    }

    return (
        <nav className="p-2 w-80 h-full flex flex-col justify-between bg-blue-900">
            <div className="flex flex-col text-center mb-10 text-slate-50 font-bold">
                <div className="text-3xl mb-2">Pi'Notes 📌</div>
                <div className="text-xs">
                    <span className="p-1 rounded-lg bg-yellow-600">
                        {user?.isPremium ? IM_PREMIUM : BE_PREMIUM}
                    </span>
                </div>
                <div className="my-4">
                    <Button
                        Icon={<AiFillFolderAdd size={16} />}
                        onClick={() => setIsNewFolder(true)}
                        noBg
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <div className="text-slate-50">
                    <div
                        className={`${
                            !isNewFolder && 'hidden'
                        } relative ml-2 mb-2 transition-all duration-500`}
                    >
                        <input
                            className="w-full p-1 bg-blue-700 rounded-md"
                            type="text"
                            value={newFolder}
                            onChange={e => setNewFolder(e.target.value)}
                        />
                        <div className="absolute top-2 right-2 flex">
                            <GrFormClose
                                color="red"
                                size={16}
                                className="cursor-pointer"
                                onClick={() => {
                                    setIsNewFolder(false)
                                    setNewFolder('')
                                }}
                            />
                            <BsCheck
                                color="white"
                                size={16}
                                className="cursor-pointer"
                                onClick={() => createFolder()}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {folders?.map((folder: IFolder) => {
                            if (!folder.parentId) {
                                return (
                                    <Folder
                                        title={folder.title}
                                        folders={folders}
                                        id={folder._id}
                                        key={folder._id}
                                        notes={notes}
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            <ProfileCard />
        </nav>
    )
}

export default Navbar
