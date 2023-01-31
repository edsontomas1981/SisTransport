$('#cnpjRem').on('blur', function(e) {
    const remetente = new Parceiro($('#cnpjRem').val(),'Rem')
    remetente.carregaDados();
});

