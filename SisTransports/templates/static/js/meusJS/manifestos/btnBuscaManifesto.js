document.addEventListener('DOMContentLoaded',()=>{
  let txtNumManifesto=document.getElementById('txtIdBuscaManifesto')
  let btnBuscaManifesto = document.getElementById('btnBuscarManifestoId')

  btnBuscaManifesto.addEventListener('click',async()=>{
    limpaDadosManifesto()
    limpaBarraManifesto()
    limpaTbodyMotoristas()
    limpaTbodyVeiculos()
    limpaDadosDocumentos()
    limpaTbodyDocumentos()
    let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':txtNumManifesto.value});
    console.log(response)
    if(response.status==200){
      populaDadosManifesto(response.manifesto)
      populaDadosBarraManifesto(response)
      populaTbodyMotorista(response.manifesto.motoristas)
      populaVeiculosManifesto(response.veiculos)
      populaTbodyDocumentos(response.documentos)
    }else{
      msgErro("Não foi possível localizar o manifesto solicitado. Por favor, verifique os dados e tente novamente.")
    }
  })
})



