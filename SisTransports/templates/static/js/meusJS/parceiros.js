$('#salvaParceiro').on('click', function(e) {
    $('#acaoForm').val('salvaParceiro')
    let url = '/salva_parceiro/'
    let postData = $('form').serialize();
        $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {   
            alert('Cadastro ok')
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
    e.preventDefault();
})