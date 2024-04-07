let btnGerarPdfRomaneio = document.getElementById("gerarPdfSemFrete");

const corTituloSemFrete = "#404040"; // Cor para os títulos
const corParSemFrete = "#CCCCCC"; // Cor para linhas pares
const corImparSemFrete = "#FFFFFF"; // Cor para linhas ímpares
const largurasColunasSemFrete = [70,70,70]; // Largura das colunas em ordem
const titulosTabelaSemFrete = ["Dtc", "Cte", "Remetente", "Destinatário",
                       "Destino","Nf's","Vols","Peso","Cubagem",
                        "Valor NF","Tipo Frete"];

btnGerarPdfRomaneio.addEventListener("click",()=>{
    geraPdfRomaneio();
})                        

const geraPdfRomaneio = () => {

    // Criar instância do objeto jsPDF
    const doc = new jsPDF();

    // URL da imagem que você deseja inserir
    let imageUrl = 'logo.png';

    // Dimensões do retângulo
    const rectWidth = doc.internal.pageSize.getWidth()/3 //100;
    const rectHeight = 30;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const rectX = (pageWidth - rectWidth) / 2; // Centraliza horizontalmente
    const rectY = (pageHeight - rectHeight) / 2; // Centraliza verticalmente

    const rectRightX = pageWidth - rectWidth - 10; // Alinhado à direita, com uma margem de 10 unidades
    const rectLeftX = 10; // Alinhado à esquerda, com uma margem de 10 unidades


    // Função para carregar uma imagem
    function loadImage(url, callback) {
        var image = new Image();
        image.onload = function() {
            callback(image);
        };
        image.src = url;
    }

    // Carregar a imagem e inseri-la no documento PDF
    loadImage(imageUrl, function(image) {
        // Dimensões do retângulo
        const rectImgWidth = 45;
        const rectImgHeight = 30;
        const rectImgX = 5;
        const rectImgY = 5;

        // Calcular a escala para ajustar a imagem ao retângulo
        var scale = Math.min(rectImgWidth / image.width, rectImgHeight / image.height);

        // Calcular as novas dimensões da imagem
        var newWidth = image.width * scale;
        var newHeight = image.height * scale;

        // Calcular coordenadas X e Y para centralizar a imagem dentro do retângulo
        var x = rectImgX + (rectImgWidth - newWidth) / 2; // Centraliza horizontalmente dentro do retângulo
        var y = rectImgY + (rectImgHeight - newHeight) / 2; // Centraliza verticalmente dentro do retângulo

        // Insira o retângulo
        doc.rect(rectImgX, rectImgY, rectImgWidth, rectImgHeight);

        // Insira a imagem dentro do retângulo
        doc.addImage(image, 'JPG', x, y, newWidth, newHeight);

        // Gerar Blob a partir do PDF
        const pdfBlob = doc.output("bloburl");

        // Abrir o PDF em outra aba
        window.open(pdfBlob, "_blank");
    });

    doc.rect(rectX-10, 5, rectWidth-10, rectHeight);

    doc.rect(rectRightX, 5, rectWidth, rectHeight);
};

        // const jsonManifesto={
        //     numManifesto:15,
        //     emissor:"Serafim Transportes de Cargas Ltda",
        //     enderecoOrigem:"Rua Nove Veneza",
        //     numOrigem:"172",
        //     bairroOrigem:"Cumbica",
        //     cidadeOrigem:"Guarulhos",
        //     ufOrigem:"SP",
        //     destinatario:"Serafim Transportes de Cargas Ltda",
        //     enderecoDestinatario:"Rua Nova Veneza",
        //     numDestinatario:"179",
        //     bairroDestinatario:"Teste",
        //     cidadeDestinatario:"Teresina",
        //     ufDestinatario:"PI",
        //     dataSaida:"17/10/2007",
    
        //     veiculo:"AWY1749",
        //     carreta:"AES5762",
        //     motorista:"Edson Tomas da Silva",
        //     cpfMotorista: "307.843.158-41",
        //     foneMotorista:"11-96926-2277",
        //     liberacaoMotorista:"624446",
        //     lacres:"10/20/30/40/50/60/70/80/90/100"
        // };




        // // Definir coordenadas iniciais da tabela
        // // let x = 5;
        // // let y = 7;

        // // Definir altura das linhas
        // const lineHeight = 7;

        // // Função para adicionar títulos da tabela
        // const adicionarTitulos = () => {
        //     // for (let i = 0; i < titulosTabelaSemFrete.length; i++) {
        //     //     const titulo = titulosTabelaSemFrete[i];
        //     //     const larguraColuna = largurasColunasSemFrete[i];

        //     //     // Adicionar retângulo colorido para o título
        //     //     doc.setFillColor(corTituloSemFrete);
        //     //     doc.rect(x, y, larguraColuna, lineHeight, 'F');

        //     //     // Adicionar texto do título dentro da célula
        //     //     doc.setTextColor(255, 255, 255); // Cor branca para texto do título
        //     //     doc.text(titulo, x + 2, y + 5); // Ajuste de margem para o texto

        //     //     // Atualizar posição x para a próxima coluna
        //     //     x += larguraColuna;
        //     // }
        //     // // Atualizar coordenada y para a próxima linha
        //     // y += lineHeight; // Ajuste de margem para a próxima linha
        // };

        // // Adicionar títulos da tabela
        // adicionarTitulos();

        // // doc.text(`Lacres ${jsonManifesto.lacres}`, 7, y + 5); // Ajuste de margem para o texto