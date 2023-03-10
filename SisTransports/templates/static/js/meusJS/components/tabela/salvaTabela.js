$('#btnIncluiTabela').on('click', function(e) {
    //se houver tabela com o id atualiza ao inves de criar nova
    if ($('#numTabela').val()) {
        let postData = '&numTabela=' + $('#numTabela').val();
        let dados = { 'url': '/comercial/updateTabela/', 'id': postData }
        conectaBdGeral(dados, atualizarTabela)
    } else {
        let postData;
        dados = { url: '/comercial/createTabela/','id': postData }
        conectaBdGeral(dados, incluiTabela)
    }
    e.preventDefault();
})

function atualizarTabela(response) {
    switch (response.status) {
        case 200:
            alert('Tabela alterada com sucesso !')
            break;
        case 210:
            break;
        case 400:
            alert('Preencha os Campos : ' + '\n' + response.camposObrigatorios + '\n')
            break;
        default:
            // code block
    }
}

function incluiTabela(response) {

    switch (response.status) {
        case 200:
            alert('Tabela salva com sucesso !')
            $('#numTabela').val(response.tabela.id);
            break;
        case 210:
            alert('Dtc ' + $('#numPed').val(response.dados.id) + ' alterado com sucesso !')
            $('#numPed').val(response.dados.id)
            break;
        case 400:
            alert('Preencha os Campos : ' + '\n' + response.camposObrigatorios + '\n')
            break;
        default:
            // code block
    }
}

$('#btnSaveRotaTabela').on('click',function(e){
    if($('#tipoTabela').val()!=1){
            Swal.fire({
                title: 'Por favor, observe que apenas é possível anexar uma rota à tabela geral. Se você tentar anexar uma rota a uma tabela especifica, o sistema não irá permitir e seus dados podem ser perdidos. Certifique-se de revisar suas informações antes de anexar uma rota à tabela geral. Obrigado pela compreensão.',
                showDenyButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Apagado!', '', 'error')
                }
            })
    }else{}
})


async function anexaRotaTabela() {
    dados=carregaDadosForm()
    const conexao = new Conexao('/comercial/anexaTabelaRota/',dados);
    try {
        const result = await conexao.sendPostRequest();
        console.log(result); // Imprime a resposta JSON da solicitação POST
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