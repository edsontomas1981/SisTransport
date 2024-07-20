let btnImprimirCotacao = document.getElementById('btnImprimirCotacao');
if (btnImprimirCotacao) {
  btnImprimirCotacao.addEventListener('click', async () => {
      let idDtc = document.getElementById('numDtc');
      if (idDtc.value === '') {
          msgErro('Por favor, selecione um Dtc válido.');
      } else {
          let response = await connEndpoint('/comercial/cotacao/readCotacao/', { 'idDtc': idDtc.value });

          switch (response.status) {
              case 200:
                  geraDadosImpressao(response.cotacao.cotacao);
                  generatePDF();
                  break;
              case 400:
                  msgErro('Não há cotação disponível para impressão.');
                  break;
              default:
                  msgErro('Erro desconhecido ao processar a solicitação.');
                  break;
          }
      }
  });
} else {
  console.error('Elemento "btnImprimirCotacao" não encontrado.');
}


const jsonDadosCabecalhoRomaneio = {}



const geraDadosImpressao = (dados) => {

  jsonDadosCabecalhoRomaneio.solicitante = dados?.solicitante ?? '';
  jsonDadosCabecalhoRomaneio.contato = dados?.contato ?? '';

  jsonDadosCabecalhoRomaneio.idDtc = dados?.dtc?.id ?? '';
  jsonDadosCabecalhoRomaneio.tipoFrete = dados?.tipoFrete ?? '';
  jsonDadosCabecalhoRomaneio.usuarioCadastro = dados?.usuario_cadastro ?? '';
  jsonDadosCabecalhoRomaneio.usuarioUltimaAtualizacao = dados?.usuario_ultima_atualizacao ?? '';
  jsonDadosCabecalhoRomaneio.dataCadastro = dados?.data_cadastro ?? '';
  jsonDadosCabecalhoRomaneio.dataUltimaAtualizacao = dados?.data_ultima_atualizacao ?? '';
  jsonDadosCabecalhoRomaneio.notasFiscais = dados?.notas_fiscais ?? [];
  jsonDadosCabecalhoRomaneio.tomador = dados?.dtc?.tomador ?? {};
  jsonDadosCabecalhoRomaneio.remetente = dados?.remetente ?? {};
  jsonDadosCabecalhoRomaneio.destinatario = dados?.destinatario ?? {};
  jsonDadosCabecalhoRomaneio.coleta = dados?.coleta ?? {};
  jsonDadosCabecalhoRomaneio.rota = dados?.rota ?? {};

  jsonDadosCabecalhoRomaneio.peso = dados?.peso ?? '';
  jsonDadosCabecalhoRomaneio.qtde = dados?.qtde ?? '';
  jsonDadosCabecalhoRomaneio.pesoFaturado = dados?.pesoFaturado ?? '';
  jsonDadosCabecalhoRomaneio.vlrNf = dados?.vlrNf ?? '';
  jsonDadosCabecalhoRomaneio.vlrColeta = dados?.vlrColeta ?? '';
  jsonDadosCabecalhoRomaneio.m3 = dados?.m3 ?? '';
  jsonDadosCabecalhoRomaneio.tipoMercadoria = dados?.tipoMercadoria ?? '';
  jsonDadosCabecalhoRomaneio.formaDeCalculo = dados?.formaDeCalculo ?? '';
  jsonDadosCabecalhoRomaneio.totalFrete = dados?.totalFrete ?? '';
  jsonDadosCabecalhoRomaneio.freteValor = dados?.freteValor ?? '';
  jsonDadosCabecalhoRomaneio.adValor = dados?.adValor ?? '';
  jsonDadosCabecalhoRomaneio.gris = dados?.gris ?? '';
  jsonDadosCabecalhoRomaneio.despacho = dados?.despacho ?? '';
  jsonDadosCabecalhoRomaneio.outros = dados?.outros ?? '';
  jsonDadosCabecalhoRomaneio.pedagio = dados?.pedagio ?? '';
  jsonDadosCabecalhoRomaneio.baseDeCalculo = dados?.baseDeCalculo ?? '';
  jsonDadosCabecalhoRomaneio.aliquota = dados?.aliquota ?? '';
  jsonDadosCabecalhoRomaneio.icmsRS = dados?.icmsRS ?? '';
  jsonDadosCabecalhoRomaneio.icmsIncluso = dados?.icmsIncluso ?? '';
  jsonDadosCabecalhoRomaneio.nome = dados?.nome ?? '';
  jsonDadosCabecalhoRomaneio.observacao = dados?.observacao ?? '';
  jsonDadosCabecalhoRomaneio.usuario = dados?.usuario ?? '';
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
  doc.text(text, startX-15, startY);
}

