$('#tipoCalc').on('change', function() {
  console.log('teste')
  carregaSelectTabelasCte($(this).val())
});

const carregaSelectTabelasCte= async (tipoTabela)=>{
    // Verifica o valor da opção selecionada
    var selectedValue = tipoTabela;

 if (selectedValue == '1') {
    alert('carregaTabelasGerais')
     carregaTabelasGerais('selecionaTabelaCte')
 } else if (selectedValue == '2') {
    alert('carregaTabelasEsp')

     carregaTabelasEspecificas('selecionaTabelaCte')
   // Executa ação quando a opção "Tabela cliente" é selecionada
 } else if (selectedValue == '3') {
    alert('carregaTabelasinf')

     carregaFreteInformado('selecionaTabelaCte');
   // Executa ação quando nenhuma opção é selecionada
 }
}
