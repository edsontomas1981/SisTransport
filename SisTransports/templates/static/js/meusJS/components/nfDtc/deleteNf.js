const deletaNf = async (chaveAcesso,idDtc) => {
    let data = {'chaveAcesso':chaveAcesso,
                'idDtc':idDtc}; // Inicialize o objeto 'data'
    if ($('#numDtc').val() != '') {
        let conexao = new Conexao('/operacional/deleteNf/', data);
        try {
            const result = await conexao.sendPostRequest();
            console.log(result);
            // Imprime a resposta JSON da solicitação POST
        } catch (error) {
            console.error(error); // Imprime a mensagem de erro
        }
    }
}

$("#tabelaNfs").on("click", ".btn-danger", function() {
    var row = $(this).closest("tr");
    var dadosCapturados = capturaDadosNaRowClicada(row);
    Swal.fire({
        title: 'Você tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, exclua!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            deletaNf(dadosCapturados[0], $('#numDtc').val())
            row.remove();
            Swal.fire(
                'Excluído!',
                'Seu arquivo foi excluído.',
                'success'
            )
        }
    })
});


