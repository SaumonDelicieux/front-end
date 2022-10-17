import React, { useState, HTMLInputTypeAttribute } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface InputProps {
    label?: string
    required?: boolean
    size: 'default' | 'large'
    placeholder?: string
    value?: any
    type?: HTMLInputTypeAttribute
    onChange: (e: string) => void
}

const Input: React.FC<InputProps> = ({
    label,
    required = false,
    size = 'default',
    placeholder,
    value,
    type = 'text',
    onChange,
}) => {
    const [hide, setHide] = useState(true)

    const hidePass = (e: Event) => {
        e.preventDefault()

        if (hide) {
            document.getElementById(label ?? '')?.setAttribute('type', 'text')
            setHide(false)
        } else {
            document.getElementById(label ?? '')?.setAttribute('type', 'password')
            setHide(true)
        }
    }

    const sizeRender = () => {
        switch (size) {
            case 'large':
                return 'p-4'
            case 'default':
                return 'p-2'
            default:
                return 'p-2'
        }
    }
    return (
        <div className="relative flex flex-col">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor={label} className="mb-1 text-left cursor-pointer text-slate-200">
                        {label}
                    </label>
                </div>
            )}
            <input
                type={type}
                placeholder={placeholder}
                name={label}
                id={label}
                required={required}
                value={value}
                onChange={e => onChange(e.target.value)}
                className={`mb-10 focus:outline-none focus:ring-1 focus:ring-blue-700 rounded-xl ${sizeRender()} justify-end text-slate-800 bg-slate-100`}
            />
            {type === 'password' && (
                <button
                    className="absolute right-4 bottom-14 text-slate-800"
                    type="button"
                    onClick={hidePass as any}
                >
                    {hide ? <FiEyeOff /> : <FiEye />}
                </button>
            )}
        </div>
    )
}

export default Input
