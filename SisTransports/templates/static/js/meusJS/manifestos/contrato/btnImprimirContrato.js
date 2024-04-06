let btnPrintContrato = document.getElementById('btnPrintContrato')

btnPrintContrato.addEventListener('click',()=>{
    gerarPdfContrato(carregaJsonDados())
})
const carregaJsonDados = async()=>{
    let spanNumManifesto=document.getElementById('spanNumManifesto')
    let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':spanNumManifesto.textContent});
    return {
        id:response.manifesto.id,
        data:formataData(response.manifesto.data_previsão_inicio),
        origem:response.manifesto.rota_fk.origemCidade + " - " + response.manifesto.rota_fk.origemUf,
        destino:response.manifesto.rota_fk.destinoCidade + " - " + response.manifesto.rota_fk.destinoUf,
    
        contratante:response.manifesto.emissor_fk.razao,
        cnpjContratante:response.manifesto.emissor_fk.cnpj,
        foneContratante:response.manifesto.emissor_fk.telefone,
        ruaContratante:response.manifesto.emissor_fk.endereco.logradouro,
        numeroContratante:response.manifesto.emissor_fk.endereco.numero,
        bairroContratante:response.manifesto.emissor_fk.endereco.bairro,
        cidadeContratante:response.manifesto.emissor_fk.endereco.cidade,
        ufContratante:response.manifesto.emissor_fk.endereco.uf,
    
        contratado:response.manifesto.veiculos[0].proprietario_fk.parceiro_fk.raz_soc,
        cpfCnpjContratado:response.manifesto.veiculos[0].proprietario_fk.parceiro_fk.cnpj_cpf,
        foneContratado:response.manifesto.veiculos[0].proprietario_fk.parceiro_fk.endereco_fk.cep,
        ruaContratado:response.manifesto.veiculos[0].proprietario_fk.parceiro_fk.endereco_fk.logradouro,
        numeroContratado:response.manifesto.veiculos[0].proprietario_fk.parceiro_fk.endereco_fk.numero,
        bairroContratado:response.manifesto.veiculos[0].proprietario_fk.parceiro_fk.endereco_fk.bairro,
        cidadeContratado:response.manifesto.veiculos[0].proprietario_fk.parceiro_fk.endereco_fk.cidade,
        ufContratado:response.manifesto.veiculos[0].proprietario_fk.parceiro_fk.endereco_fk.uf,
    
        motorista:response.manifesto.motoristas[0].parceiro_fk.raz_soc,
        cpfMotorista:response.manifesto.motoristas[0].parceiro_fk.cnpj_cpf,
        foneMotorista:response.manifesto.motoristas[0].parceiro_fk.endereco_fk.cep,
        ruaMotorista:response.manifesto.motoristas[0].parceiro_fk.endereco_fk.logradouro,
        numeroMotorista:response.manifesto.motoristas[0].parceiro_fk.endereco_fk.numero,
        bairroMotorista:response.manifesto.motoristas[0].parceiro_fk.endereco_fk.bairro,
        cidadeMotorista:response.manifesto.motoristas[0].parceiro_fk.endereco_fk.cidade,
        ufMotorista:response.manifesto.motoristas[0].parceiro_fk.endereco_fk.uf,
    
        freteContratado:response.manifesto.contrato_fk.frete_contratado,
    
        irFonte:response.manifesto.contrato_fk.ir_retido,
        inss:response.manifesto.contrato_fk.inss,
        iss:response.manifesto.contrato_fk.iss,
        pedagio:response.manifesto.contrato_fk.valor_pedagio,
        sestSenat:response.manifesto.contrato_fk.sest_senat,
        totalDescontos:response.manifesto.contrato_fk.total_descontos,
        adiantamento:response.manifesto.contrato_fk.adiantamento,
        saldoAReceber:response.manifesto.contrato_fk.frete_a_pagar,

        observacao:response.manifesto.contrato_fk.contrato_obs,
    
        placa:response.manifesto.veiculos[0].placa,
        marca:response.manifesto.veiculos[0].marca,
        modelo:response.manifesto.veiculos[0].modelo,
        cor:response.manifesto.veiculos[0].cor,
        ano:response.manifesto.veiculos[0].ano,
    
        previsaoDeChegada:formataData(response.manifesto.data_previsão_chegada),
    }
}


