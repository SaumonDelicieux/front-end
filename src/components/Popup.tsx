import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { urls } from "../helpers/urls"
import api from "../helpers/api"

import { changeOnPublishState } from "../features/notes/notesSlice"

import { useAppSelector, useAppDispatch } from "../store"

const Popup: React.FC = () => {
    const [search, setSearch] = useState("")
    const [usersToSuggest, setUsersToSuggest] = useState<{ id: string; email: string }[]>([])
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    const { selectedNote } = useAppSelector(state => state.notes)
    const dispatch = useAppDispatch()

    const getUsersToShare = async () => {
        if (search.length > 0) {
            try {
                const { data } = await api.get(urls.API.GET_EMAILS_TO_SHARE, {
                    params: {
                        search,
                        noteId: selectedNote?._id,
                    },
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                })
                setUsersToSuggest(data.usersToSuggest)
            } catch (err) {
                toast("Une erreur est survenue", { type: "warning" })
            }
        } else {
            setUsersToSuggest([])
        }
    }

    const selectUser = (id: string) => {
        const index = selectedUsers.indexOf(id)
        if (index > -1) {
            const tempArray = selectedUsers
            for (let i = 0; i < selectedUsers.length; i++) {
                if (tempArray[i] === id) {
                    tempArray.splice(i, 1)
                    setSelectedUsers([...tempArray])
                }
            }
        } else {
            setSelectedUsers(selectedUsers => [...selectedUsers, id])
        }
    }

    const submitUsers = async () => {
        if (selectedUsers.length > 0) {
            try {
                await api.post(
                    urls.API.SHARE_NOTE,
                    {
                        noteId: selectedNote?._id,
                        usersId: selectedUsers,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    },
                )
                toast("Note partagé avec les utilisateurs séléctionnés", { type: "success" })
                setSelectedUsers([...selectedUsers])
            } catch (err) {
                toast("Une erreur est survenue", { type: "warning" })
            }
        } else {
            toast("Aucun utilisateur n'est séléctionné", { type: "warning" })
        }
    }

    useEffect(() => {
        getUsersToShare()
    }, [search, selectedUsers])

    return (
        <div className="flex flex-col items-center justify-start rounded-md bg-slate-400 w-6/12 h-2/5 fixed top-60 right-80">
            <h1 className="text-xl">Ajouter un participant</h1>
            <input
                className="p-1 rounded-md mt-6 w-10/12 h-1/6 text-black focus:outline-none focus:ring focus:border-green-500"
                type="text"
                placeholder="E.g joe"
                onChange={e => setSearch(e.target.value)}
            />
            <div className="flex">
                <input
                    className="cursor-pointer"
                    type="submit"
                    value="Partager"
                    onClick={() => submitUsers()}
                />
                <input
                    className="cursor-pointer"
                    type="submit"
                    value="Annuler"
                    onClick={() => dispatch(changeOnPublishState())}
                />
            </div>
            {usersToSuggest.map((user: any, index: number) => (
                <p
                    key={index}
                    className={`mt-3 cursor-pointer ${
                        selectedUsers.includes(user.id) ? "text-green-600" : ""
                    }`}
                    onClick={() => selectUser(user.id)}
                >
                    {user.email}
                </p>
            ))}
        </div>
    )
}

export default Popup
