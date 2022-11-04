import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import user from "./features/user/userSlice"
import folders from "./features/folders/foldersSlice"
import notes from "./features/notes/notesSlice"

const store = configureStore({
    reducer: {
        user,
        folders,
        notes,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
