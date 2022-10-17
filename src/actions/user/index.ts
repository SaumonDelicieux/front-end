import { createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'

import api from '../../helpers/api'
import { urls } from '../../helpers/urls'

import { IUser } from '../../types/IUser'
import { IUserLogin } from '../../types/IUserLogin'
import { IUserRegister } from '../../types/IUserRegister'

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ identifer, password }: IUserLogin) => {
        const { data } = await api.post(urls.API.LOGIN, {
            identifer,
            password,
        })

        const { id, firstName, lastName, email, isPremium, phoneNumber }: IUser = jwtDecode(
            data.token,
        )
        localStorage.setItem('token', data.token)

        return { id, firstName, lastName, email, isPremium, phoneNumber, token: data.token }
    },
)

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ emailUser, password, confirmPassword }: IUserRegister) => {
        if (password !== confirmPassword) {
            toast('Mot de passe différent', { type: 'warning' })
            return {}
        }
        const { data } = await api.post(urls.API.REGISTER, {
            email: emailUser,
            password,
        })

        const { id, firstName, lastName, email, isPremium, phoneNumber }: IUser = jwtDecode(
            data.token,
        )
        localStorage.setItem('token', data.token)

        return { id, firstName, lastName, email, isPremium, phoneNumber, token: data.token }
    },
)

export const forgottenPassword = createAsyncThunk(
    'user/forgottenPassword',
    async (identifer: string) => {
        const { data } = await api.post(urls.API.REGISTER, {
            identifer,
        })

        toast("Un mail a été envoyé à l'adresse mail", {
            type: 'success',
        })

        return data
    },
)

export const updateUser = createAsyncThunk('user/updateUser', async (updatedUser: IUser) => {
    try {
        const { data } = await api.put(urls.API.PROFILE, {
            userId: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
        })
        const { id, firstName, lastName, email, isPremium, phoneNumber }: IUser = jwtDecode(
            data.token,
        )
        localStorage.setItem('token', data.token)

        toast('Vos informations ont bien été mises à jour', {
            type: 'success',
        })

        return { id, firstName, lastName, email, isPremium, phoneNumber, token: data.token }
    } catch (error) {
        console.log(error)
        toast('Une erreur est survenue', {
            type: 'warning',
        })
    }
})
