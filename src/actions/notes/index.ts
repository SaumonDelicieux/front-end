import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import jwtDecode from "jwt-decode"

import { IUser } from "../../types/IUser"
import { CategoryDisplay } from "../../types/states/INotesState"

import api from "../../helpers/api"
import { urls } from "../../helpers/urls"

interface CreateNote {
    title: string
    folderId: string
    userId: string
    context: CategoryDisplay
}

export const createNote = createAsyncThunk(
    "notes/createNote",
    async ({ title, folderId, userId, context }: CreateNote) => {
        try {
            const { data } = await api.post(urls.API.CREATE_NOTE, {
                title,
                folderId,
                userId,
                state: context,
            })
            toast("Note créé avec succès !", { type: "success" })

            return data
        } catch (error) {
            toast("Erreur lors de la création de la note", { type: "warning" })
        }
    },
)

export const getAllNotes = createAsyncThunk("notes/getAllNotes", async (token: string) => {
    try {
        const { id }: IUser = jwtDecode(token)

        const { data } = await api.get(urls.API.GET_ALL_NOTES, {
            params: { userId: id },
        })

        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteNote = createAsyncThunk("notes/deleteNote", async (noteId: string) => {
    try {
        const { data } = await api.delete(urls.API.DELETE_NOTE, {
            params: { noteId },
        })

        return data
    } catch (error) {
        console.log(error)
    }
})
