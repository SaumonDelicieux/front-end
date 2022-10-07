import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import RoutesStack from './routes'

import './assets/css/styles.css'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
    return (
        <div className="h-full relative">
            <BrowserRouter>
                <RoutesStack />
            </BrowserRouter>
            <ToastContainer />
        </div>
    )
}

export default App
