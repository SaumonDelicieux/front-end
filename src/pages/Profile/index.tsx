import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillCaretLeft } from 'react-icons/ai'

import Input from '../../components/Input'
import Button from '../../components/Button'

import api from '../../helpers/api'
import { urls } from '../../helpers/urls'

import AuthContext, { AuthContextProvider } from '../../contexts/AuthContext'

const Profil: React.FC = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { user, setUser } = useContext(AuthContext)

    const handleProfil = async (e: Event) => {
        e.preventDefault()
        try {
            const { data } = await api.put(
                urls.API.PROFILE,
                {
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                },
                {
                    headers: { Authorization: user?.token },
                },
            )
            setUser({
                ...user,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
            })
        } catch (error) {
            console.log(error)
            setError('Erreur')
        }
    }

    return (
        <div className="w-screen h-screen relative bg-slate-900 text-p-2 text-base transition-colors">
            <div>
                <span className="pl-5 pt-5">
                    <AiFillCaretLeft color="white" />
                </span>
                <div>
                    <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl select-none">
                        <div className="mt-10 mb-10">
                            <span className="mr-2 text-slate-200">Profil</span>
                        </div>
                        <Button
                            title={
                                (user && user.isPremium
                                    ? 'Abonnement : Premium'
                                    : 'Abonnement : Gratuit') || ''
                            }
                            onClick={() => {
                                navigate(urls.APP.ABONNEMENT)
                            }}
                            noBg
                        />
                    </div>
                    <form className="flex flex-col" onSubmit={handleProfil as any}>
                        <div className="flex ... justify-center items-center">
                            <div className="flex-none ... ml-20 mr-20">
                                <Input
                                    label="Prénom"
                                    value={(user && user.firstName) || ''}
                                    onChange={e => setUser({ ...user, firstName: e })}
                                    size="large"
                                />
                            </div>
                            <div className="flex-none ... ml-20 mr-20">
                                <Input
                                    label="Nom"
                                    value={(user && user.lastName) || ''}
                                    onChange={e => setUser({ ...user, lastName: e })}
                                    size="large"
                                />
                            </div>
                        </div>
                        <div className="flex ... justify-center items-center">
                            <div className="flex-none ... ml-20 mr-20">
                                <Input
                                    label="Email"
                                    value={(user && user.email) || ''}
                                    onChange={e => setUser({ ...user, email: e })}
                                    size="large"
                                />
                            </div>
                            <div className="flex-none ... ml-20 mr-20">
                                <Input
                                    label="Numéro de téléphone"
                                    value={(user && user.phoneNumber) || ''}
                                    onChange={e => setUser({ ...user, phoneNumber: e })}
                                    size="large"
                                />
                            </div>
                        </div>
                        <div className="text-red-800 mb-3">{error}</div>
                        <div className="flex ... justify-center items-center mt-10">
                            <Button title="Mettre à jour" onClick={() => {}} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profil
