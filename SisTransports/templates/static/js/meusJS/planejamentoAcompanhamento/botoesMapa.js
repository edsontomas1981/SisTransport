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
    mapa.removerTodosMarcadores()
    populaMapaPontosDeAtendimento()
    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1,verificaEstado)
})

let btnLocalizacaoVeiculos = document.getElementById('btnLocalizacaoVeiculos')
btnLocalizacaoVeiculos.addEventListener('click',async ()=>{
    mapa.removerTodosMarcadores()
    populaMapaVeiculos()
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

    const camposObrigatorios = ['placaPainelIntinerario','modeloPainelIntinerario','cpfMotoristaIntinerario','nomeMotoristaIntinerario']
    let dadosForm = obterDadosDoFormulario('frmPainelIntinerario')
    
    console.log(validarCamposObrigatorios(dadosForm,camposObrigatorios).length)
    
    if(validarCamposObrigatorios(dadosForm,camposObrigatorios).length > 0){
        msgAviso('Por favor, preencha os campos destacados em vermelho para continuar.');
        return
    }

    
    if (listaLocais.length === 0) {
        msgAviso('Você precisa selecionar pelo menos um ponto de atendimento para continuar.');
        return;
    }

    // Verifica se a lista de comparação está vazia
    const listaEstaVazia = listaComparacaoListaLocais.length === 0;
    
    if (listaEstaVazia) {
        alert('lista esta vazia cadastre')
        // Se a lista de comparação está vazia, cadastra o itinerário
        cadastraIntinerario();
        return
    } 


    // Se a lista de comparação não está vazia, verifica se as listas são iguais
    if (!listaEstaSalva()) {
        cadastraIntinerario();
        return
    }

    // Não faz nada somente avisa que o intinerario ja está salvo 
    msgAviso('Itinerário cadastrado com sucesso!');
}); 

// Função para verificar se a lista está salva, usando deepCompareArrays
const listaEstaSalva = () => {
    return deepCompareArrays(listaComparacaoListaLocais, listaLocais);
}

const cadastraIntinerario = async () => {
    listaComparacaoListaLocais=[...listaLocais]
    msgAviso('Itinerário cadastrado com sucesso!');
};

let btnBuscaMotorista = document.getElementById('btnBuscaMotoristaIntinerario')
btnBuscaMotorista.addEventListener('click',()=>{
    buscaMotoristaModal('cpfMotoristaIntinerario','nomeMotoristaIntinerario')
})

const btnCriaRotasVeiculos = async ()=>{
    let subtitulo = document.getElementById('subTitulo')
    const lat = parseFloat(subtitulo.dataset.lat);
    const lng = parseFloat(subtitulo.dataset.lng);

    semaforo.origem.lat=lat;
    semaforo.origem.lng=lng;

    stateMapa.estado = 'addRota'
    closeModal()
    msgAlerta('Agora para continuar, escolha o destino no mapa. Assim, podemos calcular a melhor rota para você.')
}

// const btnGerarRotasAutomaticas = document.getElementById('gerarRotasAutomaticas')
// btnGerarRotasAutomaticas.addEventListener('click',async ()=>{
//     let marcadores = carregaMarcadores()
//     let listaVeiculos = []
//     let pontos_atendimento = []

//     marcadores.forEach(e => {
//         if(e.dados.idDtc){
//             pontos_atendimento.push(e.dados)
//         }else{
//             listaVeiculos.push(e.dados)
//         }
//     });

//     let dados = {veiculos:listaVeiculos,pontos_atendimento:pontos_atendimento,start:{lat:-23.47337308, lng:-46.47320867}}

//     const url = "/operacional/api/roteirizacao_automatica/";
//     const resultado = await connEndpoint(url, dados);
//     console.log(resultado)
// })