function alinhaTextoEsquerda(doc, text, startY, fontSize = 12) {
  // Define a fonte e o tamanho da fonte
  doc.setFontSize(fontSize);
  
  // Obtenha a largura da página
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Defina a metade da largura da página
  const halfPageWidth = pageWidth / 2;
  
  // Obtenha a largura do texto
  const textWidth = doc.getTextWidth(text);
  
  // Verifique se o texto ultrapassa a metade da página
  if (textWidth > halfPageWidth) {
      console.error("O texto é muito longo e ultrapassa a metade da página.");
      return;
  }
  
  // Defina a posição X para alinhar o texto à esquerda (começa em 10 unidades do lado esquerdo da página)
  const startX = 15;
  
  // Adicione o texto ao documento na posição calculada
  doc.text(text, startX, startY);
}

function alinhaTextoMeioParaDireita(doc, text, startY, fontSize = 12) {
  // Define a fonte e o tamanho da fonte
  doc.setFontSize(fontSize);
  
  // Obtenha a largura da página
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Defina a metade da largura da página
  const halfPageWidth = pageWidth / 2;
  
  // Obtenha a largura do texto
  const textWidth = doc.getTextWidth(text);
  
  // Verifique se o texto cabe na metade direita da página
  if (textWidth > (pageWidth - halfPageWidth)) {
      console.error("O texto é muito longo e ultrapassa a metade direita da página.");
      return;
  }
  
  // Defina a posição X para alinhar o texto a partir da metade da página
  const startX = halfPageWidth;

  // Adicione o texto ao documento na posição calculada
  doc.text(text, startX, startY);
}



