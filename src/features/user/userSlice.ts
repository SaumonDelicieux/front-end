import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"

import { IUserState } from "../../types/states/IUserState"
import { IUser } from "../../types/IUser"

import { forgottenPassword, loginUser, registerUser } from "../../actions/user"

import type { RootState } from "../../store"

const initialState: IUserState = {
    token: localStorage.getItem("token") ?? undefined,
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    isPremium: false,
    phoneNumber: "",
    theme: "light",
    loading: false,
    error: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserDetails: state => {
            const tokenUser = localStorage.getItem("token")
            if (tokenUser) {
                const { id, firstName, lastName, email, isPremium, phoneNumber }: IUser =
                    jwtDecode(tokenUser)
                state.token = tokenUser
                state.id = id
                state.firstName = firstName
                state.lastName = lastName
                state.email = email
                state.isPremium = isPremium
                state.phoneNumber = phoneNumber
            }
        },
        logoutUser: state => {
            localStorage.removeItem("token")
            state.token = ""
            state.id = ""
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.isPremium = false
            state.phoneNumber = ""
            state.loading = false
            state.error = ""
        },
        switchThemeMode: state => {
            if (document.querySelector("html")?.classList.contains("dark")) {
                document.querySelector("html")?.classList.remove("dark")
                document
                    .querySelector('meta[name="theme-color"]')
                    ?.setAttribute("content", "#f8fafc")
                document
                    .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
                    ?.setAttribute("content", "#f8fafc")

                state.theme = "light"
            } else {
                document.querySelector("html")?.classList.add("dark")
                document
                    .querySelector('meta[name="theme-color"]')
                    ?.setAttribute("content", "#334155")
                document
                    .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
                    ?.setAttribute("content", "#334155")

                state.theme = "dark"
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.loading = true
                state.error = ""
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.token = payload.token
                state.id = payload.id
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.email = payload.email
                state.isPremium = payload.isPremium
                state.phoneNumber = payload.phoneNumber
                state.loading = false
                state.error = ""
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.token = ""
                state.id = ""
                state.firstName = ""
                state.lastName = ""
                state.email = ""
                state.isPremium = false
                state.phoneNumber = ""
                state.loading = false
                state.error = payload?.message
            })
            .addCase(registerUser.pending, state => {
                state.loading = true
                state.error = ""
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.token = payload.token
                state.id = payload.id
                state.firstName = payload.firstName
                state.lastName = payload.lastName
                state.isPremium = payload.isPremium
                state.phoneNumber = payload.phoneNumber
                state.loading = false
                state.error = ""
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.token = ""
                state.id = ""
                state.firstName = ""
                state.lastName = ""
                state.email = ""
                state.isPremium = false
                state.phoneNumber = ""
                state.loading = false
                state.error = payload?.message
            })
            .addCase(forgottenPassword.pending, state => {
                state.loading = true
                state.error = ""
            })
            .addCase(forgottenPassword.fulfilled, state => {
                state.token = ""
                state.id = ""
                state.firstName = ""
                state.lastName = ""
                state.isPremium = false
                state.phoneNumber = ""
                state.loading = false
                state.error = ""
            })
    },
})

export const { getUserDetails, logoutUser, switchThemeMode } = userSlice.actions

export const user = (state: RootState) => state.user

export default userSlice.reducer
