document.querySelector(".btn-download").addEventListener("click", (event) => {
    event.preventDefault();

    // Recolectar datos del formulario
    const formData = {};
    document.querySelectorAll("form input, form textarea, form select").forEach((input) => {
        const name = input.name || input.id;
        const value = input.value;
        formData[name] = value || "No proporcionado";
    });

    generarBriefingCreativo(formData);
});

function generarBriefingCreativo(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // **Portada**
    doc.setFillColor("#FF5B23"); // Fondo orange
    doc.rect(0, 0, 210, 297, "F"); // Rectángulo completo del tamaño A4

    doc.setFont("helvetica", "bold");
    doc.setTextColor("#FFFFFF"); // Texto blanco
    doc.setFontSize(24);
    doc.text("Tu Briefing Creativo", 105, 150, { align: "center" }); // Título centrado

    // Salto de página
    doc.addPage();

    // **Página Interior**
    doc.setFillColor("#3A39FF"); // Fondo blue
    doc.rect(0, 0, 210, 297, "F");

    doc.setTextColor("#FFFFFF");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Resumen del Proyecto", 10, 20);

    const textoBriefing = `
    Este documento recoge toda la información proporcionada por el cliente. Nuestro objetivo es transformar esta información en un proyecto creativo y eficaz. A continuación, se presenta el resumen de los datos clave y los objetivos del proyecto.
    `;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(24);
    const pageWidth = 200;
    const margin = 10;
    const lineHeight = 10;
    const lines = doc.splitTextToSize(textoBriefing, pageWidth - margin * 2);

    let y = 30; 
    lines.forEach((line) => {
        doc.text(line, margin, y);
        y += lineHeight;

        if (y > 280) {
            doc.addPage();
            doc.setFillColor("#3A39FF");
            doc.rect(0, 0, 210, 297, "F");
            doc.setTextColor("#FFFFFF");
            y = 20;
        }
    });

    // Añadir los datos del formulario
    y += lineHeight;
    doc.setFont("helvetica", "bold");
    doc.text("Datos del formulario:", margin, y);

    y += lineHeight;
    doc.setFont("helvetica", "normal");
    Object.entries(data).forEach(([key, value]) => {
        doc.text(`${key}: ${value || "No proporcionado"}`, margin, y);
        y += lineHeight;

        if (y > 280) {
            doc.addPage();
            doc.setFillColor("#3A39FF");
            doc.rect(0, 0, 210, 297, "F");
            doc.setTextColor("#FFFFFF");
            y = 20;
        }
    });

    // Descargar PDF
    doc.save("briefing_creativo.pdf");
}
