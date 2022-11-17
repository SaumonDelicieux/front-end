import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../../components/Button"
import Input from "../../components/Input"

import { urls } from "../../helpers/urls"

import { IUserRegister } from "../../types/IUserRegister"

import { useAppDispatch, useAppSelector } from "../../store"

import { registerUser } from "../../actions/user"

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
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-center w-90 z-10 p-10 rounded-lg dark:bg-blue-900 bg-slate-300">
                <div className="flex flex-col justify-center items-center mb-5 font-bold text-2xl select-none">
                    <div>
                        <span className="mr-2">Pi'Notes</span>
                        📌
                    </div>
                </div>
                <form className="flex flex-col" onSubmit={handleRegister as any}>
                    <Input
                        label="Email"
                        onChange={e => setUserRegister({ ...userRegister, email: e })}
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
                    <div className="text-red-500 mb-5">{error}</div>
                    <div className="mb-5">
                        <Button
                            isLoading={loading}
                            onClick={(e: any) => handleRegister(e)}
                            title="M'inscrire"
                            className="border rounded-md p-2 bg-slate-100 dark:text-slate-900 mb-5"
                        />
                    </div>

                    <Button
                        onClick={() => navigate(urls.APP.LOGIN)}
                        title="Vous avez déjà un compte ? Connectez-vous"
                    />
                </form>
            </div>
        </div>
    )
}

export default Register
