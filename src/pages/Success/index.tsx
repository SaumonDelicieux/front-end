import React, { useEffect, useState } from "react"
import ReactLoading from "react-loading"

import api from "../../helpers/api"
import { urls } from "../../helpers/urls"

const Success: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("Erreur lors de la vérification du paiement...")

    const verifyPayment = async () => {
        try {
            const { data } = await api.get(urls.API.VERIFY_PAYMENT, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })

            localStorage.setItem("token", data.token)
            setMessage(data.message)
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
            <span className="mb-6">Vérification du paiement</span>
            {isLoading ? <ReactLoading type="spin" color="white" width={40} /> : message}
        </div>
    )
}

export default Success
