$('#cnpjRem').on('blur', function(e) {
    busca_parceiro($('#cnpjRem').val());
    e.preventDefault();
});

function busca_parceiro(cnpj) {
    let url = '/busca_parceiro/'
    let postData = $('form').serialize();
    postData += '&cnpj_cpf=' + cnpj;

    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            console.log(response);
            if (response.length > 0) {
                console.log('falhou');
                return false;
            } else {
                console.log('passou');
                return true;
            }
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}