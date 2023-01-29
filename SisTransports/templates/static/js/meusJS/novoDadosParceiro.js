$('#cnpjRem').on('blur', function(e) {
    parceiro = new Parceiro($('#cnpjRem').val(),'Rem')
    parceiro.getParceiro()
    alert(parceiro.getRazao())
});


var setParceiro=(parceiro) =>{
    $('#insc'+parceiro.sufixo).val(parceiro.insc)
    $('#razao'+parceiro.sufixo).val(parceiro.raz_soc)
    $('#fantasia'+parceiro.sufixo).val(parceiro.fantasia)
    // $('#cep'+parceiro.sufixo).val(parceiro.endereco.cep)
    // $('#rua'+parceiro.sufixo).val(parceiro.endereco.endereco)
    // $('#numero'+parceiro.sufixo).val(parceiro.endereco.numero)
    // $('#complemento'+parceiro.sufixo).val(parceiro.endereco.complemento)
    // $('#bairro'+parceiro.sufixo).val(parceiro.endereco.bairro)
    // $('#cidade'+parceiro.sufixo).val(parceiro.endereco.cidade)
    // $('#uf'+parceiro.sufixo).val(parceiro.endereco.uf)


}

// $('#cnpjDest').on('blur', function(e) {
//     buscaParceiro('Dest')
//     e.preventDefault();
// });

// $('#cnpjConsig').on('blur', function(e) {
//     buscaParceiro('Consig')
//     e.preventDefault();
// });

// var populaParceiro = (response,sufixo) =>{
//     parceiro=new Parceiro(response)
//     parceiro.populaParceiro(sufixo)
// }

// var buscaParceiro=(sufixo)=>{
//     let url = '/busca_parceiro/'
//     let postData = $('form').serialize();
//     postData += '&cnpj_cpf=' + $('#cnpj'+sufixo).val();
//     dados = {'url':url,'id':postData}
//     conectaBackEnd(dados,populaParceiro,sufixo)
// }