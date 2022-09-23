function carregaDtc(response){
    limpaDtc()
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
    
    if (response.dtc.coleta){
        completaColeta(response.dtc.coleta)
    }
    
}
function limpaColeta(){
    $('#nf').val('')
    $('#volumes').val('')
    $('#peso').val('')
    $('#resultM3').val('')
    $('#valor').val('')
    $('#especie').val('')
    // $('#veiculo').attr(veiculo)
    $('#cepColeta').val('')
    $('#ruaColeta').val('')
    $('#numeroColeta').val('')
    $('#complementoColeta').val('')
    $('#bairroColeta').val('')
    $('#cidadeColeta').val('')
    $('#ufColeta').val('')
    $('#nomeColeta').val('')
    $('#contatoColeta').val('')
    $('#obs').val('')
    $('#mercadoria').val('')
    $('#horario').val('')

}

function completaColeta(response){
    $('#nf').val(response.notaFiscal)
    $('#volumes').val(response.volume)
    $('#peso').val(response.peso)
    $('#resultM3').val(response.cubM3)
    $('#valor').val(response.valor)
    $('#especie').val(response.especie)
    // $('#veiculo').attr(response.veiculo)
    $('#cepColeta').val(response.cep)
    $('#ruaColeta').val(response.rua)
    $('#numeroColeta').val(response.numero)
    $('#complementoColeta').val(response.complemento)
    $('#bairroColeta').val(response.bairro)
    $('#cidadeColeta').val(response.cidade)
    $('#ufColeta').val(response.uf)
    $('#nomeColeta').val(response.nome)
    $('#contatoColeta').val(response.contato)
    $('#obs').val(response.observacao)
    $('#mercadoria').val(response.mercadoria)
    $('#horario').val(response.horario)
    $('#idColeta').val(response.id)

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

function limpaParceiro(cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {
        $('#' + cnpj).val('');
        $('#' + insc).val('');
        $('#' + razao).val('');
        $('#' + fantasia).val('');
        $('#' + cep).val('');
        $('#' + endereco).val('');
        $('#' + numero).val('');
        $('#' + complemento).val('');
        $('#' + bairro).val('');
        $('#' + cidade).val('');
        $('#' + uf).val('');
}        

function limpaDtc(){
    limpaParceiro('cnpjRem', 'inscRem', 'razaoRem', 'fantasiaRem', 'cepRem','ruaRem','numeroRem','complementoRem',
            'bairroRem','cidadeRem','ufRem')
    limpaParceiro('cnpjDest', "inscDest", "razaoDest", "fantasiaDest","cepDest","ruaDest", "numeroDest", "complementoDest",
            "bairroDest", "cidadeDest", "ufDest")
    limpaParceiro('cnpjRedesp', "inscRedesp", "razaoRedesp", "fantasiaRedesp","cepRedesp","ruaRedesp", "numeroRedesp", 
            "complementoRedesp", "bairroRedesp", "cidadeRedesp", "ufRedesp")  
    limpaParceiro('cnpjConsig', "inscConsig", "razaoConsig", "fantasiaConsig","cepConsig","ruaConsig", "numeroConsig", 
            "complementoConsig", "bairroConsig", "cidadeConsig", "ufConsig")  
    limpaColeta()
}

function buscaDtc() {
    let url = '/preDtc/buscaDtc/'
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {

            limpaDtc()
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
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            alert("Dtc Deletado com sucesso");
            $('#numPed').val("")
            limpaDtc()
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}
$('#btnBuscaDtc').on('click', function(e) {
    limpaDtc()
    buscaDtc()
    e.preventDefault();
});

$('#excluiDtc').on('click', function(e) {
    let msg='o dtc de nº' + $('#numPed').val() + ' ?'
    if (confirmacao(msg)){
        excluiDtc($('#numPed').val())
    }
    e.preventDefault();
});

$('#btnNovo').on('click', function(e) {
    e.preventDefault();
    $('#numPed').val("")
    limpaDtc()
});
