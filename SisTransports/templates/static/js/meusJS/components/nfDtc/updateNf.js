$("#tabelaNfs").on("click", ".btn-primary", function() {
    var row = $(this).closest("tr");
    var dadosCapturados = capturaDadosNaRowClicada(row);
    preencherFormularioNf(dadosCapturados[0])
    row.remove()
});