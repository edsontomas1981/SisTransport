$('#ufOrigem').on('change', function(e){
    dados = { 'url':'/endereco/readMunicipio/','uf':$('#ufOrigem').val(),
              'destino':$('#cidadeOrigem')}
    bdEnderecos(dados,populaMunicipios)
});

$('#ufDestino').on('change', function(e){
    dados = { 'url':'/endereco/readMunicipio/','uf':$('#ufDestino').val(),
              'destino':$('#cidadeDestino')}
    bdEnderecos(dados,populaMunicipios)
});

$('#ufPercurso').on('change', function(e){
    dados = { 'url':'/endereco/readMunicipio/','uf':$('#ufPercurso').val(),
              'destino':$('#cidadePercurso')}
    bdEnderecos(dados,populaMunicipios)
});

function populaMunicipios(response,destino){
    destino.find('option').remove();
    $.each(response.municipios, function (i, d) {
        $('<option>').text(d.municipio).appendTo(destino);
    });
}

function bdEnderecos(dados,callback) {
    let destino = dados.destino
    let url = dados.url
    let postData = $('form').serialize();
    postData += '&uf=' + dados.uf;
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            callback(response,destino)
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}