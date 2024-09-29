document.addEventListener("DOMContentLoaded",async ()=>{

    let botoes={
        alterar: {
            classe: "btn-primary text-white",
            texto: '<i class="fa fa-search" aria-hidden="true"></i>',
            // callback: 
          },
        excluir: {
            classe: "btn-danger text-white",
            texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
            // callback: excluirFatura
          }
      };

    let url = '/faturamento/get_faturas/'
    let dados = {}
    let response = await conectaEndpoint(url,dados)
    let faturas = preparaDadosTbodyFaturas(response.faturas)
    popula_tbody_paginacao('divNavegacaoFaturaRelatorio','tbodyFaturasRelatorio',faturas,botoes,1,10,false,false)
})

