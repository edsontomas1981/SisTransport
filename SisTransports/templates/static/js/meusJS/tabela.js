//recebe um dicionario com as chaves url e id contendo os dados a serem consultados 
//Ex: postData = '&cnpj_cpf='0000000000191;
//Ex {url:/rotaAcessada/,id:postData} 
function conectaBdGeral(dados, callback) {
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
// Eventos
$('#comlCnpj').on('blur', function(e) {
    let postData = '&cnpj_cpf=' + $('#comlCnpj').val();
    let dados = { 'url': '/busca_parceiro/', 'id': postData }
    conectaBdGeral(dados, populaRazao)
});

$('#buscarTabelaFrete').on('keyup', function(e) {
    let filtro = $('#buscarTabelaFrete').val()
    let postData
    if (filtro.length > 2) {
        postData += '&filtro=' + filtro;
        let dados = { 'url': '/comercial/filtraTabelas/', 'id': postData }
        conectaBdGeral(dados, relatorioTabela)
    } else {
        populaRelatTabelas()
    }
});

$('#btnNovaTabela').on('click', function(e) {
    limpaForm();
    $('#numTabela').val('');
    e.preventDefault();
})

$(window).load(function() {
    populaRelatTabelas()
});

$('#relatorioTabela').click(function(e) {
    var botao = document.querySelectorAll('button')
    botao.forEach((e) => {
        e.addEventListener('click', linhaTabela);
    });
});



$(document).ready(function() {

})

$('#btnExcluiTabela').on('click', function(e) {
    if ($('#numTabela').val()) { excluirTabelas($('#numTabela').val()) } else { alert('Não existe tabela para excluir.') }
})

$('#btnIncluiTabela').on('click', function(e) {
    //se houver tabela com o id atualiza ao inves de criar nova
    if ($('#numTabela').val()) {
        let postData = '&numTabela=' + $('#numTabela').val();
        let dados = { 'url': '/comercial/updateTabela/', 'id': postData }
        conectaBdGeral(dados, atualizarTabela)
    } else {
        dados = { url: '/comercial/createTabela/' }
        conectaBdGeral(dados, incluiTabela)
    }
    e.preventDefault();
})

$('#btnFaixa').on('click', function(e) {
    if (parseInt($('#faixaInicial').val()) < parseInt($('#faixaFinal').val())) {
        incluiFaixa()
    } else {
        alert('O campo faixa inicial deve ser maior do que o campo faixa final.')
    }

    e.preventDefault();
})

$('.btn-close').on('click', function(e) {
    $('#buscarTabelaFrete').val('');
    populaRelatTabelas()
    limpaForm()
})

//funcoes 

function populaRazao(response) {
    $('#comlRazao').val(response.dados[0].raz_soc)
}

function limpaForm() {
    //se sim tabela esta bloqueada
    $('#numTabela').val('')
    $('#descTabela').val('')
    $('#tabelaBloqueada').prop("checked", false);
    $('#icms').prop("checked", true);
    $('#cobraCubagem').prop("checked", true);
    $('#vlrFrete').val('');
    $('#advalor').val('');
    $('#gris').val('');
    $('#despacho').val('');
    $('#outros').val('');
    $('#pedagio').val('');
    $('#cubagem').val('');
    $('#freteMinimo').val('');
    $('#tipoFrete').val('');
    $('#tipoCobranPedagio').val('');
    limpaTabela('#cnpjsRelacionados td');
}

function populaTabela(response) {
    parceirosVinculados(response)

    $('#numTabela').val(response.tabela.id)
    populaFaixas($('#numTabela').val())
    $('#descTabela').val(response.tabela.descricao)
        //se sim tabela esta bloqueada
    if (response.tabela.bloqueada == 1) {
        $('#tabelaBloqueada').prop("checked", true);
    } else {
        $('#tabelaBloqueada').prop("checked", false);
    }
    if (response.tabela.icmsIncluso == 1) {
        $('#icms').prop("checked", true);
    } else {
        $('#icms').prop("checked", false);
    }
    if (response.tabela.cubagem == 1) {
        $('#cobraCubagem').prop("checked", true);
    } else {
        $('#cobraCubagem').prop("checked", false);
    }
    $('#vlrFrete').val(response.tabela.frete);
    $('#advalor').val(response.tabela.adValor);
    $('#gris').val(response.tabela.gris);
    $('#despacho').val(response.tabela.despacho);
    $('#outros').val(response.tabela.outros);
    $('#pedagio').val(response.tabela.pedagio);
    $('#cubagem').val(response.tabela.fatorCubagem);
    $('#freteMinimo').val(response.tabela.freteMinimo);
    $('#tipoFrete').val(response.tabela.tipoCalculo);
    $('#tipoCobranPedagio').val(response.tabela.tipoPedagio);

}

function populaFaixas(idTabela) {
    let postData = '&numTabela=' + idTabela;
    let dados = { 'url': 'faixa/readFaixas/', 'id': postData }
    conectaBdGeral(dados, tabelaFaixas)

}

function incluiTabela(response) {
    switch (response.status) {
        case 200:
            alert('Tabela salva com sucesso !')
            break;
        case 210:
            alert('Dtc ' + $('#numPed').val(response.dados.id) + ' alterado com sucesso !')
            $('#numPed').val(response.dados.id)
            break;
        case 400:
            alert('Erro !' + response.camposObrigatorios)
            break;
        default:
            // code block
    }
}

function limpaTabela(tabela) {
    $(tabela).remove();
}

function parceirosVinculados(response) {
    const data = response.parceirosVinculados;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr">' +
            '<td>' + data[i].cnpj_cpf + '</td>' +
            '<td>' + data[i].raz_soc + '</td>' +
            '<td>' + '<button type="button" id="alteraContato"' +
            'class="btn btn-success btn-rounded btn-icon">' +
            '<i class="ti-pencil-alt2"></i></button>' + '</td>' +
            '<td>' + '<button type="button" id="excluiContato"' +
            'class="btn btn-danger btn-rounded btn-icon">' +
            '<i class="ti-eraser "></i>' + '</button>' + '</td>' +
            '</tr>'
        $('#cnpjsRelacionados tbody').append(template)
        }
};

