$('#btnExcluiCotacao').on('click', function(e) {
    desejaExcluir(excluirCotacao)
    e.preventDefault();
})

const excluirCotacao =async ()=>{
    let dados=geraDadosFormCotacao()
    let conexao=new Conexao('/comercial/cotacao/deleteCotacao/',dados);
    try {
        const result = await conexao.sendPostRequest();
        alertDeletaCotacao(result); // Imprime a resposta JSON da solicitação POST

    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}

const alertDeletaCotacao=(result)=>{
    switch (result.status) {
        case 200:
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Apagada!',
            showConfirmButton: false,
            timer: 1500
          })
          limpaCotacao();
  
          break;
        case 404:
            Swal.fire({
            icon: 'error',
            title: 'Registro não foi localizado',
            showConfirmButton: true,
          })
          break;        
        default:
            Swal.fire({
                icon: 'error',
                title: 'Erro interno',
                showConfirmButton: true,
              })
            break;        
      }
}

const desejaExcluir = async (callback) => {
    Swal.fire({
      title: 'Tem certeza de que deseja realizar esta ação? Essa operação não pode ser desfeita e todos os dados relacionados serão perdidos.\n' +
        'Por favor, confirme abaixo para continuar ou clique em \'Cancelar\' para manter o item.',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const response = await callback();
      }
    });
  };