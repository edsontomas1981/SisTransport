let freteTotal = document.getElementById('freteTotalCte')
freteTotal.addEventListener('change',()=>{

})

const verificaSeFreteIgualCotacao=()=>{
    let cotacao = document.getElementById('vlrCotacaoSelecionada')
    if (cotacao.value !=''){
        if (parseFloat(cotacao.value)==parseFloat(freteTotal.value)){
            return true
        }
    }
    let cotacaoSelecionada = document.getElementById('cotacaoSelecionada')
    let valorCotacaoSelecionada = document.getElementById('vlrCotacaoSelecionada')
    valorCotacaoSelecionada.value='';
    cotacaoSelecionada.value='';    
    return false
}