
let btnSalvaManifesto = document.getElementById('btnSalvaManifesto')

btnSalvaManifesto.addEventListener('click',async ()=>{
    let dados = geraDadosManifesto()

    dados.idManifesto = document.getElementById('spanNumManifesto').textContent

    response = await connEndpoint('/operacional/create_manifesto/', dados);

    switch (response.status) {
        case 200:
            msgOk('Manifesto criado com sucesso!')
            populaDadosBarraManifesto(response)
            break;
        case 201:
            msgOk('Manifesto atualizado com sucesso!')
            populaDadosManifesto(response.manifesto)
            populaDadosBarraManifesto(response)
            populaTbodyMotorista(response.manifesto.motoristas)
            populaVeiculosManifesto(response.veiculos)
            break;            
        default:
            msgErro('Não foi possível concluir a transação. Por favor, tente novamente mais tarde.')
            break;
    }

})