document.addEventListener('DOMContentLoaded',()=>{
  let txtNumManifesto=document.getElementById('txtIdBuscaManifesto')
  let btnBuscaManifesto = document.getElementById('btnBuscarManifestoId')

  btnBuscaManifesto.addEventListener('click',async()=>{
    let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':txtNumManifesto.value});

    if(response.status==200){
      populaDadosManifesto(response.manifesto)
      populaDadosBarraManifesto(response)
      populaTbodyMotorista(response.manifesto.motoristas)
      // popula_tbody('tbodyMotorista',dadosParaTbodyMotoristas(response.manifesto.motoristas),botoes,false)

    }else{
      msgErro("Manifesto não localizado")
    }
  })
})



