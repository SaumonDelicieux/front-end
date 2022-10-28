import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AiFillCaretLeft } from "react-icons/ai"
import { loadStripe } from "@stripe/stripe-js"
import jwtDecode from "jwt-decode"

import { urls } from "../../helpers/urls"
import { createSession } from "../../helpers/checkout/createSession"

import Button from "../../components/Button"

import { IUser } from "../../types/IUser"

import { useAppSelector } from "../../store"

const Subscribe: React.FC = () => {
    const navigate = useNavigate()
    const { id, isPremium, theme } = useAppSelector(state => state.user)

    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        try {
            setIsLoading(true)
            const stripeClient = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)
            const session = await createSession({ userId: id! })

            stripeClient?.redirectToCheckout({
                sessionId: session.id,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const { isPremium }: IUser = jwtDecode(token)
            if (isPremium) {
                navigate(urls.APP.DASHBOARD)
            }
        }
    }, [])

    return (
        <div className="w-full h-full relative bg-slate-200 dark:bg-slate-900 text-p-2 text-base transition-colors">
            <div className="absolute top-14 left-14">
                <Button
                    icon={<AiFillCaretLeft color={theme ? "text-blue-900" : "white"} size={20} />}
                    onClick={() => !isPremium && navigate(urls.APP.DASHBOARD)}
                    noBg
                />
            </div>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col sm:flex-row p-12">
                    <div className="flex-auto justify-items-center bg-slate-200 dark:bg-slate-900 text-blue-800 dark:text-slate-200">
                        <div className="text-center text-2xl py-8">Offre gratuite</div>
                        <div className="text-xl py-8 px-16">
                            Grâce à votre profil gratuit vous bénéfier d'un profil personnel sur
                            lequel vous pouvez créer vos notes.
                        </div>
                        <div className="px-16">
                            <ul className="marker:text-green list-outside list-disc ml-4">
                                <li className="py-3">Insertion d'images et de fichier</li>
                                <li className="py-3">Téléchargeable en pdf</li>
                                <li className="py-3">Insertion d'images et de fichier</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex-auto justify-items-center bg-blue-500 dark:bg-blue-900">
                        <div className="text-slate-200 text-center text-2xl py-8">
                            Offre Premium
                        </div>
                        <div className="text-slate-200 text-xl py-8 px-16">
                            Abonnement sans engagement.
                        </div>
                        <div className="flex flex-row text-slate-200 text-xl py-8 px-16">
                            <div>30 $</div>
                            <div className="text-sm pl-4">HT Pour 30 jours</div>
                        </div>
                        <div className="text-white px-16">
                            <ul className="marker:text-green list-outside list-disc ml-4">
                                <li className="py-3">Bénificier des fonctionnalités de base</li>
                                <li className="py-3">
                                    Offre la possibilité de travail sur un même document partagé et
                                    consultable par des utilisateurs libres via une url de preview
                                </li>
                                <div className="py-16 text-center">
                                    <Button
                                        isLoading={isLoading}
                                        onClick={() => handleCheckout()}
                                        title="Souscrire à l'abonnement"
                                        colorBg="bg-yellow-500"
                                        textColor="bg-slate-200"
                                        roundedSize="rounded"
                                    />
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscribe
