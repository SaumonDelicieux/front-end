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
        <div className="w-screen h-screen relative bg-slate-900 text-p-2 text-base transition-colors">
            <div className="w-full h-full flex flex-col items-center justify-center ">
                <div className="text-center w-80 z-10 bg-blue-900 p-10 rounded-lg text-slate-200">
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
                        />

                        <div className="mt-4">
                            <Button
                                onClick={() => navigate(urls.APP.FORGOTTEN_PASSWORD)}
                                title="Mot de passe oublié ?"
                                noBg
                            />
                            <Button
                                onClick={() => navigate(urls.APP.REGISTER)}
                                title="Pas de compte ? Inscrivez vous"
                                noBg
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
