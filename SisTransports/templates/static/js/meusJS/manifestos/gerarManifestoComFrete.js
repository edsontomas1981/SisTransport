let btnGeraManifestoComFrete = document.getElementById("gerarPdfComFrete")

const dadosTabela = [
    ["455088", "253600", "Mercante Brasil Equipamentos","Serafim Transportes de cargas Ltda","MA-SÃO LUIS","23213/120946/35566","9999","99999","99999","9.999.999,99","99.999,99","CIF"],
];
const corTitulo = "#404040"; // Cor para os títulos
const corPar = "#CCCCCC"; // Cor para linhas pares
const corImpar = "#FFFFFF"; // Cor para linhas ímpares
const largurasColunas = [15, 15, 35,35,29,36,18,18,20,22,20,22]; // Largura das colunas em ordem
const titulosTabela = ["Dtc", "Cte", "Remetente", "Destinatário",
                       "Destino","Nf's","Vols","Peso","Cubagem",
                        "Valor NF","Frete","Tipo Frete"];

btnGeraManifestoComFrete.addEventListener("click",async()=>{
    let idManifesto = document.getElementById('spanNumManifesto').textContent
    let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':idManifesto});
    gerarPdfComFrete(preparaImpressaoManifesto(response.documentos),titulosTabela,largurasColunas,corTitulo,corPar,corImpar);
})


/**
 * Função para gerar e exibir um PDF com uma tabela.
 * @param {Array} dadosTabela - Array bidimensional contendo os dados da tabela.
 * @param {Array} titulosTabela - Array contendo os títulos das colunas da tabela.
 * @param {Array} largurasColunas - Array contendo as larguras das colunas da tabela.
 * @param {string} corTitulo - Cor dos títulos da tabela.
 * @param {string} corPar - Cor das linhas pares da tabela.
 * @param {string} corImpar - Cor das linhas ímpares da tabela.
 */
