import { toast } from 'react-toastify'

import api from '../api'
import { urls } from '../urls'

type CreateFolder = (title: string, userId: string, parentId?: string) => Promise<void>

export const createFolder: CreateFolder = async (title, userId, parentId) => {
    try {
        await api.post(urls.API.CREATE_FOLDER, {
            title,
            parentId,
            userId,
        })
        toast('Dossier créé avec succès !', { type: 'success' })
    } catch (error) {
        toast('Erreur lors de la création du dossier', { type: 'warning' })
    }
}
