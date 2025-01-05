function calcularTotais(dados) {
    return dados.reduce((totais, item) => {
      totais.volume += parseFloat(item.volume) || 0;
      totais.peso += parseFloat(item.peso) || 0;
      totais.m3 += parseFloat(item.m3) || 0;
      totais.valor_nf += parseFloat(item.valor_nf) || 0;
      totais.num_nf += item.num_nf ? item.num_nf + ',' : '';
      return totais;
    }, { volume: 0, peso: 0, m3: 0, valor_nf: 0 ,num_nf:''});
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
const handlerDadosRomaneio = async(idRomaneio)=>{
    let dadosRomaneio = []
    let idManifesto = idRomaneio
    let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':idManifesto});

    geraDadosEmissor(response)

    response.documentos.forEach(e => {
        let parceiro = {} 
        switch (e.ocorrencia_manifesto_fk. id) {
            case 1:
              parceiro.razSocial = e.dtc_fk.destinatario?.raz_soc || '';
              parceiro.logradouro = e.dtc_fk.coleta?.rua || '';
              parceiro.num = e.dtc_fk.coleta?.numero || '';
              parceiro.complemento = e.dtc_fk.coleta?.complemento || '';
              parceiro.bairro = e.dtc_fk.coleta?.bairro || '';
              parceiro.cidade = e.dtc_fk.coleta?.cidade || '';
              parceiro.uf = e.dtc_fk.coleta?.uf || '';
              parceiro.volumes = e.dtc_fk.coleta?.volume || '';
              parceiro.notasFiscais = e.dtc_fk.coleta?.notaFiscal || '';
              parceiro.peso = e.dtc_fk.coleta?.peso || '';
              parceiro.contato = e.dtc_fk.coleta?.contato || '';
              break;
            case 2:
              let totais = calcularTotais(e.cte?.notas_fiscais || []);
              parceiro.razSocial = e.dtc_fk.remetente?.raz_soc || '';
              parceiro.logradouro = e.dtc_fk.remetente?.endereco_fk?.logradouro || '';
              parceiro.num = e.dtc_fk.remetente?.endereco_fk?.numero || '';
              parceiro.complemento = e.dtc_fk.remetente?.endereco_fk?.complemento || '';
              parceiro.bairro = e.dtc_fk.remetente?.endereco_fk?.bairro || '';
              parceiro.cidade = e.dtc_fk.remetente?.endereco_fk?.cidade || '';
              parceiro.uf = e.dtc_fk.remetente?.endereco_fk?.uf || '';
              parceiro.volumes = totais.volume || 0;
              parceiro.notasFiscais = totais.num_nf || '';
              parceiro.peso = totais.peso || 0;
              parceiro.contato = '';
              break;
            default:
              break;
          }

        dadosRomaneio.push(
            {
            dtcNum:e.dtc_fk.id,
            razSoc:parceiro.razSocial,
            logradouro:parceiro.logradouro,
            fone:parceiro.contato,
            numLogradouro:parceiro.num,
            complemento:parceiro.complemento,
            bairro:parceiro.bairro,
            cidade:parceiro.cidade,
            uf:parceiro.uf,
            notasFiscais:parceiro.notasFiscais,
            volume:parceiro.volumes,
            peso:parceiro.peso,
        }
    )
    });

    return dadosRomaneio
}

let btnGeraRomaneio = document.getElementById("gerarPdfRomaneio")
btnGeraRomaneio.addEventListener("click",()=>{
    geraPdfRomaneio(document.getElementById('spanNumManifesto').textContent);
})

async function geraPdfRomaneio (idRomaneio) {

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

    doc.text(`Romaneio nº : ${jsonDadosCabecalhoRomaneio.numManifesto}`, rectRightX, 10);

    // Calcular o comprimento do texto
    let textoMotorista = `Nome Motorista: ${jsonDadosCabecalhoRomaneio.motorista}`

    let alinhaDireita = 207-getTextWidth(textoMotorista,10) 
    // Desenhar o texto
    doc.setFontSize(9);
    doc.line(2, 33, 205, 33);
    doc.text(`Nome Motorista: ${jsonDadosCabecalhoRomaneio.motorista}`, alinhaDireita, 41);}
    
    let dadosRomaneio = await handlerDadosRomaneio(idRomaneio)
    let tamanhoTextWidth

    if(jsonDadosCabecalhoRomaneio.secundariaPlaca){
        let tamanhoTextWidth = getTextWidth(`Placa : ${jsonDadosCabecalhoRomaneio.principalPlaca} 
Carreta : ${jsonDadosCabecalhoRomaneio.secundariaPlaca}`, 9);
        textX = (pageWidth - tamanhoTextWidth) - 10;
        doc.text(`Placa : ${jsonDadosCabecalhoRomaneio.principalPlaca} 
Carreta : ${jsonDadosCabecalhoRomaneio.secundariaPlaca}`, rectRightX, 15);
    }else{
        tamanhoTextWidth = getTextWidth(`Placa : ${jsonDadosCabecalhoRomaneio.principalPlaca}`, 9);
        textX = (pageWidth - tamanhoTextWidth) - 10;
        doc.text(`Placa : ${jsonDadosCabecalhoRomaneio.principalPlaca}`, rectRightX, 15);
    }

    addTitulo();

    let xDados = 5
    let yDados = 50
    doc.setFontSize(9)    


    dadosRomaneio.forEach(e => {
        const alturaNecessaria = 35; // Defina a altura necessária para os dados de cada item
        let alturaDocumento = doc.internal.pageSize.getHeight();

        if ((yDados+alturaNecessaria)>alturaDocumento) {
            doc.addPage();
            addTitulo();
            let tamanhoTextWidth
            if(jsonDadosCabecalhoRomaneio.secundariaPlaca){
                let tamanhoTextWidth = getTextWidth(`Placa : ${jsonDadosCabecalhoRomaneio.principalPlaca} 
                                        Carreta : ${jsonDadosCabecalhoRomaneio.secundariaPlaca}`, 10);
                textX = (pageWidth - tamanhoTextWidth) - 10;
                doc.text(`Placa : ${jsonDadosCabecalhoRomaneio.principalPlaca}\nCarreta : ${jsonDadosCabecalhoRomaneio.secundariaPlaca}`, rectRightX, 15);
            }else{
                tamanhoTextWidth = getTextWidth(`Placa : ${jsonDadosCabecalhoRomaneio.principalPlaca}`, 10);
                textX = (pageWidth - tamanhoTextWidth) - 10;
                doc.text(`Placa : ${jsonDadosCabecalhoRomaneio.principalPlaca}`, rectRightX, 37.5);
            }

            doc.setFontSize(9)
            xDados = 5
            yDados = 50
        }

        doc.line(xDados-3, yDados-7, 205, yDados-7);
        doc.text(`DTC Nº ${e.dtcNum}`,xDados,yDados)
        yDados += 5
        doc.text(`Razão Social : ${e.razSoc}       Fone : ${e.fone}`,xDados,yDados)
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

        const currentPageInfo = doc.internal.getCurrentPageInfo();
        const currentPageNumber = currentPageInfo.pageNumber;

        doc.text(`${currentPageNumber}/${totalPages}`,200,295)


        // Gerar Blob a partir do PDF
        const pdfBlob = doc.output("bloburl");

        // Abrir o PDF em outra aba
        window.open(pdfBlob, "_blank");
};




