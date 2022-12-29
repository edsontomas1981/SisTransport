$('#btnRelacionaTabela').on('click', function(e){
    clienteEstaNaTabela()
    e.preventDefault()
})

function clienteEstaNaTabela(){
    let postData = '&cnpj_cpf=' + $('#comlCnpj').val();
    let dados = { 'url': '/readParceiro/', 'id': postData }
    conectaBdGeral(dados,anexaTabela)
}

function limpaCnpjTabela(){
    $('#comlCnpj').val('');
    $('#comlRazao').val('');
}

function anexaTabela(response){
    switch (response.status) {
        case 200:
            let postData = '&cnpj_cpf=' + $('#comlCnpj').val();
            postData=postData + '&numTabela=' + $('#numTabela').val();
            let dados = { 'url': '/comercial/cnpjTabela/', 'id': postData }   
            limpaCnpjTabela();
            conectaBdGeral(dados,parceirosVinculados)
            alert('Cliente anexado com sucesso !')
            break;
        case 400:
            alert('Parceiro não encontrado')
            break;
        default:
            alert(response.status)
    }
}

function parceirosVinculados(response) {

    limpaTabela('#cnpjsRelacionados td');

    const data = response.parceirosVinculados;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr">' +
            '<td>' + data[i].cnpj_cpf + '</td>' +
            '<td>' + data[i].raz_soc + '</td>' +
            '<td>' +'<i class="ti-pencil-alt2"></i>' + '</td>' +
            '<td>' +     + '</td>' +
            '</tr>'
        $('#cnpjsRelacionados tbody').append(template)
        }
};

