export const addParagraphTag = evt => {
    if (evt.keyCode == "13" && window) {
        // don't add a p tag on list item
        if (window?.getSelection()?.anchorNode.parentNode.tagName === "LI") return
        document.createRange("formatBlock", false, "p")
    }
}
