function salvaColeta() {
    let url = '/preDtc/saveColeta/'
    let postData = $('form').serialize();
    $.ajax({
        url: url,   
        type: 'POST',
        data: postData,
        success: function(response) {
            switch(response.status) {
                case 200:
                    alert('Coleta salva com sucesso !')
                    break;
                case 411 :
                    msg=msgCamposFaltando(response)
                    alert(msg)      
                    break;
                case 410 :
                    alert('Pedido não informado.')      
                    break;
                default:
                  // code block
              }        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

function msgCamposFaltando(response){
    let msgInicial = 'Os campos, '
    for (let i = 0; i < response.camposObrigatorios.length; i++) {
        msgInicial+=response.camposObrigatorios[i]+ ', '
    }
    msgInicial+=' precisam ser preenchidos.'
    return msgInicial
}

$('#btnSalvaColeta').on('click', function(e){
    salvaColeta();
    e.preventDefault();
})