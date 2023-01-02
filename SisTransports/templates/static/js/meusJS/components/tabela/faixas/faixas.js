function populaFaixa(e) {
    id = e.currentTarget.id
    $('#idFaixa').val(id);
    let postData = '&idFaixa=' + id;
    dados = { 'url': 'faixa/readFaixa/', 'id': postData }
    conectaBdGeral(dados, function(response) {
        $('#faixaInicial').val(response.faixa.faixaInicial)
        $('#faixaFinal').val(response.faixa.faixaFinal)
        $('#faixaValor').val(response.faixa.vlrFaixa)
    })
}

$('#btnDeletaFaixa').on('click', function(e) {
    if (confirm("Deseja realmente apagar a faixa selecionada ?") == true) {
        deletaFaixa();
    }
        e.preventDefault();
})

function atualizaTabelaFaixas(response) {
    switch (response.status) {
        case 200:
            alert('Faixa apagada com sucesso !')
            break;
        default:
        alert ('Não foi possível apagar a faixa selecionada !')
    }
    populaFaixas($('#numTabela').val())
}

function deletaFaixa() {
    if ($('#idFaixa').val(id)){
        let postData = '&idFaixa=' + id;
        dados = { 'url': 'faixa/deleteFaixa/', 'id': postData }
        conectaBdGeral(dados,atualizaTabelaFaixas)
    }else{
        alert("Tabela nao foi selecionada")
    }
}

$('#tabelaFaixas').dblclick(function(e) {
    tr = document.querySelectorAll('tr')
    tr.forEach((e) => {
        e.addEventListener('dblclick', populaFaixa);
    });
});

function limpaCamposFaixa(){
    $('#faixaInicial').val('');
    $('#faixaFinal').val('');
    $('#faixaValor').val('');
    $('#idFaixa').val('');
}

function tabelaFaixas(response) {
    limpaTabela('#tabelaFaixas td')
    const data = response.faixa;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr" id=' + data[i].id + ' ">' +
            '<td>' + data[i].faixaInicial + '</td>' +
            '<td>' + data[i].faixaFinal + '</td>' +
            '<td>' + data[i].vlrFaixa + '</td>' +
            '</tr>'
        $('#tabelaFaixas tbody').append(template)
    }
};

function faixa(response) {
    switch (response.status) {
        case 200:
            alert('Faixa salva com sucesso !')
            tabelaFaixas(response)
            limpaCamposFaixa()
            break;
        case 400:
            alert('O campo Faixa ' + response.campo + ' já esta coberto no intervalo ' +
                response.intervalo.faixaInicial + ' à ' + response.intervalo.faixaFinal)
            break;
        default:
            // code block
    }
}



$('#btnFaixa').on('click', function(e) {
    if (parseInt($('#faixaInicial').val()) < parseInt($('#faixaFinal').val())) {
        incluiFaixa()
    } else {
        alert('O campo faixa inicial deve ser maior do que o campo faixa final.')
    }
    e.preventDefault();
})

$('#btnNovaFaixa').on('click', function(e) {
    limpaCamposFaixa()
    e.preventDefault();
})

function populaFaixas(idTabela) {
    limpaCamposFaixa();
    let postData = '&numTabela=' + idTabela;
    let dados = { 'url': 'faixa/readFaixas/', 'id': postData }
    conectaBdGeral(dados, tabelaFaixas)
}
