import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import AsyncSelect from "react-select/async"

import { AiOutlineClose } from "react-icons/ai"
import { TiDelete } from "react-icons/ti"

import { urls } from "../helpers/urls"
import api from "../helpers/api"

import { changeOnShareState } from "../features/notes/notesSlice"

import { useAppSelector, useAppDispatch } from "../store"

const Popup: React.FC = () => {
    const [search, setSearch] = useState("")
    const [usersToSuggest, setUsersToSuggest] = useState<{ value: string; label: string }[]>([])
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [sharedWithList, setSharedWithList] = useState<{ userName: string; userId: string }[]>([])

    const { selectedNote } = useAppSelector(state => state.notes)
    const dispatch = useAppDispatch()

    const promiseOptions = () =>
        new Promise<any[]>(resolve => {
            setTimeout(() => {
                resolve(usersToSuggest)
            }, 100)
        })

    const usersToSend = async (users: any[]) => {
        const usersInInput: string[] = []
        users.forEach((user: any) => {
            usersInInput.push(user.value)
        })
        setSelectedUsers([...usersInInput])
    }

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
                getSharedWithList()
            } catch (err) {
                toast("Une erreur est survenue", { type: "warning" })
            }
        } else {
            toast("Aucun utilisateur n'est séléctionné", { type: "warning" })
        }
    }

    const getSharedWithList = async () => {
        try {
            const { data } = await api.get(urls.API.GET_SHARED_WITH_LIST, {
                params: {
                    noteId: selectedNote?._id,
                },
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            return setSharedWithList(data.usersNames)
        } catch (err) {
            toast("Une erreur est survenue", { type: "warning" })
        }
    }

    const deleteUserFromSharedList = async (userId: string) => {
        try {
            await api.put(
                urls.API.DELETE_FROM_SHARED_WITH_LIST,
                {
                    noteId: selectedNote?._id,
                    userId: userId,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                },
            )
            toast("L'utilisateur a bien été supprimé", { type: "success" })
            getSharedWithList()
        } catch (err) {
            toast("Une erreur est survenue", { type: "warning" })
        }
    }

    useEffect(() => {
        getSharedWithList()
    }, [])

    return (
        <div className="rounded-md bg-slate-400 dark:bg-blue-900 w-6/12 h-3/4 fixed top-40 right-80">
            <AiOutlineClose
                color="#e74c3c"
                size={25}
                className="cursor-pointer absolute right-0 mt-2 mr-2 text-red-500"
                onClick={() => dispatch(changeOnShareState())}
            />
            <div className="flex flex-col items-center justify-start">
                <h1 className="text-xl mb-3 mt-3">Ajouter des participants</h1>
                <AsyncSelect
                    className="w-10/12 text-black"
                    isMulti
                    inputId="my_field"
                    loadOptions={promiseOptions}
                    noOptionsMessage={() => "User not found"}
                    onInputChange={newValue => {
                        setSearch(newValue)
                        getUsersToShare()
                    }}
                    onChange={users => usersToSend(users as any)}
                />
                <div className="flex">
                    <input
                        className="cursor-pointer bg-green-700 p-3 rounded-md mt-3"
                        type="submit"
                        value="Partager"
                        onClick={() => {
                            submitUsers()
                        }}
                    />
                </div>
            </div>
            <h2 className="ml-2">Pariticipants :</h2>
            <div className="w-6/12 h-2/4 fixed overflow-y-scroll">
                {sharedWithList.map((userNames, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between m-3 pb-2 border-solid border-b-2"
                    >
                        <p>{userNames.userName}</p>
                        <TiDelete
                            color="#e74c3c"
                            size={30}
                            className="cursor-pointer"
                            onClick={() => deleteUserFromSharedList(userNames.userId)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Popup
