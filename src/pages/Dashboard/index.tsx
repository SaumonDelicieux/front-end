import React, { useState } from "react"
import TextArea from "../../components/TextArea"
import { useAppSelector } from "../../hooks"

const Dashboard: React.FC = () => {
    const { selectedNote } = useAppSelector(state => state.notes)
    return (
        <div className="flex-1 p-2">
            <div className="mb-10 text-2xl font-bold">{selectedNote?.title}</div>
            <TextArea />
        </div>
    )
}

export default Dashboard
