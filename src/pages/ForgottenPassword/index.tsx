import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Input from '../../components/Input'
import Button from '../../components/Button'

import api from '../../helpers/api'
import { urls } from '../../helpers/urls'

const ForgottenPassword: React.FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [identifer, setIdentifer] = useState('')

    const handleForgottenPassword = async (e: Event) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const { data } = await api.post(urls.API.FORGOTTEN_PASSWORD, {
                identifer,
            })
            setIsLoading(false)
            toast('Un mail a été envoyé à l adresse mail', {
                type: 'success',
            })
            navigate(urls.APP.LOGIN)
        } catch (error) {
            console.log(error)
            setError('Erreur de mail')
            setIsLoading(false)
        }
    }

    return (
        <div className="w-screen h-screen relative bg-slate-900 text-p-2 text-base transition-colors">
            <div className="w-full h-full flex flex-col items-center justify-center ">
                <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl select-none">
                    <div>
                        <span className="mr-2 text-slate-200">Mot de passe oublié ?</span>
                    </div>
                </div>
                <div>
                    <p className="text-slate-200 mb-20 mt-10">
                        Indiquez votre adresse e-mail pour recevoir un message permettant d'obtenir
                        votre mot de passe
                    </p>
                </div>
                <form className="flex flex-col" onSubmit={handleForgottenPassword as any}>
                    <div className="flex flex-nowrap">
                        <div className="mr-10">
                            <Input
                                onChange={e => setIdentifer(e)}
                                placeholder="john.doe@pinotes.com"
                                size="large"
                            />
                        </div>
                        <div>
                            <Button
                                isLoading={isLoading}
                                onClick={(e: any) => handleForgottenPassword(e)}
                                title="Envoyer"
                            />
                        </div>
                    </div>

                    <div className="text-red-800 mb-3">{error}</div>
                </form>
            </div>
        </div>
    )
}

export default ForgottenPassword
