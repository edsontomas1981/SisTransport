$('#btnNovaCotacao').on('click', function(e) {
    limpaCotacao()
    e.preventDefault();
})

$('#btnSalvaCotacao').on('click', function(e) {
    cnpjTomador=$('#cnpjTomador').val()
    dados = {'url':'/comercial/cotacao/createCotacao/','id':cnpjTomador}
    conectaBackEnd(dados,readTabelasEspecificas,'tabelaCotacao')
    e.preventDefault();
})

var populaSelectTabelas = (dados,idSelect)=>{
    var select = $(idSelect);
    select.empty(); // limpa a select box antes de preencher
    for (var dado in dados) {
        select.append($('<option>', {
            value: dados[dado],
            text: dado
        }));
    }
}
function limpaCotacao(){
    $('#nomeCotacao').val('')
    $('#contatoCotacao').val('')
    $('#nfCotacao').val('')
    $('#volumeCotacao').val('')
    $('#mercadoriaCotacao').val('')
    $('#valorNfCotacao').val('')
    $('#pesoCotacao').val('')
    $('#pesoFaturadoCotacao').val('')
    $('#resultM3Cotacao').val('')
    $('#obsCotacao').val('')
    $('#fretePesoCotacao').val('')
    $('#freteValorCotacao').val('')
    $('#advalorCotacao').val('')
    $('#grisCotacao').val('')
    $('#pedagioCotacao').val('')
    $('#despachoCotacao').val('')
    $('#outrosCotacao').val('')
    $('#baseCalculoCotacao').val('')
    $('#aliquotaCotacao').val('')
    $('#icmsCotacao').val('')
}

