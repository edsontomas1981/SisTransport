
$('#inserirRota').on('click', function(e) {
    dados={'url':'createRota/'}
    bdRota(dados,populaRota)
    e.preventDefault();
})

function populaRota(response){
    alert(response.rota.id,response.rota.nome)
    $('#idRota').val(response.rota.id)
    $('#idNomeRota').val(response.rota.nome)
    limpa()
}

function limpa(){
    $('.limpar').val('')

}

function bdRota(dados,callback) {
    let url = dados.url
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            switch (response.status) {
                case 200:
                    console.table(response)
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