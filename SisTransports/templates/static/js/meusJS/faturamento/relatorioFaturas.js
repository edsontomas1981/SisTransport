document.addEventListener("DOMContentLoaded", async () => {
  let faturas = popula_relatorio_faturas();
});

document
  .getElementById("btnBuscaFaturasRelatorio")
  .addEventListener("click", async () => {
    const apiService = new ApiService();
    const url = "/faturamento/get_fatura_criterios/";
    const dados = obterDadosDoFormulario("criterioBuscaFatura");

    // Enviando dados via POST e armazenando o resultado em uma variável
    const resultadoPost = await apiService.postData(url, dados);

    console.log(resultadoPost.faturas);

    // resultadoPost.faturas.forEach(element => {
    //   console.log(element)
    // });

    await popula_relatorio_faturas_filtro(resultadoPost.faturas)
  });


  const popula_relatorio_faturas_filtro = async (response) => {

    console.log(response)

    let botoes = {
      alterar: {
        classe: "btn-primary text-white",
        texto: '<i class="fa fa-search" aria-hidden="true"></i>',
        callback:readFatura
    },
      excluir: {
        classe: "btn-danger text-white",
        texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
        callback: excluirFatura
      }
    };
  
    let faturas = preparaDadosTbodyFaturas(response);
    
    await popula_tbody_paginacao(
      'divNavegacaoFaturaRelatorio',
      'tbodyFaturasRelatorio',
      faturas,
      botoes,
      1, // Página inicial
      10, // Itens por página
      false, // Sem ordenação automática
      false  // Sem filtro adicional
    );
  };
