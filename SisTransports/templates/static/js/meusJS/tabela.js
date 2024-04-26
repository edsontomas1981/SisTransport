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
let divPaginaTabelas = document.getElementById("divPaginaTabelas")
if (divPaginaTabelas){
    alert('pagina correta')
    divPaginaTabelas.addEventListener('load',()=>{
        populaRelatTabelas()
    })
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

const excluirTabelas= async (idTabela)=> {
    let id = idTabela 
    if (confirm("Deseja realmente apagar a tabela selecionada ?") == true) {
        // let postData = '&idAdd=' + id;
        resultado = await conexaTabelas('/comercial/deleteTabela/', {'id': idTabela});
        if (resultado.status === 200){
            alert('Tabela apagada com sucesso !!')
        }else{
            alert('Erro em apagar a tabela !!')
        }
        populaRelatTabelas()
    }
}



function excTabela(e) {
    id = e.currentTarget.id;
    excluirTabelas(id)
}

const carregaTabelas = async ()=>{
    let data = {}
    return conexaTabelas('/comercial/getTodasTabelas/', data);
}



const preparaDadosTabelas=(tabelas)=>{
    let listaTabelas = []
    tabelas.forEach(e => {
        listaTabelas.push({'id':e.id,'descricao':e.descricao,
                          'minimo':e.freteMinimo,'frete':e.frete,'advalor':e.adValor,'gris':e.gris,'despacho':e.despacho,
                          'pedagio':e.pedagio,'outros':e.outros})
    });
    return listaTabelas
  }

var readTabelasEspecificas = (response,idSelect) =>{
    options = response.tabelas
    $.each(options, function(value, text) {
        $('#'+idSelect).append($("<option></option>").attr("value", text['id']).text(text['descricao']));
    });
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
    switch (dados.status) {
        case 200:
            select.empty(); // limpa a select box antes de preencher
            select.append($('<option>', {
                    value: 0,
                    text: 'Selecione a tabela'
            }));
            for (let i = 0; i < dados.tabelas.length; i++) {
                select.append($('<option>', {
                    value: dados.tabelas[i].id,
                    text: dados.tabelas[i].descricao
                }));
            }            
            break;
        case 300:
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: 'Tabela não encontrada'
              })
        default:
            break;
    }

}
const populaRelatTabelas= async () => {
    let botoes={
        alterar: {
            classe: "btn-primary text-white",
            texto: '<i class="fa fa-search" aria-hidden="true"></i>',
            callback: mostrarTabela
          },
        excluir: {
            classe: "btn-danger text-white",
            texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
            callback: excluirTabelas
          }
      };
    let tabelas = await carregaTabelas()
    tabelas = preparaDadosTabelas(tabelas.tabela)
    if(document.getElementById("tbodyRelatorioTabelas")){
        popula_tbody_paginacao('paginacaoRelatTabelas','tbodyRelatorioTabelas',tabelas,botoes,1,10,true,false)
        limpaForm()
    }
}


