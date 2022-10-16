import React, { useContext, useState } from 'react'
import { AiFillCaretRight, AiFillFolderAdd } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr'
import { BsCheck } from 'react-icons/bs'
import { toast } from 'react-toastify'

import api from '../helpers/api'
import { urls } from '../helpers/urls'

import AuthContext from '../contexts/AuthContext'

import { IFolder } from '../types/IFolder'
import { INote } from '../types/INote'

import Note from './Note'
import Button from './Button'

interface FolderProps {
    folders?: IFolder[]
    parentId?: string
    id: string
    title: string
    notes?: INote[]
}

const Folder: React.FC<FolderProps> = ({ folders, parentId = undefined, id, title, notes }) => {
    const { user } = useContext(AuthContext)

    const [isActive, setIsActive] = useState(true)
    const [newFolder, setNewFolder] = useState('')
    const [isNewFolder, setIsNewFolder] = useState(false)

    const createFolder = async () => {
        setIsNewFolder(false)

        try {
            const { data } = await api.post(urls.API.CREATE_FOLDER, {
                title: newFolder,
                parentId: parentId,
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
        <div className="pl-2 mb-3">
            <div
                className="flex justify-between items-center cursor-pointer mb-1"
                onClick={() => setIsActive(prev => !prev)}
            >
                <span className="font-bold">{title}</span>
                <div className="flex items-center">
                    <Button
                        Icon={<AiFillFolderAdd size={16} />}
                        onClick={() => setIsNewFolder(true)}
                        noBg
                    />
                    <AiFillCaretRight
                        className={`${isActive && 'rotate-90'} ml-2 transition-all`}
                    />
                </div>
            </div>
            {notes?.map((note: INote) => (
                <Note key={note._id} title={note.title} text={note.text} state={note.state} />
            ))}
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
            {folders?.map((folder: IFolder) => {
                if (folder.parentId === id) {
                    return (
                        <Folder
                            key={folder._id}
                            title={folder.title}
                            parentId={folder.parentId}
                            id={folder._id}
                            folders={folders}
                            notes={notes}
                        />
                    )
                } else {
                    return
                }
            })}
        </div>
    )
}

export default Folder
