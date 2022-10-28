export interface INote {
    _id?: string
    folderId?: string
    userId?: string
    title?: string
    text?: string
    state?: "public" | "archived" | "junk"
    creationDate?: Date
    lastUpdateDate?: Date
}
