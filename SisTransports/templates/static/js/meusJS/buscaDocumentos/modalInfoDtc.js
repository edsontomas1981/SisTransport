let btnBuscaDetalhadaModalInfo = document.getElementById('btnBaixaDetalhadaModalInfo')
btnBuscaDetalhadaModalInfo.addEventListener('click',()=>{
    let idDocumento = document.getElementById('idDtcModalInfo').value
    let tipoOcorrencia = document.getElementById('tipoDocumentoModalInfo').value
    baixaDetalhada(idDocumento,tipoOcorrencia)
})
