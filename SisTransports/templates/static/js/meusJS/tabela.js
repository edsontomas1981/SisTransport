$('#comlCnpj').on('blur', function(e) {
    let dados = { 'url': '/busca_parceiro/', 'cnpj': $('#comlCnpj').val() }
    conectaBd(dados, populaRazao)

});

function populaRazao(response) {
    $('#comlRazao').val(response.dados[0].raz_soc)
}

function limpaForm() {
    //se sim tabela esta bloqueada
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
    limpaTabela();
}

function populaTabela(response) {
    limpaTabela()
    parceirosVinculados(response)
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
//enviar um array com a url e caso necessario o cnpj para consulta
function conectaBd(dados, callback) {
    let url = dados.url
    let postData = $('form').serialize();
    if (dados.cnpj) {
        postData += '&cnpj_cpf=' + dados.cnpj;
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            callback(response)
            return response
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

$('#btnNovaTabela').on('click', function(e) {
    limpaForm();
    $('#numTabela').val('');
    e.preventDefault();
})

$('#btnIncluiTabela').on('click', function(e) {
    dados = { url: '/comercial/createTabela/' }
    conectaBd(dados, incluiTabela)
    e.preventDefault();
})

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
$('#btnBuscaTabela').on('click',function(e){
  dados={'url':'/comercial/readTabela/','cnpj':$('#numTabela').val()}
  reposta=conectaBd(dados,populaTabela);
  alert("minha",resposta)
  e.preventDefault();
});


function limpaTabela() {
    $('#cnpjsRelacionados td').remove();
}

function parceirosVinculados(response) {
    alert(response.parceirosVinculados)
    const data = response.parceirosVinculados;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr">' +
            '<td>' + data[i].cnpj_cpf + '</td>' +
            '<td>' + data[i].raz_soc + '</td>' +
            '<td>' + '<button type="button" id="alteraContato"' +
            'class="btn btn-success btn-rounded btn-icon">' +
            '<i class="ti-pencil-alt2"></i></button>' + '</td>' +
            '<td>' + '<button type="button" id="excluiContato"'+
            'class="btn btn-danger btn-rounded btn-icon">' +
            '<i class="ti-eraser "></i>' + '</button>' + '</td>' +
            '</tr>'
        $('#cnpjsRelacionados tbody').append(template)
    }
};

function relatorioTabela(response) {
    console.table(response.tabela)
    const data = response.tabela;
    let template
    for (let i = 0; i < data.length; i++) {
        template ='<tr class="tr">' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].descricao + '</td>' +
            '<td>' + data[i].freteMinimo + '</td>' +
            '<td>' + data[i].adValor + '</td>' +
            '<td>' + data[i].gris + '</td>' +
            '<td>' + data[i].despacho + '</td>' +
            '<td>' + data[i].pedagio + '</td>' +
            '<td>' + data[i].gris + '</td>' +
            '<td>' + data[i].outros + '</td>' +
            '<td><i class="ti-trash"></i></td>'+
            '<td><i class="ti-pencil-alt"></i></td>' +
          '</tr>'
        $('#relatorioTabela tbody').append(template)
    }
};
$( window ).load(function() {
  dados={'url':'/comercial/getTodasTabelas/'}
  conectaBd(dados,relatorioTabela);

});
