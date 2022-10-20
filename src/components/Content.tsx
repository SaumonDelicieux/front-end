import React, { useState } from "react"
import {
    AiOutlineAlignRight,
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlinePaperClip,
    AiOutlineOrderedList,
    AiOutlineUnorderedList,
    AiFillCaretDown,
} from "react-icons/ai"

import Button from "../components/Button"

interface ContentProps {
    text?: string
}

const Content: React.FC<ContentProps> = ({ text }) => {
    const [textAlignRight, setTextAlignRight] = useState(false)
    const [textAlignLeft, setTextAlignLeft] = useState(false)
    const [textAlignCenter, setTextAlignCenter] = useState(false)

    return (
        <div className="flex-1 p-2 ml-5 mr-5">
            <div
                className={
                    textAlignRight
                        ? "text-right ..."
                        : textAlignLeft
                        ? "text-right ..."
                        : textAlignCenter
                        ? "text-center ..."
                        : ""
                }
            >
                <div className="flex">
                    <Button title="Publier" onClick={() => console.log("")} />
                    <Button title="Partager" onClick={() => console.log("")} />
                    <Button title="Download" onClick={() => console.log("")} />
                    <Button title="Archiver" onClick={() => console.log("")} />
                </div>

                <span className="flex bg-slate-200 p-1 ... rounded-md mt-20">
                    <div className="flex border border-slate-900 ... ml-1 mr-1">
                        <select
                            className="text-slate-900 text-xs bg-slate-200"
                            name="typography"
                            id="typography"
                        >
                            <option
                                value="calibri"
                                onClick={() => {
                                    console.log("typographie calibri")
                                }}
                            >
                                Calibri
                            </option>
                            <option value="timesNewRoman">Times new roman</option>
                            <option value="arial">Arial</option>
                        </select>
                    </div>
                    <div className="flex border border-slate-900 ... ml-1 mr-1">
                        <select
                            className="text-slate-900 text-xs bg-slate-200"
                            name="size"
                            id="size"
                        >
                            <option
                                value="10"
                                onClick={() => {
                                    console.log("taille 10")
                                }}
                            >
                                10
                            </option>
                            <option value="14">14</option>
                            <option value="18">18</option>
                            <option value="24">24</option>
                        </select>
                    </div>
                    <AiOutlineBold
                        className="text-slate-900 mt-0.5"
                        onClick={() => console.log("gras")}
                    />

                    <AiOutlineItalic
                        className="text-slate-900 mr-1 mt-0.5"
                        onClick={() => console.log("italic")}
                    />
                    <AiOutlineOrderedList
                        className="text-slate-900 mr-2 mt-0.5"
                        onClick={() => console.log("mettre des puce 1 2 3")}
                    />
                    <AiOutlineUnorderedList
                        className="text-slate-900 mr-2 mt-0.5"
                        onClick={() => console.log("mettre des puce . . .")}
                    />
                    <AiOutlineAlignLeft
                        className="text-slate-900 mr-2 mt-0.5"
                        onClick={() => console.log("text align left")}
                    />
                    <AiOutlineAlignCenter
                        className="text-slate-900 mr-2 mt-0.5"
                        onClick={() => console.log("text align center")}
                    />
                    <AiOutlineAlignRight
                        className="text-slate-900 mr-2 mt-0.5"
                        onClick={() => setTextAlignRight(true)}
                    />
                    <AiOutlinePaperClip
                        className="text-slate-900 mr-2 mt-0.5"
                        onClick={() => console.log("importer une image")}
                    />
                </span>
                <div>Note : {text}</div>
            </div>
        </div>
    )
}

export default Content
