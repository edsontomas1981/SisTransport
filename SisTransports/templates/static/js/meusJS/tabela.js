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
    incluiTabela()
    e.preventDefault();
})
$('#comlCnpj').on('blur', function(e){
    getParceiro($('#comlCnpj').val())
});

function populaRazao(response){
    $('#comlRazao').val(response.dados[0].raz_soc)
}
function getParceiro(cnpj){
    let url = '/busca_parceiro/'
    let postData = $('form').serialize();
    postData += '&cnpj_cpf=' + cnpj;
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            switch (response.status) {
                case 200://retorna parceiro
                    populaRazao(response)
                    break;
                case 201:
                    populaRazao(response)                    
                    response
                    break;
                default:
                    alert("Cnpj/Cpf não localizado. ")
                    break;
            }
        },
        error: function(xhr) {
            console.log('Erro');
        } 

    });
}

function getTabela(){
    let url = '/comercial/readTabela/'
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

$('#btnBuscaTabela').on('click', function(e){
   getTabela()
});