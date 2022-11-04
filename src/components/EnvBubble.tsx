import React from "react"

const EnvBubble: React.FC = () => {
    const renderMode = () => {
        switch (import.meta.env.VITE_MODE) {
            case "development":
                return "DEV"
            case "staging":
                return "STA"
            default:
                ""
        }
    }

    return (
        <span className="absolute right-2 bottom-2 z-50 bg-blue-900 dark:bg-slate-300 text-slate-50 dark:text-slate-900 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
            {renderMode()}
        </span>
    )
}

export default EnvBubble
