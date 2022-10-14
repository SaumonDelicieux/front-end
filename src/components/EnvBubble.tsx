import React from 'react'

const EnvBubble: React.FC = () => {
    const renderMode = () => {
        switch (import.meta.env.VITE_MODE) {
            case 'development':
                return 'DEV'
            case 'staging':
                return 'STA'
            default:
                ''
        }
    }

    return (
        <span className="absolute right-2 top-2 z-50 bg-slate-300 text-slate-900 rounded-full w-10 h-10 flex items-center justify-center font-bold">
            {renderMode()}
        </span>
    )
}

export default EnvBubble
