function salvaColeta() {
    let url = '/preDtc/saveColeta/'
    let postData = $('form').serialize();
    postData += '&cepColeta=' + $('#cepColeta').val()
    postData += '&numPed=' + $('#numPed').val();
    $.ajax({
        url: url,   
        type: 'POST',
        data: postData,
        success: function(response) {
            if(response.status == 200){
                alert('Coleta salva com Sucesso')
            }else{
                alert('Dtc não selecionado')
            }
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

$('#btnSalvaColeta').on('click', function(e){
    salvaColeta();
    e.preventDefault();
})