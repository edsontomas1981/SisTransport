const removerDocumentoPorId=async(id,tipo_documento)=> {
    let idManifesto = document.getElementById('spanNumManifesto')
    const apiService = new ApiService();
    const url = "/operacional/get_dtc_id/";
    const dados = {id_dtc:id};
    const resposta = await apiService.postData(url, dados);

    if(tipo_documento == 'Coleta'){
        let coleta = new NovaColeta();
        let respostaColeta = await coleta.update_status_coleta(resposta.dadosDtc.coleta.id,1)

        console.log(respostaColeta)
    }

    if(tipo_documento == 'Entrega'){
        let cte = new Cte();
        let respostaCte = await cte.update_status_cte(resposta.dadosDtc.cte.id,1)
        console.log(respostaCte)
    }

    let response  = await connEndpoint('/operacional/delete_dtc_manifesto/', {'idDtc':id,'idManifesto':idManifesto.textContent});
    
    if(response.status == 200)  
    {
        populaTbodyDocumentos(response.documentos)
        populaQtdeDocumentosBarraManifesto(response.documentos.length)
    }else{
        msgErro("Não foi possível excluir o registro.")
    }
}