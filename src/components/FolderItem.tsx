import React, { useState } from "react"
import { AiFillCaretRight, AiFillFolderAdd } from "react-icons/ai"
import { GrFormClose } from "react-icons/gr"
import { FaRegStickyNote } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"
import { BiTrashAlt } from "react-icons/bi"

import { IFolder } from "../types/IFolder"
import { INote } from "../types/INote"

import NoteItem from "./NoteItem"
import Button from "./Button"

import { useAppDispatch, useAppSelector } from "../store"

import { createNote } from "../actions/notes"
import { createFolder, deleteFolder } from "../actions/folders"

interface FolderItemProps {
    folders?: IFolder[]
    folderId: string
    title: string
    notes?: INote[]
}

const FolderItem: React.FC<FolderItemProps> = ({ folders, folderId, title, notes }) => {
    const { id } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [isActive, setIsActive] = useState(true)

    const [newFolder, setNewFolder] = useState("")
    const [isNewFolder, setIsNewFolder] = useState(false)

    const [newNote, setNewNote] = useState("")
    const [isNewNote, setIsNewNote] = useState(false)

    const handleCreateFolder = async () => {
        dispatch(createFolder({ title: newFolder, userId: id!, parentId: folderId }))
        setIsNewFolder(false)
        setNewFolder("")
    }

    const handleCreateNote = async () => {
        dispatch(createNote({ title: newNote, folderId, userId: id! }))
        setIsNewNote(false)
        setNewNote("")
    }

    const handleDeleteFolder = async (e: Event) => {
        e.preventDefault()
        dispatch(deleteFolder(folderId!))
    }

    document.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            setIsActive(false)
        } else if (e.key === "Escape") {
            setIsNewFolder(false)
            setNewFolder("")
            setIsNewNote(false)
            setNewNote("")
        }
    })

    return (
        <div className="pl-2 mb-3">
            <div className="flex justify-between items-center cursor-pointer mb-1">
                <span
                    className="font-bold whitespace-nowrap text-ellipsis overflow-hidden"
                    onClick={() => setIsActive(prev => !prev)}
                >
                    {title}
                </span>
                <div className="flex items-center">
                    <Button
                        icon={<BiTrashAlt size={15} />}
                        onClick={(e: Event) => handleDeleteFolder(e)}
                        message="Delete"
                    />
                    <Button
                        icon={<FaRegStickyNote size={14} />}
                        onClick={() => {
                            setIsActive(true)
                            setIsNewNote(true)
                        }}
                        message="New note"
                    />
                    <Button
                        icon={<AiFillFolderAdd size={16} />}
                        onClick={() => {
                            setIsActive(true)
                            setIsNewFolder(true)
                        }}
                        message="New Folder"
                    />
                    <AiFillCaretRight
                        className={`${isActive && "rotate-90"} ml-2 transition-all`}
                        onClick={() => setIsActive(prev => !prev)}
                    />
                </div>
            </div>
            <div
                className={`${
                    !isNewNote && "hidden"
                } relative ml-2 mb-1 transition-all duration-500`}
            >
                <input
                    className="p-1 bg-slate-500 dark:bg-blue-700 rounded-md"
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
                            setNewNote("")
                        }}
                    />
                    <BsCheck
                        color="white"
                        size={16}
                        className="cursor-pointer"
                        onClick={() => handleCreateNote()}
                    />
                </div>
            </div>
            {isActive &&
                notes
                    ?.filter((note: INote) => folderId === note?.folderId)
                    .map((note: INote) => <NoteItem key={note._id} note={note} />)}
            <div
                className={`${
                    !isNewFolder && "hidden"
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
                            setNewFolder("")
                        }}
                    />
                    <BsCheck
                        color="white"
                        size={16}
                        className="cursor-pointer"
                        onClick={() => handleCreateFolder()}
                    />
                </div>
            </div>
            {isActive &&
                folders?.map((folder: IFolder) => {
                    if (folder.parentId === folderId) {
                        const notesFiltered = notes?.filter(
                            (note: INote) => folder?._id === note?.folderId,
                        )

                        return (
                            <FolderItem
                                key={folder._id}
                                title={folder.title}
                                folderId={folder._id}
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

export default FolderItem
