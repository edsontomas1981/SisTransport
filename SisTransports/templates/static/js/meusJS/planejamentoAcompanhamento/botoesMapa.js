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


let btnVisualizaPontosDeAtendimento = document.getElementById('btnVisualizaPontosDeAtendimento')
btnVisualizaPontosDeAtendimento.addEventListener('click',async ()=>{
    const apiService = new ApiService();
    const url = "/enderecos/get_pontos_atendimento/";
    mapa.removerTodosMarcadores()

    const resultadoGet = await apiService.getData(url, {});

    let pontosDeAtendimento = resultadoGet.pontos_atendimento

    pontosDeAtendimento.forEach(element => { 
        element.iconSize = iconeSize
        element.iconUrl = local
        element.callback = verificaEstado
        mapa.adicionarMarcadorComIconeNew(element)
    });

    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1,verificaEstado)
})

let btnLocalizacaoVeiculos = document.getElementById('btnLocalizacaoVeiculos')
btnLocalizacaoVeiculos.addEventListener('click',()=>{
    mapa.removerTodosMarcadores()
    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1,verificaEstado)
})

let btnHabilitaCriacaoIntinerario = document.getElementById('btnHabilitaCriacaoIntinerario');
btnHabilitaCriacaoIntinerario.addEventListener('click', async () => {
    // Exibe uma mensagem de confirmação para o usuário antes de continuar
    const confirmarCriacao = await msgConfirmacao("Você confirma a criação de um novo itinerário?");
    if (!confirmarCriacao) {
        return; // Cancela a ação caso o usuário não confirme
    }

    // Abre o painel de itinerário para o usuário iniciar a seleção de locais
    abrirPainelIntinerario();
    
    // Atualiza o estado do mapa para "selecionandoLocais" para guiar o fluxo
    stateMapa.estado = "selecionandoLocais";
});

// Botão de salvar itinerário
const btnSalvaIntinerario = document.getElementById('btnSalvaIntinerario');

btnSalvaIntinerario.addEventListener('click', () => {

    if (listaLocais.length === 0) {
        msgAviso('Você precisa selecionar pelo menos um ponto de atendimento para continuar.');
        return;
    }

    // Verifica se a lista de comparação está vazia
    const listaEstaVazia = listaComparacaoListaLocais.length === 0;
    
    if (listaEstaVazia) {
        // Se a lista de comparação está vazia, cadastra o itinerário
        cadastraIntinerario();
    } else {
        // Se a lista de comparação não está vazia, verifica se as listas são iguais
        if (listaEstaSalva()) {
            alert('As duas listas são iguais');
        } else {
            alert('As duas listas são diferentes');
        }
    }
});

// Função para verificar se a lista está salva, usando deepCompareArrays
const listaEstaSalva = () => {
    return deepCompareArrays(listaComparacaoListaLocais, listaLocais);
}

// Função para cadastrar o itinerário
const cadastraIntinerario = () => {
    // Atualiza a lista de comparação com os valores da lista atual
    listaComparacaoListaLocais = [...listaLocais]; // Clona a listaLocais para evitar referência direta
    alert('Itinerário cadastrado com sucesso!');
}