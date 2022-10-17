import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { INotesState } from '../../types/states/INotesState'
import { INote } from '../../types/INote'

import type { RootState } from '../../store'

import { getAllNotes } from '../../actions/notes'

const initialState: INotesState = {
    notes: [],
    selectedNote: undefined,
    loading: false,
    error: '',
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNote: (state, action: PayloadAction<string>) => {
            const noteIndex = state.notes?.findIndex((note: INote) => note._id === action.payload)

            state.selectedNote = state.notes?.[noteIndex!]
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAllNotes.pending, state => {
                state.loading = true
                state.error = ''
            })
            .addCase(getAllNotes.fulfilled, (state, { payload }) => {
                state.notes = payload.notes
                state.loading = false
                state.error = ''
            })
    },
})

export const { setNote } = notesSlice.actions

export const notes = (state: RootState) => state.notes

export default notesSlice.reducer
