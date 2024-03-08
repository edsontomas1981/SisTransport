let txtNumManifesto=document.getElementById('txtBuscaManifesto')
let btnBuscaManifesto = document.getElementById('btnBuscarManifestoId')

btnBuscaManifesto.addEventListener('click',async()=>{

    let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':1});

    console.log(response)
})


