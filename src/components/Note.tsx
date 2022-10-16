import React from 'react'

import { INote } from '../types/INote'

const Note: React.FC<INote> = ({ title, text, state }) => {
    return (
        <div
            onClick={() => console.log('Show Paris note')}
            className="block py-1 px-2 hover:bg-blue-700 rounded-lg transition-all mb-2 cursor-pointer"
            aria-label="Paris"
        >
            <span>{title}</span>
        </div>
    )
}

export default Note
