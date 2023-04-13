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
        let dados = geraDadosSalvarCotacao()
        createCotacao(dados)
        e.preventDefault
})

const geraDadosSalvarCotacao=()=>{
    let postData = $('#formCotacao').serializeArray();
    let dados = {}

    $.each(postData, function(index, field) {
        dados[field.name] = field.value;
    });
    return dados
};

$('#btnNovaCotacao').on('click', function(e) {
    limpaCotacao()
    e.preventDefault();
})