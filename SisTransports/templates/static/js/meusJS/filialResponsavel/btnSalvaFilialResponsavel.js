let btnSalvaFilial = document.getElementById("btnSalvaFilial");
btnSalvaFilial.addEventListener("click", async function() {
    const apiService = new ApiService();
    // const url = "/entrada_notas/entrada_notas/";
    const url = "/enderecos/filial_responsavel/";
    let dados = getDadosForm('frmFiliais')
    // Enviando dados via POST e armazenando o resultado em uma variável
    const response = await apiService.postData(url, dados);

    if (response.status === 200){
      msgOk('Filial salva com sucesso!');
      limparFormularioGeral('frmFiliais')
    }else if (response.status === 400) {
      msgErro('Erro ao salvar filial: ' + response.data.error);
    } else {
      msgErro('Erro desconhecido ao salvar filial.');
    }
    
});
