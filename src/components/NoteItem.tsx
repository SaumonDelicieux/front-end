import React from "react"
import { BiTrashAlt } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

import { urls } from "../helpers/urls"

import { deleteNote } from "../actions/notes"

import { setNote } from "../features/notes/notesSlice"

import { useAppDispatch, useAppSelector } from "../store"

import Button from "./Button"

import { INote } from "../types/INote"

interface NoteItemProps {
    note: INote
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
    const { selectedNote, loading } = useAppSelector(state => state.notes)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const setToSelectedNote = (e: Event) => {
        e.preventDefault()

        navigate(urls.APP.DASHBOARD)
        dispatch(setNote(note))
    }

    const handleDeleteNote = async (e: Event) => {
        e.preventDefault()
        dispatch(deleteNote(note._id!))
    }

    return (
        <div
            onClick={(e: any) => setToSelectedNote(e)}
            className={`flex justify-between items-center py-1 px-2 hover:bg-slate-500 dark:hover:bg-blue-700 ${
                selectedNote?._id === note._id && "bg-slate-500 dark:bg-blue-700"
            } rounded-lg transition-all mb-2 cursor-pointer`}
            aria-label="Paris"
        >
            <span className="whitespace-nowrap text-ellipsis overflow-hidden">{note.title}</span>
            <Button
                isLoading={loading}
                icon={<BiTrashAlt size={15} color="#e74c3c" />}
                onClick={(e: any) => handleDeleteNote(e)}
                message="Supprimer"
            />
        </div>
    )
}

export default NoteItem
