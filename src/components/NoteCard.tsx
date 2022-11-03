import React, { useState } from "react"

import { setNote } from "../features/notes/notesSlice"

import { INote } from "../types/INote"

import { useAppDispatch } from "../store"

import noteBg from "../assets/images/bg_note_card.webp"

interface NoteCardProps {
    note: INote
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    const dispatch = useAppDispatch()

    const [isShowed, setIsShowed] = useState(false)

    return (
        <div
            className="relative w-48 h-32 rounded-lg cursor-pointer text-slate-50"
            onMouseEnter={() => setIsShowed(true)}
            onMouseLeave={() => setIsShowed(false)}
            onClick={() => dispatch(setNote(note!))}
        >
            <img src={noteBg} className="w-full h-full rounded-lg" />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 rounded-lg"></div>
            <div
                className={`content-note-card ${
                    isShowed && "show-all-content"
                } flex flex-col h-full`}
            >
                <div className="mb-2 font-bold">{note.title}</div>
                <p className={`text-sm ${isShowed && "show-content"}`}>{note.text}</p>
            </div>
        </div>
    )
}

export default NoteCard
