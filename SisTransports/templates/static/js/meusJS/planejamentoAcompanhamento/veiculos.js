let btnSelecionaLocaisVeiculo = document.getElementById('btnSelecionarLocais')
btnSelecionaLocaisVeiculo.addEventListener('click',()=>{

    let subTituloElement = document.getElementById('subTitulo'); // Obter o elemento pelo ID

    if (subTituloElement) {
        stateMapa.estado = "selecionandoLocais"
        closeModal()
    } else {
        alert('Elemento não encontrado');
    }
})