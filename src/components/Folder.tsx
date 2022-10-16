import React, { useContext, useState } from 'react'
import { AiFillCaretRight, AiFillFolderAdd } from 'react-icons/ai'
import { GrFormClose } from 'react-icons/gr'
import { FaRegStickyNote } from 'react-icons/fa'
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
    id: string
    title: string
    notes?: INote[]
}

const Folder: React.FC<FolderProps> = ({ folders, id, title, notes }) => {
    const { user } = useContext(AuthContext)

    const [isActive, setIsActive] = useState(false)

    const [newFolder, setNewFolder] = useState('')
    const [isNewFolder, setIsNewFolder] = useState(false)
    const [newNote, setNewNote] = useState('')
    const [isNewNote, setIsNewNote] = useState(false)

    const createFolder = async () => {
        try {
            const { data } = await api.post(urls.API.CREATE_FOLDER, {
                title: newFolder,
                parentId: id,
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

    const createNote = async () => {
        try {
            const { data } = await api.post(urls.API.CREATE_NOTES, {
                title: newNote,
                folderId: id,
                userId: user?.id,
                text: newNote,
            })
            toast('Note créé avec succès !', { type: 'success' })
        } catch (error) {
            toast('Erreur lors de la création de la note', { type: 'warning' })
        } finally {
            setIsNewNote(false)
            setNewNote('')
        }
    }

    return (
        <div className="pl-2 mb-3">
            <div className="flex justify-between items-center cursor-pointer mb-1">
                <span className="font-bold" onClick={() => setIsActive(prev => !prev)}>
                    {title}
                </span>
                <div className="flex items-center">
                    <Button
                        Icon={<FaRegStickyNote size={14} />}
                        onClick={() => {
                            setIsActive(true)
                            setIsNewNote(true)
                        }}
                        noBg
                    />
                    <Button
                        Icon={<AiFillFolderAdd size={16} />}
                        onClick={() => {
                            setIsActive(true)
                            setIsNewFolder(true)
                        }}
                        noBg
                    />
                    <AiFillCaretRight
                        className={`${isActive && 'rotate-90'} ml-2 transition-all`}
                        onClick={() => setIsActive(prev => !prev)}
                    />
                </div>
            </div>
            <div
                className={`${
                    !isNewNote && 'hidden'
                } relative ml-2 mb-1 transition-all duration-500`}
            >
                <input
                    className="w-full p-1 bg-blue-700 rounded-md"
                    type="text"
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                />
                <div className="absolute top-2 right-2 flex">
                    <GrFormClose
                        color="red"
                        size={16}
                        className="cursor-pointer"
                        onClick={() => {
                            setIsNewNote(false)
                            setNewNote('')
                        }}
                    />
                    <BsCheck
                        color="white"
                        size={16}
                        className="cursor-pointer"
                        onClick={() => createNote()}
                    />
                </div>
            </div>
            {isActive &&
                notes
                    ?.filter((note: INote) => id === note?.folderId)
                    .map((note: INote) => (
                        <Note
                            key={note._id}
                            title={note.title}
                            text={note.text}
                            state={note.state}
                        />
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
            {isActive &&
                folders?.map((folder: IFolder) => {
                    if (folder.parentId === id) {
                        const notesFiltered = notes?.filter(
                            (note: INote) => folder?._id === note?.folderId,
                        )

                        return (
                            <Folder
                                key={folder._id}
                                title={folder.title}
                                id={folder._id}
                                folders={folders}
                                notes={notesFiltered}
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
