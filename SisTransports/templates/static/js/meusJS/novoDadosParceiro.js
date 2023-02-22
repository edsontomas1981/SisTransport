const consignatario = new Parceiro($('#cnpjConsig').val(),'Consig');
const remetente = new Parceiro($('#cnpjRem').val(),'Rem');
const destinatario = new Parceiro($('#cnpjDest').val(),'Dest');
const parceiroMdl = new Parceiro ($('#cnpjMdl').val(),'Mdl')
// Remetente
$('#cnpjRem').on('blur', function(e) {
    remetente.cnpj=$('#cnpjRem').val()
    remetente.readParceiro()
});

$('#btnLimpaCnpjRem').on('click', function(e) {
    remetente.limparCamposDtc()
    remetente.limpaDados()
    e.preventDefault();
});

$('#btnCnpjRem').on('click', function(e) {
    remetente.openModalParceiro();
    remetente.openModalParceiro()
});

// Destinatario
$('#cnpjDest').on('blur', function(e) {
    destinatario.cnpj=$('#cnpjDest').val()
    destinatario.readParceiro()
});

$('#btnLimpaCnpjDest').on('click', function(e) {
    destinatario.limparCamposDtc()
    destinatario.limpaDados()
    e.preventDefault();
});

$('#btnCnpjDest').on('click', function(e) {
    destinatario.openModalParceiro()
    destinatario.populaContatos()
});


// Consignatario
$('#cnpjConsig').on('blur', function(e) {
    consignatario.cnpj=$('#cnpjConsig').val()
    consignatario.readParceiro()
});

$('#btnLimpaCnpjConsig').on('click', function(e) {
    consignatario.limparCamposDtc()
    consignatario.limpaDados()
    e.preventDefault();
});

$('#btnCnpjConsig').on('click', function(e) {
    consignatario.openModalParceiro()
    consignatario.populaContatos()
});


// Modal
$('#btnBuscaCnpj').on('click', function(e) {
    parceiroMdl.getWsParceiro();
    parceiroMdl.aguardaMdl();
    e.preventDefault();
})

$('#salvaParceiro').on('click',function (e){
    if (validateDocumentNumber($('#cnpjMdl').val()))
    {
        parceiroMdl.createParceiro();
    }else{
        alert("CNPJ inválido");
    }
})


$('#cnpjMdl').on('blur',function(e){
    if (validateDocumentNumber($('#cnpjMdl').val()))
    {
        parceiroMdl.cnpj=$('#cnpjMdl').val()
        parceiroMdl.carregaParceiroMdl()
    }else{
        alert("CNPJ inválido");
    }
});


// Botoes fechar
$('#btnFechar').on('click', function(e) {
    $('#mdlCadParceiros').modal('hide'); 
    closeModal();
    e.preventDefault();
})

$('#btnClose').on('click', function(e) {
    $('#mdlCadParceiros').modal('hide'); 
    closeModal();
    e.preventDefault();
})

// funcoes diversas

function limpaModalParceiroCnpj() {
    $('#idParceiro').val('')
    $('#idEndereco').val('')
    $('#cnpjMdl').val('');
    $('#insc_estMdl').val('');
    $('#razaoMdl').val('');
    $('#fantasiaMdl').val('');
    $('#obsMdl').val('');
    $('#cepMdl').val('');
    $('#ruaMdl').val('');
    $('#numeroMdl').val('');
    $('#complementoMdl').val('');
    $('#bairroMdl').val('');
    $('#cidadeMdl').val('');
    $('#ufMdl').val('');
    limpaContatos()
}

function closeModal() {
    // Limpa os campos
    $('#cnpj').val('');
    $('#idParceiro').val('');
    $('#collapseOne').removeClass('show');
    $('#collapseTwo').removeClass('show');
    $('#collapseThree').removeClass('show');
    $('#comercial').removeClass('show');
    $('#mdlCadParceiros').modal('hide'); 
    limpaModalParceiroCnpj();
    limpaTabelaContatos();  
}
