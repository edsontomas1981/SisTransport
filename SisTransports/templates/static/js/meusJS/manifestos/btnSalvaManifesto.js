
let btnSalvaManifesto = document.getElementById('btnSalvaManifesto')

btnSalvaManifesto.addEventListener('click',()=>{
    let dados = geraDadosManifesto()

    console.log(dados)
})