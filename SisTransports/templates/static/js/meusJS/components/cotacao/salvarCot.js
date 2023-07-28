async function createCotacao(dados) {
    let conexao = new Conexao('/comercial/cotacao/createCotacao/',dados);
    try {
        const result = await conexao.sendPostRequest();
        console.log(result); // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
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
                let dados = geraDadosSalvarCotacao()
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

const geraDadosSalvarCotacao=()=>{
    let dados = {}
    $('#formCotacao :input').each(function() {
        dados[$(this).attr('name')] = $(this).val();
        console.log(dados)
    });
    dados.idPreDtc =$('#numDtc').val()
     
    return dados
};

$('#btnNovaCotacao').on('click', function(e) {
    limpaCotacao()
    e.preventDefault();
})