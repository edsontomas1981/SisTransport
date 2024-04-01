let btnPrintContrato = document.getElementById('btnPrintContrato')

btnPrintContrato.addEventListener('click',()=>{
    gerarPDF()
})

function gerarPDF() {
    const doc = new jsPDF();
    const jsonData = [
        { nome: "Exemplo 1", descricao: "Descrição do Exemplo 1" },
        { nome: "Exemplo 2", descricao: "Descrição do Exemplo 2" },
        { nome: "Exemplo 3", descricao: "Descrição do Exemplo 3" }
    ];

    let y = 10;
    jsonData.forEach(item => {
        doc.text(`Nome: ${item.nome}`, 10, y);
        doc.text(`Descrição: ${item.descricao}`, 10, y + 10);
        y += 20;
    });

    // Gerar Blob a partir do PDF
    const pdfBlob = doc.output("bloburl");

    // Abrir o PDF em outra aba
    window.open(pdfBlob, "_blank");
}