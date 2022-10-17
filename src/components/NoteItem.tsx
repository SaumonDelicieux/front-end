import React from 'react'

import { setNote } from '../features/notes/notesSlice'

import { useAppDispatch, useAppSelector } from '../hooks'

interface NoteItemProps {
    title?: string
    noteId?: string
}

const NoteItem: React.FC<NoteItemProps> = ({ title, noteId }) => {
    const { selectedNote } = useAppSelector(state => state.notes)
    const dispatch = useAppDispatch()

    const setToSelectedNote = (e: Event) => {
        e.preventDefault()
        dispatch(setNote(noteId!))
    }

    return (
        <div
            onClick={(e: any) => setToSelectedNote(e)}
            className={`block py-1 px-2 hover:bg-blue-700 ${
                selectedNote?._id === noteId && 'bg-blue-700'
            } rounded-lg transition-all mb-2 cursor-pointer`}
            aria-label="Paris"
        >
            <span>{title}</span>
        </div>
    )
}

export default NoteItem
