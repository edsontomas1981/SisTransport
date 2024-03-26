let btnDeleteManifesto = document.getElementById('btnDeleteManifesto')

btnDeleteManifesto.addEventListener('click', async () => {
    if (await msgConfirmacao('Deseja realmente excluir o manifesto?')) {
        let idManifesto = document.getElementById('spanNumManifesto').textContent
        if (idManifesto != '') {
            let response = await connEndpoint('/operacional/delete_manifesto/', { 'idManifesto': idManifesto });
            console.log(response)
            switch (response.status) {
                case 200:
                    msgOk('Manifesto excluído com sucesso.')
                    limpaDadosManifesto()
                    limpaBarraManifesto()
                    limpaTbodyMotoristas()
                    limpaTbodyVeiculos()
                    limpaDadosDocumentos()
                    limpaTbodyDocumentos()
                    document.getElementById('txtIdBuscaManifesto').value = ""
                    break;
                default:
                    msgErro('Não foi possível apagar o manifesto. Por favor, tente novamente mais tarde.')
                    break;
            }
        } else {
            msgAviso('É necessário selecionar um manifesto.')
        }
    }
})



