const remetente = new Parceiro()
const destinatario = new Parceiro()
const redespacho = new Parceiro()


$('#cnpjRem').on('blur', function(e) {
    remetente.constroeParceiro($('#cnpjRem').val(),'Rem')
    remetente.populaCampos()
    alert(destinatario.id)

});
$('#btnCnpjRem').on('click', function(e) {
    remetente.createParceiro();
});

$('#cnpjDest').on('blur', function(e) {
    destinatario.constroeParceiro($('#cnpjDest').val(),'Dest')
    destinatario.populaCampos()
    alert(destinatario.id)
});

