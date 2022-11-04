export type SizeType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export const sizeText = (selectedElement: any, size: SizeType) => {
    const range = document.createRange()
    const newParent = document.createElement(size)

    range.selectNode(selectedElement)
    range.surroundContents(newParent)
}
