const concedeDesconto = ()=>{
    let desconto = document.getElementById('descontoMdlFatura')
    let descontoEmReais = document.getElementById('descontoEmReaisMdlFatura')
    let valorTotal = document.getElementById('valorTotalMdlFatura')

    let valorDesconto = 0.00

    if(desconto.value != ''){
        valorDesconto = calculaValorPercentual(converterMoedaParaNumero(valorTotal.value),parseFloat(desconto.value))
    }
    descontoEmReais.value = valorDesconto
    return parseFloat(valorDesconto)
}