import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { urls } from '../../helpers/urls'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { IUserRegister } from '../../types/IUserRegister'

const Register: React.FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [userRegister, setUserRegister] = useState<IUserRegister>({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const handleRegister = async (e: Event) => {
        e.preventDefault()

        setIsLoading(true)
    }

    return (
        <div className="w-screen h-100 relative bg-slate-900 text-p-2 text-base transition-colors">
            <div className="w-90 h-90 flex flex-col items-center justify-center">
                <div className="text-center w-150 h-50 z-10 bg-blue-900 p-10 rounded-lg text-slate-200">
                    <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl select-none">
                        <div>
                            <span className="mr-2">Pi'Notes</span>
                            📌
                        </div>
                    </div>
                    <form className="flex flex-col" onSubmit={handleRegister as any}>
                        <Input
                            label="Identifiant"
                            onChange={e => setUserRegister({ ...userRegister, username: e })}
                            size="large"
                        />
                        <Input
                            label="Mot de passe"
                            type="password"
                            onChange={e => setUserRegister({ ...userRegister, password: e })}
                            size="large"
                        />
                        <Input
                            label="Confirmation de votre mot de passe"
                            type="password"
                            onChange={e => setUserRegister({ ...userRegister, confirmPassword: e })}
                            size="large"
                        />
                        <div className="text-red-800 mb-5">{error}</div>
                        <Button
                            isLoading={isLoading}
                            onClick={(e: any) => handleRegister(e)}
                            title="M'inscrire"
                        />

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
