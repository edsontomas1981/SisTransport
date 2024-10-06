
const dataEmissaoModalFatura = document.getElementById('dataEmissaoModalFatura');
const getDataEmissao = () =>{
  const valor = dataEmissaoModalFatura.value;
  if (valor === '') {
      const dataAtual = new Date();
      dataEmissaoModalFatura.value = dataAtual.toISOString().split('T')[0];
  }   
}

dataEmissaoModalFatura.addEventListener('blur', function() {
  getDataEmissao()
});

const calculaValorPercentual = (valor,percentual)=>{

  console.log('Valor : ' + valor + 'Percentual : ' + percentual)

  let valorTotal
  percentual = percentual/100
  valorTotal = parseFloat(valor)*parseFloat(percentual)
  return valorTotal

}