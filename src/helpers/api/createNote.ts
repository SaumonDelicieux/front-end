import { toast } from 'react-toastify'

import api from '../api'
import { urls } from '../urls'

type CreateNote = (title: string, folderId: string, userId: string, text: string) => Promise<void>

export const createNote: CreateNote = async (title, folderId, userId, text) => {
    try {
        await api.post(urls.API.CREATE_NOTES, {
            title,
            folderId,
            userId,
            text,
        })
        toast('Note créé avec succès !', { type: 'success' })
    } catch (error) {
        toast('Erreur lors de la création de la note', { type: 'warning' })
    }
}
