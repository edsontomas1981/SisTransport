function incluiTabela(){
    let url = '/comercial/createTabela/'
    let postData = $('form').serialize();
    
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            console.table(response)
            switch (response.status) {
                case 200:
                    alert('Tabela salva com sucesso !')
                    break;
                case 210:
                    alert('Dtc '+ $('#numPed').val(response.dados.id)+' alterado com sucesso !')
                    $('#numPed').val(response.dados.id)
                    break;                    
                case 400:
                    alert('Erro !' + response.camposObrigatorios)
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
$('#btnIncluiTabela').on('click', function(e) {
    alert('teste')
    incluiTabela()
    e.preventDefault();
})