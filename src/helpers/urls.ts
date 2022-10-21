export const urls = {
    APP: {
        LOGIN: "/login",
        REGISTER: "/register",
        FORGOTTEN_PASSWORD: "/forgottenPassword",
        DASHBOARD: "/",
        PROFILE: "/profile",
        SUBSCRIBE: "/subscribe",
    },
    API: {
        LOGIN: "/users/login",
        REGISTER: "/users/register",
        FORGOTTEN_PASSWORD: "/users/sendEmailToResetPassword",
        PROFILE: "/users/profile",
        GET_ALL_FOLDERS: "/folders/getAll",
        GET_ALL_NOTES: "/notes/getAll",
        CREATE_FOLDER: "/folders/createFolder",
        CREATE_NOTE: "/notes/createNote",
        DELETE_FOLDER: "/folders/deleteFolder",
        DELETE_NOTE: "/notes/deleteNote",
        UPDATE_NOTE: "/notes/updateNote",
        UPDATE_FOLDER: "/notes/updateFolder",
    },
}
