import React, { useEffect, useState } from "react"
import ReactLoading from "react-loading"
import { useNavigate } from "react-router-dom"
import { FiCheckCircle } from "react-icons/fi"

import { getUserDetails } from "../../features/user/userSlice"

import { useAppDispatch } from "../../store"

import api from "../../helpers/api"
import { urls } from "../../helpers/urls"

import "../../assets/css/dot-loading.css"

const Success: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState("Erreur lors de la vérification du paiement...")

    const verifyPayment = async () => {
        try {
            const { data } = await api.get(urls.API.VERIFY_PAYMENT, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })

            localStorage.setItem("token", data.token)
            dispatch(getUserDetails())

            setIsSuccess(true)
            setMessage(data.message)

            setTimeout(() => {
                navigate(urls.APP.DASHBOARD)
            }, 5000)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <span className="mb-6">
                {isLoading ? (
                    "Vérification du paiement"
                ) : isSuccess ? (
                    <FiCheckCircle size={80} color="green" />
                ) : (
                    ""
                )}
            </span>
            {isLoading ? (
                <ReactLoading type="spin" color="white" width={40} />
            ) : (
                <div className="flex items-center text-lg">
                    {message} <span className="mb-1 ml-6 text-lg dot-typing"></span>
                </div>
            )}
        </div>
    )
}

export default Success
