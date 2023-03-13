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
    $('#comlRazao').val(response.parceiro.raz_soc)
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
    $('#numTabela').val(response.tabela.id)
    populaFaixas($('#numTabela').val())
    $('#descTabela').val(response.tabela.descricao)
    $('#tabBloq').prop("checked", response.tabela.bloqueada);
    $('#icms').prop("checked", response.tabela.icmsIncluso);
    $('#cobraCubagem').prop("checked", response.tabela.cubagem);
    $('#vlrFrete').val(response.tabela.frete);
    $('#tipoTabela').val(response.tabela.tipoTabela);
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
    $('#aliquotaIcms').val(response.tabela.aliquotaIcms);
    populaTabelaRotas(response)
    parceirosVinculados(response)
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

const populaTabelaRotas=(response)=>{
    limpaTabela('#rotasAnexadasTabela td')
    const data = response.rotas;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr" id="' + data[i].id + '">' +
            '<td id="nomeRota">' + data[i].nome + '</td>' +
            '<td>' + data[i].origemCidade + '-' + data[i].origemUf + '</td>' +
            '<td>' + data[i].destinoCidade + '-' +data[i].destinoUf + '</td>' +
            '<td>'+
            '<button type="button"class="btn btn-outline-danger btn-sm" id="desanexaRota">'+
            '<i class="fa fa-trash" aria-hidden="true"></i>'+
            '</button></td>' +
            '</tr>'

        $('#rotasAnexadasTabela tbody').append(template)
    }
}

$('#rotasAnexadasTabela').on("click", "#desanexaRota", function(event) {
    let nomeTabela = document.getElementById('descTabela')
    
    var row = $(event.target).closest('tr');
    var rota = {};
    rota.id = row.attr("id");
    rota.nomeRota=row.find("#nomeRota").text()
    Swal.fire({
        title: 'Deseja desvincular a rota '+ rota.nomeRota + ' da tabela ' + nomeTabela.value + ' ?',
        showDenyButton: true,
        showCancelButton: false,
        icon:'question',
        confirmButtonText: 'Desvincular',
        denyButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Desvinculado!', '', 'error')
          desanexaTabelaRota(rota.id)
        }
      })    
  });

 const desanexaTabelaRota= async (idRota)=>{
    let idTabela = document.getElementById('numTabela')
    let data = {'id':idRota,'tabela':idTabela.value}
    let conexao = new Conexao('/comercial/desanexaTabelaRota/', data);
    try {
        const result = await conexao.sendPostRequest();
        populaTabelaRotas(result)
            // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
 }

 $('#btnSaveRotaTabela').on('click',function(e){
    if($('#tipoTabela').val()!=1){
            Swal.fire({
                title: 'Por favor, observe que apenas é possível anexar uma rota à tabela geral. Se você tentar anexar uma rota a uma tabela especifica, o sistema não irá permitir e seus dados podem ser perdidos. Certifique-se de revisar suas informações antes de anexar uma rota à tabela geral. Obrigado pela compreensão.',
                showDenyButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: `Cancelar`,
            })
    }else{
        anexaRotaTabela();
    }
})


 const anexaRotaTabela= async ()=> {
    let dados=carregaDadosForm()
    let conexao = new Conexao('/comercial/anexaTabelaRota/',dados);
    try {
        const result = await conexao.sendPostRequest();
        Swal.fire({
            title: 'Rota anexada com sucesso !',
            icon:'success',
            confirmButtonText: 'Confirmar',
        })
        populaTabelaRotas(result)

        // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}


carregaDadosForm=()=>{
    return{'idTabela':$('#numTabela').val(),
        'nomeTabela':$('#descTabela').val(),
        'bloqueada':$('#tabelaBloqueada').val(),
        'icms':$('#icms').val(),
        'cobraCubagem':$('#cobraCubagem').val(),
        'vlrFrete':$('#vlrFrete').val(),
        'advalor':$('#advalor').val(),
        'gris':$('#gris').val(),
        'despacho':$('#despacho').val(),
        'outros':$('#outros').val(),
        'pedagio':$('#pedagio').val(),
        'fatorCubagem':$('#cubagem').val(),
        'freteminimo':$('#freteMinimo').val(),
        'tipoFrete':$('#tipoFrete').val(),
        'tipoCobPedagio':$('#tipoCobranPedagio').val(),
        'aliquota':$('#aliquotaIcms').val(),  
        'cnpj':$('#comlCnpj').val(), 
        'razao':$('#comlRazao').val(),
        'idRota':$('#rota').val(),
 
    }
 }

const populaSelectTabelas = (idSelect,dados) => {
    let select = $('#' + idSelect);
    select.empty(); // limpa a select box antes de preencher
    select.append($('<option>', {
            value: 0,
            text: 'Selecione a tabela'
    }));
    for (let i = 0; i < dados.length; i++) {
        select.append($('<option>', {
            value: dados[i].id,
            text: dados[i].descricao
        }));
    }
}



