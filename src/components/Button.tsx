import React from 'react'
import ReactLoading from 'react-loading'

interface ButtonProps {
    onClick: any
    title?: string
    isLoading?: boolean
    Icon?: any
    noBg?: boolean
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    title,
    isLoading,
    Icon = null,
    noBg = false,
}) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={
                    noBg
                        ? 'rounded-full py-0 px-8 text-gray-200 underline underline-offset-1 text-xs'
                        : 'rounded-full py-4 px-8 text-blue-900 bg-slate-200 transition-colors'
                }
            >
                {isLoading ? (
                    <ReactLoading type="spin" color="white" height={27} width={27} />
                ) : title ? (
                    title
                ) : Icon ? (
                    <Icon />
                ) : (
                    ''
                )}
            </button>
        </div>
    )
}

export default Button
