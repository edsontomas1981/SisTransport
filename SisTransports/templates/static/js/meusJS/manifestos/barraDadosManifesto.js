const populaDadosBarraManifesto=(dados)=>{

    console.log(dados)
    console.log(dados.manifesto.dtc.length)

    populaDtInicioBarraManifesto(dados.manifesto.data_previsão_inicio)
    populaPrevChegadaBarraManifesto(dados.manifesto.data_previsão_chegada)
    populaRotaBarraManifesto(dados.manifesto.rota_fk.nome)
    populaMotoristaBarraManifesto(dados.manifesto.motoristas[0].parceiro_fk.raz_soc)
    populaPlacaBarraManifesto(dados.manifesto.veiculos[0].placa)
    populaQtdeDocumentosBarraManifesto(parseInt(dados.manifesto.dtc.length))
    populaNumManifestoBarraManifesto(dados.manifesto.id)
}
const populaDtInicioBarraManifesto = (dataInicio = '') => {
    const element = document.getElementById('dtSaida');
    if (element && dataInicio) {
        element.textContent = formataDataPtBr(dataInicio);
    }
}

const populaPrevChegadaBarraManifesto = (prevChegada = '') => {
    const element = document.getElementById('prevChegada');
    if (element && prevChegada) {
        element.textContent = formataDataPtBr(prevChegada);
    }
}

const populaRotaBarraManifesto = (origemDestino = '') => {
    const element = document.getElementById('origemDestino');
    if (element && origemDestino) {
        element.textContent = origemDestino;
    }
}

const populaMotoristaBarraManifesto = (motoristaPrincipal = '') => {
    const element = document.getElementById('motoristaPrincipal');
    if (element && motoristaPrincipal) {
        element.textContent = motoristaPrincipal;
    }
}

const populaPlacaBarraManifesto = (spanPlacaPrincipal = '') => {
    const element = document.getElementById('spanPlacaPrincipal');
    if (element && spanPlacaPrincipal) {
        element.textContent = spanPlacaPrincipal;
    }
}

const populaQtdeDocumentosBarraManifesto = (spanQtdeDocumentos=0) => {
    const element = document.getElementById('spanQtdeDocumentos');
    if (spanQtdeDocumentos) {
        element.textContent = spanQtdeDocumentos;
    }else{
        element.textContent = spanQtdeDocumentos;
    }
}

const populaNumManifestoBarraManifesto = (spanNumManifesto = '') => {
    const element = document.getElementById('spanNumManifesto');
    if (element && spanNumManifesto) {
        element.textContent = spanNumManifesto;
    }
}
