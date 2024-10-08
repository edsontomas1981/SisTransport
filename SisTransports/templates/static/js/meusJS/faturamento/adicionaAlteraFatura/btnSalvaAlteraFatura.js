let btnSalvaAlteraFatura = document.getElementById('btnSalvaFaturaMdlFatura');

btnSalvaAlteraFatura.addEventListener('click', async () => {
    let dadosForm = obterDadosDoFormulario('frmSalvaOuAlteraFatura');
    let camposObrigatorios = [
        'dataEmissaoModalFatura', 'vencimentoMdlFatura', 
        'cnpjSacadoFatura', 'razaoSacadoFatura', 
        'valorTotalMdlFatura', 'valorAPagarMdlFatura'
    ];

    if ((validarCamposObrigatorios(dadosForm, camposObrigatorios)).length != 0) {
        msgAviso('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
        return;
    }
    let response = await conectaEndpoint('/faturamento/cria_fatura/',dadosForm)
    console.log(response)
    alert('Ok, todos os dados estão preenchidos');
});
