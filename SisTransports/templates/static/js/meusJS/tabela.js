$('#comlCnpj').on('blur', function(e) {
    let dados = { 'url': '/busca_parceiro/', 'cnpj': $('#comlCnpj').val() }
    conectaBd(dados, populaRazao)
});

$('#buscarTabelaFrete').on('keyup', function(e) {
    let filtro = $('#buscarTabelaFrete').val()
    if (filtro.length > 2){
        let dados = { 'url': '/comercial/filtraTabelas/', 'filtro': filtro}
        conectaBd(dados, relatorioTabela)
    }else {
        populaRelatTabelas()
    }
});

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
    limpaTabela();
}

function populaTabela(response) {
    parceirosVinculados(response)
    $('#numTabela').val(response.tabela.id)
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


//enviar um dicionario com a url e caso necessario o cnpj para consulta
function conectaBd(dados, callback) {
    let url = dados.url
    let postData = $('form').serialize();
    // trocar por um dado que vem da funcão
    if (dados.cnpj) {
        postData += '&cnpj_cpf=' + dados.cnpj;
    }
    if (dados.filtro) {
        postData += '&filtro=' + dados.filtro;
    }

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

$('#btnNovaTabela').on('click', function(e) {
    limpaForm();
    $('#numTabela').val('');
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
  e.preventDefault();
});


function limpaTabela() {
    $('#cnpjsRelacionados td').remove();
}

function limpaRelatorioTabela() {
    $('#relatorioTabela td').remove();
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
            '<td>' + '<button type="button" id="excluiContato"'+
            'class="btn btn-danger btn-rounded btn-icon">' +
            '<i class="ti-eraser "></i>' + '</button>' + '</td>' +
            '</tr>'
        $('#cnpjsRelacionados tbody').append(template)
    }
};

function relatorioTabela(response) {
    limpaRelatorioTabela()
    const data = response.tabela;
    let template
    for (let i = 0; i < data.length; i++) {
        template ='<tr class="tr" id="'+ data[i].id +'">' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].descricao + '</td>' +
            '<td>' + data[i].freteMinimo + '</td>' +
            '<td>' + data[i].adValor + '</td>' +
            '<td>' + data[i].gris + '</td>' +
            '<td>' + data[i].despacho + '</td>' +
            '<td>' + data[i].pedagio + '</td>' +
            '<td>' + data[i].gris + '</td>' +
            '<td>' + data[i].outros + '</td>' +
            '<td><button type="button" class="btn btn-dark '+
            'btn-rounded btn-icon" id="exclui"><i class="ti-trash"></i></button></td>'+
            '<td><button type="button" class="btn btn-dark '+
            'btn-rounded btn-icon" id="altera"><i class="ti-new-window"></i></button></td>'+
          '</tr>'

        $('#relatorioTabela tbody').append(template)
    }
    $('#relatorioTabela').show();
    
};



$( window ).load(function() {
    populaRelatTabelas()
});

$(document).ready(function() {
    $('#relatorioTabela').click(function(e){
        var botao = document.querySelectorAll('button')
        botao.forEach((e) => {
            e.addEventListener('click',linhaTabela);
            });
        });
})

function linhaTabela(e){
    botao=e.currentTarget.id;
    switch (botao) {
        case 'exclui':
            var tr = document.querySelectorAll('tr');
            tr.forEach((e) => {
                e.addEventListener('click',excTabela);
                });
            break;
        case 'altera':
            var tr = document.querySelectorAll('tr');
            tr.forEach((e) => {
                e.addEventListener('click',viewTabela);
            });
            $('#mdlTabFrete').modal('show');
            break;
    }
};

function viewTabela(e){
    idTabela=e.currentTarget.id
    let postData = '&numTabela='+idTabela;
    let dados = { 'url': '/comercial/readTabela/', 'id':postData}
    conectaBdGeral(dados, populaTabela)
}

function populaRelatTabelas(){
    dados={'url':'/comercial/getTodasTabelas/'}
    conectaBd(dados,relatorioTabela);
    limpaForm()

}

function excluirTabelas(idTabela){
    let id = idTabela
    if (confirm("Deseja realmente apagar a tabela selecionada ?")==true){
        let postData = '&idAdd='+id;
        let dados = { 'url': '/comercial/deleteTabela/', 'id':postData}
        conectaBdGeral(dados, exclui)
        alert('Tabela apagada com sucesso !!' )
        populaRelatTabelas()
    }
}

function excTabela(e){

    id=e.currentTarget.id;
    excluirTabelas(id)

}

$('#btnExcluiTabela').on('click', function(e) {
    if ($('#numTabela').val()){
        excluirTabelas($('#numTabela').val())
    }else{alert('Não existe tabela para excluir.')}
})

$('#btnIncluiTabela').on('click', function(e) {
    if ($('#numTabela').val()){
        let postData = '&numTabela='+$('#numTabela').val();
        let dados = { 'url': '/comercial/updateTabela/', 'id':postData}
        conectaBdGeral(dados, updateTabela)
    }else{    
        dados = { url: '/comercial/createTabela/' }
        conectaBdGeral(dados, incluiTabela)
    }
    e.preventDefault();
})

function updateTabela(response) {
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

//enviar um dicionario com a url e caso necessario o cnpj para consulta
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

$('#relatorioTabela').mouseover(function(e){
    $('#relatorioTabela').trigger("click");
    e.preventDefault();
})

$('.btn-close').on('click', function(e) {
    populaRelatTabelas()
    limpaForm()
})