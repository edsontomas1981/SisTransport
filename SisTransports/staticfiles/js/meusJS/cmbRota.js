$(window).load(function(){
  dados= { 'url': '/rotas/readRotas/'}
  conectaBdGeral(dados,populaRota)
});

function populaRota (response){
    data= response.rotas
    var selectbox = $('#rota');
    selectbox.find('option').remove();
    $.each(data, function (i, d) {
        selectbox.append('<option value="' + d.id+ '">' + d.nome + '</option>');
    });
}

