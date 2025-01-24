async function baixaDetalhada (idDocumento,tipoOcorrencia){
    ocorrencias = await getOcorrenciasBySelect()
    populaSelect(ocorrencias,'selectModalOcorrencias','Selecione a Ocorrência')
    document.getElementById('tbodyHistoricoDtc').innerHTML = ''

    let documento

    let dados = {}

    let apiService = new ApiService();
    let url= "/operacional/get_ocorrencias_documento/"
    let response
    switch (tipoOcorrencia) {
       
        case 'Coleta':
            documento =  await selecionaColeta(idDocumento,tipoOcorrencia)
            document.getElementById('mdlTipoDocumentoModalOcorrencia').value = "1"
            document.getElementById('idDocumentoModalOcorrencia').value = documento.jsonColeta.id
            dados={tipoDocumento:'1',idDocumento:documento.jsonColeta.id}
            response = await apiService.postData(url, dados);
            populaTabelaModalOcorrencias(response.ocorrencias)
            break; 

        case 'Entrega':
            documento =  await selecionaCte(idDocumento,tipoOcorrencia)            
            document.getElementById('idDocumentoModalOcorrencia').value = documento.jsonCte.id
            document.getElementById('mdlTipoDocumentoModalOcorrencia').value = "2"
            dados={tipoDocumento:'2',idDocumento:documento.jsonCte.id}
            response = await apiService.postData(url, dados);
            populaTabelaModalOcorrencias(response.ocorrencias)
            break;

        default:
            break;
    }
    
    openModal('mdlBaixaDocumentos')
}