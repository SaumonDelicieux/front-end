import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../../components/Button"
import Input from "../../components/Input"

import { urls } from "../../helpers/urls"

import { IUserLogin } from "../../types/IUserLogin"

import { useAppDispatch, useAppSelector } from "../../store"

import { loginUser } from "../../actions/user"

const Login: React.FC = () => {
    const { error, loading } = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [userLogin, setUserLogin] = useState<IUserLogin>()

    const handleLogin = (e: Event) => {
        e.preventDefault()
        dispatch(loginUser(userLogin!))
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-center z-10 p-10 rounded-lg dark:bg-blue-900 bg-slate-300">
                <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl select-none">
                    <div>
                        <span className="mr-2">Pi'Notes</span>
                        📌
                    </div>
                </div>
                <form className="flex flex-col" onSubmit={handleLogin as any}>
                    <Input
                        label="Identifiant"
                        onChange={e => setUserLogin({ ...userLogin, identifer: e })}
                        placeholder="john.doe@pinotes.com"
                        size="large"
                        className="mb-5"
                    />
                    <Input
                        label="Mot de passe"
                        type="password"
                        onChange={e => setUserLogin({ ...userLogin, password: e })}
                        placeholder="**********"
                        size="large"
                        className="mb-5"
                    />

                    <div className="text-red-600 mb-3">{error}</div>

                    <Button
                        isLoading={loading}
                        onClick={(e: any) => handleLogin(e)}
                        title="Se connecter"
                        className="border rounded-md p-2 bg-slate-100 dark:text-slate-900 mb-5"
                    />

                    <div className="mt-4">
                        <Button
                            onClick={() => navigate(urls.APP.FORGOTTEN_PASSWORD)}
                            title="Mot de passe oublié ?"
                            className="mb-2"
                        />
                        <Button
                            onClick={() => navigate(urls.APP.REGISTER)}
                            title="Pas de compte ? Inscrivez vous"
                            className="mb-2"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
