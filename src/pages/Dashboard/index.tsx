import React from "react"
import ReactLoading from "react-loading"

import Navbar from "../../components/Navbar"
import Content from "../../components/Content"
import NoteCard from "../../components/NoteCard"

import { INote } from "../../types/INote"

import { useAppSelector } from "../../store"

const Dashboard: React.FC = () => {
    const { selectedNote, notes } = useAppSelector(state => state.notes)

    if (selectedNote) {
        return (
            <>
                <Navbar />
                <div className="flex-1 flex flex-col p-2 overflow-y-auto">
                    <div className="mb-10 text-2xl font-bold">{selectedNote?.title}</div>
                    <Content note={selectedNote} />
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="flex-1 flex flex-col p-2 overflow-y-auto">
                <div className="mb-8">
                    <div className="text-xl font-bold mb-4">Brouillon</div>
                    <div className="flex flex-wrap gap-3">
                        {notes?.length !== undefined ? (
                            notes.map((note: INote) => {
                                if (note.state === "junk") {
                                    return <NoteCard note={note} key={note._id} />
                                } else {
                                    return
                                }
                            })
                        ) : (
                            <ReactLoading type="spin" color="red" width={50} />
                        )}
                    </div>
                </div>
                <div className="mb-8">
                    <div className="text-xl font-bold mb-4">Publié</div>
                    <div className="flex flex-wrap gap-3">
                        {notes?.length !== undefined ? (
                            notes.map((note: INote) => {
                                if (note.state === "public") {
                                    return <NoteCard note={note} key={note._id} />
                                } else {
                                    return
                                }
                            })
                        ) : (
                            <ReactLoading type="spin" color="red" width={50} />
                        )}
                    </div>
                </div>
                <div>
                    <div className="text-xl font-bold mb-4">Archivé</div>
                    <div className="flex flex-wrap gap-3">
                        {notes?.length !== undefined ? (
                            notes.map((note: INote) => {
                                if (note.state === "archived") {
                                    return <NoteCard note={note} key={note._id} />
                                } else {
                                    return
                                }
                            })
                        ) : (
                            <ReactLoading type="spin" color="red" width={50} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
