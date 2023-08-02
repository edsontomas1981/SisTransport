async function createCotacao(dados) {
    let conexao = new Conexao('/comercial/cotacao/createCotacao/',dados);
    try {
        const result = await conexao.sendPostRequest();
        alertCriaCotacao(result)
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}

const alertCriaCotacao=(result)=>{
    switch (result.status) {
        case 200:
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'A cotação foi salva com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
  
          break;
        case 201:
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'A cotação foi alterada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
            break;        
        case 404:
            Swal.fire({
            icon: 'error',
            title: 'Coleta não foi localizada',
            showConfirmButton: true,
          })
          break;        
        default:
          break;
      }
}

const salvaCotacao = document.getElementById('btnSalvaCotacao')
salvaCotacao.addEventListener('click',(e)=>{
    let camposVazios = checkCamposVazios('formCotacao','.campoObrigatorio')
    geraMensagemCamposFaltando(camposVazios)
    
        if ($('#numDtc').val()!='') {
            if (camposVazios.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops ...',
                    text: geraMensagemCamposFaltando(camposVazios),
                })
            } else {
                let dados = geraDadosFormCotacao()
                createCotacao(dados)
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops ...',
                text: 'Pedido inválido. Por favor, insira um pedido válido para salvar a cotação.',
            })

        }
    e.preventDefault
})

const geraDadosFormCotacao=()=>{
    let dados = {}
    $('#formCotacao :input').each(function() {
        dados[$(this).attr('name')] = $(this).val();
    });

    dados.idPreDtc =$('#numDtc').val()
    dados.idRota = $('#rotasDtc').val()

    return dados
};

$('#btnNovaCotacao').on('click', function(e) {
    limpaCotacao()
    e.preventDefault();
})
