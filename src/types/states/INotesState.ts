import { INote } from "../INote"

export type CategoryDisplay = "public" | "archived" | "junk"

export interface INotesState {
    notes?: INote[]
    selectedNote?: INote
    notesDisplay?: INote[]
    categoryDisplay?: CategoryDisplay
    loading?: boolean
    error?: string
    clickedOnShare?: boolean
    sharedNotes: INote[]
}
