$('#tipoCalc').on('change', function() {
  carregaSelectTabelasCte($(this).val())
});

const carregaSelectTabelasCte= async (tipoTabela)=>{
    // Verifica o valor da opção selecionada
    var selectedValue = tipoTabela;

 if (selectedValue == '1') {
     carregaTabelasGerais('selecionaTabelaCte')
 } else if (selectedValue == '2') {
     carregaTabelasEspecificas('selecionaTabelaCte')
   // Executa ação quando a opção "Tabela cliente" é selecionada
 } else if (selectedValue == '3') {
     carregaFreteInformado('selecionaTabelaCte');
   // Executa ação quando nenhuma opção é selecionada
 }
}
