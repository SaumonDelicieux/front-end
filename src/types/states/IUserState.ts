export interface IUserState {
    id?: string
    email?: string
    firstName?: string
    lastName?: string
    isPremium?: boolean
    phoneNumber?: string
    token?: string
    theme?: "dark" | "light"
    loading?: boolean
    error?: string
}