const gerarPdfComFrete = (dadosTabela, titulosTabela, largurasColunas, corTitulo,
                  corPar, corImpar) => {

    // Criar instância do objeto jsPDF
    const doc = new jsPDF("landscape");

    const jsonManifesto={
      numManifesto:15,
      emissor:"Serafim Transportes de Cargas Ltda",
      enderecoOrigem:"Rua Nove Veneza",
      numOrigem:"172",
      bairroOrigem:"Cumbica",
      cidadeOrigem:"Guarulhos",
      ufOrigem:"SP",
      destinatario:"Serafim Transportes de Cargas Ltda",
      enderecoDestinatario:"Rua Nova Veneza",
      numDestinatario:"179",
      bairroDestinatario:"Teste",
      cidadeDestinatario:"Teresina",
      ufDestinatario:"PI",
      dataSaida:"17/10/2007",

      veiculo:"AWY1749",
      carreta:"AES5762",
      motorista:"Edson Tomas da Silva",
      cpfMotorista: "307.843.158-41",
      foneMotorista:"11-96926-2277",
      liberacaoMotorista:"624446",
      lacres:"10/20/30/40/50/60/70/80/90/100"
    }

    // Definir coordenadas iniciais da tabela
    let x = 5;
    let y = 7;

    // Definir altura das linhas
    const lineHeight = 7;

    // Definir fonte e tamanho para os títulos

    // Função para adicionar títulos da tabela
    const adicionarTitulos = () => {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        x = 5; // Resetar posição x
        // Definir as dimensões do retângulo
        var width = 285; // largura do retângulo
        var height = 21; // altura do retângulo
        doc.rect(x, y, width, height);
        doc.text(`Manifesto Nº: ${jsonManifesto.numManifesto} `,x+3,12);
        if(jsonManifesto.carreta){
          doc.text(` Veículo : ${jsonManifesto.veiculo} | Carreta : ${jsonManifesto.carreta}  `, x+110,12);
        }else{
          doc.text(` Placa : ${jsonManifesto.veiculo} `, x+130,12);
        }
        doc.text(` Data Saída : ${jsonManifesto.dataSaida} `, x+240,12);//${jsonManifesto.dataSaida}

        doc.text(`Origem :${jsonManifesto.emissor} Endereço ${jsonManifesto.enderecoOrigem} Nº: ${jsonManifesto.numOrigem},${jsonManifesto.bairroOrigem},${jsonManifesto.cidadeOrigem}-${jsonManifesto.ufOrigem}`, x+3,19);
        doc.text(`Destino : ${jsonManifesto.destinatario} Endereço ${jsonManifesto.enderecoDestinatario} Nº: ${jsonManifesto.numDestinatario},${jsonManifesto.bairroDestinatario},${jsonManifesto.cidadeDestinatario}-${jsonManifesto.ufDestinatario}  `, x+3,26);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.rect(x, 30, width, height/3);
        doc.text(`Motorista : ${jsonManifesto.motorista} | CPF :  ${jsonManifesto.cpfMotorista} | Fone Nº: ${jsonManifesto.foneMotorista} | Liberação : ${jsonManifesto.liberacaoMotorista}`, x+3,35);

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");

        y+=32

        // Adicionar títulos da tabela
        for (let i = 0; i < titulosTabela.length; i++) {
            const titulo = titulosTabela[i];
            const larguraColuna = largurasColunas[i];

            // Adicionar retângulo colorido para o título
            doc.setFillColor(corTitulo);
            doc.rect(x, y, larguraColuna, lineHeight, 'F');

            // Adicionar texto do título dentro da célula
            doc.setTextColor(255, 255, 255); // Cor branca para texto do título
            doc.text(titulo, x + 2, y + 5); // Ajuste de margem para o texto

            // Atualizar posição x para a próxima coluna
            x += larguraColuna;
        }
        // Atualizar coordenada y para a próxima linha
        y += lineHeight; // Ajuste de margem para a próxima linha
    };

    // Função para adicionar dados da tabela
    const adicionarDados = () => {
        // Adicionar títulos pela primeira vez
        adicionarTitulos(); // Coordenadas iniciais para os títulos

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        // Iterar sobre os dados e adicionar à tabela
        for (let i = 0; i < dadosTabela.length; i++) {
            const linha = dadosTabela[i];

            // Verificar se há espaço suficiente para adicionar outra linha
            if (y + lineHeight > doc.internal.pageSize.getHeight() - 10) {
                // Adicionar nova página
                doc.addPage();
                // Reiniciar coordenadas y
                y = 7; // 7 unidades de margem na parte superior da nova página

                // Adicionar títulos novamente na nova página
                adicionarTitulos();
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);

            }

            // Alternar entre cores para cada linha
            const cor = i % 2 === 0 ? corPar : corImpar;

            // Resetar posição x para a próxima coluna
            let x = 5;

            // Adicionar células da linha
            for (let j = 0; j < linha.length; j++) {
                const celula = linha[j];
                const larguraColuna = largurasColunas[j];

                // Adicionar retângulo colorido para a célula
                doc.setFillColor(cor);
                doc.rect(x, y, larguraColuna, lineHeight, 'F');

                // Adicionar texto dentro da célula
                doc.setTextColor(0, 0, 0); // Cor preta para texto
                doc.text(celula, x + 2, y + 5); // Ajuste de margem para o texto

                // Atualizar posição x para a próxima coluna
                x += larguraColuna;
            }

            // Mover para a próxima linha
            y += lineHeight;
        }
    };

    // Adicionar dados da tabela
    adicionarDados();

    console.log(x + " | " + y)

    doc.text(`Lacres ${jsonManifesto.lacres}`, 7, y + 5); // Ajuste de margem para o texto

    // Adicionando o texto sobre o recibo referente ao adiantamento
    const mascaraData = "___/___/_____";
    const mascaraAssinatura = "______________________________";


    doc.setFontSize(11)
    doc.text(mascaraData, 185, y + 20);
    doc.text(mascaraAssinatura, 185 + 33, y + 20);
    doc.text(`${jsonManifesto.motorista}`, 185 + 35, y+25);
    doc.text('Data', 185 + 3, y+25);


    // Gerar Blob a partir do PDF
    const pdfBlob = doc.output("bloburl");

    // Abrir o PDF em outra aba
    window.open(pdfBlob, "_blank");
};