const gerarPdfContrato=async (dados)=> {

    let jsonDados = await dados

    const doc = new jsPDF();

    let y = 10;      
    var x = 10; // coordenada x do canto superior esquerdo

    // Cabeçalho
    // Definir as dimensões do retângulo
    var width = 196; // largura do retângulo
    var height = 7; // altura do retângulo

    // Desenhar o retângulo
    doc.rect(x, y, width, height);
    doc.setFontSize(11); // Altere o tamanho conforme necessário
    doc.text(`Contrato de Frete Nº: ${jsonDados.id}`, x+3,15);
    doc.text(`Data : ${jsonDados.data}`, 170,15);

    // doc.rect(x, y+10, width, height);
    doc.line(10, 20, 205, 20); // As coordenadas são (x1, y1, x2, y2)
    doc.text(`Origem: ${jsonDados.origem}`, x+3,26);
    doc.text(`Destino : ${jsonDados.destino}`, 150,26);
    doc.line(10, 30, 205, 30); // As coordenadas são (x1, y1, x2, y2)

    // Contratante
    doc.rect(x, y+23, width, height);
    doc.text(`Contratante: ${jsonDados.contratante} | CNPJ : ${jsonDados.cnpjContratante}`, x+3,38);
    doc.setFontSize(10); // Altere o tamanho conforme necessário
    doc.text(`Endereço : ${jsonDados.ruaContratante}, ${jsonDados.numeroContratante}`, x+3,45);
    doc.text(`Endereço : ${jsonDados.bairroContratante} - ${jsonDados.cidadeContratante}- ${jsonDados.ufContratante}`, x+3,52);
    doc.text(`Telefone : ${jsonDados.foneContratante}`, x+3,59);

    // Contratado
    doc.rect(x, y+50, width, height);
    doc.setFontSize(11); // Altere o tamanho conforme necessário
    doc.text(`Contratado: ${jsonDados.contratado} | CNPJ/CPF : ${jsonDados.cpfCnpjContratado}`, x+3,65);
    doc.setFontSize(10); // Altere o tamanho conforme necessário
    doc.text(`Endereço : ${jsonDados.ruaContratado}, ${jsonDados.numeroContratado}`, x+3,72);
    doc.text(`Endereço : ${jsonDados.bairroContratado} - ${jsonDados.cidadeContratado}- ${jsonDados.ufContratado}`, x+3,79);
    doc.text(`Telefone : ${jsonDados.foneContratado}`, x+3,86);

    // Motorista
    doc.rect(x, y+78, width, height);
    doc.setFontSize(11); // Altere o tamanho conforme necessário
    doc.text(`Motorista: ${jsonDados.motorista}  | CNPJ/CPF : ${jsonDados.cpfMotorista}`, x+3,93);
    doc.setFontSize(10); // Altere o tamanho conforme necessário
    doc.text(`Endereço : ${jsonDados.ruaMotorista}, ${jsonDados.numeroMotorista}`, x+3,100);
    doc.text(`Endereço : ${jsonDados.bairroMotorista} - ${jsonDados.cidadeMotorista}- ${jsonDados.ufMotorista}`, x+3,107);
    doc.text(`Telefone : ${jsonDados.foneMotorista}`, x+3,114);

    // Dados do Frete 
    doc.rect(x, y+107, width/2, height);
    doc.setFontSize(11); // Altere o tamanho conforme necessário
    doc.text(`Frete Contratado : R$ ${jsonDados.freteContratado}`, x+3,122);
    doc.setFontSize(10); // Altere o tamanho conforme necessário
    doc.text(`Ir Fonte : ${jsonDados.irFonte}`, x+3,129);
    doc.text(`INSS : ${jsonDados.inss}`, x+3,136);
    doc.text(`Pedágio : ${jsonDados.pedagio}`, x+3,143);
    doc.text(`ISS : ${jsonDados.iss}`, x+3,150);
    doc.text(`Sest/Senat : ${jsonDados.sestSenat}`, x+3,157);
    doc.text(`Total descontos : ${jsonDados.totalDescontos}`, x+3,164);
    doc.text(`Adiantamento : ${jsonDados.adiantamento}`, x+3,171);
    doc.rect(x, y+163, width/2, height);
    doc.text(`Saldo a receber : ${jsonDados.saldoAReceber}`, x+3,178);

    // Dados Veiculo
    doc.rect(108, y+107, width/2, height);
    doc.setFontSize(11); // Altere o tamanho conforme necessário
    doc.text(`Frete Contratado : R$ ${jsonDados.freteContratado}`, 111,122);
    doc.setFontSize(10); // Altere o tamanho conforme necessário
    doc.text(`Placa : ${jsonDados.placa}`, 111,129);
    doc.text(`Marca : ${jsonDados.marca}`, 111,136);
    doc.text(`Modelo : ${jsonDados.modelo}`, 111,143);
    doc.text(`Cor : ${jsonDados.cor}`, 111,150);
    doc.text(`Ano : ${jsonDados.ano}`, 111,157);

    // Dados Veiculo
    doc.rect(x, y+180, width, height);
    doc.setFontSize(11); // Altere o tamanho conforme necessário
    doc.text(`Observações : `, x+3,195);
    doc.setFontSize(9); // Altere o tamanho conforme necessário
    doc.text(`qq observação so serve de teste`, x+3,202);

    // Defina a fonte como negrito
    doc.setFont("helvetica", "bold");
    doc.text(`Previsão de chegada ${jsonDados.previsaoDeChegada}`, x+3,210);
    doc.setFont("helvetica", "normal");


    // doc.line(x, 255, 110, 255); // As coordenadas são (x1, y1, x2, y2)
    // doc.setFontSize(11); // Altere o tamanho conforme necessário
    

    // Largura e altura da folha A4
    const larguraA4 = 210; // Supondo que a largura seja em milímetros
    const alturaA4 = 297;  // Supondo que a altura seja em milímetros

    // Definindo as coordenadas e dimensões do primeiro retângulo (lado esquerdo)
    const rect1X = 10;
    const rect1Y = 10;
    const rect1Width = larguraA4 / 2 - 15;
    const rect1Height = alturaA4 - 20;

    // Adicionando o primeiro retângulo ao documento
    // doc.rect(rect1X, rect1Y, rect1Width, rect1Height);

    // Definindo as coordenadas e dimensões do segundo retângulo (lado direito)
    const rect2X = larguraA4 / 2 + 5;
    const rect2Y = 10;
    const rect2Width = larguraA4 / 2 - 15;
    const rect2Height = alturaA4 - 20;

    // Adicionando o segundo retângulo ao documento
    // doc.rect(rect2X, rect2Y, rect2Width, rect2Height);

    // Definindo o tamanho da fonte para o texto
    doc.setFontSize(11);

    // Adicionando o texto sobre o recibo referente ao adiantamento
    const mascaraData = "___/___/_____";
    const mascaraAssinatura = "_______________________";

    // Adicionando texto ao primeiro retângulo
    doc.text("Declaro que recebi o adiantamento na data:", rect1X + 3, rect1Y + 215);
    doc.text(mascaraData, rect1X + 3, rect1Y + 225);
    doc.text(mascaraAssinatura, rect1X + 33, rect1Y + 225);
    doc.text("Motorista/Proprietario", rect1X + 35, rect1Y + 235);
    doc.text('Data', rect1X + 3, rect1Y + 235);

    // Adicionando texto ao segundo retângulo
    doc.text("Declaro que recebi o saldo de frete na data:", rect2X + 3, rect2Y + 215);
    doc.text(mascaraData, rect2X + 3, rect2Y + 225);
    doc.text(mascaraAssinatura, rect2X + 33, rect2Y + 225);
    doc.text("Motorista/Proprietario", rect2X + 35, rect2Y + 235);
    doc.text('Data', rect2X + 3, rect2Y + 235);


    doc.text(mascaraData, rect1X + 3, rect1Y + 265);
    doc.text(mascaraAssinatura, rect1X + 33, rect1Y + 265);
    doc.text(`Contratante`, rect1X + 35, rect1Y + 275);
    doc.text('Data', rect1X + 3, rect1Y + 275);

    doc.text(mascaraData, rect2X + 3, rect2Y + 265);
    doc.text(mascaraAssinatura, rect2X + 33, rect2Y + 265);
    doc.text(`Contratante`, rect2X + 35, rect2Y + 275);
    doc.text('Data', rect2X + 3, rect2Y + 275);


    // Gerar Blob a partir do PDF
    const pdfBlob = doc.output("bloburl");

    // Abrir o PDF em outra aba
    window.open(pdfBlob, "_blank");
}