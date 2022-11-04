import React, { KeyboardEvent, useState } from "react"
import { AiFillCaretRight, AiFillFolderAdd } from "react-icons/ai"
import { GrFormClose } from "react-icons/gr"
import { FaRegStickyNote } from "react-icons/fa"
import { BsCheck } from "react-icons/bs"
import { BiTrashAlt } from "react-icons/bi"
import { toast } from "react-toastify"

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

type Item = "note" | "folder"

const FolderItem: React.FC<FolderItemProps> = ({ folders, folderId, title, notes }) => {
    const NOTE = "note"
    const FOLDER = "folder"

    const { id } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const [isActive, setIsActive] = useState(true)

    const [newFolder, setNewFolder] = useState("")
    const [isNewFolder, setIsNewFolder] = useState(false)

    const [newNote, setNewNote] = useState("")
    const [isNewNote, setIsNewNote] = useState(false)

    const handleCreateFolder = async () => {
        if (newFolder === "") {
            setIsNewFolder(false)
            setNewFolder("")
            return toast("Le titre du dossier est vide")
        }

        dispatch(createFolder({ title: newFolder, userId: id!, parentId: folderId }))
        setIsNewFolder(false)
        setNewFolder("")
    }

    const handleCreateNote = async () => {
        if (newNote === "") {
            setIsNewNote(false)
            setNewNote("")
            return toast("Le titre de la note est vide")
        }

        dispatch(createNote({ title: newNote, folderId, userId: id! }))
        setIsNewNote(false)
        setNewNote("")
    }

    const handleDeleteFolder = async (e: Event) => {
        e.preventDefault()
        dispatch(deleteFolder(folderId!))
    }

    const keyPressed = async (e: KeyboardEvent<HTMLInputElement>, type: Item) => {
        if (e.key === "Enter") {
            if (type === "note") {
                await handleCreateNote()
            }
            if (type === "folder") {
                await handleCreateFolder()
            }
        }

        if (e.key === "Escape") {
            if (type === "note") {
                setIsNewNote(false)
                setNewNote("")
            }
            if (type === "folder") {
                setIsNewFolder(false)
                setNewFolder("")
            }
        }
    }

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
                        message="Supprimer"
                    />
                    <Button
                        icon={<FaRegStickyNote size={14} />}
                        onClick={() => {
                            setIsActive(true)
                            setIsNewNote(true)
                        }}
                        message="Nouvelle note"
                    />
                    <Button
                        icon={<AiFillFolderAdd size={16} />}
                        onClick={() => {
                            setIsActive(true)
                            setIsNewFolder(true)
                        }}
                        message="Nouveau dossier"
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
                    onKeyDown={e => keyPressed(e, NOTE)}
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
                    onKeyDown={e => keyPressed(e, FOLDER)}
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
