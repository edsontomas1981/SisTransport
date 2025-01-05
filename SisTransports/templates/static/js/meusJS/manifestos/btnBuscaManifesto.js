document.addEventListener('DOMContentLoaded',()=>{
  let txtNumManifesto=document.getElementById('txtIdBuscaManifesto')
  let btnBuscaManifesto = document.getElementById('btnBuscarManifestoId')

  const populaTbodyDocumentos =(response)=>{
    const documento = prepareDataToTableManifesto(response);
    const opcoesSelect = [
      { value: "1", texto: "Cancelar" },
      { value: "2", texto: "Em Rota" },
      { value: "3", texto: "Entregue" },
    ];

    popula_tbody('tableDtcManifesto', documento, botoesManifesto, false,opcoesSelect);
  }


  btnBuscaManifesto.addEventListener('click',async()=>{
    limpaDadosManifesto()
    limpaBarraManifesto()
    limpaTbodyMotoristas()
    limpaTbodyVeiculos()
    limpaDadosDocumentos()
    limpaTbodyDocumentos()
    limpaContratoFrete()
    let response  = await connEndpoint('/operacional/get_manifesto_by_num/', {'numManifesto':txtNumManifesto.value});
    if(response.status==200){
      populaDadosManifesto(response.manifesto)
      populaDadosBarraManifesto(response)
      populaTbodyMotorista(response.manifesto.motoristas)
      populaVeiculosManifesto(response.veiculos)
      populaTbodyDocumentos(response.documentos)
      if (response.manifesto.contrato_fk){
        populaContratoFrete(response.manifesto.contrato_fk)
      }
    }else{
      msgErro("Não foi possível localizar o manifesto solicitado. Por favor, verifique os dados e tente novamente.")
    }
  })
})



