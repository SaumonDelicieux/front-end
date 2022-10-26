import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"

import { useAppDispatch, useAppSelector } from "../../store"
import { checkToken, updatePassword } from "../../actions/user"

import { urls } from "../../helpers/urls"
import { toast } from "react-toastify"

const UpdatePassword: React.FC = () => {
    const { error, loading } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [password, setPassword] = useState<string>("")
    const [secondPassword, setSecondPassword] = useState<string>("")

    const queryParams = new URLSearchParams(window.location.search)

    const token = queryParams.get("token")!.toString()

    const verifyToken = async () => {
        const response = await dispatch(checkToken(token))

        if (!response.payload.token) {
            navigate(urls.APP.LOGIN)
        }
    }

    const handleClick = async (e: Event) => {
        e.preventDefault()

        if (password === secondPassword) {
            dispatch(
                updatePassword({
                    password: password,
                    token: token,
                }),
            )

            navigate(urls.APP.LOGIN)
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
