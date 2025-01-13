document.getElementById('btnBuscaOcorrenciasDtc').addEventListener('click',async ()=>{
    let idDtc = document.getElementById('idDtcModalEvolucaoFrete').value

    let dtc = new Dtc()
    let ocorrencias = await dtc.getOcorrenciasDtc(idDtc)

    let cnpjRem = document.getElementById('cnpjRemetenteModalEvolucaoFrete')
    let razaoRem = document.getElementById('razaoRemetenteModalEvolucaoFrete')
    let cnpjDest = document.getElementById('cnpjDestinatarioModalEvolucaoFrete')
    let razaoDest = document.getElementById('razaoDestinatarioModalEvolucaoFrete')
    let cnpjTom = document.getElementById('cnpjTomadorModalEvolucaoFrete')
    let razaoTom = document.getElementById('razaoTomadorModalEvolucaoFrete')

    cnpjRem.value = ocorrencias.dtc.dtc.cnpjRemetente
    razaoRem.value = ocorrencias.dtc.dtc.razaoRemetente
    cnpjDest.value = ocorrencias.dtc.dtc.cnpjDestinatario
    razaoDest.value = ocorrencias.dtc.dtc.razaoDestinatario
    cnpjTom.value = ocorrencias.dtc.dtc.cnpjTomador
    razaoTom.value = ocorrencias.dtc.dtc.razaoTomador

    let dadosOcorrencias = preparaDadosTabelaOcorrencias(ocorrencias.dtc.ocorrencias)

    popula_tbody('tbodyOcorrenciasPorDtc', dadosOcorrencias, {}, false)

})

document.getElementById('btnLimpaModalHistoricoDtc').addEventListener('click',()=>{
    limpaModalHistoricoDtc()
})

function limpaModalHistoricoDtc(){
    document.getElementById('idDtcModalEvolucaoFrete').value = ''
    document.getElementById('cnpjRemetenteModalEvolucaoFrete').value = ''
    document.getElementById('razaoRemetenteModalEvolucaoFrete').value = ''
    document.getElementById('cnpjDestinatarioModalEvolucaoFrete').value = ''
    document.getElementById('razaoDestinatarioModalEvolucaoFrete').value = ''
    document.getElementById('cnpjTomadorModalEvolucaoFrete').value = ''
    document.getElementById('razaoTomadorModalEvolucaoFrete').value = ''
    document.getElementById('tbodyOcorrenciasPorDtc').innerHTML = ''
}

function openModalHistoricoDtc(){
    limpaModalHistoricoDtc()
    openModal('mdlOcorrenciasDtc')
}




