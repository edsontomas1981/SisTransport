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
    let response  = await connEndpoint('/operacional/add_veiculo_manifesto/', {'placa':placaManifesto.value,
                                                                                'idManifesto':idManifesto.textContent});
    if(response.status != 200){
        msgAviso()
        return
    }
    populaVeiculosManifesto(response.veiculos)
    limpaVeiculos(listaVeiculos)    
})

const limpaVeiculos = ()=>{
    document.getElementById('placaPrincipal').value = ''
    document.getElementById('modeloPrincipal').value = ''
    document.getElementById('proprietarioPrincipal').value = ''
}

const enviaDadosEndpointVeiculos= ()=>{

}
