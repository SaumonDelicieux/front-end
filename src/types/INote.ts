export interface INote {
    _id?: string
    folderId?: string
    userId?: string
    title?: string
    text?: string
    state?: "published" | "archived" | "junked"
    creationDate?: Date
    lastUpdateDate?: Date
}
