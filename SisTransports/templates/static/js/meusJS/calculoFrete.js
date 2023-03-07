class CalculoFrete{

}

var readTabelas=(idSelect) =>{
    dados = { 'url': '/rotas/readRotas/' }
    conectaBackEnd(dados,carregaTabelasSelecionadas,idSelect)
}

var carregaTabelasSelecionadas = (response,idSelect) =>{
    options = response.tabela
    $.each(options, function(value, text) {
        $('#'+idSelect).append($("<option></option>").attr("value", text['id']).text(text['nome']));
      });
}
