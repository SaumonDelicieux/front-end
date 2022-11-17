import { jsPDF } from "jspdf"

export const convertToPDF = (title: string, content = "") => {
    const doc = new jsPDF()

    doc.text([title, content], 10, 10)
    doc.save(`${title}.pdf`)
}
