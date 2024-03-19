var btnAddVeiculo = document.getElementById('btnAdicionaVeiculo')
var listaVeiculos = []

let botoesVeiculo={
    excluir: {
        classe: "btn-danger text-white",
        texto: 'Apagar',
        callback: btnRemoveVeiculos
      }
  };

btnAddVeiculo.addEventListener('click', async ()=>{

    let placaManifesto = document.getElementById('placaPrincipal')
    let idManifesto = document.getElementById('spanNumManifesto')

    if(placaManifesto.value.trim() == '' ){
        msgAviso("Por favor, selecione um veículo antes de prosseguir.")
        return
    }

    if(idManifesto.textContent == ''){
        msgAviso("Para adicionar um veiculo, é necessário primeiro salvar ou selecionar um manifesto.")
    }else{
        let response  = await connEndpoint('/operacional/add_veiculo_manifesto/', {'placa':placaManifesto.value,
                                                                                    'idManifesto':idManifesto.textContent});
        populaVeiculosManifesto(response.veiculos)

        switch (response.status) {
            case 200:
                msgOk('Veículo cadastrado com sucesso!')
                break;
            default:
                msgErro('Não foi possivel adicionar o veículo')
                break;
        }
        limpaVeiculos(listaVeiculos)    
    }
    limpaVeiculos(listaVeiculos)    
})

const limpaVeiculos = ()=>{
    document.getElementById('placaPrincipal').value = ''
    document.getElementById('modeloPrincipal').value = ''
    document.getElementById('proprietarioPrincipal').value = ''
}