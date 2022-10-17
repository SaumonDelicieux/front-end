import { IFolder } from '../IFolder'

export interface IFoldersState {
    folders?: IFolder[]
    loading?: boolean
    error?: string
}
