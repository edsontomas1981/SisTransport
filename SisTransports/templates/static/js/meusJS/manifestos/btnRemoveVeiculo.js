const btnRemoveVeiculos = async(placa)=>{
    let idManifesto = document.getElementById('spanNumManifesto')
    let response = await connEndpoint('/operacional/del_veiculo_manifesto/',{'placa':placa,'idManifesto':idManifesto.textContent})
    populaTbodyVeiculos(response.veiculos)
}
