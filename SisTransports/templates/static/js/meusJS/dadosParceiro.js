$('#cnpjRem').on('blur', function(e) {
    let dados = buscaParceiro($('#cnpjRem').val());
    console.log(dados);
    e.preventDefault();
});