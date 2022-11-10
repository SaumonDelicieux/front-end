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
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    title,
    message,
    isLoading,
    icon = null,
    type = "button",
    className,
}) => {
    const { theme } = useAppSelector(state => state.user)
    return (
        <div className="mx-1">
            <button onClick={onClick} type={type} className={className} title={message}>
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
