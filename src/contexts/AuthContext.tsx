import React, { createContext, useState } from 'react'

import { IUser } from '../types/IUser'
import { IAuthContext } from '../types/contexts/IAuthContext'

interface ContextProps {
    children?: any
}

const AuthContext = createContext<IAuthContext>({
    user: {},
    setUser: () => {},
})

export const AuthContextProvider: React.FC<ContextProps> = ({ children }) => {
    const [user, setUser] = useState<IUser>()

    const context = {
        user,
        setUser,
    }

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContext
