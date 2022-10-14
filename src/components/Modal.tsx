import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

interface ModalProps {
    title: string
    description: string
    isDisplay: boolean
    setIsDisplay: any
}

const Modal: React.FC<ModalProps> = ({ title, description, isDisplay, setIsDisplay }) => {
    return (
        <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-2 bg-slate-100 border border-gray-300 rounded-lg z-50 ${
                isDisplay ? 'flex flex-col drop-shadow-md' : 'hidden'
            }`}
        >
            <div className="r flex justify-between items-center pb-3 border-b border-gray-300 my-2">
                <div className="font-bold">{title}</div>
                <MdOutlineClose
                    onClick={() => setIsDisplay(false)}
                    className="cursor-pointer"
                    size={24}
                />
            </div>
            <div className="text-left">{description}</div>
        </div>
    )
}

export default Modal
