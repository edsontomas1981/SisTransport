function populaFaixa(e) {
    id = e.currentTarget.id
    let postData = '&idFaixa=' + id;
    dados = { 'url': 'faixa/readFaixa/', 'id': postData }
    conectaBdGeral(dados, function(response) {
        $('#faixaInicial').val(response.faixa.faixaInicial)
        $('#faixaFinal').val(response.faixa.faixaFinal)
        $('#faixaValor').val(response.faixa.vlrFaixa)
    })

}

$('#tabelaFaixas').dblclick(function(e) {
    tr = document.querySelectorAll('tr')
    tr.forEach((e) => {
        e.addEventListener('dblclick', populaFaixa);
    });
});

$('#tabelaFaixas tbody').on('mouseover', function() {
    $('#tabelaFaixas tbody').trigger('click')
});

function tabelaFaixas(response) {
    limpaTabela('#tabelaFaixas td')
    const data = response.faixa;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr" id=' + data[i].id + ' ">' +
            '<td>' + data[i].faixaInicial + '</td>' +
            '<td>' + data[i].faixaFinal + '</td>' +
            '<td>' + data[i].vlrFaixa + '</td>' +
            '<td>' + '<i class="ti-pencil-alt2"></i>' + '</td>' +
            '<td>' + '<i class="ti-eraser "></i>' + '</td>' +
            '</tr>'
        $('#tabelaFaixas tbody').append(template)
    }

};

function faixa(response) {
    switch (response.status) {
        case 200:
            alert('Faixa salva com sucesso !')
            tabelaFaixas(response)
            break;
        case 400:
            alert('O campo Faixa ' + response.campo + ' já esta coberto no intervalo ' +
                response.intervalo.faixaInicial + ' à ' + response.intervalo.faixaFinal)
            break;
        default:
            // code block
    }
}
