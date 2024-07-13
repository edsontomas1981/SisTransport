let btnImprimirCotacao = document.getElementById('btnImprimirCotacao');
if (btnImprimirCotacao) {
    btnImprimirCotacao.addEventListener('click', generatePDF);
} else {
    console.error('Elemento "btnImprimirCotacao" não encontrado');
}



const jsonDadosCabecalhoRomaneio = {}

const geraDadosEmissor = (dados)=>{
  jsonDadosCabecalhoRomaneio.numManifesto = dados?.manifesto?.id ?? ''; // Verificação adicionada
  jsonDadosCabecalhoRomaneio.motorista = dados?.manifesto?.motoristas?.[0]?.parceiro_fk?.raz_soc ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.principalPlaca = dados?.manifesto?.veiculos?.[0]?.placa ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.secundariaPlaca = dados?.manifesto?.veiculos?.length > 1 ? (dados?.manifesto?.veiculos?.[1]?.placa ?? '') : ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.emissor = dados?.manifesto?.emissor_fk?.razao ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.cnpj = dados?.manifesto?.emissor_fk?.cnpj ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.inscrEmissor = dados?.manifesto?.emissor_fk?.inscricao_estadual ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.enderecoEmissor = dados?.manifesto?.emissor_fk?.endereco?.logradouro ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.numEmissor = dados?.manifesto?.emissor_fk?.endereco?.numero ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.complementoEmissor = dados?.manifesto?.emissor_fk?.endereco?.complemento ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.bairroEmissor = truncateString((dados?.manifesto?.emissor_fk?.endereco?.bairro ?? ''),33); // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.cidadeEmissor = dados?.manifesto?.emissor_fk?.endereco?.cidade ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.ufEmissor = dados?.manifesto?.emissor_fk?.endereco?.uf ?? ''; // Verificações adicionadas
  jsonDadosCabecalhoRomaneio.foneEmissor = dados?.manifesto?.emissor_fk?.telefone ?? ''; // Verificações adicionadas
}

function addTextWithLabel(doc, label, text, x, y) {
    doc.setFont(undefined, 'bold');
    doc.text(label, x, y);
    doc.setFont(undefined, 'normal');
    doc.text(text, x + 40, y);
}

function alinhaTextoDireita(doc, text, startY, fontSize = 12) {
  // Define a fonte e o tamanho da fonte
  doc.setFontSize(fontSize);
  
  // Obtenha a largura da página
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Obtenha a largura do texto
  const textWidth = doc.getTextWidth(text);
  
  // Calcule a posição X para alinhar o texto à direita
  const startX = pageWidth - textWidth;
  
  // Adicione o texto ao documento na posição calculada
  doc.text(text, startX-10, startY);
}


async function generatePDF () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    geraDadosEmissor({})

    // URL da imagem que você deseja inserir
    let imageUrl = "/static/images/emissorImages/logo.png";

    const rectWidth = 30;
    const rectHeight = 25;

    // Dimensões do retângulo
    const pageWidth = doc.internal.pageSize.getWidth();

    const rectRightX = pageWidth - rectWidth - 10; // Alinhado à direita, com uma margem de 10 unidades
    const rectLeftX = 10; // Alinhado à esquerda, com uma margem de 10 unidades

    const toBase64 = async(url)=> {
      let response = await fetch(url);
      let blob = await response.blob();
      return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
      });
    }

    let base64Image = await toBase64(imageUrl);

    // Calculando novas dimensões da imagem
    let newWidth = rectWidth;
    let newHeight = rectHeight;

    // Verifica se a largura da imagem é maior que a largura do retângulo
    if (newWidth > rectWidth) {
        newHeight = (newHeight * rectWidth) / newWidth;
        newWidth = rectWidth;
    }

    // Verifica se a altura da imagem é maior que a altura do retângulo
    if (newHeight > rectHeight) {
        newWidth = (newWidth * rectHeight) / newHeight;
        newHeight = rectHeight;
    }

    // Calcula a posição para centralizar a imagem no retângulo
    let x = (rectWidth - newWidth) / 2;
    let y = (rectHeight - newHeight) / 2;

    // Função para calcular a largura do texto
    function getTextWidth(text, fontSize) {
        doc.setFontSize(fontSize);
        return doc.getTextWidth(text);
    }

const addTitulo = ()=>{    // Insira a imagem dentro do retângulo
    doc.addImage(base64Image, 'JPEG', 3 + x, 3 + y, newWidth, newHeight);

    doc.setFontSize(16)
    doc.text(`${jsonDadosCabecalhoRomaneio.emissor}`,40,10)
    doc.setFontSize(10)
    doc.text(`Cnpj ${jsonDadosCabecalhoRomaneio.cnpj} Inscrição Estadual ${jsonDadosCabecalhoRomaneio.inscrEmissor}`,40,15)

    if(jsonDadosCabecalhoRomaneio.complementoEmissor){
        doc.text(`${jsonDadosCabecalhoRomaneio.enderecoEmissor}, ${jsonDadosCabecalhoRomaneio.numEmissor} , ${jsonDadosCabecalhoRomaneio.complementoEmissor} , ${jsonDadosCabecalhoRomaneio.bairroEmissor}`,40,20)
    }else{
        doc.text(`${jsonDadosCabecalhoRomaneio.enderecoEmissor}, ${jsonDadosCabecalhoRomaneio.numEmissor} , ${jsonDadosCabecalhoRomaneio.bairroEmissor}`,40,20)
    }
    doc.text(`${jsonDadosCabecalhoRomaneio.cidadeEmissor}-${jsonDadosCabecalhoRomaneio.ufEmissor} | ${jsonDadosCabecalhoRomaneio.foneEmissor}`,40,25)

    // Calcular a largura do texto
    let textWidth = getTextWidth(`Romaneio nº : ${jsonDadosCabecalhoRomaneio.numManifesto}`, 12);

    // Calcular a posição X para centralizar o texto
    let textX = (pageWidth - textWidth) / 2;

    doc.text(`Cotação nº : ${jsonDadosCabecalhoRomaneio.numManifesto}`, rectRightX, 10);

    // Calcular o comprimento do texto
    let textoMotorista = `Nome Motorista: ${jsonDadosCabecalhoRomaneio.motorista}`

    let alinhaDireita = 207-getTextWidth(textoMotorista,10) 
    // Desenhar o texto
    doc.setFontSize(9);
    doc.line(2, 33, 205, 33);
    doc.text(`Nome Motorista: ${jsonDadosCabecalhoRomaneio.motorista}`, alinhaDireita, 41);}
    
    // let dadosRomaneio = await handlerDadosRomaneio()
    let tamanhoTextWidth
    addTitulo();



    // Gerar Blob a partir do PDF
    const pdfBlob = doc.output("bloburl");

    // Abrir o PDF em outra aba
    window.open(pdfBlob, "_blank");
}

