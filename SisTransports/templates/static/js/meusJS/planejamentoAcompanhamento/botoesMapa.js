let btnResetMapa = document.getElementById('btnResetMapa')
btnResetMapa.addEventListener('click',()=>{
    let centroMapa = document.getElementById('selectFilial')

    // Obtém a opção selecionada atualmente
    var selectedOption = centroMapa.options[centroMapa.selectedIndex];
    // Obtém os valores de latitude e longitude da opção selecionada
    var selectedLat = parseFloat(selectedOption.getAttribute('data-lat'));
    var selectedLng = parseFloat(selectedOption.getAttribute('data-lng'));
    if(selectedLat && selectedLng ){
        mapa.removerCirculo()
        mapa.removerRota()
        mapa.alterarCentroDoMapa()
    
        mapa.alterarCentroDoMapa(selectedLat,selectedLng)
    }else{
        msgAviso("Selecione uma filial")
    }

    limpaSemaforo()
})