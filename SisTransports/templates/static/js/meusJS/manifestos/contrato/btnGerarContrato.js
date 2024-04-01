let btnGerarContrato = document.getElementById('btnGerarContrato')

btnGerarContrato.addEventListener('click',async ()=> {
    let dados = obterDadosDoFormulario('contratoFrete')
    dados.idManifesto = document.getElementById('spanNumManifesto').textContent
    let response = await connEndpoint('/operacional/create_update_contrato/', dados);
    if (response.status == 200){
        document.getElementById('idContrato').value = response.contrato.id
    }
})