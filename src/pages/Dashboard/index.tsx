import React from "react"

import Content from "../../components/Content"

import { useAppSelector } from "../../store"

const Dashboard: React.FC = () => {
    const { selectedNote } = useAppSelector(state => state.notes)

    if (selectedNote) {
        return (
            <div className="flex-1 p-2">
                <div className="mb-10 text-2xl font-bold">{selectedNote?.title}</div>
                <Content text={selectedNote?.text} />
            </div>
        )
    }

    return (
        <div className="flex-1 p-2">
            <h1>📝 Selectionner une note</h1>
        </div>
    )
}

export default Dashboard
