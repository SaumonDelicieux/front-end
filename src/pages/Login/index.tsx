import React, { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import Button from '../../components/Button'

import { IUserLogin } from '../../types/IUserLogin'

const Login: React.FC = () => {
    const [hide, setHide] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [userLogin, setUserLogin] = useState<IUserLogin>({
        username: '',
        password: '',
    })

    const hidePass = (e: Event) => {
        e.preventDefault()
        if (hide) {
            document.getElementById('password')?.setAttribute('type', 'text')
            setHide(false)
        } else {
            document.getElementById('password')?.setAttribute('type', 'password')
            setHide(true)
        }
    }

    const handleLogin = async (e: Event) => {
        e.preventDefault()

        setIsLoading(true)
    }

    return (
        <div className="w-screen h-screen relative bg-slate-200 text-p-2 text-base transition-colors">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-center w-80 z-10">
                    <div className="flex flex-col justify-center items-center mb-10 font-bold text-2xl text-slate-800 select-none">
                        <div>
                            <span className="text-green-700 mr-2">Pin Notes</span>
                            📌
                        </div>
                    </div>
                    <form className="flex flex-col" onSubmit={handleLogin as any}>
                        <div className="flex justify-between items-center mb-2">
                            <label
                                htmlFor="Identifiant"
                                className="mb-1 text-left cursor-pointer text-slate-800"
                            >
                                Identifiant
                            </label>
                        </div>
                        <input
                            type="text"
                            placeholder="john.doe"
                            name="Identifiant"
                            id="Identifiant"
                            required
                            onChange={e => setUserLogin({ ...userLogin, username: e.target.value })}
                            className="mb-10 focus:outline-none focus:ring-1 focus:ring-green-700 rounded-xl p-4 justify-end text-slate-800 bg-slate-100"
                        />
                        <div className="flex justify-between items-center mb-2">
                            <label
                                htmlFor="password"
                                className="mb-1 text-left cursor-pointer text-slate-800"
                            >
                                Mot de passe
                            </label>
                        </div>
                        <div className="relative mb-5 h-16">
                            <input
                                type="password"
                                placeholder="**********"
                                name="password"
                                id="password"
                                required
                                onChange={e =>
                                    setUserLogin({ ...userLogin, password: e.target.value })
                                }
                                className="absolute left-0 w-full focus:outline-none focus:ring-1 focus:ring-green-700 rounded-xl p-4 justify-end text-slate-800 bg-slate-100"
                            />
                            <button
                                className="absolute right-4 bottom-7 text-slate-800"
                                onClick={hidePass as any}
                            >
                                {hide ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        <div className="text-red-800 mb-5">{error}</div>
                        <Button
                            isLoading={isLoading}
                            onClick={(e: any) => handleLogin(e)}
                            title="Se connecter"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
