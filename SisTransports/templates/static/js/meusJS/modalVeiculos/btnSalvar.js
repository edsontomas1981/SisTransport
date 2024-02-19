let btnSalvar = document.getElementById('btnSalvaMotorista')

btnSalvar.addEventListener('click',async ()=>{
    let camposObrigatorios = ['cpfMotorista','dataNascimento',
                            'filiacaoMae',
                            'registroHabilitacao','categoriaHabilitacao',
                            'dataEmissao','dataValidade',
                            'dataPrimeiraHabilitacao']

    let dados=obterDadosDoFormulario('frmCadastroMotoristas',camposObrigatorios)
    let response = await connEndpoint('/operacional/create_motorista/',dados)
        console.log(response)

        switch (response.status) {
            case 200:
                msgOk('Motorista Cadastrado com sucesso !')
                break;
            case 201:
                msgOk('Motorista Alterado com sucesso !')
                break;
            case 422:
                msgErro('Ocorreu um erro durante o processamento da solicitação. Por favor, verifique os dados fornecidos e tente novamente. Se o problema persistir, entre em contato com o suporte para obter assistência adicional. Código de erro: 422.')
            default:
                break;
        }
})