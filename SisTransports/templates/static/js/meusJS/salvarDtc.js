function criaDados(cnpjRem,cnpjDest,cnpjRedesp,cnpjConsig){

    return '&cnpjRem=' + cnpjRem + '&cnpjDest=' + cnpjDest +'&cnpjRedesp=' + cnpjRedesp +'&cnpjConsig=' + cnpjConsig
}

$('#salvaDtc').on('click', function(e) {
    let url = '/saveDtc/'
    let postData = $('form').serialize();
    postData+=criaDados($('#cnpjRem').val(),$('#cnpjDest').val(),$('#cnpjRedesp').val(),$('#cnpjConsig').val())
    console.log(postData)   
        $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {   
            $('#numPed').text(response.dadosDtc[0].id)

        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
    e.preventDefault();
})