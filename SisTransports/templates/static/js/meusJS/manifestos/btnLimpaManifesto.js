document.getElementById('btnLimpaManifesto').addEventListener('click',()=>{
    limpaDadosManifesto()
    limpaBarraManifesto()
    limpaTbodyMotoristas()
    limpaTbodyVeiculos()
    limpaDadosDocumentos()
    limpaTbodyDocumentos()
    document.getElementById('txtIdBuscaManifesto').value = ""
})

const limpaTbodyMotoristas = ()=>{
    limpa_tabelas("tbodyMotorista")
}

const limpaTbodyVeiculos = ()=>{
    limpa_tabelas("tbodyVeiculos")
}

const limpaTbodyDocumentos = ()=>{
    limpa_tabelas("tableDtcManifesto")
}

const limpaDadosDocumentos = ()=>{
    document.getElementById('cmbTipoManifesto').value = ""
    document.getElementById('cmbTipoDocumento').value = ""
    document.getElementById('numeroDocumento').value = ""
}
