export interface IFolder {
    _id: string
    parentId?: string
    creationDate: Date
    lastUpdateDate: Date
    title: string
    userId: string
}
