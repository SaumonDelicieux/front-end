import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AuthContextProvider } from './context/AuthContext'

import RoutesStack from './routes'

import './assets/css/styles.css'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
    return (
        <div className="h-full relative">
            <AuthContextProvider>
                <BrowserRouter>
                    <RoutesStack />
                </BrowserRouter>
                <ToastContainer />
            </AuthContextProvider>
        </div>
    )
}

export default App
