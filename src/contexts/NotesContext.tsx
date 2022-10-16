import React, { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

import { IUser } from '../types/IUser'
import { INotesContext } from '../types/contexts/INotesContext'

interface ContextProps {
    children?: any
}

const NotesContext = createContext<INotesContext>({
    user: {},
    setUser: () => {},
})

export const NotesContextProvider: React.FC<ContextProps> = ({ children }) => {
    const [user, setUser] = useState<IUser>()

    return <NotesContext.Provider value={context}>{children}</NotesContext.Provider>
}

export default NotesContext
