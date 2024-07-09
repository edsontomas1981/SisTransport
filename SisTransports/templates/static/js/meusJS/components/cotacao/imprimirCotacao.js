let btnImprimirCotacao = document.getElementById('btnImprimirCotacao')

btnImprimirCotacao.addEventListener('click',generatePDF)

async function generatePDF() {
    const { jsPDF } = window.jspdf;

    if (!jsPDF) {
        console.error('Failed to load jsPDF library');
        return;
    }

    const doc = new jsPDF();

    // Logo da empresa em base64
    // const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'; // Insira aqui o logo em base64

    // Adiciona o logo da empresa
    // doc.addImage(logoBase64, 'PNG', 10, 10, 50, 30); // (imagem, formato, x, y, largura, altura)

    // Cabeçalho da empresa
    doc.setFontSize(14);
    doc.text("Nortecargas", 70, 20);
    doc.setFontSize(10);
    doc.text("Cotacao: 20839 (08/07/2024)", 70, 30);
    doc.text("Rota: S.Paulo - Bacabal - Calculado Ate PEDREIRAS (MA)", 70, 40);

    // Linha separadora
    doc.setLineWidth(0.5);
    doc.line(10, 45, 200, 45);

    // Dados do cliente
    doc.setFontSize(12);
    doc.text("Contato Cliente: 10.548.925/0001-25", 10, 60);
    doc.text("Nome: TIQUINHO BABY IND E COM ART TEXTEIS INFA", 10, 70);
    doc.text("Fone: RUA ADELINO PECHUTTI, 535,", 10, 80);
    doc.text("Email: JD. ALTO DO OURO VERDE", 10, 90);
    doc.text("Cep: 14955000 BORBOREMA - SP", 10, 100);
    doc.text("Fone:", 10, 110);

    // Linha separadora
    doc.line(10, 115, 200, 115);

    // Dados das notas fiscais
    doc.setFontSize(12);
    doc.text("Mercadoria", 10, 130);
    doc.text("Volumes", 50, 130);
    doc.text("m3", 70, 130);
    doc.text("Peso", 90, 130);
    doc.text("Peso Fat(Kgs)", 110, 130);
    doc.text("Valor NF", 150, 130);

    doc.text("7", 50, 140);
    doc.text("2,438", 70, 140);
    doc.text("83,000", 90, 140);
    doc.text("731,000", 110, 140);
    doc.text("2.626,08", 150, 140);

    // Linha separadora
    doc.line(10, 145, 200, 145);

    // Informações adicionais
    doc.text("Frete", 10, 160);
    doc.text("Peso", 30, 160);
    doc.text("Advalorem", 50, 160);
    doc.text("Despacho", 70, 160);
    doc.text("GRIS", 90, 160);
    doc.text("Pedagio", 110, 160);
    doc.text("Outros", 130, 160);

    doc.text("1.079,77", 10, 170);
    doc.text("0,00", 30, 170);
    doc.text("0,00", 50, 170);
    doc.text("0,00", 70, 170);
    doc.text("0.00", 90, 170);
    doc.text("0,00", 110, 170);

    // Linha separadora
    doc.line(10, 175, 200, 175);

    // Base de cálculo e ICMS
    doc.text("Base.Calc", 10, 190);
    doc.text("Aliq", 50, 190);
    doc.text("ICMS", 70, 190);
    doc.text("Total", 110, 190);

    doc.text("1.079,77", 10, 200);
    doc.text("7", 50, 200);
    doc.text("75,58", 70, 200);
    doc.text("1.079,77", 110, 200);

    // Linha separadora
    doc.line(10, 205, 200, 205);

    // Observações
    doc.text("Observacoes:", 10, 220);

    // Abrir PDF em uma nova aba
    doc.output('dataurlnewwindow');
}