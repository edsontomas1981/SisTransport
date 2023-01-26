$('#inserirRota').on('click', function(e) {
    dados = { 'url': '/rotas/createRota/' }
    bdRota(dados, populaRota)
    e.preventDefault();
})

function populaRota(response) {
    $('#idRota').val(response.rota.id)
    $('#idNomeRota').val(response.rota.nome)
    limpa()
}

function limpa() {
    $('.limpar').val('')
}

function bdRota(dados, callback) {
    let url = dados.url
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            switch (response.status) {
                case 200:
                    callback(response)
                    break;
                case 400:

                    break;
                default:
                    break;
            }
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

var readRotas=(idSelect) =>{
    dados = { 'url': '/rotas/readRotas/' }
    conectaBackEnd(dados,carregaSelectRotas,idSelect)
}

var carregaSelectRotas = (response,idSelect) =>{
    options = response.rotas
    $.each(options, function(value, text) {
        $('#'+idSelect).append($("<option></option>").attr("value", text['id']).text(text['nome']));
      });
}

