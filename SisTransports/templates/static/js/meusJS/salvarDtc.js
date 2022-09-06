function criaDados(cnpjRem, cnpjDest, cnpjRedesp, cnpjConsig) {

    return '&cnpjRem=' + cnpjRem + '&cnpjDest=' + cnpjDest + '&cnpjRedesp=' + cnpjRedesp + '&cnpjConsig=' + cnpjConsig
}


$(document).keydown(function(event) {
    if (event.altKey && event.which === 88) {
        alert('Alt + X pressed!');
        e.preventDefault();
    }
});

$('#salvaDtc').on('click', function(e) {
    let url = '/saveDtc/'
    let postData = $('form').serialize();
    postData += criaDados($('#cnpjRem').val(), $('#cnpjDest').val(), $('#cnpjRedesp').val(), $('#cnpjConsig').val())
    console.log(postData)

    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            alert('DTC salvo com sucesso')
            $('#numPed').val(response.dadosDtc[0].id)
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
    e.preventDefault();
})