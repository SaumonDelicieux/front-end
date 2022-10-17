import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiFillCaretLeft } from "react-icons/ai"

import Input from "../../components/Input"
import Button from "../../components/Button"

import { urls } from "../../helpers/urls"

import { useAppDispatch, useAppSelector } from "../../hooks"

import { IUser } from "../../types/IUser"

import { updateUser } from "../../actions/user"

const Profil: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { firstName, lastName, email, isPremium, phoneNumber, error, loading } = useAppSelector(
        state => state.user,
    )

    const [updatedUser, setUpdatedUser] = useState<IUser>({
        firstName,
        lastName,
        email,
        isPremium,
        phoneNumber,
    })

    const handleProfile = async (e: Event) => {
        e.preventDefault()
        dispatch(updateUser(updatedUser))
    }

    return (
        <div className="w-screen h-screen relative bg-slate-900 text-p-2 text-base transition-colors">
            <div>
                <div className="pl-14 pt-14">
                    <Button
                        icon={<AiFillCaretLeft color="white" size={20} />}
                        onClick={() => !isPremium && navigate(urls.APP.DASHBOARD)}
                        noBg
                    />
                </div>
                <div>
                    <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl select-none">
                        <div className="mt-10 mb-10">
                            <span className="mr-2 text-slate-200">Profil</span>
                        </div>
                        <Button
                            title={`Abonnement : ${isPremium ? "Premium" : "Gratuit"}`}
                            onClick={() => !isPremium && navigate(urls.APP.SUBSCRIBE)}
                            noBg
                        />
                    </div>
                    <form className="flex flex-col" onSubmit={handleProfile as any}>
                        <div className="flex justify-center items-center">
                            <div className="flex-none ml-20 mr-20">
                                <Input
                                    label="Prénom"
                                    value={updatedUser.firstName}
                                    onChange={e => setUpdatedUser({ ...updatedUser, firstName: e })}
                                    size="large"
                                    className="mb-5"
                                />
                            </div>
                            <div className="flex-none ml-20 mr-20">
                                <Input
                                    label="Nom"
                                    value={updatedUser.lastName}
                                    onChange={e => setUpdatedUser({ ...updatedUser, lastName: e })}
                                    size="large"
                                    className="mb-5"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="flex-none ml-20 mr-20">
                                <Input
                                    label="Email"
                                    value={updatedUser.email}
                                    onChange={e => setUpdatedUser({ ...updatedUser, email: e })}
                                    size="large"
                                    className="mb-5"
                                />
                            </div>
                            <div className="flex-none ml-20 mr-20">
                                <Input
                                    label="Numéro de téléphone"
                                    value={updatedUser.phoneNumber}
                                    onChange={e =>
                                        setUpdatedUser({ ...updatedUser, phoneNumber: e })
                                    }
                                    size="large"
                                    className="mb-5"
                                />
                            </div>
                        </div>
                        <div className="text-red-800 mb-3">{error}</div>
                        <div className="flex justify-center items-center mt-10">
                            <Button
                                title="Mettre à jour"
                                onClick={(e: Event) => handleProfile(e)}
                                isLoading={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profil
