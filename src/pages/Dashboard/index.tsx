import React, { useEffect, useState } from "react"

import {
    AiOutlineAlignRight,
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlineOrderedList,
    AiOutlineUnderline,
    AiOutlineLink,
    AiOutlineBgColors,
} from "react-icons/ai"

import Button from "../../components/Button"

import { useAppSelector } from "../../store"

type TextProps = string | null | undefined
type ImgProps = string | ArrayBuffer | null | undefined

const Dashboard: React.FC = () => {
    const { selectedNote } = useAppSelector(state => state.notes)
    const [text, setText] = useState<TextProps>()
    const [selectedFile, setSelectedFile] = useState()
    const [image, setImage] = useState<HTMLImageElement | ImgProps>()

    const toolChoice = (role: any) => {
        const textSelected = window.getSelection()!
        document.designMode = "on"

        switch (role) {
            case "code":
                document.execCommand(
                    "insertHTML",
                    false,
                    "<br>" +
                        "<pre class='bg-slate-200 text-slate-900 p-2'>" +
                        textSelected +
                        "</pre>" +
                        "<hr>",
                )
                break
            case "h1":
                document.execCommand("insertHTML", false, "<h1>" + textSelected + "</h1>")
                break
            case "h2":
                document.execCommand("insertHTML", false, "<h2>" + textSelected + "</h2>")
                break
            case "li":
                document.execCommand("insertHTML", false, "<li>" + textSelected + "</li>")
                break
            case "link":
                document.execCommand(
                    "insertHTML",
                    false,
                    "<a contentEditable='false' href='" +
                        textSelected +
                        "'>" +
                        textSelected +
                        "</a>",
                )
                break
            default:
                document.execCommand(role, false, undefined)
                break
        }
    }

    const fileSelectedHandler = (event: any) => {
        setSelectedFile(event.target.files[0])
    }

    const size = (event: any) => {
        toolChoice(event.target.value)
    }

    useEffect(() => {
        const image = document.getElementById("image")
        if (selectedFile) {
            const reader = new FileReader()
            reader.onload = function (e) {
                setImage(e.target?.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    }, [selectedFile])

    return (
        <>
            <div className="flex-1 p-2 ml-5 mr-5">
                <div className="flex">
                    <Button
                        title="Publier"
                        colorBg="bg-lime-500"
                        textColor="text-slate-200"
                        onClick={() => {
                            console.log("publier")
                        }}
                    />
                    <Button
                        title="Partager"
                        colorBg="bg-violet-600"
                        textColor="text-slate-200"
                        onClick={() => {
                            console.log("partager")
                        }}
                    />
                    <Button
                        title="Download"
                        colorBg="bg-blue-900"
                        textColor="text-slate-200"
                        onClick={() => {
                            console.log("download")
                        }}
                    />
                    <Button
                        title="Archiver"
                        colorBg="bg-orange-500"
                        textColor="text-slate-200"
                        onClick={() => {
                            console.log("archiver")
                        }}
                    />
                </div>

                <span className="flex bg-slate-200 p-1 ... rounded-md mt-10">
                    <div className="flex border border-slate-900 ... ml-1 mr-1">
                        <select
                            className="text-slate-900 text-xs bg-slate-200"
                            name="size"
                            id="size"
                            onChange={size}
                        >
                            <option value="paragraphe">Paragraphe</option>
                            <option value="h1">Titre</option>
                            <option value="h2">Sous titre</option>
                        </select>
                    </div>
                    <button
                        onClick={() => {
                            toolChoice("bold")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineBold className="text-slate-900 mt-0.5 w-full h-full" />
                    </button>

                    <button
                        onClick={() => {
                            toolChoice("italic")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineItalic className="text-slate-900 mr-1 mt-0.5" />
                    </button>

                    <button
                        onClick={() => {
                            toolChoice("underline")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineUnderline className="text-slate-900 mr-1 mt-0.5" />
                    </button>

                    <button
                        onClick={() => {
                            toolChoice("li")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineOrderedList className="text-slate-900 mr-2 mt-0.5" />
                    </button>

                    <button
                        onClick={() => {
                            toolChoice("justifyLeft")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineAlignLeft className="text-slate-900 mr-2 mt-0.5" />
                    </button>
                    <button
                        onClick={() => {
                            toolChoice("justifyCenter")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineAlignCenter className="text-slate-900 mr-2 mt-0.5" />
                    </button>

                    <button
                        onClick={() => {
                            toolChoice("justifyRight")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineAlignRight className="text-slate-900 mr-2 mt-0.5" />
                    </button>

                    <button
                        onClick={() => {
                            toolChoice("code")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineBgColors className="text-slate-900 mr-2 mt-0.5" />
                    </button>

                    <button
                        onClick={() => {
                            toolChoice("link")
                        }}
                        onMouseDown={event => event.preventDefault()}
                    >
                        <AiOutlineLink className="text-slate-900 mr-2 mt-0.5" />
                    </button>
                </span>

                <div className="mb-10 text-2xl font-bold">{selectedNote?.title}</div>
                <div>
                    <div id="test-ed-div" contentEditable>
                        {text == "undefinedundefined" ? "" : text}
                        <input
                            type="file"
                            accept=".jpg, .png, .gif"
                            onChange={fileSelectedHandler}
                        />
                        {selectedFile && image && <img src={image as string} />}
                        <div>vous pouvez écrire ici</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
