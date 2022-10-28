import React from "react"
import {
    AiOutlineAlignRight,
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlinePaperClip,
    AiOutlineOrderedList,
    AiOutlineUnorderedList,
} from "react-icons/ai"

import { updateNote } from "../actions/notes"

import { INote } from "../types/INote"

import { useAppDispatch } from "../store"

import { convertToPDF } from "../helpers/convertToPDF"

import Button from "./Button"

interface ContentProps {
    note: INote
}

const Content: React.FC<ContentProps> = ({ note }) => {
    const dispatch = useAppDispatch()

    return (
        <div className="flex-1 p-2 ml-5 mr-5">
            <div className="">
                <div className="flex">
                    <Button
                        title={note.state === "archived" ? "Brouillon " : "Archiver"}
                        colorBg="bg-lime-500"
                        textColor="text-slate-200"
                        onClick={() => {
                            dispatch(
                                updateNote({
                                    id: note._id!,
                                    title: note.title!,
                                    text: note.text!,
                                    state: note.state === "archived" ? "junk" : "archived",
                                }),
                            )
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
                        title="Télécharger"
                        colorBg="bg-blue-900"
                        textColor="text-slate-200"
                        onClick={() => convertToPDF(note.title!, note.text)}
                    />
                    <Button
                        title={note.state === "archived" ? "Publier " : "Archiver"}
                        colorBg="bg-orange-500"
                        textColor="text-slate-200"
                        onClick={() =>
                            dispatch(
                                updateNote({
                                    id: note._id!,
                                    title: note.title!,
                                    text: note.text!,
                                    state: note.state === "archived" ? "public" : "archived",
                                }),
                            )
                        }
                    />
                </div>
            <div className="flex bg-slate-200 p-1 rounded-md mt-10">
                <div className="flex border border-slate-900 ml-1 mr-1">
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
                <div className="flex border border-slate-900 ml-1 mr-1">
                    <select className="text-slate-900 text-xs bg-slate-200" name="size" id="size">
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
                    className="text-slate-900 mt-0.5 cursor-pointer"
                    onClick={() => console.log("gras")}
                />

                <AiOutlineItalic
                    className="text-slate-900 mr-1 mt-0.5 cursor-pointer"
                    onClick={() => console.log("italic")}
                />
                <AiOutlineOrderedList
                    className="text-slate-900 mr-2 mt-0.5 cursor-pointer"
                    onClick={() => console.log("mettre des puce 1 2 3")}
                />
                <AiOutlineUnorderedList
                    className="text-slate-900 mr-2 mt-0.5 cursor-pointer"
                    onClick={() => console.log("mettre des puce . . .")}
                />
                <AiOutlineAlignLeft
                    className="text-slate-900 mr-2 mt-0.5 cursor-pointer"
                    onClick={() => console.log("text align left")}
                />
                <AiOutlineAlignCenter
                    className="text-slate-900 mr-2 mt-0.5 cursor-pointer"
                    onClick={() => console.log("text align center")}
                />
                <AiOutlineAlignRight
                    className="text-slate-900 mr-2 mt-0.5 cursor-pointer"
                    onClick={() => console.log(true)}
                />
                <AiOutlinePaperClip
                    className="text-slate-900 mr-2 mt-0.5 cursor-pointer"
                    onClick={() => console.log("importer une image")}
                />
            </div>
            <div>Note : {note.text}</div>
        </div>
    )
}

export default Content