async function generatePDF () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

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
    doc.addImage(base64Image, 'JPEG', 12 + x, 3 + y, newWidth, newHeight);
    alinhaTextoDireita(doc,`Cotação nº : ${jsonDadosCabecalhoRomaneio.idDtc}`,16,15)
  }

  let tamanhoTextWidth
  addTitulo();
  doc.setFontSize(12);
  alinhaTextoEsquerda(doc,`TOMADOR : ${truncateString(jsonDadosCabecalhoRomaneio.tomador.raz_soc,30)} `, 35, 9);
  alinhaTextoEsquerda(doc,`ENDEREÇO : ${truncateString(jsonDadosCabecalhoRomaneio.tomador.endereco_fk.logradouro,30)} Nº ${truncateString(jsonDadosCabecalhoRomaneio.tomador.endereco_fk.numero,30)}  `, 40, 9);
  alinhaTextoEsquerda(doc,`BAIRRO : ${truncateString(jsonDadosCabecalhoRomaneio.tomador.endereco_fk.bairro,30)} `, 45, 9);
  alinhaTextoEsquerda(doc,`CIDADE : ${truncateString(jsonDadosCabecalhoRomaneio.tomador.endereco_fk.cidade,30)} UF ${truncateString(jsonDadosCabecalhoRomaneio.tomador.endereco_fk.uf,30)}`, 50, 9);

  alinhaTextoDireita(doc,`SOLICITANTE : ${jsonDadosCabecalhoRomaneio.solicitante} `, 35, 9);
  alinhaTextoDireita(doc,`CONTATO : ${jsonDadosCabecalhoRomaneio.contato} `, 40, 9);
  // Set table options
  var options = {
    startY: 70, // Adjust the height where the table starts
    startX:3,
    styles: {
        fillColor: [220, 220, 220], // Change table color (RGB)
      textColor: [0 , 0 ,0], // Change text color
        fontSize: 11
    },
    headStyles: {
        fillColor: [120, 120, 120], // Change header color
        fontSize: 10

    }
  };

  // Tabela com dados mercadoria
  doc.text("DADOS DA MERCADORIA : ", 15, 65);
  // Define the columns and rows for the table
  const columns = ["MERCADORIA", "VOLUMES", "PESO","PESO FAT","VALOR NF R$"];
  const rows = [
      [jsonDadosCabecalhoRomaneio.tipoMercadoria,
        jsonDadosCabecalhoRomaneio.qtde,
        jsonDadosCabecalhoRomaneio.peso,
        jsonDadosCabecalhoRomaneio.pesoFaturado,
        formatarMoeda(jsonDadosCabecalhoRomaneio.vlrNf)
      ],
  ];

  // Add the table to the PDF
  doc.autoTable({
      head: [columns],
      body: rows,
      //... sao spreads operators (operadores que pegam um array e espalham aqui dentro)
      ...options
  });

  // Tabela com dados mercadoria
  options = {
    startY: 100, // Adjust the height where the table starts
    startX:3,
    styles: {
        fillColor: [220, 220, 220], // Change table color (RGB)
      textColor: [0 , 0 ,0], // Change text color
        fontSize: 11
    },
    headStyles: {
        fillColor: [120, 120, 120], // Change header color
        fontSize: 10

    }
  };

  doc.text("COMPOSIÇÃO DO FRETE : ", 15, 97);
  // Define the columns and rows for the table
  const columnsDadosFrete = ["FRETE PESO", "ADVALOREM", "DESPACHO","GRIS","PEDÁGIO","OUTROS"];
  const rowsDadosFrete = [
      [formatarMoeda(jsonDadosCabecalhoRomaneio.freteValor),
       formatarMoeda(jsonDadosCabecalhoRomaneio.adValor),
       formatarMoeda(jsonDadosCabecalhoRomaneio.despacho),
       formatarMoeda(jsonDadosCabecalhoRomaneio.gris),
       formatarMoeda(jsonDadosCabecalhoRomaneio.pedagio),
       formatarMoeda(jsonDadosCabecalhoRomaneio.outros),
       formatarMoeda(jsonDadosCabecalhoRomaneio.vlrNf)
      ],
  ];

  // Add the table to the PDF
  doc.autoTable({
      head: [columnsDadosFrete],
      body: rowsDadosFrete,
      //... sao spreads operators (operadores que pegam um array e espalham aqui dentro)
      ...options
  });

    // Tabela com dados mercadoria
    options = {
      startY: 130, // Adjust the height where the table starts
      startX:3,
      styles: {
          fillColor: [220, 220, 220], // Change table color (RGB)
        textColor: [0 , 0 ,0], // Change text color
          fontSize: 11
      },
      headStyles: {
          fillColor: [120, 120, 120], // Change header color
          fontSize: 10
  
      }
    };
  
    doc.text("TOTAIS : ", 15, 127);
    // Define the columns and rows for the table
    const columnsTotaisFrete = ["BASE CALC", "ALIQUOTA", "ICMS","TOTAL FRETE"];
    const rowsTotaisFrete = [
        [formatarMoeda(jsonDadosCabecalhoRomaneio.baseDeCalculo),
          formatarMoeda(jsonDadosCabecalhoRomaneio.aliquota),
          formatarMoeda(jsonDadosCabecalhoRomaneio.icmsRS),
          formatarMoeda(jsonDadosCabecalhoRomaneio.totalFrete),
        ],
    ];
  
    // Add the table to the PDF
    doc.autoTable({
        head: [columnsTotaisFrete],
        body: rowsTotaisFrete,
        //... sao spreads operators (operadores que pegam um array e espalham aqui dentro)
        ...options
    });
    doc.text("OBSERVAÇÕES : ", 15, 157);
    doc.text(`${jsonDadosCabecalhoRomaneio.observacao}`, 15, 167);



  // Gerar Blob a partir do PDF
  const pdfBlob = doc.output("bloburl");

  // Abrir o PDF em outra aba
  window.open(pdfBlob, "_blank");
}

