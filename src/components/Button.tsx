import React from "react"
import ReactLoading from "react-loading"

interface ButtonProps {
    onClick: any
    title?: string
    isLoading?: boolean
    icon?: any
    noBg?: boolean
    colorBg?: string
    textColor?: string
    roundedSize?: string
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    title,
    isLoading,
    icon = null,
    noBg = false,
    colorBg = "bg-slate-200",
    textColor = "text-gray-700",
    roundedSize = "rounded-xl",
}) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={
                    noBg
                        ? "rounded-xl p-1 text-gray-200 underline underline-offset-1 text-xs hover:scale-105 transition-all"
                        : `${roundedSize} py-4 px-8 ${textColor} font-bold ${colorBg} transition-colors`
                }
            >
                {isLoading ? (
                    <ReactLoading type="spin" color="white" height={27} width={27} />
                ) : (
                    title || icon
                )}
            </button>
        </div>
    )
}

export default Button
