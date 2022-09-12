function carregaDtc(response){
    if (response.dtc.remetente){
        completaDtcCnpj(response.dtc.remetente,'cnpjRem', "inscRem", "razaoRem", "fantasiaRem",
         "cepRem","ruaRem", "numeroRem", "complementoRem", "bairroRem", "cidadeRem", "ufRem")        
    }
    if (response.dtc.destinatario){
        completaDtcCnpj(response.dtc.destinatario,'cnpjDest', "inscDest", "razaoDest", "fantasiaDest",
         "cepDest","ruaDest", "numeroDest", "complementoDest", "bairroDest", "cidadeDest", "ufDest")        
    }
    if (response.dtc.redespacho){
        completaDtcCnpj(response.dtc.redespacho,'cnpjRedesp', "inscRedesp", "razaoRedesp", "fantasiaRedesp",
         "cepRedesp","ruaRedesp", "numeroRedesp", "complementoRedesp", "bairroRedesp", "cidadeRedesp", "ufRedesp")        
    }
    if (response.dtc.consignatario){
        completaDtcCnpj(response.dtc.consignatario,'cnpjConsig', "inscConsig", "razaoConsig", "fantasiaConsig",
         "cepConsig","ruaConsig", "numeroConsig", "complementoConsig", "bairroConsig", "cidadeConsig", "ufConsig")        
    }    

}
function completaDtcCnpj(response,cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {
        $('#' + cnpj).val(response.cnpj_cpf);
        $('#' + insc).val(response.insc_est);
        $('#' + razao).val(response.raz_soc);
        $('#' + fantasia).val(response.nome_fantasia);
        $('#' + cep).val(response.endereco_fk.cep);
        $('#' + endereco).val(response.endereco_fk.logradouro);
        $('#' + numero).val(response.endereco_fk.numero);
        $('#' + complemento).val(response.endereco_fk.complemento);
        $('#' + bairro).val(response.endereco_fk.bairro);
        $('#' + cidade).val(response.endereco_fk.cidade);
        $('#' + uf).val(response.endereco_fk.uf);
}
function limpaInputs(){

    $('#numPed').val('');

    $('#cnpjRem').val('');
    $('#inscRem').val('');
    $('#razaoRem').val('');
    $('#fantasiaRem').val('');
    $('#cepRem').val('');
    $('#ruaRem').val('');
    $('#numeroRem').val('');
    $('#complementoRem').val('');
    $('#bairroRem').val('');
    $('#cidadeRem').val('');
    $('#ufRem').val('');

    $('#cnpjDest').val('');
    $('#inscDest').val('');
    $('#razaoDest').val('');
    $('#fantasiaDest').val('');
    $('#cepDest').val('');
    $('#ruaDest').val('');
    $('#numeroDest').val('');
    $('#complementoDest').val('');
    $('#bairroDest').val('');
    $('#cidadeDest').val('');
    $('#ufDest').val('');

    $('#cnpjRedesp').val('');
    $('#inscRedesp').val('');
    $('#razaoRedesp').val('');
    $('#fantasiaRedesp').val('');
    $('#cepRedesp').val('');
    $('#ruaRedesp').val('');
    $('#numeroRedesp').val('');
    $('#complementoRedesp').val('');
    $('#bairroRedesp').val('');
    $('#cidadeRedesp').val('');
    $('#ufRedesp').val('');

    $('#cnpjConsig').val('');
    $('#inscConsig').val('');
    $('#razaoConsig').val('');
    $('#fantasiaConsig').val('');
    $('#cepConsig').val('');
    $('#ruaConsig').val('');
    $('#numeroConsig').val('');
    $('#complementoConsig').val('');
    $('#bairroConsig').val('');
    $('#cidadeConsig').val('');
    $('#ufConsig').val('');

}
function limpar(){
    var buttons = document.querySelectorAll('input');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].value = '';
    }
}

function buscaDtc(idDtc) {
    let url = '/preDtc/buscaDtc/'
    let postData = $('form').serialize();
    // let postData = criaDados($('#cnpjRem').val(), $('#cnpjDest').val(), $('#cnpjRedesp').val(), $('#cnpjConsig').val())
    postData += '&idDtc=' + idDtc
    console.table(postData)
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            console.table(response)
            carregaDtc(response)
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}
function excluiDtc(idDtc) {
    let url = '/preDtc/excluiDtc/'
    let postData = $('form').serialize();
    // let postData = criaDados($('#cnpjRem').val(), $('#cnpjDest').val(), $('#cnpjRedesp').val(), $('#cnpjConsig').val())
    postData += '&idDtc=' + idDtc
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            alert("excluiDtc")
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}
$('#btnBuscaDtc').on('click', function(e) {
    buscaDtc($('#numPed').val())
    e.preventDefault();
});

$('#excluiDtc').on('click', function(e) {
    excluiDtc($('#numPed').val())
    e.preventDefault();
});

$('#btnNovo').on('click', function(e) {
    limpar()
    // limpaInputs()
    e.preventDefault();
});

// $('form').submit(function(e){
//     limpaInputs()
//     e.preventDefault();    
// });