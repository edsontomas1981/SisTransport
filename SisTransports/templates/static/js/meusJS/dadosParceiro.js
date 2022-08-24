
function enderecoColeta(){
    $('#cepColeta').val($('#cepRem').val());
    $('#ruaColeta').val($('#ruaRem').val());
    $('#numeroColeta').val($('#numeroRem').val());
    $('#bairroColeta').val($('#bairroRem').val());
    $('#complementoColeta').val($('#complementoRem').val());
    $('#cidadeColeta').val($('#cidadeRem').val());
    $('#ufColeta').val($('#ufRem').val());

}

function modal(response) {
    $('#mdlCadParceiros').modal('show');
    $('#collapseOne').addClass('show');
    let cnpjModal = response.dados[0].cnpj_cpf.replace(/[^\d]+/g, '');
    $('#cnpjMdl').val(cnpjModal);
    $('#razaoMdl').val(response.dados[0].raz_soc);
    $('#fantasiaMdl').val(response.dados[0].nome_fantasia);
    let cep = response.dados[0].endereco_fk.cep.replace(/\D/g, '');
    $('#cepMdl').val(cep);
    $('#ruaMdl').val(response.dados[0].endereco_fk.logradouro);
    $('#numeroMdl').val(response.dados[0].endereco_fk.numero);
    $('#bairroMdl').val(response.dados[0].endereco_fk.bairro);
    $('#complementoMdl').val(response.dados[0].endereco_fk.complemento);
    $('#cidadeMdl').val(response.dados[0].endereco_fk.cidade);
    $('#ufMdl').val(response.dados[0].endereco_fk.uf);
}

function completaCnpj(response, cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {
    if (response.dados[0].id == 0) {
        modal(response, cnpj)

    } else {
        $('#' + insc).val(response.dados[0].insc_est);
        $('#' + razao).val(response.dados[0].raz_soc);
        $('#' + fantasia).val(response.dados[0].nome_fantasia);
        $('#' + cep).val(response.dados[0].endereco_fk.cep);
        $('#' + endereco).val(response.dados[0].endereco_fk.logradouro);
        $('#' + numero).val(response.dados[0].endereco_fk.numero);
        $('#' + complemento).val(response.dados[0].endereco_fk.complemento);
        $('#' + bairro).val(response.dados[0].endereco_fk.bairro);
        $('#' + cidade).val(response.dados[0].endereco_fk.cidade);
        $('#' + uf).val(response.dados[0].endereco_fk.uf);
    }

}

$('#cnpjRem').on('blur', function(e) {
    busca_parceiro($('#cnpjRem').val(), 'inscRem', 'razaoRem',
        'fantasiaRem', 'cepRem', 'ruaRem', 'numeroRem',
        'complementoRem', 'bairroRem', 'cidadeRem', 'ufRem');
        quemChamouModal='cnpjRem'
    e.preventDefault();
});

$('#cnpjRem').on('focus', function(e) {
    if ($('#cnpjRem').val() != "") {
        busca_parceiro($('#cnpjRem').val(), 'inscRem', 'razaoRem',
            'fantasiaRem', 'cepRem', 'ruaRem', 'numeroRem',
            'complementoRem', 'bairroRem', 'cidadeRem', 'ufRem');
    }
});

$('#cnpjDest').on('blur', function(e) {
    busca_parceiro($('#cnpjDest').val(), 'inscDest', 'razaoDest',
        'fantasiaDest', 'cepDest', 'ruaDest', 'numeroDest',
        'complementoDest', 'bairroDest', 'cidadeDest', 'ufDest');
        quemChamouModal='cnpjDest'  
    e.preventDefault();
});

$('#cnpjDest').on('focus', function(e) {
    busca_parceiro($('#cnpjDest').val(), 'inscDest', 'razaoDest',
        'fantasiaDest', 'cepDest', 'ruaDest', 'numeroDest',
        'complementoDest', 'bairroDest', 'cidadeDest', 'ufDest');
        quemChamouModal='cnpjDest'
    e.preventDefault();
});

$('#cnpjConsig').on('blur', function(e) {
    busca_parceiro($('#cnpjConsig').val(), 'inscConsig', 'razaoConsig',
        'fantasiaConsig', 'cepConsig', 'ruaConsig', 'numeroConsig',
        'complementoConsig', 'bairroConsig', 'cidadeConsig', 'ufConsig');
    e.preventDefault();
});

$('#cnpjRedesp').on('blur', function(e) {
    busca_parceiro($('#cnpjRedesp').val(), 'inscRedesp', 'razaoRedesp',
        'fantasiaRedesp', 'cepRedesp', 'ruaRedesp', 'numeroRedesp',
        'complementoRedesp', 'bairroRedesp', 'cidadeRedesp', 'ufRedesp');
    e.preventDefault();
});

$('#mdlCadParceiros').on('hidden.bs.modal', function(e) {
    console.log('fechou o modal ')
    $('#'+ quemChamouModal).focus();
    quemChamouModal='';
})




function busca_parceiro(cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {

    let url = '/busca_parceiro/'
    let postData = $('form').serialize();
    postData += '&cnpj_cpf=' + cnpj;

    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            if (response.length > 0) {

                return false;
            } else {

                completaCnpj(response, cnpj, insc, razao, fantasia, cep,
                    endereco, numero, complemento, bairro, cidade, uf);

            }
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}