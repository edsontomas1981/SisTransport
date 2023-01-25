function conectaBackEnd(dados, callback) {
    let url = dados.url
    let postData = $('form').serialize();
    postData += dados.id;
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            callback(response)
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

function capturaDadosNaRowClicada() {
    // Adiciona um evento de clique a cada linha da tabela
    $("table tr").click(function() {
        // Captura os dados das células
        var data = $(this).find("td").map(function() {
          return $(this).text();
        }).get();
    
        // Exibe os dados capturados no console
        console.log(data);
      });
}

$(document).ready(function() {
    capturaDadosNaRowClicada()
});