import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { CategoryDisplay, INotesState } from "../../types/states/INotesState"
import { INote } from "../../types/INote"

import type { RootState } from "../../store"

import { createNote, deleteNote, getAllNotes } from "../../actions/notes"

const initialState: INotesState = {
    notes: [],
    selectedNote: undefined,
    categoryDisplay: "public",
    notesDisplay: [],
    loading: false,
    error: "",
}

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNote: (state, action: PayloadAction<string>) => {
            const noteIndex = state.notes?.findIndex((note: INote) => note._id === action.payload)

            state.selectedNote = state.notes?.[noteIndex!]
        },
        setCategoryDisplay: (state, action: PayloadAction<CategoryDisplay>) => {
            state.categoryDisplay = action.payload
            state.notesDisplay = state.notes?.filter((note: INote) => note.state === action.payload)
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAllNotes.pending, state => {
                state.loading = true
                state.error = ""
            })
            .addCase(getAllNotes.fulfilled, (state, { payload }) => {
                state.notes = payload.notes
                state.loading = false
                state.error = ""
            })
            .addCase(createNote.pending, state => {
                state.loading = true
                state.error = ""
            })
            .addCase(createNote.fulfilled, (state, { payload }) => {
                state.notes = state.notes?.concat(payload.note)
                state.loading = false
                state.error = ""
            })
            .addCase(deleteNote.pending, state => {
                state.loading = true
                state.error = ""
            })
            .addCase(deleteNote.fulfilled, (state, { payload }) => {
                if (state.selectedNote?._id === payload.noteId) {
                    state.selectedNote = undefined
                }
                state.notes = state.notes?.filter((note: INote) => note._id != payload.noteId)
                state.loading = false
                state.error = ""
            })
    },
})

export const { setNote, setCategoryDisplay } = notesSlice.actions

export const notes = (state: RootState) => state.notes

export default notesSlice.reducer
