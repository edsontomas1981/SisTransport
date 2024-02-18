let btnSalvar = document.getElementById('btnSalvaMotorista')

btnSalvar.addEventListener('click',async ()=>{
    let camposObrigatorios = ['cpfMotorista']
    let dados=obterDadosDoFormulario('frmCadastroMotoristas',camposObrigatorios)
    let response = await connEndpoint('/operacional/create_motorista/',dados)
        switch (response.status) {
            case 200:
                msgOk('Motorista Cadastrado com sucesso !')
                break;
            case 201:
                msgOk('Motorista Alterado com sucesso !')
                break;
        
            default:
                break;
        }
})