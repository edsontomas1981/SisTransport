function conectaBackEnd(dados, callback,...idComponente) {
    let url = dados.url
    let postData = $('form').serialize();
    postData +='&id='+dados.id;
    console.log(postData)
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            if (idComponente){
                callback(response,idComponente)
            }else{
                callback(response)
            }
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

});

var abaSemSalvar=(idAbas)=>{
    var conteudoAlterado = false;
  
    // Detectar alterações no conteúdo
    $(idAbas).on("input", function() {
      conteudoAlterado = true;
    });
  
    // Verificar alterações não salvas antes de mudar de aba
    $(".link-aba").on("click", function() {
      if (conteudoAlterado) {
        if (!confirm("Você tem alterações não salvas. Tem certeza de que deseja sair dessa página?")) {
          return false;
        }else{
            alert('Salvar o Conteudo')
        }
      }
    });
}


  
