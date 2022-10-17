import { INote } from '../INote'

export interface INotesState {
    notes?: INote[]
    selectedNote?: INote
    loading?: boolean
    error?: string
}
