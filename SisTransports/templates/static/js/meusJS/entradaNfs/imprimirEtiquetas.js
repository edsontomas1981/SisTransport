async function gerarEtiqueta() {
  const { jsPDF } = window.jspdf;

  // Tamanho 58mm x 40mm em pontos
  const larguraEtiqueta = 58 * 2.83465;
  const alturaEtiqueta = 40 * 2.83465;

  const doc = new jsPDF({
    orientation: "landscape",  // CORRIGIDO: horizontal
    unit: "pt",
    format: [larguraEtiqueta, alturaEtiqueta]
  });

  // Dados
  const remetente = "Loja ABC";
  const destinatario = "João da Silva";
  const volume = "2";
  const peso = "5kg";
  const cidadeDestino = "São Paulo - SP";
  const filial = "Filial 01";
  const data = new Date().toLocaleDateString();

  // Texto para QR Code
  const qrTexto = `
Remetente: ${remetente}
Destinatário: ${destinatario}
Volume: ${volume}
Peso: ${peso}
Cidade: ${cidadeDestino}
Filial: ${filial}
  `.trim();

  // Gerar QR Code
  const qr = qrcode(0, 'L');
  qr.addData(qrTexto);
  qr.make();
  const qrDataUrl = qr.createDataURL(); // PNG em base64

  // Esperar a imagem carregar
  const img = new Image();
  img.src = qrDataUrl;

  img.onload = () => {
    // Adiciona o QR Code (lado esquerdo)
    doc.addImage(img, 'PNG', 10, 20, 40, 40); // X, Y, Largura, Altura

    // Texto (ao lado do QR Code)
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(7); // CORRIGIDO: fonte menor
    const startX = 60;
    let y = 25;
    const linha = 10;

    doc.text(`Remetente: ${remetente}`, startX, y);
    doc.text(`Destinatário: ${destinatario}`, startX, y += linha);
    doc.text(`Cidade: ${cidadeDestino}`, startX, y += linha);
    doc.text(`Filial: ${filial}`, startX, y += linha);
    doc.text(`Volume: ${volume}  Peso: ${peso}`, startX, y += linha);
    doc.text(`Data: ${data}`, startX, y += linha);

    // Abrir em nova aba
    doc.output("dataurlnewwindow");
  };
}