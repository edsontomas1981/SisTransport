function limpaModalOcorrencias(){
    document.getElementById('selectModalOcorrencias').value = 'selected'
    document.getElementById('dataOcorrenciaModalOcorrencia').value = ''
    document.getElementById('horaOcorrenciaModal').value = ''
    document.getElementById('responsavelModalOcorrencia').value = ''
    document.getElementById('mdlTipoDocumentoModalOcorrencia').value = '1'
    document.getElementById('idDocumentoModalOcorrencia').value = ''
    document.getElementById('observacaoModalOcorrencia').value = ''
}

async function populaTabelaModalOcorrencias(dados){
  let  dadosTbody = preparaDadosTabelaOcorrencias(dados)
  popula_tbody('tbodyHistoricoDtc', dadosTbody, {}, false)
}

let btnLimpaModalOcorrencia = document.getElementById('btnLimpaModalOcorrencia')
btnLimpaModalOcorrencia.addEventListener('click',()=>{
    limpaModalOcorrencias()
})