import React, { ChangeEvent } from "react"

import { updateBold } from "../helpers/WYSIWYG/updateBold"

import { sizeText, SizeType } from "../helpers/WYSIWYG/sizeText"

interface ContentProps {
    text?: string
}

const Content: React.FC<ContentProps> = ({ text }) => {
    const handleSizeText = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

        // sizeText("rfr", e.target.value as SizeType)
        updateBold()
    }

    const show = () => {
        if (window) {
            const selectedText = window.getSelection()
            console.log(selectedText)
        }
    }

    return (
        <div>
            <div className="mb-5">
                <button onClick={(e: any) => handleSizeText(e)}>okok</button>
                <select
                    name="sizeTextChoice"
                    id="sizeTextChoice"
                    className="p-2 text-black rounded-md"
                    onChange={e => handleSizeText(e)}
                >
                    <option value="H1">H1</option>
                    <option value="H2">H2</option>
                    <option value="H3">H3</option>
                    <option value="H4">H4</option>
                    <option value="H5">H5</option>
                    <option value="H6">H6</option>
                </select>
            </div>
            <div contentEditable className="border p-2 rounded-md focus:outline-none">
                {text}
            </div>
        </div>
    )
}

export default Content
