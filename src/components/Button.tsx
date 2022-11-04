import React from "react"
import ReactLoading from "react-loading"

import { useAppSelector } from "../store"

interface ButtonProps {
    onClick?: any
    title?: string
    message?: string
    type?: "submit" | "button"
    isLoading?: boolean
    icon?: any
    noBg?: boolean
    colorBg?: string
    textColor?: string
    roundedSize?: string
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    title,
    message,
    isLoading,
    icon = null,
    noBg = false,
    colorBg = "bg-white",
    textColor = "text-gray-700",
    roundedSize = "rounded-xl",
    type = "button",
}) => {
    const { theme } = useAppSelector(state => state.user)
    return (
        <div>
            <button
                onClick={onClick}
                type={type}
                className={
                    noBg
                        ? "rounded-xl p-1 dark:text-gray-200 text-blue-900 underline underline-offset-1 text-xs hover:scale-105 transition-all"
                        : `${roundedSize} m-6 py-4 px-8 ${textColor} font-bold ${colorBg} transition-colors`
                }
                title={message}
            >
                {isLoading ? (
                    <ReactLoading
                        type="spin"
                        color={theme ? "text-blue-900" : "white"}
                        height={27}
                        width={27}
                    />
                ) : (
                    title || icon
                )}
            </button>
        </div>
    )
}

export default Button
