import { jsPDF } from "jspdf"

export const convertToPDF = (title: string, content = "") => {
    const doc = new jsPDF()

    doc.text(title, 10, 10)
    doc.text(content, 10, 10)
    doc.save(`${title}.pdf`)
}
