import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { urls } from "../../helpers/urls"

import "../../assets/css/dot-loading.css"

const Canceled: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate(urls.APP.DASHBOARD)
        }, 5000)
    }, [])

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div>Votre paiement a bien été annulé</div>
            <div className="flex items-end">
                Vous allez être redirigé dans quelques secondes{" "}
                <span className="mb-1 ml-6 text-lg dot-typing"></span>
            </div>
        </div>
    )
}

export default Canceled
