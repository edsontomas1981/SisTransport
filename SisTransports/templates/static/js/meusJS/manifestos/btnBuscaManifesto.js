let txtNumManifesto=document.getElementById('txtIdBuscaManifesto')
let btnBuscaManifesto = document.getElementById('btnBuscarManifestoId')

btnBuscaManifesto.addEventListener('click',async()=>{
  let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':txtNumManifesto.value});

  if(response.status==200){
    console.log(response)
    populaDadosManifesto(response.manifesto)
    populaDadosBarraManifesto(response)
    popula_tbody('tbodyMotorista',dadosParaTbodyMotoristas(response.manifesto.motoristas),botoesMotorista,false)

  }else{
    msgErro("Manifesto não localizado")
  }
})


