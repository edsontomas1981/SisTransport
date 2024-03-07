const populaDadosBarraManifesto=(dados)=>{
    populaDtInicioBarraManifesto(dados.manifesto.data_previsão_inicio)
    populaPrevChegadaBarraManifesto(dados.manifesto.data_previsão_chegada)
    populaRotaBarraManifesto(dados.manifesto.rota_fk.nome)
    populaMotoristaBarraManifesto(dados.manifesto.motoristas[0].parceiro_fk.raz_soc)
    populaPlacaBarraManifesto(dados.manifesto.veiculos[0].placa)
    populaQtdeDocumentosBarraManifesto(15)
    populaNumManifestoBarraManifesto(dados.manifesto.id)
}
const populaDtInicioBarraManifesto=(dataInicio)=>{
    document.getElementById('dtSaida').textContent = formataDataPtBr(dataInicio)
}
const populaPrevChegadaBarraManifesto=(prevChegada)=>{
    document.getElementById('prevChegada').textContent = formataDataPtBr(prevChegada)
}
const populaRotaBarraManifesto=(origemDestino)=>{
    document.getElementById('origemDestino').textContent = origemDestino
}
const populaMotoristaBarraManifesto=(motoristaPrincipal)=>{
    document.getElementById('motoristaPrincipal').textContent = motoristaPrincipal
}
const populaPlacaBarraManifesto=(spanPlacaPrincipal)=>{
    document.getElementById('spanPlacaPrincipal').textContent = spanPlacaPrincipal
}
const populaQtdeDocumentosBarraManifesto=(spanQtdeDocumentos)=>{
    document.getElementById('spanQtdeDocumentos').textContent = spanQtdeDocumentos
}
const populaNumManifestoBarraManifesto=(spanNumManifesto)=>{
    document.getElementById('spanNumManifesto').textContent = spanNumManifesto
}