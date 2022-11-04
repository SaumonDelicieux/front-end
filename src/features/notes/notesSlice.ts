import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { CategoryDisplay, INotesState } from "../../types/states/INotesState"
import { INote } from "../../types/INote"

import type { RootState } from "../../store"

import { createNote, deleteNote, getAllNotes, updateNote } from "../../actions/notes"

const initialState: INotesState = {
    notes: [],
    selectedNote: undefined,
    categoryDisplay: "junk",
    notesDisplay: [],
    loading: false,
    error: "",
}

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNote: (state, action: PayloadAction<INote>) => {
            const noteIndex = state.notes?.findIndex(
                (note: INote) => note._id === action.payload._id,
            )

            state.selectedNote = state.notes?.[noteIndex!]
            state.categoryDisplay = state.selectedNote?.state
            state.notesDisplay = state.notes?.filter(
                (note: INote) => note.state === action.payload.state,
            )
        },
        unselectNote: state => {
            state.selectedNote = undefined
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
                state.notesDisplay = state.notes?.filter(
                    (note: INote) => note.state === state.categoryDisplay,
                )
                state.loading = false
                state.error = ""
            })
            .addCase(getAllNotes.rejected, state => {
                state.loading = false
                state.error = ""
            })
            .addCase(createNote.pending, state => {
                state.loading = true
                state.error = ""
            })
            .addCase(createNote.fulfilled, (state, { payload }) => {
                state.categoryDisplay = "junk"
                state.notes = state.notes?.concat(payload.note)
                state.notesDisplay = state.notes?.filter(
                    (note: INote) => note.state === state.categoryDisplay,
                )
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
                state.notesDisplay = state.notes?.filter(
                    (note: INote) => note.state === state.categoryDisplay,
                )
                state.loading = false
                state.error = ""
            })
            .addCase(deleteNote.rejected, state => {
                state.loading = false
                state.error = ""
            })
            .addCase(updateNote.pending, state => {
                state.loading = true
                state.error = ""
            })
            .addCase(updateNote.fulfilled, (state, { payload }) => {
                state.notes = state.notes?.filter((note: INote) => note._id != payload._id)
                state.notes?.push(payload)

                state.categoryDisplay = payload.state
                state.notesDisplay = state.notes?.filter(
                    (note: INote) => note.state === state.categoryDisplay,
                )
                state.selectedNote = payload
                state.loading = false
                state.error = ""
            })
            .addCase(updateNote.rejected, state => {
                state.loading = false
                state.error = ""
            })
    },
})

export const { setNote, setCategoryDisplay, unselectNote } = notesSlice.actions

export const notes = (state: RootState) => state.notes

export default notesSlice.reducer
