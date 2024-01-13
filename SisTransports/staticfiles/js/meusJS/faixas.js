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
    console.log(response.faixa);

    // Verificar se response.faixa está definido e é um array
    if (response.faixa && Array.isArray(response.faixa)) {
        limpaTabela('#tabelaFaixas td');

        const data = response.faixa;
        let template;

        for (let i = 0; i < data.length; i++) {
            template = '<tr class="tr" id=' + data[i].id + ' ">' +
                '<td>' + data[i].faixaInicial + '</td>' +
                '<td>' + data[i].faixaFinal + '</td>' +
                '<td>' + data[i].vlrFaixa + '</td>' +
                '</tr>';
            $('#tabelaFaixas tbody').append(template);
        }
    } else {
        console.error('O array de faixa não está definido na resposta.');
    }
}


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