import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import AuthContext from '../../contexts/AuthContext'

import Button from '../../components/Button'
import Input from '../../components/Input'

import api from '../../helpers/api'
import { urls } from '../../helpers/urls'

import { IUserLogin } from '../../types/IUserLogin'
import { IUser } from '../../types/IUser'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [userLogin, setUserLogin] = useState<IUserLogin>({
        identifer: '',
        password: '',
    })

    const handleLogin = async (e: Event) => {
        e.preventDefault()

        console.log(userLogin)
        try {
            setIsLoading(true)
            const { data } = await api.post(urls.API.LOGIN, {
                identifer: userLogin.identifer,
                password: userLogin.password,
            })
            setIsLoading(false)

            const { firstName, lastName, isPremium }: IUser = jwtDecode(data.token)
            localStorage.setItem('token', data.token)

            setUser({
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
    }

    return (
        <div className="w-screen h-screen relative bg-slate-200 text-p-2 text-base transition-colors">
            <div className="w-full h-full flex flex-col items-center justify-center ">
                <div className="text-center w-80 z-10 bg-blue-900 py-2">
                    <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl text-slate-800 select-none">
                        <div>
                            <span className="text-green-700 mr-2">Pi'Notes</span>
                            📌
                        </div>
                    </div>
                    <form className="flex flex-col" onSubmit={handleLogin as any}>
                        <Input
                            label="Identifiant"
                            onChange={e => setUserLogin({ ...userLogin, identifer: e })}
                            placeholder="john.doe@pinotes.com"
                            size="large"
                        />
                        <Input
                            label="Mot de passe"
                            type="password"
                            onChange={e => setUserLogin({ ...userLogin, password: e })}
                            placeholder="**********"
                            size="large"
                        />

                        <div className="text-red-800 mb-5">{error}</div>
                        <Button
                            isLoading={isLoading}
                            onClick={(e: any) => handleLogin(e)}
                            title="Se connecter"
                        />
                        <Button
                            onClick={() => navigate(urls.APP.FORGETPASSWORD)}
                            title="Mot de passe oublié ?"
                            noBg
                        />
                        <Button
                            isLoading={isLoading}
                            onClick={() => navigate(urls.APP.REGISTER)}
                            title="Pas de compte ? Inscrivez vous"
                            noBg
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
