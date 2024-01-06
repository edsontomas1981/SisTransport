let btnSalvaCte = document.getElementById('btnSalvaCte')

btnSalvaCte.addEventListener('click',()=>{
    let dados = criarDadosFreteDtc();
    dados.idDtc = document.getElementById('numDtc').value
    if(verificaSeFreteIgualCotacao()){
        let cotacaoSelecionada = document.getElementById('cotacaoSelecionada')
        let valorCotacaoSelecionada = document.getElementById('vlrCotacaoSelecionada')
        dados.cotacao=cotacaoSelecionada.value
        valorCotacaoSelecionada.value='';
        cotacaoSelecionada.value=''; 
    }
    salvarCte(dados)
})

const salvarCte = async(data)=>{
   
    let conexao = new Conexao('/operacional/createCte/', data);
    try {
        const result = await conexao.sendPostRequest();
        console.log(result.status)
            if (result.status ==200){
                msgOk('Cte Salvo com Sucesso !')
                bloqueiaFreteCalculado()
            }else if (result.status ==201){
                msgOk('Cte Alterado com Sucesso !')
                bloqueiaFreteCalculado()
            }
            // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }}

