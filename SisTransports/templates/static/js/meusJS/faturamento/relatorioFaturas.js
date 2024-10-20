document.addEventListener("DOMContentLoaded", async () => {
  let faturas = popula_relatorio_faturas();
});

document
  .getElementById("btnBuscaFaturasRelatorio")
  .addEventListener("click", async () => {
    const apiService = new ApiService();
    const url = "/faturamento/get_fatura_criterios/";
    const dados = obterDadosDoFormulario("criterioBuscaFatura");

    console.log(dados);

    // Enviando dados via POST e armazenando o resultado em uma variável
    const resultadoPost = await apiService.postData(url, dados);

    //let response = await conectaEndpoint('/faturamento/get_fatura_criterios/',{'id':12345})
    console.log(resultadoPost);
  });
