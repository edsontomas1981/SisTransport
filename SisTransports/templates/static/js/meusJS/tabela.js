//recebe uma tabela hash com as chaves url e id contendo os dados a serem consultados 
//Ex: postData = '&cnpj_cpf='0000000000191;
//Ex {url:'/rotaAcessada/',id:postData} 
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
$(window).load(function() {
    populaRelatTabelas()
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

$('#relatorioTabela').click(function(e) {
    var botao = document.querySelectorAll('button')
    botao.forEach((e) => {
        e.addEventListener('click', linhaTabela);
    });
});

$('#btnExcluiTabela').on('click', function(e) {
    if ($('#numTabela').val()) { excluirTabelas($('#numTabela').val()) } else { alert('Não existe tabela para excluir.') }
})

$('#btnNovaTabela').on('click', function(e) {
    limpaForm();
    $('#numTabela').val('');
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
    $('#numTabela').val('')
    $('#descTabela').val('')
    //se true tabela esta bloqueada
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
    $('#aliquotaIcms').val('');  
    $('#comlCnpj').val(''); 
    $('#comlRazao').val(''); 

    
    limpaTabela('#cnpjsRelacionados td');
    limpaTabela('#tabelaFaixas td');
    limpaTabela('#rotasAnexadasTabela td')
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
    $('#aliquotaIcms').val(response.tabela.aliquotaIcms); 

}

function limpaTabela(tabela) {
    $(tabela).remove();
}

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

function populaRelatTabelas() {
    dados = { 'url': '/comercial/getTodasTabelas/' }
    conectaBdGeral(dados, relatorioTabela);
    limpaForm()
}

var readTabelasEspecificas = (response,idSelect) =>{
    options = response.tabelas
    $.each(options, function(value, text) {
        $('#'+idSelect).append($("<option></option>").attr("value", text['id']).text(text['descricao']));
    });
}


