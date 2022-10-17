import { createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import { IUser } from '../../types/IUser'

import api from '../../helpers/api'
import { urls } from '../../helpers/urls'

export const getAllNotes = createAsyncThunk('notes/getAllNotes', async (token: string) => {
    try {
        const { id }: IUser = jwtDecode(token)

        const { data } = await api.get(urls.API.GET_ALL_NOTES, {
            params: { userId: id },
        })

        return data
    } catch (error) {}
})
