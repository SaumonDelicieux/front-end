import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import { IUserState } from '../../types/states/IUserState'
import { IUser } from '../../types/IUser'

import { forgottenPassword, loginUser, registerUser } from '../../actions/user'

import type { RootState } from '../../store'

const initialState: IUserState = {
    token: localStorage.getItem('token') ?? undefined,
    id: '',
    firstName: '',
    lastName: '',
    isPremium: false,
    loading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserDetails: state => {
            const tokenUser = localStorage.getItem('token')
            if (tokenUser) {
                const { id, firstName, lastName, isPremium }: IUser = jwtDecode(tokenUser)
                state.token = tokenUser
                state.id = id
                state.firstName = firstName
                state.lastName = lastName
                state.isPremium = isPremium
            }
        },
        logoutUser: state => {
            localStorage.removeItem('token')
            state.token = ''
            state.id = ''
            state.firstName = ''
            state.lastName = ''
            state.isPremium = false
            state.loading = false
            state.error = ''
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.loading = true
                state.error = ''
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.token = payload.token
                state.id = payload.id
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.isPremium = payload.isPremium
                state.loading = false
                state.error = ''
            })
            .addCase(registerUser.pending, state => {
                state.loading = true
                state.error = ''
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.token = payload.token
                state.id = payload.id
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.isPremium = payload.isPremium
                state.loading = false
                state.error = ''
            })
            .addCase(forgottenPassword.pending, state => {
                state.loading = true
                state.error = ''
            })
            .addCase(forgottenPassword.fulfilled, state => {
                state.token = ''
                state.id = ''
                state.firstName = ''
                state.lastName = ''
                state.isPremium = false
                state.loading = false
                state.error = ''
            })
    },
})

export const { getUserDetails, logoutUser } = userSlice.actions

export const user = (state: RootState) => state.user

export default userSlice.reducer
