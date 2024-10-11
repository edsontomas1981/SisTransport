let btnSalvaAlteraFatura = document.getElementById('btnSalvaFaturaMdlFatura');

btnSalvaAlteraFatura.addEventListener('click', async () => {
    let dadosForm = obterDadosDoFormulario('frmSalvaOuAlteraFatura');
    dadosForm.ctes = ctesFatura
    dadosForm.valorAPagarMdlFatura = converterMoedaParaNumero(dadosForm.valorAPagarMdlFatura)
    dadosForm.valorTotalMdlFatura = converterMoedaParaNumero(dadosForm.valorTotalMdlFatura)

    let camposObrigatorios = [
        'dataEmissaoModalFatura', 'vencimentoMdlFatura', 
        'cnpjSacadoFatura', 'razaoSacadoFatura', 
        'valorTotalMdlFatura', 'valorAPagarMdlFatura','emissorMdlFatura'
    ];

    if ((validarCamposObrigatorios(dadosForm, camposObrigatorios)).length != 0) {
        msgAviso('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
        return;
    }
    let response = await conectaEndpoint('/faturamento/cria_fatura/',dadosForm)

    switch (response.status) {
        case 200:
            msgOk(`Fatura salva com sucesso! (ID: ${response.id_fatura})`);
            document.getElementById('idFaturaMdlFatura').value = response.id_fatura
            break;
        case 201:            
            msgOk(`Fatura alterada com sucesso! (ID: ${response.id_fatura})`);
            break;  
        default:
            msgErro('Erro ao salvar a fatura. Por favor, tente novamente ou entre em contato com o suporte.');
            break;
    }
    

});
