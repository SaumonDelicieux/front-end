import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import { BiLogOut } from 'react-icons/bi'

const Dashboard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)

    const logout = async () => {
        setIsLoading(true)
        setIsLoading(false)
    }

    return (
        <div className="w-full h-full relative main">
            <button
                onClick={logout as any}
                className="text-red-500 text-2xl absolute bottom-4 right-4 bg-slate-100 p-2 rounded-md"
                aria-label="logout-btn"
                title="Se déconnecter"
            >
                {isLoading ? (
                    <ReactLoading type="spin" color="red" height={17} width={17} />
                ) : (
                    <BiLogOut />
                )}
            </button>
        </div>
    )
}

export default Dashboard