function relatorioTabela(response) {
    limpaTabela('#relatorioTabela td')
    const data = response.tabela;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr" id="' + data[i].id + '">' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].descricao + '</td>' +
            '<td>' + data[i].freteMinimo + '</td>' +
            '<td>' + data[i].adValor + '</td>' +
            '<td>' + data[i].gris + '</td>' +
            '<td>' + data[i].despacho + '</td>' +
            '<td>' + data[i].pedagio + '</td>' +
            '<td>' + data[i].gris + '</td>' +
            '<td>' + data[i].outros + '</td>' +
            '<td><button type="button" class="btn btn-dark ' +
            'btn-rounded btn-icon" id="exclui"><i class="ti-trash"></i></button></td>' +
            '<td><button type="button" class="btn btn-dark ' +
            'btn-rounded btn-icon" id="altera"><i class="ti-new-window"></i></button></td>' +
            '</tr>'

        $('#relatorioTabela tbody').append(template)
    }
};

function linhaTabela(e) {
    botao = e.currentTarget.id;
    switch (botao[0]) {
        case 'e':
            var tr = document.querySelectorAll('tr');
            tr.forEach((e) => {
                e.addEventListener('click', excTabela);
            });
            break;
        case 'a':
            var tr = document.querySelectorAll('tr');
            tr.forEach((e) => {
                e.addEventListener('click', mostrarTabela);
            });
            $('#mdlTabFrete').modal('show');
            break;
    }
};

function mostrarTabela(e) {
    idTabela = e.currentTarget.id
    let postData = '&numTabela=' + idTabela;
    let dados = { 'url': '/comercial/readTabela/', 'id': postData }
    conectaBdGeral(dados, populaTabela)
}

function populaRelatTabelas() {
    dados = { 'url': '/comercial/getTodasTabelas/' }
    conectaBdGeral(dados, relatorioTabela);
    limpaForm()
}

function excluirTabelas(idTabela) {
    let id = idTabela
    if (confirm("Deseja realmente apagar a tabela selecionada ?") == true) {
        let postData = '&idAdd=' + id;
        let dados = { 'url': '/comercial/deleteTabela/', 'id': postData }
        conectaBdGeral(dados, exclui)
        alert('Tabela apagada com sucesso !!')
        populaRelatTabelas()
    }
}

function excTabela(e) {
    id = e.currentTarget.id;
    excluirTabelas(id)
}

function atualizarTabela(response) {
    switch (response.status) {
        case 200:
            alert('Tabela alterada com sucesso !')
            break;
        case 210:
            break;
        case 400:
            alert('Erro !' + response.camposObrigatorios)
            break;
        default:
            // code block
    }
}

function populaRelatTabelas() {
    dados = { 'url': '/comercial/getTodasTabelas/' }
    conectaBdGeral(dados, relatorioTabela);
    limpaForm()
}

function incluiFaixa() {
    let postData = '&numTabela=' + $('#numTabela').val();
    let dados = { 'url': 'faixa/createFaixa/', 'id': postData }
    conectaBdGeral(dados, faixa)
}

('#btnRelacionaTabela').on('click', function(e){
    let postData = '&cnpj_cpf=' + $('#comlCnpj').val();
    let dados = { 'url': '/comercial/anexaParceiro/', 'id': postData }
    conectaBdGeral(dados, parceirosVinculados())
})
    