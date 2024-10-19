let cnpjRelatFaturaBuscaFatura = document.getElementById('cnpjRelatFaturaBuscaFatura');
let razaoRelatFaturaBuscaFatura = document.getElementById('razaoRelatFaturaBuscaFatura');
let relatoriodeFaturasBuscaParceiro = document.getElementById('relatoriodeFaturasBuscaParceiro');

relatoriodeFaturasBuscaParceiro.addEventListener('click', () => {
    cnpjBuscaParceiro = cnpjRelatFaturaBuscaFatura;
    razaoBuscaParceiro = razaoRelatFaturaBuscaFatura;
    limpaModalParceiros();
    openModal('mdlBuscaParceiro');
});

cnpjRelatFaturaBuscaFatura.addEventListener('blur', async () => {
    const cnpj = cnpjRelatFaturaBuscaFatura.value.trim(); // Remove espaços em branco

    // Se o campo de CNPJ estiver vazio, limpa a razão social e encerra a função
    if (!cnpj) {
        razaoRelatFaturaBuscaFatura.value = '';
        return;
    }

    // Validação do formato do CNPJ antes de prosseguir
    if (!validateDocumentNumber(cnpj)) {
        cnpjRelatFaturaBuscaFatura.value = '';
        razaoRelatFaturaBuscaFatura.value = '';
        msgErro('CNPJ inválido. Verifique os números e tente novamente.');
        return;
    }

    try {
        // Desabilita temporariamente o botão para evitar cliques repetidos
        relatoriodeFaturasBuscaParceiro.disabled = true;

        let dados = await dadosParceiro(cnpj);

        if (dados) {
            razaoRelatFaturaBuscaFatura.value = dados.raz_soc || ''; // Preenche o campo ou mantém vazio se indefinido
        } else {
            msgErro("Parceiro não encontrado. Verifique os dados e tente novamente.");
            cnpjRelatFaturaBuscaFatura.value = '';
            razaoRelatFaturaBuscaFatura.value = '';
        }

    } catch (error) {
        console.error('Erro ao buscar dados do parceiro:', error);
        msgErro('Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.');
    } finally {
        // Reabilita o botão após a conclusão da operação
        relatoriodeFaturasBuscaParceiro.disabled = false;
    }
});


