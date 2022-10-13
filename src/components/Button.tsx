import React from 'react'
import ReactLoading from 'react-loading'

interface ButtonProps {
    onClick: any
    title: string
    isLoading?: boolean
    isLink?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClick, title, isLoading, isLink }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={
                    isLink
                        ? 'rounded-full py-4 px-8 text-black underline underline-offset-1 text-xs'
                        : 'rounded-full py-4 px-8 text-blue-900 bg-white transition-colors'
                }
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
