import React, { useState, HTMLInputTypeAttribute } from "react"
import { useAppSelector } from "../hooks"

interface TextArea {
    label?: string
    required?: boolean
    type?: HTMLInputTypeAttribute
    //onChange: (e: string) => void
}

const TextArea: React.FC<TextArea> = ({
    label,
    required = false,
    //onChange,
}) => {
    const { selectedNote } = useAppSelector(state => state.notes)
    return (
        <textarea
            name={label}
            id={label}
            required={required}
            value={selectedNote?.text}
            //onChange={e => onChange(e.target.value)}
            className={`w-11/12 felx m-auto p-5 h-4/5 bg-transparent `}
        />
    )
}

export default TextArea
