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