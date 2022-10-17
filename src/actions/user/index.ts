import { createAsyncThunk } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"
import { toast } from "react-toastify"

import api from "../../helpers/api"
import { urls } from "../../helpers/urls"

import { IUser } from "../../types/IUser"
import { IUserLogin } from "../../types/IUserLogin"
import { IUserRegister } from "../../types/IUserRegister"

export const loginUser = createAsyncThunk(
    "user/login",
    async ({ identifer, password }: IUserLogin) => {
        const { data } = await api.post(urls.API.LOGIN, {
            identifer,
            password,
        })

        const { id, firstName, lastName, isPremium }: IUser = jwtDecode(data.token)
        localStorage.setItem("token", data.token)

        return { id, firstName, lastName, isPremium, token: data.token }
    },
)

export const registerUser = createAsyncThunk(
    "user/register",
    async ({ email, password, confirmPassword }: IUserRegister) => {
        if (password !== confirmPassword) {
            toast("Mot de passe différent", { type: "warning" })
            return {}
        }
        const { data } = await api.post(urls.API.REGISTER, {
            email,
            password,
        })

        const { id, firstName, lastName, isPremium }: IUser = jwtDecode(data.token)
        localStorage.setItem("token", data.token)

        return { id, firstName, lastName, isPremium, token: data.token }
    },
)

export const forgottenPassword = createAsyncThunk(
    "user/forgottenPassword",
    async (identifer: string) => {
        const { data } = await api.post(urls.API.REGISTER, {
            identifer,
        })

        toast("Un mail a été envoyé à l'adresse mail", {
            type: "success",
        })

        return data
    },
)
