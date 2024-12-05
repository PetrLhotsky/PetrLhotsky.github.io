function generateSummary() {
    alert("Tuto funkci ještě připravujeme...")
    return

    const element = $("#summary")[0]

    return html2pdf()
        .set({
            filename: "summary.pdf",
            jsPDF: {
                orientation: 'landscape',
                unit: 'mm',
                format: 'a2',
            }
        })
        .from(element)
        .save();
}

function generateExport() {
    alert("Tuto funkci ještě připravujeme...")
    return
    
    const element = $("body")[0]

    return html2pdf()
        .set({
            filename: "export.pdf",
            jsPDF: {
                orientation: 'landscape',
                unit: 'mm',
                format: 'a2',
            }
        })
        .from(element)
        .save();
}
