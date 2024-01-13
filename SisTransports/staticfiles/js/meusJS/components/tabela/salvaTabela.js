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

const tableRotasAnexadas =()=>{
    // Seleciona todas as linhas da tabela
    const linhas = document.querySelectorAll('rotasAnexadasTabela tr');

    // Adiciona um listener de evento de clique em cada linha da tabela
    linhas.forEach((linha) => {
    linha.addEventListener('click', (event) => {
        // Obtém os dados da linha clicada
        const nome = linha.cells[0].textContent;
        const email = linha.cells[1].textContent;
        const telefone = linha.cells[2].textContent;

        // Faz algo com os dados obtidos, como exibi-los em um alerta ou console
        console.log(`Nome: ${nome}, Email: ${email}, Telefone: ${telefone}`);
    });
    });
}


