function salvaColeta() {
    let url = '/preDtc/saveColeta/'
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            switch (response.status) {
                case 201:
                    alert('Coleta alterada com sucesso !')
                    break;
                case 200:
                    alert('Coleta salva com sucesso !')
                    completaColeta(response.coleta)
                    break;
                case 411:
                    msg = msgCamposFaltando(response)
                    alert(msg)
                    break;
                case 410:
                    alert('Pedido não informado.')
                    break;
                default:
                    // code block
            }
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

function deletaColeta() {
    let url = '/preDtc/deletaColeta/'
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            switch (response.status) {
                case 200:
                    alert('Coleta Deletada com sucesso !')
                    limpaColeta()
                    break;
                case 400:
                    alert('Coleta salva com sucesso !')
                    break;
                case 411:
                    break;
                case 410:
                    alert('Pedido não informado.')
                    break;
                default:
                    // code block
            }
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

function msgCamposFaltando(response) {
    let msgInicial = 'Os campos, '
    let eOuVirgula
    for (let i = 0; i < response.camposObrigatorios.length; i++) {
        eOuVirgula = response.camposObrigatorios.length == i + 2 ? " e " :
            response.camposObrigatorios.length == i + 1 ? '' : ', ';
        msgInicial += response.camposObrigatorios[i] + eOuVirgula

    }
    msgInicial += ' precisam ser preenchidos.'
    return msgInicial
}

$('#btnSalvaColeta').on('click', function(e) {
    salvaColeta();
    e.preventDefault();
})
$('#btnExcluiColeta').on('click', function(e) {
    let msg = 'Deseja realmente excluir a coleta ?'
    if (confirmacao(msg)) {
        deletaColeta($('#numPed').val())
    }
    e.preventDefault();
})

function confirmacao(msg) {
    var resposta = confirm(msg);
    return resposta
}