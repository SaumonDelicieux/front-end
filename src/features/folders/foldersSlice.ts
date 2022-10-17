import { createSlice } from '@reduxjs/toolkit'

import { IFoldersState } from '../../types/states/IFoldersState'

import { getAllFolders } from '../../actions/folders'

import type { RootState } from '../../store'

const initialState: IFoldersState = {
    folders: [],
    loading: false,
    error: '',
}

export const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllFolders.pending, state => {
                state.loading = true
                state.error = ''
            })
            .addCase(getAllFolders.fulfilled, (state, { payload }) => {
                state.folders = payload.folders
                state.loading = false
                state.error = ''
            })
    },
})

export const folders = (state: RootState) => state.folders

export default foldersSlice.reducer
