document.getElementById('btnLimpaManifesto').addEventListener('click',()=>{
    limpaDadosManifesto()
    limpaBarraManifesto()
    limpaTbodyMotoristas()
    limpaTbodyVeiculos()
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