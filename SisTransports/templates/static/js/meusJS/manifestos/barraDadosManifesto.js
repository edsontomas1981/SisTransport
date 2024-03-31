const populaDadosBarraManifesto=(dados)=>{
    limpaBarraManifesto()
    populaDtInicioBarraManifesto(dados.manifesto.data_previsão_inicio)
    populaPrevChegadaBarraManifesto(dados.manifesto.data_previsão_chegada)
    populaRotaBarraManifesto(dados.manifesto.rota_fk.nome)
    populaQtdeDocumentosBarraManifesto(dados.documentos ? dados.documentos.length : 0);
    let primeiroMotorista = dados.manifesto.motoristas[0]?.parceiro_fk?.raz_soc
    if (primeiroMotorista){
        populaMotoristaBarraManifesto(dados.manifesto.motoristas[0].parceiro_fk.raz_soc)
    }
    let placaPrincipalBarraManifesto = dados.manifesto.veiculos[0]?.placa
    if(placaPrincipalBarraManifesto){
        populaPlacaBarraManifesto(placaPrincipalBarraManifesto)
    }
    populaNumManifestoBarraManifesto(dados.manifesto.id)
}

const limpaBarraManifesto = ()=>{
    document.getElementById('dtSaida').textContent=''
    document.getElementById('prevChegada').textContent=''
    document.getElementById('origemDestino').textContent=''
    document.getElementById('motoristaPrincipal').textContent=''
    document.getElementById('spanPlacaPrincipal').textContent=''
    document.getElementById('spanQtdeDocumentos').textContent=''
    document.getElementById('spanNumManifesto').textContent=''
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

const populaMotoristaBarraManifesto = (motoristaPrincipal='') => {
    const element = document.getElementById('motoristaPrincipal');
    if (element && motoristaPrincipal) {
        element.textContent = motoristaPrincipal;
    }else{
        element.textContent = 'motoristaPrincipal';
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
