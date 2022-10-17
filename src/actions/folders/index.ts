import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'

import { IUser } from '../../types/IUser'

import api from '../../helpers/api'
import { urls } from '../../helpers/urls'

interface CreateFolder {
    title: string
    userId: string
    parentId?: string
}

export const getAllFolders = createAsyncThunk('folders/getAllFolders', async (token: string) => {
    try {
        const { id }: IUser = jwtDecode(token)

        const { data } = await api.get(urls.API.GET_ALL_FOLDERS, {
            params: { userId: id },
        })

        return data
    } catch (error) {}
})

export const createFolder = createAsyncThunk(
    'folders/createFolder',
    async ({ title, userId, parentId }: CreateFolder) => {
        try {
            const { data } = await api.post(urls.API.CREATE_FOLDER, {
                title,
                parentId,
                userId,
            })
            toast('Dossier créé avec succès !', { type: 'success' })

            return data
        } catch (error) {
            toast('Erreur lors de la création du dossier', { type: 'warning' })
        }
    },
)

export const deleteFolder = createAsyncThunk('folders/deleteFolder', async (folderId: string) => {
    try {
        const { data } = await api.delete(urls.API.DELETE_FOLDER, {
            params: { folderId },
        })
        toast('Dossier supprimé avec succès !', { type: 'success' })

        return data
    } catch (error) {
        toast('Erreur lors de la suppression du dossier', { type: 'warning' })
    }
})
