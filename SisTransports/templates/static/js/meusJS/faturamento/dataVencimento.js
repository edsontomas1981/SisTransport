// Adicionando o evento ao campo de dias para vencimento
let diasVencimento = document.getElementById('diasParaVencimento');
let dataVencimento = document.getElementById('dataVencimento');

diasVencimento.addEventListener('blur', () => {
  const dataAtualString = new Date().toLocaleDateString('pt-BR'); // Garantir que a data atual esteja no formato dd/mm/yyyy
  const novaData = adicionarDias(dataAtualString, diasVencimento.value);
  dataVencimento.value = converterDataFormato(novaData);
});