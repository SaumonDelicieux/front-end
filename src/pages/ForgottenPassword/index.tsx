import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"

import Input from "../../components/Input"
import Button from "../../components/Button"

import { urls } from "../../helpers/urls"

import { forgottenPassword } from "../../actions/user"

import { useAppDispatch, useAppSelector } from "../../store"

const ForgottenPassword: React.FC = () => {
    const { error, loading } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [identifer, setIdentifer] = useState("")

    const handleForgottenPassword = async (e: Event) => {
        e.preventDefault()
        dispatch(forgottenPassword(identifer))
    }

    return (
        <div className="w-screen h-screen relative bg-blue-400 dark:bg-slate-900 text-p-2 text-base transition-colors">
            <div>
                <Button icon={<IoIosArrowBack />} onClick={() => navigate(urls.APP.LOGIN)} />
                <div className="mt-20 pt-10">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl select-none">
                            <div>
                                <span className="mr-2 text-slate-200">Mot de passe oublié ?</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-200 my-10">
                                Indiquez votre adresse e-mail ou votre numéro de téléphone pour
                                recevoir un lien de réinitialisation de mot de passe dans votre
                                boîte mail
                            </p>
                        </div>
                        <form onSubmit={handleForgottenPassword as any}>
                            <div className="flex flex-col items-center">
                                <Input
                                    label="Adresse mail ou numéro de téléphone"
                                    onChange={e => setIdentifer(e)}
                                    placeholder="060606606"
                                    size="large"
                                />
                                <Button
                                    isLoading={loading}
                                    onClick={(e: any) => handleForgottenPassword(e)}
                                    title="Envoyer"
                                />
                            </div>

                            <div className="text-red-800 mb-3">{error}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgottenPassword
