let btnSelecionaLocaisVeiculo = document.getElementById('btnSelecionarLocais')
btnSelecionaLocaisVeiculo.addEventListener('click',()=>{

    let subTituloElement = document.getElementById('subTitulo'); // Obter o elemento pelo ID
    const placa = subTituloElement.getAttribute('data-id');

    if (subTituloElement) {
        alert(placa); // Exibir o ID do elemento em um alerta
    } else {
        alert('Elemento não encontrado');
    }
})
