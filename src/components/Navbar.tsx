import React, { useState } from "react"

import { IFolder } from "../types/IFolder"

import Header from "./Header"
import SortNotes from "./SortNotes"
import FolderItem from "./FolderItem"
import CreateInput from "./CreateInput"
import ProfileCard from "./ProfileCard"

import { useAppSelector } from "../hooks"

const Navbar: React.FC = () => {
    const { id, isPremium } = useAppSelector(state => state.user)
    const { folders } = useAppSelector(state => state.folders)
    const { notesDisplay } = useAppSelector(state => state.notes)

    const [isNewFolder, setIsNewFolder] = useState(false)

    return (
        <nav className="p-2 w-80 h-full flex flex-col justify-between bg-blue-900">
            <Header isPremium={isPremium} displayNewFolder={setIsNewFolder} />
            <SortNotes />
            <div className="flex flex-col flex-1">
                <div className="text-slate-50">
                    <div className="flex flex-col">
                        {folders?.map((folder: IFolder) => {
                            if (!folder.parentId) {
                                return (
                                    <FolderItem
                                        title={folder.title}
                                        folders={folders}
                                        folderId={folder._id}
                                        key={folder._id}
                                        notes={notesDisplay}
                                    />
                                )
                            } else {
                                return
                            }
                        })}
                    </div>
                </div>
                <CreateInput
                    isNewFolder={isNewFolder}
                    setIsNewFolder={setIsNewFolder}
                    userId={id}
                />
            </div>
            <ProfileCard />
        </nav>
    )
}

export default Navbar
