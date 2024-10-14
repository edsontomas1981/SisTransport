// Seleciona o botão de impressão da fatura
let btnPrintFatura = document.getElementById('btnPrintFatura');

// Adiciona o evento de clique para iniciar a geração do PDF
btnPrintFatura.addEventListener('click', async () => {
    await preencherDadosImpressao();  // Aguarda o preenchimento dos dados de impressão
    gerarPDF();  // Chama a função para gerar o PDF
});

// Função responsável por gerar o PDF com as configurações definidas
function gerarPDF() {
    // Seleciona o elemento que contém os dados a serem impressos
    let elementoParaImpressao = document.getElementById('impressaoFatura');

    // Configurações do PDF
    let configuracoesPDF = {
        margin: 1,
        filename: 'fatura.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Gera o PDF e o abre em uma nova aba
    html2pdf().from(elementoParaImpressao).set(configuracoesPDF).outputPdf('dataurlnewwindow');
}

// Função para carregar e preencher os dados da fatura na interface
const preencherDadosImpressao = async () => {
    let idFatura = document.getElementById('idFaturaMdlFatura').value;  // Obtém o ID da fatura
    let dados = await carregaFatura(idFatura);  // Carrega os dados da fatura do backend

    // Preenche os campos de sacado (destinatário da fatura)
    document.getElementById('nomeSacado').textContent = dados.fatura.sacado_fk.raz_soc;
    document.getElementById('cnpjCpfSacado').textContent = `CPF/CNPJ: ${dados.fatura.sacado_fk.cnpj_cpf}`;
    document.getElementById('ruaSacado').textContent = `${dados.fatura.sacado_fk.endereco_fk.logradouro}, ${dados.fatura.sacado_fk.endereco_fk.numero}`;
    document.getElementById('bairroCidadeUfSacado').textContent = `${dados.fatura.sacado_fk.endereco_fk.bairro} - ${dados.fatura.sacado_fk.endereco_fk.cidade} - ${dados.fatura.sacado_fk.uf}`;
    document.getElementById('emailSacado').textContent = ''; // Campo de e-mail vazio por enquanto

    // Preenche os dados da fatura
    document.getElementById('idFaturaImpressao').textContent = `FATURA Nº #${dados.fatura.id}`;
    document.getElementById('emissaoFatura').textContent = `Data de Emissão: ${formataDataPtBr(dados.fatura.data_emissao)}`;
    document.getElementById('vencimentoFatura').textContent = `Data de Vencimento: ${formataDataPtBr(dados.fatura.vencimento)}`;

    // Preenche os dados do emissor da fatura
    document.getElementById('nomeEmissor').textContent = dados.fatura.emissor.razao;
    document.getElementById('cpfEmissor').textContent = `CNPJ: ${dados.fatura.emissor.cnpj}`;
    document.getElementById('inscEmissor').textContent = `Inscrição Estadual: ${dados.fatura.emissor.inscricao_estadual}`;
    document.getElementById('ruaEmissor').textContent = `CEP: ${dados.fatura.emissor.endereco.cep} - ${dados.fatura.emissor.endereco.logradouro}, ${dados.fatura.emissor.endereco.numero}`;
    document.getElementById('bairroCidadeUfEmissor').textContent = `${dados.fatura.emissor.endereco.bairro} - ${dados.fatura.emissor.endereco.cidade} - ${dados.fatura.emissor.endereco.uf}`;
    document.getElementById('telefoneEmissor').textContent = `Telefone: ${dados.fatura.emissor.telefone}`;

    // Preenche o valor total da fatura
    document.getElementById('valorFatura').textContent = `Valor Total da Fatura: R$ ${dados.fatura.valor_a_pagar}`;
};
