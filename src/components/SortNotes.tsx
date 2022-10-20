import React from "react"

import { setCategoryDisplay } from "../features/notes/notesSlice"

import { useAppDispatch, useAppSelector } from "../hooks"

const SortNotes: React.FC = () => {
    const JUNK = "junk"
    const PUBLIC = "public"
    const ARCHIVED = "archived"

    const dispatch = useAppDispatch()
    const { categoryDisplay } = useAppSelector(state => state.notes)

    return (
        <div className="flex justify-between mb-5 text-center rounded-md select-none">
            <div
                className={`flex-1 p-1 cursor-pointer hover:bg-blue-600 ${
                    categoryDisplay === JUNK && "bg-blue-600 rounded-l-md"
                }`}
                onClick={() => dispatch(setCategoryDisplay(JUNK))}
            >
                Brouillon
            </div>
            <div
                className={`flex-1 p-1 cursor-pointer hover:bg-blue-600 ${
                    categoryDisplay === PUBLIC && "bg-blue-600"
                }`}
                onClick={() => dispatch(setCategoryDisplay(PUBLIC))}
            >
                Publié
            </div>
            <div
                className={`flex-1 p-1 cursor-pointer hover:bg-blue-600 ${
                    categoryDisplay === ARCHIVED && "bg-blue-600 rounded-r-md"
                }`}
                onClick={() => dispatch(setCategoryDisplay(ARCHIVED))}
            >
                Archivé
            </div>
        </div>
    )
}

export default SortNotes
