document.getElementById('btnLimpaManifesto').addEventListener('click',()=>{
    limpaDadosManifesto()
    limpaBarraManifesto()
    limpaTbodyMotoristas()
    limpaTbodyVeiculos()
    document.getElementById('txtIdBuscaManifesto').value = ""
})

const limpaTbodyMotoristas = ()=>{
    document.getElementById("tbodyMotorista").innerHTML = "";
}

const limpaTbodyVeiculos = ()=>{
    document.getElementById("tbodyVeiculos").innerHTML = "";
}