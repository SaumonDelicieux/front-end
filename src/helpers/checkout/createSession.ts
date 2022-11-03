import api from "../api"
import { urls } from "../urls"

import { IPayload } from "../../types/checkout/IPayload"

export const createSession = async ({ userId }: IPayload) => {
    try {
        const { data } = await api.post(
            urls.API.CHECKOUT,
            { userId },
            {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            },
        )
        return data
    } catch (error) {
        console.log(error)
    }
}
