import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { urls } from '../../helpers/urls'
import Button from '../../components/Button'
import Input from '../../components/Input'

import { IUserLogin } from '../../types/IUserLogin'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [userLogin, setUserLogin] = useState<IUserLogin>({
        username: '',
        password: '',
    })

    const handleLogin = async (e: Event) => {
        e.preventDefault()

        setIsLoading(true)
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
                            onChange={e => setUserLogin({ ...userLogin, username: e })}
                            size="large"
                        />
                        <Input
                            label="Mot de passe"
                            type="password"
                            onChange={e => setUserLogin({ ...userLogin, password: e })}
                            size="large"
                        />

                        <div className="text-red-800 mb-5">{error}</div>
                        <Button
                            isLoading={isLoading}
                            onClick={(e: any) => handleLogin(e)}
                            title="Se connecter"
                        />
                        <Button
                            onClick={() => navigate(urls.FORGETPASSWORD)}
                            title="Mot de passe oublié ?"
                            isLink
                        />
                        <Button
                            isLoading={isLoading}
                            onClick={() => navigate(urls.REGISTER)}
                            title="Pas de compte ? Inscrivez vous"
                            isLink={true}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
