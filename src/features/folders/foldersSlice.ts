import { createSlice } from '@reduxjs/toolkit'

import { IFoldersState } from '../../types/states/IFoldersState'

import { createFolder, deleteFolder, getAllFolders } from '../../actions/folders'

import type { RootState } from '../../store'
import { IFolder } from 'src/types/IFolder'

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
            .addCase(createFolder.pending, state => {
                state.loading = true
                state.error = ''
            })
            .addCase(createFolder.fulfilled, (state, { payload }) => {
                state.folders = state.folders?.concat(payload.folder)
                state.loading = false
                state.error = ''
            })
            .addCase(deleteFolder.pending, state => {
                state.loading = true
                state.error = ''
            })
            .addCase(deleteFolder.fulfilled, (state, { payload }) => {
                state.folders = state.folders?.filter(
                    (folder: IFolder) => folder._id != payload.folderId,
                )
                state.loading = false
                state.error = ''
            })
    },
})

export const folders = (state: RootState) => state.folders

export default foldersSlice.reducer
