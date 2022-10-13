import React from 'react'
import ReactLoading from 'react-loading'

interface ButtonProps {
    onClick: any
    title: string
    isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, title, isLoading }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className="rounded-full py-4 px-8 text-slate-50 bg-green-800 hover:bg-green-700 transition-colors"
            >
                {isLoading ? (
                    <ReactLoading type="spin" color="white" height={27} width={27} />
                ) : (
                    title
                )}
            </button>
        </div>
    )
}

export default Button
