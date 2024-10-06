const concedeDesconto = ()=>{
    let desconto = document.getElementById('descontoMdlFatura')
    let descontoEmReais = document.getElementById('descontoEmReaisMdlFatura')
    let valorTotal = document.getElementById('valorTotalMdlFatura')
    let valorAPagar = document.getElementById('valorAPagarMdlFatura')

    let valorDesconto = 0.00

    if(desconto.value != ''){
        valorDesconto = calculaValorPercentual(converterMoedaParaNumero(valorTotal.value),parseFloat(desconto.value))
    }
    descontoEmReais.value = valorDesconto
    valorAPagar.value = formatarMoeda(parseFloat(converterMoedaParaNumero(valorTotal.value)) - parseFloat(valorDesconto))

}