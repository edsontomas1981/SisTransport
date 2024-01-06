let deleteCte = document.getElementById('btnExcluiCte')

deleteCte.addEventListener('click',async ()=>{

    Swal.fire({
        title: "Tem certeza?",
        text: "Você está prestes a excluir o cálculo de frete. Esta ação é irreversível. Tem certeza de que deseja continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Cancelar"

    }).then((result) => {
        if (result.isConfirmed) {
            deletaCte();
            limpaCalculoCte()
            desbloqueiaFreteCalculado()
            Swal.fire({
                title: "Excluído!",
                text: "Seu arquivo foi excluído.",
                icon: "success"
            });
        }
    });
    
})

const deletaCte= async ()=>{
    let idDtc = document.getElementById('numDtc').value
    let data = {'idDtc':idDtc}
    let conexao = new Conexao('/operacional/delete_cte/', data);
    try {
        const result = await conexao.sendPostRequest();
        console.log(result)
            // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
 }