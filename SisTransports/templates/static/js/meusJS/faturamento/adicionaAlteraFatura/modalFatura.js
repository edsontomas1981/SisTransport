
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