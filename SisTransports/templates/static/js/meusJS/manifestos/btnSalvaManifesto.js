
let btnSalvaManifesto = document.getElementById('btnSalvaManifesto')

btnSalvaManifesto.addEventListener('click',async ()=>{
    let dados = geraDadosManifesto()

    response = await connEndpoint('/operacional/create_manifesto/', dados);

    console.log(response)
})