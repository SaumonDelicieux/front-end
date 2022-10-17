import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { urls } from '../../helpers/urls'

import { IUserRegister } from '../../types/IUserRegister'

import { useAppDispatch, useAppSelector } from '../../hooks'

import { registerUser } from '../../actions/user'

const Register: React.FC = () => {
    const { error, loading } = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [userRegister, setUserRegister] = useState<IUserRegister>()

    const handleRegister = async (e: Event) => {
        e.preventDefault()
        dispatch(registerUser(userRegister!))
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
                                isLoading={loading}
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
