let btnImprimirCotacao = document.getElementById('btnImprimirCotacao');
if (btnImprimirCotacao) {
	btnImprimirCotacao.addEventListener('click', async ()=>{
		let idDtc = document.getElementById('numDtc')
		if(idDtc.value ==''){
			msgErro('É Necessário selecionar um Dtc válido')
		}else{
			let response  = await connEndpoint('/comercial/cotacao/readCotacao/', {'idDtc': idDtc.value});
			if (response.status == 200){
				geraDadosImpressao(response.cotacao.cotacao.dtc)
				generatePDF()
			}
		}
	});
} else {
	console.error('Elemento "btnImprimirCotacao" não encontrado');
}


const jsonDadosCabecalhoRomaneio = {}

const geraDadosImpressao = (dados) => {
  console.log(dados)
  // Additional data mappings
  jsonDadosCabecalhoRomaneio.freteMinimo = dados?.cotacao?.tabela?.freteMinimo ?? ''; 
  jsonDadosCabecalhoRomaneio.descricao = dados?.cotacao?.tabela?.descricao ?? '';
  jsonDadosCabecalhoRomaneio.icmsIncluso = dados?.cotacao?.tabela?.icmsIncluso ?? ''; 
  jsonDadosCabecalhoRomaneio.bloqueada = dados?.cotacao?.tabela?.bloqueada ?? ''; 
  jsonDadosCabecalhoRomaneio.frete = dados?.cotacao?.tabela?.frete ?? ''; 
  jsonDadosCabecalhoRomaneio.tipoCalculo = dados?.cotacao?.tabela?.tipoCalculo ?? ''; 
  jsonDadosCabecalhoRomaneio.adValor = dados?.cotacao?.tabela?.adValor ?? ''; 
  jsonDadosCabecalhoRomaneio.gris = dados?.cotacao?.tabela?.gris ?? ''; 
  jsonDadosCabecalhoRomaneio.despacho = dados?.cotacao?.tabela?.despacho ?? ''; 
  jsonDadosCabecalhoRomaneio.outros = dados?.cotacao?.tabela?.outros ?? ''; 
  jsonDadosCabecalhoRomaneio.pedagio = dados?.cotacao?.tabela?.pedagio ?? ''; 
  jsonDadosCabecalhoRomaneio.tipoPedagio = dados?.cotacao?.tabela?.tipoPedagio ?? ''; 
  jsonDadosCabecalhoRomaneio.cubagem = dados?.cotacao?.tabela?.cubagem ?? ''; 
  jsonDadosCabecalhoRomaneio.fatorCubagem = dados?.cotacao?.tabela?.fatorCubagem ?? ''; 
  jsonDadosCabecalhoRomaneio.tipoTabela = dados?.cotacao?.tabela?.tipoTabela ?? ''; 
  jsonDadosCabecalhoRomaneio.aliquotaIcms = dados?.cotacao?.tabela?.aliquotaIcms ?? ''; 

  jsonDadosCabecalhoRomaneio.idDtc = dados?.id ?? '';
  jsonDadosCabecalhoRomaneio.tipoFrete = dados?.tipoFrete ?? '';
  jsonDadosCabecalhoRomaneio.usuarioCadastro = dados?.usuario_cadastro ?? '';
  jsonDadosCabecalhoRomaneio.usuarioUltimaAtualizacao = dados?.usuario_ultima_atualizacao ?? '';
  jsonDadosCabecalhoRomaneio.dataCadastro = dados?.data_cadastro ?? '';
  jsonDadosCabecalhoRomaneio.dataUltimaAtualizacao = dados?.data_ultima_atualizacao ?? '';
  jsonDadosCabecalhoRomaneio.notasFiscais = dados?.notas_fiscais ?? [];
  jsonDadosCabecalhoRomaneio.tomador = dados?.tomador ?? {};
  jsonDadosCabecalhoRomaneio.remetente = dados?.remetente ?? {};
  jsonDadosCabecalhoRomaneio.destinatario = dados?.destinatario ?? {};
  jsonDadosCabecalhoRomaneio.coleta = dados?.coleta ?? {};
  jsonDadosCabecalhoRomaneio.rota = dados?.rota ?? {};

  jsonDadosCabecalhoRomaneio.idCotacao = dados?.cotacao?.id ?? '';
  jsonDadosCabecalhoRomaneio.numNf = dados?.cotacao?.numNf ?? '';
  jsonDadosCabecalhoRomaneio.peso = dados?.cotacao?.peso ?? '';
  jsonDadosCabecalhoRomaneio.qtde = dados?.cotacao?.qtde ?? '';
  jsonDadosCabecalhoRomaneio.pesoFaturado = dados?.cotacao?.pesoFaturado ?? '';
  jsonDadosCabecalhoRomaneio.vlrNf = dados?.cotacao?.vlrNf ?? '';
  jsonDadosCabecalhoRomaneio.vlrColeta = dados?.cotacao?.vlrColeta ?? '';
  jsonDadosCabecalhoRomaneio.m3 = dados?.cotacao?.m3 ?? '';
  jsonDadosCabecalhoRomaneio.tipoMercadoria = dados?.cotacao?.tipoMercadoria ?? '';
  jsonDadosCabecalhoRomaneio.formaDeCalculo = dados?.cotacao?.formaDeCalculo ?? '';
  jsonDadosCabecalhoRomaneio.totalFrete = dados?.cotacao?.totalFrete ?? '';
  jsonDadosCabecalhoRomaneio.freteValor = dados?.cotacao?.freteValor ?? '';
  jsonDadosCabecalhoRomaneio.adValor = dados?.cotacao?.adValor ?? '';
  jsonDadosCabecalhoRomaneio.gris = dados?.cotacao?.gris ?? '';
  jsonDadosCabecalhoRomaneio.despacho = dados?.cotacao?.despacho ?? '';
  jsonDadosCabecalhoRomaneio.outros = dados?.cotacao?.outros ?? '';
  jsonDadosCabecalhoRomaneio.pedagio = dados?.cotacao?.pedagio ?? '';
  jsonDadosCabecalhoRomaneio.baseDeCalculo = dados?.cotacao?.baseDeCalculo ?? '';
  jsonDadosCabecalhoRomaneio.aliquota = dados?.cotacao?.aliquota ?? '';
  jsonDadosCabecalhoRomaneio.icmsRS = dados?.cotacao?.icmsRS ?? '';
  jsonDadosCabecalhoRomaneio.icmsIncluso = dados?.cotacao?.icmsIncluso ?? '';
  jsonDadosCabecalhoRomaneio.nome = dados?.cotacao?.nome ?? '';
  jsonDadosCabecalhoRomaneio.observacao = dados?.cotacao?.observacao ?? '';
  jsonDadosCabecalhoRomaneio.contato = dados?.cotacao?.contato ?? '';
  jsonDadosCabecalhoRomaneio.usuario = dados?.cotacao?.usuario ?? '';
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
  const startX = 10;
  
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
    doc.addImage(base64Image, 'JPEG', 3 + x, 3 + y, newWidth, newHeight);
    alinhaTextoDireita(doc,`Cotação nº : ${jsonDadosCabecalhoRomaneio.idDtc}`,16,15)
  }

  let tamanhoTextWidth
  addTitulo();
  doc.setFontSize(12);
  alinhaTextoEsquerda(doc,`Tomador : ${truncateString(jsonDadosCabecalhoRomaneio.tomador.raz_soc,30)} `, 35, 11);
  alinhaTextoMeioParaDireita(doc,`Tomador : ${jsonDadosCabecalhoRomaneio.tomador.raz_soc} `, 35, 11);
  

  
  // Set table options
  const options = {
    startY: 50, // Adjust the height where the table starts
    startX:3,
    styles: {
        fillColor: [220, 220, 220], // Change table color (RGB)
      textColor: [0 , 0 ,0], // Change text color
        fontSize: 12
    },
    headStyles: {
        fillColor: [120, 120, 120] // Change header color
    }
  };

  // Define the columns and rows for the table
  const columns = ["ID", "Name", "Country"];
  const rows = [
      [1, "John Doe", "USA"],
      [2, "Anna Smith", "Canada"],
      [3, "Peter Johnson", "UK"],
  ];

  // Add the table to the PDF
  doc.autoTable({
      head: [columns],
      body: rows,
      //... sao spreads operators (operadores que pegam um array e espalham aqui dentro)
      ...options
  });
  // Gerar Blob a partir do PDF
  const pdfBlob = doc.output("bloburl");

  // Abrir o PDF em outra aba
  window.open(pdfBlob, "_blank");
}

