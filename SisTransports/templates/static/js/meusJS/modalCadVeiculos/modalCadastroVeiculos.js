let btnSalvaVeiculo = document.getElementById('salvaVeiculo')

btnSalvaVeiculo.addEventListener('click',async()=>{
    
    let camposObrigatorios = [
                        'placaProprietario','renavam',
                        'chassisVeiculo','tipoCombustivel',
                        'marcaVeiculo','modeloVeiculo',
                        'corVeiculo','cnpjProprietario',
                        'tipoVeiculo','tipoCarroceria',
                        'anoFabMod','cidadeVeiculo',
                        'ufVeiculo','capacidadeKg',
                        'capacidadeCubica']

    let dados=obterDadosDoFormulario('frmCadastroVeiculos',camposObrigatorios)

    if(dados){
        let resposta = await conecta('/operacional/create_veiculo/',dados)
        switch (resposta.status) {
            case 200:
                msgOk('Veículo cadastrado com sucesso !')
                break;
            case 201:
                msgOk('Veículo alterado com sucesso !')
                break;
            case 401:
                msgErro('Erro de integridade !')
                break;                
            default:
                break;
        }
    }
    
})


