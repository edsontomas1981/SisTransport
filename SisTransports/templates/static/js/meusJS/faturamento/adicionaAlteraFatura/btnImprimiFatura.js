// Seleciona o botão de impressão da fatura
let btnPrintFatura = document.getElementById('btnPrintFatura');

// Verifica se o botão foi encontrado na página antes de adicionar o evento
if (btnPrintFatura) {
    // Adiciona o evento de clique para iniciar a geração do PDF
    btnPrintFatura.addEventListener('click', async () => {
        let idFatura = document.getElementById('idFaturaMdlFatura').value;  // Obtém o ID da fatura
        
        // Verifica se o ID da fatura está vazio
        if (idFatura === '') {
            msgAviso('Por favor, salve a fatura ou selecione uma fatura para continuar.');
            return;  // Interrompe o fluxo se a fatura não estiver salva ou selecionada
        }
        
        try {
            await preencherDadosImpressao();  // Aguarda o preenchimento dos dados de impressão
            gerarPDF();  // Chama a função para gerar o PDF
        } catch (error) {
            console.error('Erro ao gerar a fatura:', error);
        }
    });
} else {
    console.error('Botão de impressão não encontrado na página.');
}


/**
 * Função responsável por gerar o PDF com as configurações definidas.
 */
function gerarPDF() {
    // Seleciona o elemento que contém os dados a serem impressos
    let elementoParaImpressao = document.getElementById('impressaoFatura');

    // Verifica se o elemento existe antes de continuar
    if (!elementoParaImpressao) {
        console.error('Elemento para impressão não encontrado.');
        return;
    }

    // Configurações do PDF
    let configuracoesPDF = {
        margin: 1,
        filename: 'fatura.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Gera o PDF e o abre em uma nova aba
    html2pdf().from(elementoParaImpressao).set(configuracoesPDF).outputPdf('dataurlnewwindow')
    .catch(error => {
        console.error('Erro ao gerar o PDF:', error);
    });
}

/**
 * Função para carregar e preencher os dados da fatura na interface.
 * @returns {Promise<void>}
 */
const preencherDadosImpressao = async () => {
    try {
        let idFatura = document.getElementById('idFaturaMdlFatura').value;  // Obtém o ID da fatura
        
        // Verifica se o ID da fatura foi fornecido
        if (!idFatura) {
            throw new Error('ID da fatura não fornecido.');
        }

        let dados = await carregaFatura(idFatura);  // Carrega os dados da fatura do backend
        
        if (!dados || !dados.fatura) {
            throw new Error('Dados da fatura não encontrados.');
        }

        // Preenche os campos de sacado (destinatário da fatura)
        document.getElementById('nomeSacado').textContent = dados.fatura.sacado_fk.raz_soc || '';
        document.getElementById('cnpjCpfSacado').textContent = `CPF/CNPJ: ${dados.fatura.sacado_fk.cnpj_cpf || ''}`;
        document.getElementById('ruaSacado').textContent = `${dados.fatura.sacado_fk.endereco_fk.logradouro || ''}, ${dados.fatura.sacado_fk.endereco_fk.numero || ''}`;
        document.getElementById('bairroCidadeUfSacado').textContent = `${dados.fatura.sacado_fk.endereco_fk.bairro || ''} - ${dados.fatura.sacado_fk.endereco_fk.cidade || ''} - ${dados.fatura.sacado_fk.uf || ''}`;
        document.getElementById('emailSacado').textContent = dados.fatura.sacado_fk.email || 'E-mail não disponível';

        // Preenche os dados da fatura
        document.getElementById('idFaturaImpressao').textContent = `FATURA Nº #${dados.fatura.id}`;
        document.getElementById('emissaoFatura').textContent = `Data de Emissão: ${formataDataPtBr(dados.fatura.data_emissao)}`;
        document.getElementById('vencimentoFatura').textContent = `Data de Vencimento: ${formataDataPtBr(dados.fatura.vencimento)}`;

        // Preenche os dados do emissor da fatura
        document.getElementById('nomeEmissor').textContent = dados.fatura.emissor.razao || '';
        document.getElementById('cpfEmissor').textContent = `CNPJ: ${dados.fatura.emissor.cnpj || ''}`;
        document.getElementById('inscEmissor').textContent = `Inscrição Estadual: ${dados.fatura.emissor.inscricao_estadual || ''}`;
        document.getElementById('ruaEmissor').textContent = `CEP: ${dados.fatura.emissor.endereco.cep || ''} - ${dados.fatura.emissor.endereco.logradouro || ''}, ${dados.fatura.emissor.endereco.numero || ''}`;
        document.getElementById('bairroCidadeUfEmissor').textContent = `${dados.fatura.emissor.endereco.bairro || ''} - ${dados.fatura.emissor.endereco.cidade || ''} - ${dados.fatura.emissor.endereco.uf || ''}`;
        document.getElementById('telefoneEmissor').textContent = `Telefone: ${dados.fatura.emissor.telefone || ''}`;

        // Preenche o valor total da fatura
        document.getElementById('valorFatura').textContent = `Valor Total da Fatura: ${formatarMoeda(dados.fatura.valor_a_pagar)}`;

        document.getElementById('valorDescontoImpressao').textContent = `Total de Desconto: ${formatarMoeda(dados.fatura.desconto_em_reais)}`;
        document.getElementById('valorAcrescimoImpressao').textContent = `Total de Acréscimos: ${formatarMoeda(dados.fatura.acrescimo_em_reais)}`;
        document.getElementById('valorTotalFaturaImpressao').textContent = `Valor Total Fatura: ${formatarMoeda(dados.fatura.valor_total)}`;
        document.getElementById('valorAPagarFaturaImpressao').textContent = `Valor À Pagar: ${formatarMoeda(dados.fatura.valor_a_pagar)}`;

        // Preenche os dados dos CTe's na fatura
        let ctesDados = populaDadosCteImpressao(dados.fatura.ctes);
        popula_tbody('tabelaImpressaoFatura', ctesDados, false, false);

    } catch (error) {
        console.error('Erro ao preencher os dados de impressão:', error);
    }
};

/**
 * Função que processa os dados dos CTe's para impressão.
 * @param {Array} ctes - Lista de CTe's da fatura.
 * @returns {Array} Lista de objetos com dados formatados dos CTe's.
 */
const populaDadosCteImpressao = (ctes) => {
    let ctesFatura = [];

    if (!ctes || !Array.isArray(ctes)) {
        console.error('CTEs inválidos ou não fornecidos.');
        return ctesFatura;
    }

    ctes.forEach(e => {
        ctesFatura.push({
            idCte: e.id || '',
            remetente: truncateString(e.dtc_fk?.remetente?.raz_soc || '', 20),
            destinatario: truncateString(e.dtc_fk?.destinatario?.raz_soc || '', 20),
            tomador: truncateString(e.dtc_fk?.tomador?.raz_soc || '', 20),
            freteTotal: formatarMoeda(e.totalFrete || 0),
        });
    });

    return ctesFatura;
};
