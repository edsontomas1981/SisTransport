let btnSalvaVeiculo = document.getElementById('salvaVeiculo')

btnSalvaVeiculo.addEventListener('click',async()=>{
    let camposObrigatorios = [
                        'placaProprietario','renavam',
                        'chassisVeiculo','tipoCombustivel',
                        'marcaVeiculo','modeloVeiculo',
                        'corVeiculo','cnpjProprietario',
                        'tipoVeiculo','tipoCarroceria',
                        'anoFabMod','cidadeVeiculo',
                        'ufVeiculo']
    let dados=obterDadosDoFormulario('frmCadastroVeiculos',camposObrigatorios)

    let conexao = new Conexao('/operacional/create_veiculo/',dados);
    try {
        const result = await conexao.sendPostRequest();
        return result
        // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }

})

