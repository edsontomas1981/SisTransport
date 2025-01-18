// function limpaModalOcorrencias(){
//     document.getElementById('selectModalOcorrencias').value = 'selected'
//     document.getElementById('dataOcorrenciaModalOcorrencia').value = ''
//     document.getElementById('horaOcorrenciaModal').value = ''
//     document.getElementById('responsavelModalOcorrencia').value = ''
//     document.getElementById('mdlTipoDocumentoModalOcorrencia').value = '1'
//     document.getElementById('idDocumentoModalOcorrencia').value = ''
//     document.getElementById('observacaoModalOcorrencia').value = ''
// }

// async function populaTabelaModalOcorrencias(dados){
//   let  dadosTbody = preparaDadosTabelaOcorrencias(dados)
//   popula_tbody('tbodyHistoricoDtc', dadosTbody, {}, false)
// }

// document.addEventListener('DOMContentLoaded', function() {
//     let btnSalvaModalOcorrencia = document.getElementById('btnSalvaModalOcorrencia')
//     btnSalvaModalOcorrencia.addEventListener('click',()=>{
//         let dados = obterDadosDoFormulario('frmModalOcorrencias')
//         let camposObrigatorios = ['selectModalOcorrencias','dataOcorrenciaModalOcorrencia',
//                                 'horaOcorrenciaModal','responsavelModalOcorrencia','mdlTipoDocumentoModalOcorrencia','idDocumentoModalOcorrencia']
//         if (validarCamposObrigatorios(dados,camposObrigatorios).length > 0){ 
//             msgAviso('Preencha todos os campos obrigatórios')
//             return
//         }

//         msgConfirmacao('Deseja realmente registrar a ocorrência?').then(async (confirmado) => {
//             if (confirmado) {
//                 let apiService = new ApiService();
//                 let url = "/operacional/cadastrar_ocorrencias/"
//                 let response = await apiService.postData(url, dados);
//                 populaTabelaModalOcorrencias(response.ocorrencias)
//                 msgOk('Ocorrência registrada com sucesso!')
//                 limpaModalOcorrencias()

//             }
//         })
//     })

//     let btnLimpaModalOcorrencia = document.getElementById('btnLimpaModalOcorrencia')
//     btnLimpaModalOcorrencia.addEventListener('click',()=>{
//         limpaModalOcorrencias()
//     })
// })    


