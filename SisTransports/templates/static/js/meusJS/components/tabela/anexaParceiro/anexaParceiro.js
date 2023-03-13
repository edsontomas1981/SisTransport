$('#btnRelacionaTabela').on('click', function(e){
    carregaParceiro()
    e.preventDefault()
})

function carregaParceiro(){
    let postData = '&cnpj_cpf=' + $('#comlCnpj').val();
    let dados = { 'url': '/comercial/cnpjTabela/', 'id': postData }
    conectaBdGeral(dados,anexaTabela)
}

$('#btnNovoCnpj').on('click', function(e){
    limpaCamposCnpjRazao()
    e.preventDefault()
})

function limpaCamposCnpjRazao(){
    $('#comlCnpj').val('');
    $('#comlRazao').val('');
}

function anexaTabela(response){
    switch (response.status) {
        case 200:
            let postData = '&cnpj_cpf=' + $('#comlCnpj').val();
            postData=postData + '&numTabela=' + $('#numTabela').val();
            let dados = { 'url': '/comercial/cnpjTabela/', 'id': postData }   
            limpaCamposCnpjRazao();
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
        template = '<tr class="cnpj" id="'+data[i].id +'">' +
            '<td id="cnpj">' + data[i].cnpj_cpf + '</td>' +
            '<td id="razSoc">' + data[i].raz_soc + '</td>' +
            '<td id="desanexa">' + 
                '<button type="button"class="btn btn-outline-danger btn-sm">'+
                    '<i class="fa fa-trash" aria-hidden="true"></i>'+
                '</button>' + 
            '</td>' +
            '</tr>'
        $('#cnpjsRelacionados tbody').append(template)
        }
};

$('#comlCnpj').on('blur', function(e) {
    let postData = '&cnpj_cpf=' + $('#comlCnpj').val();
    let dados = { 'url': '/parceiros/readParceiro/', 'id': postData }
    conectaBdGeral(dados, populaRazao)
});

$('#cnpjsRelacionados').click(function(e) {
    tr = document.querySelectorAll('.cnpj')
    tr.forEach((e) => {
        e.addEventListener('click', desanexaParceiro);
    });
});

let desanexaParceiro = (e) =>{
    id=e.currentTarget.id
    if (confirm('Deseja desvincular o parceiro da tabela ?')){
        let postData = '&idParceiro=' + id;
        let dados = { 'url': '/comercial/excluiParceiroTabela/', 'id': postData }
        conectaBdGeral(dados,cnpj)
    }else{
        alert('Parceiro não encontrado')
    }
}

function cnpj(response){
    switch (response.status) {
        case 200:
            parceirosVinculados(response)
            break;
        case 400:
            alert('Parceiro não encontrado')
            break;
        default:
            alert(response.status)
    }
}


function populaCnpjsCpfs(e) {
    id = e.currentTarget.id
    let postData = '&idParceiro=' + id;
    let dados = { 'url': '/comercial/excluiParceiroTabela/', 'id': postData }
    conectaBdGeral(dados)
}


