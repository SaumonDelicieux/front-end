import React from 'react'
import { BiTrashAlt } from 'react-icons/bi'

import { deleteNote } from '../actions/notes'

import { setNote } from '../features/notes/notesSlice'

import { useAppDispatch, useAppSelector } from '../hooks'

import Button from './Button'

interface NoteItemProps {
    title?: string
    noteId?: string
}

const NoteItem: React.FC<NoteItemProps> = ({ title, noteId }) => {
    const { selectedNote, loading } = useAppSelector(state => state.notes)
    const dispatch = useAppDispatch()

    const setToSelectedNote = (e: Event) => {
        e.preventDefault()
        dispatch(setNote(noteId!))
    }

    const handleDeleteNote = async (e: Event) => {
        e.preventDefault()
        dispatch(deleteNote(noteId!))
    }

    return (
        <div
            onClick={(e: any) => setToSelectedNote(e)}
            className={`flex justify-between py-1 px-2 hover:bg-blue-700 ${
                selectedNote?._id === noteId && 'bg-blue-700'
            } rounded-lg transition-all mb-2 cursor-pointer`}
            aria-label="Paris"
        >
            <span>{title}</span>
            <Button
                isLoading={loading}
                icon={<BiTrashAlt size={15} color="#e74c3c" />}
                onClick={(e: any) => handleDeleteNote(e)}
                noBg
            />
        </div>
    )
}

export default NoteItem
