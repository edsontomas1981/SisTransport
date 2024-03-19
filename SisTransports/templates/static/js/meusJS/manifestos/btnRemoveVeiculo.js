const btnRemoveVeiculos = async(placa)=>{
    let idManifesto = document.getElementById('spanNumManifesto')
    let response = await connEndpoint('/operacional/del_veiculo_manifesto/',{'placa':placa,'idManifesto':idManifesto.textContent})

    if (response.status == 200){
        populaTbodyVeiculos(response.veiculos)
        msgOk('O veículo foi removido do manifesto com sucesso.')
    }else{
        msgErro('Não foi possível excluir o veículo do manifesto. Verifique sua conexão com a internet e tente novamente.')
    }
}
