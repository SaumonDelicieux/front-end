import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

<<<<<<< HEAD
import { AuthContextProvider } from './contexts/AuthContext'

import EnvBubble from './components/EnvBubble'

=======
>>>>>>> cd57212d9e3a44bcae309afeb7c6be1f7fb861fb
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
