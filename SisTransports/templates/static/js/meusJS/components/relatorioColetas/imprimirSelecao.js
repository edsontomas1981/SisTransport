let imprimirSelecionados = document.getElementById('imprimirSelecao')
imprimirSelecionados.addEventListener('click',async ()=>{
    conectar('/operacional/printColetas/',obterCamposSelecionados())
})

const conectar = async (url,data)=>{
    let conexao = new Conexao(url, data);
    try {
       conexao.sendPostRequest();
    } catch (error) {

        console.error(error); // Imprime a mensagem de erro
        return error
    }
 }

const obterCamposSelecionados=()=> {
    var camposSelecionados = [];
  
    // Obtém todas as linhas da tabela
    var linhas = document.getElementById("relatorioColetas").getElementsByTagName("tr");
  
    // Itera sobre cada linha da tabela
    for (var i = 0; i < linhas.length; i++) {
      // Obtém a célula da coluna de seleção (índice 0)
      var celulaSelecao = linhas[i].getElementsByTagName("td")[0];
  
      // Verifica se a caixa de seleção está marcada
      var checkbox = celulaSelecao.querySelector('input[name="selecao"]');
      if (checkbox.checked) {
        // Se marcada, obtém os dados das outras células da mesma linha
        var idRow = linhas[i].getElementsByTagName("td")[1].innerText;
  
        // Adiciona os dados a um objeto e coloca esse objeto no array
        var campoSelecionado = {
          id: idRow,
        };
        camposSelecionados.push(campoSelecionado);
      }
    }
    // Exibe os campos selecionados no console (você pode ajustar isso conforme necessário)
    return camposSelecionados;
}




  

  
