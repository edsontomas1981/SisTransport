const remetente = new Parceiro()
const destinatario = new Parceiro()
const consignatario = new Parceiro()


$('#cnpjRem').on('blur', function(e) {
    remetente.constroeParceiro($('#cnpjRem').val(),'Rem')
    remetente.populaCampos()
});

$('#btnCnpjRem').on('click', function(e) {
    if (remetente.id){
        remetente.alteraParceiro()
    }else{
        remetente.createParceiro()
    }
});


$('#cnpjDest').on('blur', function(e) {
    destinatario.constroeParceiro($('#cnpjDest').val(),'Dest')
    destinatario.populaCampos()
});

$('#cnpjConsig').on('blur', function(e) {
    consignatario.constroeParceiro($('#cnpjConsig').val(),'Consig')
    consignatario.populaCampos()
});

