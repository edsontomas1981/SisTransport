let btnExcluirContrato = document.getElementById('btnExcluirContrato')

btnExcluirContrato.addEventListener('click',async()=>{
    let idContrato = document.getElementById('idContrato')
    
    if (await msgConfirmacao(`Deseja realmente apagar o contrato de numero ${idContrato.value}`)){
        let response  = await connEndpoint('/operacional/delete_contrato/', {'id_contrato':idContrato.value});
        if (response.status==200){
            document.getElementById('freteContratado').value = document.getElementById('freteCarreteiro').value
            limpaContratoFrete()
            somaContrato()
        }
    }
})