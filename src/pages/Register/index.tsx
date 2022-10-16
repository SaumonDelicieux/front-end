import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import AuthContext from '../../contexts/AuthContext'

import { urls } from '../../helpers/urls'
import api from '../../helpers/api'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { IUserRegister } from '../../types/IUserRegister'
import { IUser } from '../../types/IUser'

const Register: React.FC = () => {
    const { setUser } = useContext(AuthContext)

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [userRegister, setUserRegister] = useState<IUserRegister>()

    const handleRegister = async (e: Event) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const { data } = await api.post(urls.API.REGISTER, {
                identifer: userRegister?.identifer,
                password: userRegister?.password,
                confirmPassword: userRegister?.confirmPassword,
            })
            setIsLoading(false)

            const { id, firstName, lastName, isPremium }: IUser = jwtDecode(data.token)
            localStorage.setItem('token', data.token)

            setUser({
                id,
                token: data.token,
                firstName,
                lastName,
                isPremium,
            })
        } catch (error) {
            console.log(error)
            setError('Erreur de connexion')
            setIsLoading(false)
        }

        setIsLoading(true)
    }

    return (
        <div className="relative w-screen h-full bg-slate-900 text-p-2 text-base transition-colors">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <div className="p-10 text-center z-10 bg-blue-900 rounded-lg text-slate-200">
                    <div className="flex flex-col justify-center items-center mb-5 font-bold text-2xl select-none">
                        <div>
                            <span className="mr-2">Pi'Notes</span>
                            📌
                        </div>
                    </div>
                    <form className="flex flex-col" onSubmit={handleRegister as any}>
                        <Input
                            label="Identifiant"
                            onChange={e => setUserRegister({ ...userRegister, identifer: e })}
                            size="large"
                            className="mb-4"
                        />
                        <Input
                            label="Mot de passe"
                            type="password"
                            onChange={e => setUserRegister({ ...userRegister, password: e })}
                            size="large"
                            className="mb-4"
                        />
                        <Input
                            label="Confirmation de votre mot de passe"
                            type="password"
                            onChange={e => setUserRegister({ ...userRegister, confirmPassword: e })}
                            size="large"
                            className="mb-4"
                        />
                        <div className="text-red-800 mb-5">{error}</div>
                        <div className="mb-5">
                            <Button
                                isLoading={isLoading}
                                onClick={(e: any) => handleRegister(e)}
                                title="M'inscrire"
                            />
                        </div>

                        <Button
                            onClick={() => navigate(urls.APP.LOGIN)}
                            title="Vous avez déjà un compte ? Connectez-vous"
                            noBg
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
