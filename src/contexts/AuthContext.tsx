import React, { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

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

    useEffect(() => {
        const hydrateToken = () => {
            const tokenUser = localStorage.getItem('token')
            if (tokenUser) {
                const { id, firstName, lastName, isPremium }: IUser = jwtDecode(tokenUser)

                setUser({
                    token: tokenUser,
                    id,
                    firstName,
                    lastName,
                    isPremium,
                })
            }
        }

        hydrateToken()
    }, [])

    const context = {
        user,
        setUser,
    }

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContext
