const addAcrescimoMdl  = ()=>{
  console.log('addd ')
  let acrescimo = document.getElementById('acrescimoMdlFatura')
  let acrescimoEmReais = document.getElementById('acrescimoEmReaisMdlFatura')
  let valorTotal = document.getElementById('valorTotalMdlFatura')
  
  let valorAcrescimo = 0.00

  if(acrescimo.value != ''){
    valorAcrescimo = calculaValorPercentual(converterMoedaParaNumero(valorTotal.value),parseFloat(acrescimo.value))
  }
  acrescimoEmReais.value = valorAcrescimo
  return  parseFloat(valorAcrescimo)
}