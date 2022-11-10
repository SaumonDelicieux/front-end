import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Input from "../../components/Input"
import Button from "../../components/Button"

import { useAppSelector } from "../../store"

import { urls } from "../../helpers/urls"
import api from "../../helpers/api"

const UpdatePassword: React.FC = () => {
    const { loading } = useAppSelector(state => state.user)
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")

    const queryParams = new URLSearchParams(window.location.search)

    const verifyToken = async () => {
        const token = queryParams.get("token")!.toString()

        try {
            const { data } = await api.post(urls.API.CHECK_TOKEN, {
                token,
            })

            if (!data.success) {
                navigate(urls.APP.LOGIN)
            }

            return data
        } catch {
            toast("Une erreur est survenue", { type: "warning" })
        }
    }

    const handleClick = async (e: Event) => {
        e.preventDefault()

        if (password === secondPassword) {
            try {
                const token = queryParams.get("token")!.toString()

                await api.put(urls.API.UPDATE_PASSWORD, {
                    password,
                    token,
                })

                navigate(urls.APP.LOGIN)
                toast(
                    "Mot de passe changé avec succés, vous pouvez désormais vous connecter avec le nouveau mot de passe",
                    {
                        type: "success",
                    },
                )
            } catch {
                toast("Une erreur est survenue", { type: "warning" })
            }
        } else {
            toast("Les deux mot de passes doivent être identiques", { type: "warning" })
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <div className="w-screen h-screen relative bg-slate-900 text-p-2 text-base transition-colors">
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col">
                    <Input
                        label="Nouveau mot de passe"
                        type="password"
                        onChange={e => setPassword(e)}
                        placeholder="**********"
                        size="large"
                        className="mb-5"
                    />
                    <Input
                        label="Confirmer le mot de passe"
                        type="password"
                        onChange={e => setSecondPassword(e)}
                        placeholder="**********"
                        size="large"
                        className="mb-5"
                    />
                    <Button
                        isLoading={loading}
                        onClick={(e: any) => {
                            handleClick(e)
                        }}
                        title="Confirmer"
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword
