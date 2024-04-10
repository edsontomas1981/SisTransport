let btnGerarPdfRomaneio = document.getElementById("gerarPdfSemFrete");

btnGerarPdfRomaneio.addEventListener("click",async()=>{
    let idManifesto = document.getElementById('spanNumManifesto').textContent
    let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':idManifesto});
    console.log(response.documentos)
    // geraPdfRomaneio();
})                        

const geraPdfRomaneio = async() => {

    const jsonDados = {
        numManifesto:125,
        motorista:"Edson Tomas",
        principalPlaca:"AWY1749",
        secundariaPlaca:"AWY1750",
        emissor:"Empresa de Teste Ltda",
        cnpj:"30.784.315/0008-41",
        inscrEmissor:"320799190",
        enderecoEmissor:"Rua Nova Veneza",
        numEmissor:"172",
        complementoEmissor:"Anexo 1",
        bairroEmissor:"Cumbica",
        cidadeEmissor:"Guarulhos",
        ufEmissor:"SP",
        foneEmissor:"(11)96926-2277"
    }
    
    const doc = new jsPDF();
    
    // URL da imagem que você deseja inserir
    let imageUrl = 'logo.png';

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
    doc.text(`${jsonDados.emissor}`,40,10)
    doc.setFontSize(10)
    doc.text(`Cnpj ${jsonDados.cnpj} Inscrição Estadual ${jsonDados.inscrEmissor}`,40,15)

    if(jsonDados.complementoEmissor){
        doc.text(`${jsonDados.enderecoEmissor}, ${jsonDados.numEmissor} , ${jsonDados.complementoEmissor} , ${jsonDados.bairroEmissor}`,40,20)
    }else{
        doc.text(`${jsonDados.enderecoEmissor}, ${jsonDados.numEmissor} , ${jsonDados.bairroEmissor}`,40,20)
    }
    doc.text(`${jsonDados.cidadeEmissor}-${jsonDados.ufEmissor} | ${jsonDados.foneEmissor}`,40,25)

    // Calcular a largura do texto
    let textWidth = getTextWidth(`Romaneio nº : ${jsonDados.numManifesto}`, 12);

    // Calcular a posição X para centralizar o texto
    let textX = (pageWidth - textWidth) / 2;

    doc.text(`Romaneio nº : ${jsonDados.numManifesto}`, rectRightX, 10);

    // Calcular o comprimento do texto
    let textoMotorista = `Nome Motorista: ${jsonDados.motorista}`

    let alinhaDireita = 207-getTextWidth(textoMotorista,10) 
    // Desenhar o texto
    doc.setFontSize(9);
    doc.line(2, 35, 205, 35);
    doc.text(`Nome Motorista: ${jsonDados.motorista}`, alinhaDireita, 40);}

    let tamanhoTextWidth
    if(jsonDados.secundariaPlaca){
        let tamanhoTextWidth = getTextWidth(`Placa : ${jsonDados.principalPlaca} 
                                Carreta : ${jsonDados.secundariaPlaca}`, 10);
        textX = (pageWidth - tamanhoTextWidth) - 10;
        doc.text(`Placa : ${jsonDados.principalPlaca} 
Carreta : ${jsonDados.secundariaPlaca}`, rectRightX, 15);
    }else{
        tamanhoTextWidth = getTextWidth(`Placa : ${jsonDados.principalPlaca}`, 10);
        textX = (pageWidth - tamanhoTextWidth) - 10;
        doc.text(`Placa : ${jsonDados.principalPlaca}`, rectRightX, 38);
    }

    addTitulo();

    let xDados = 5
    let yDados = 50
    doc.setFontSize(9)    
    dados.forEach(e => {
        const alturaNecessaria = 35; // Defina a altura necessária para os dados de cada item
        let alturaDocumento = doc.internal.pageSize.getHeight();

        if ((yDados+alturaNecessaria)>alturaDocumento) {
            doc.addPage();
            addTitulo();
            let tamanhoTextWidth
            if(jsonDados.secundariaPlaca){
                let tamanhoTextWidth = getTextWidth(`Placa : ${jsonDados.principalPlaca} 
                                        Carreta : ${jsonDados.secundariaPlaca}`, 10);
                textX = (pageWidth - tamanhoTextWidth) - 10;
                doc.text(`Placa : ${jsonDados.principalPlaca}\nCarreta : ${jsonDados.secundariaPlaca}`, rectRightX, 15);
            }else{
                tamanhoTextWidth = getTextWidth(`Placa : ${jsonDados.principalPlaca}`, 10);
                textX = (pageWidth - tamanhoTextWidth) - 10;
                doc.text(`Placa : ${jsonDados.principalPlaca}`, rectRightX, 38);
            }

            doc.setFontSize(9)
            xDados = 5
            yDados = 50
        }

        doc.line(xDados-3, yDados-7, 205, yDados-7);
        doc.text(`DTC Nº ${e.dtcNum}`,xDados,yDados)
        yDados += 5
        doc.text(`Tomador : ${e.tomador}       Fone : ${e.fone}`,xDados,yDados)
        yDados += 5
        if(e.complemento){
            doc.text(`Endereço : ${e.logradouro}, ${e.numLogradouro} , - ${e.complemento} - ${e.bairro} `,xDados,yDados)
        }else{
            doc.text(`Endereço : ${e.logradouro}, ${e.numLogradouro}  - ${e.bairro} `,xDados,yDados)
        }
        yDados += 5
        doc.text(`Nf's : ${e.notasFiscais} | Volumes : ${e.volume} |  Peso : ${e.peso}`,xDados,yDados)

        yDados += 5
        doc.text(`Horário de chegada : ______:______ | Horário de saída : ______:______`,xDados,yDados);
        
        doc.rect(rectRightX-10, yDados-25, rectWidth+12, rectHeight+5);
        doc.text(`Carimbo ou Assinatura`,rectRightX-5,yDados-20);

        // Adicionando o texto sobre o recibo referente ao adiantamento
        const mascaraData = "______/______/________";
        
        doc.text(mascaraData, rectRightX-7, yDados);

        
        yDados += 13;
    
        });


        var totalPages = doc.internal.getNumberOfPages();

        console.log(totalPages)

        const currentPageInfo = doc.internal.getCurrentPageInfo();
        const currentPageNumber = currentPageInfo.pageNumber;
        console.log("Página atual:", currentPageNumber);

        doc.text(`${currentPageNumber}/${totalPages}`,200,12)


        // Gerar Blob a partir do PDF
        const pdfBlob = doc.output("bloburl");

        // Abrir o PDF em outra aba
        window.open(pdfBlob, "_blank");
};



let dados = [
    {
        dtcNum:1,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
        fone:"(11)96926-2277",numLogradouro:172,
        complemento:"Anexo 1",
        bairro:"Cid Indl Satélite de Sao Paulo",
        cidade:"Guarulhos",
        uf:"SP",
        notasFiscais:"10/20/30",
        volume:10,
        peso:120,
    },
 {
    dtcNum:2,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
  },
  {
    dtcNum:3,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
  },
  {
    dtcNum:4,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
  },    
  {
    dtcNum:5,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
    dtcNum:6,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
    dtcNum:7,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
    dtcNum:8,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},      

{
    dtcNum:9,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
dtcNum:10,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},
{
dtcNum:11,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},
{
dtcNum:12,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},      

{
    dtcNum:13,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
dtcNum:14,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},
{
dtcNum:15,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},
{
dtcNum:16,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},      

{
    dtcNum:17,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
dtcNum:18,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},
{
dtcNum:19,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},
{
dtcNum:20,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},      


]
