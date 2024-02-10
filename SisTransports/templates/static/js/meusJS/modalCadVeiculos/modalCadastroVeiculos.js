// Exemplo de uso:
const dadosDoFormulario = obterDadosDoFormulario('cadastroVeiculos');
console.log(dadosDoFormulario);

let btnSalvaVeiculo = document.getElementById('salvaVeiculo')

btnSalvaVeiculo.addEventListener('click',()=>{
    console.log(obterDadosDoFormulario('frmCadastroVeiculos'))
})