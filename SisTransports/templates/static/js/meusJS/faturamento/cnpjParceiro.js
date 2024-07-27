let cnpjParceiroFaturamento = document.getElementById('cnpjParceiroFaturamento');
let razaoParceiroFaturamento = document.getElementById('razaoParceiroFaturamento');
let previousCNPJ = '';

cnpjParceiroFaturamento.addEventListener('blur', async () => {
    let cnpj = cnpjParceiroFaturamento.value.trim();

    // Verifique se o valor do CNPJ mudou antes de prosseguir
    if (cnpj !== '' && cnpj !== previousCNPJ) {
        previousCNPJ = cnpj;
        
        if (validateDocumentNumber(cnpj)) {
            try {
                let response = await dadosParceiro(cnpj);
                if (response) {
                    razaoParceiroFaturamento.value = response.raz_soc;
                } else {
                    msgErro('Parceiro não encontrado');
                }
            } catch (error) {
                console.error('Erro na busca de dados do parceiro:', error);
                msgErro('Erro ao buscar dados do parceiro');
            }
        } else {
            msgErro('CNPJ inválido');
        }
    }
});
