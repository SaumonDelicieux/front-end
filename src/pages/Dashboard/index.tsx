import React from "react"

import Navbar from "../../components/Navbar"
import Content from "../../components/Content"

import { useAppSelector } from "../../store"

const Dashboard: React.FC = () => {
    const { selectedNote } = useAppSelector(state => state.notes)

    if (selectedNote) {
        return (
            <>
                <Navbar />
                <div className="flex-1 p-2">
                    <div className="mb-10 text-2xl font-bold">{selectedNote?.title}</div>
                    <Content note={selectedNote} />
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="flex-1 p-2 text-blue-900 dark:text-white">
                <h1>📝 Sélectionner une note</h1>
            </div>
        </>
    )
}

export default Dashboard
