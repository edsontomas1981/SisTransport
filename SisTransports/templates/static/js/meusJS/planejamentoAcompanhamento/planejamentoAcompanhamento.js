var mapa
var matriz = {lat:-23.47337308, lng:-46.47320867}
var semaforo = {origem:{lat:null,lng:null,idDtc:null},
                destino:{lat:null,lng:null,idDtc:null}}

var stateMapa = {estado:null}

const limpaContainers = (container)=>{
        let divContainer = document.getElementById(container)
        // Limpa todos os elementos filhos do container
        while (divContainer.firstChild) {
            divContainer.removeChild(divContainer.firstChild);
        }
}

const resetState = ()=>{
    stateMapa.estado = null
}

const verificaEstado = async(dados)=>{
    switch (stateMapa.estado) {
        case null:
            mostrarInformacoesDetalhadas(dados)
            break;
        case "addRota":
            selecionaDestino(dados)
            addRota()
            limpaSemaforo()
            resetState()
            break;
        case "selecionandoLocais":
            msgAviso(`selecioanando locais dados ${dados.idDtc}`)
            break;
        default:
            break;
    }
}

const geraDadosAdicionais = (dados, mapeamento) => {
    // Inicializa um objeto vazio para armazenar os dados adicionais
    let dadosAdicionais = [];

    // Percorre cada elemento nos dados
    dados.forEach(e => {
        let dadosItem = {};

        // Para cada chave no mapeamento, atribui o valor correspondente do elemento
        Object.keys(mapeamento).forEach(key => {
            // Verifica se o índice especificado no mapeamento existe no elemento atual
            if (e[mapeamento[key]] !== undefined) {
                dadosItem[key] = e[mapeamento[key]]; // Atribui o valor ao campo correspondente
            }
        });

        // Adiciona o item de dados processado à lista de dados adicionais
        dadosAdicionais.push(dadosItem);
    });

    return dadosAdicionais;
};

const adicionaMarcadoresMapa = (dados,dadosAdicionais)=>{
    dados.dados.forEach((e , idx) => {
        mapa.adicionarMarcadorComIcone(e[0],e[1],e[6],dados.icone,dados.iconeSize,e[3],dadosAdicionais[idx],dados.callback)
    });
}

// Exemplo de uso da classe MapaLeaflet
document.addEventListener('DOMContentLoaded', async() => {
    const dados = geraCoordenadas()
    const polygonCoordinates = geraDadosPoligonoZmrc()
 
    const iconeVermelho = '../../static/images/mapasIcones/pinVermelho.png'
    const iconeAzul = "../../static/images/mapasIcones/pinAzul.png"
    const iconeRoxo = "../../static/images/mapasIcones/pinRoxo.png"
    const iconeVerde = "../../static/images/mapasIcones/pinVerde.png"
    const iconePreto = "../../static/images/mapasIcones/pinPreto.png"
    const caminhao = "../../static/images/mapasIcones/caminhao2.png"
    const armazem = "../../static/images/mapasIcones/armazem.png"
    const local = "../../static/images/mapasIcones/loja.png"
    const iconeSize= [20, 20] // [largura, altura] do ícone em pixels

    mapa = new MapaLeaflet('map', -23.47337308, -46.47320867,10.3);
    
    let dadosMarcadores = {mapa:mapa,dados:dados,icone:local,iconeSize:iconeSize,callback:verificaEstado}
    let mapeamento = {lat: 0,lng: 1,motorista: 4,idDtc: 3,placa: 5,bairro: 6,volumes: 7,peso: 8};
    let dadosAdicionais = geraDadosAdicionais(dados,mapeamento)
    adicionaMarcadoresMapa(dadosMarcadores,dadosAdicionais)
    
    let dadosVeiculos = gerarDadosCompletosNaGrandeSP()
    mapeamento = {lat: 0,lng: 1,motorista: 2,placa: 3,qtdeDctos: 4,dados:5};

    dadosAdicionais = geraDadosAdicionais(dadosVeiculos,mapeamento)
    dadosMarcadores = {dados:dadosVeiculos,icone:caminhao,iconeSize:[30, 30],callback:constroeModalVeiculosPlanejamento}
    adicionaMarcadoresMapa(dadosMarcadores,dadosAdicionais)

    mapa.adicionarPoligonoFromData(polygonCoordinates,'black');

    mapa.adicionarMarcador(-22.9068, -43.1729, 'Rio de Janeiro',);
    mapa.adicionarMarcador(-22.9035, -43.2096, 'Copacabana');

    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1,verificaEstado)

    // Exemplo de como remover um marcador pelo ID (indice) atribuído
    setTimeout(() => {
        // mapa.removerMarcadorPelaInfo(1);
        // mapa.removerCirculo()
        }, 5000);
    var selectFilial = document.getElementById('selectFilial')
    selectFilial.addEventListener('change',()=>{
        // Obtém a opção selecionada atualmente
        var selectedOption = selectFilial.options[selectFilial.selectedIndex];
        // Obtém os valores de latitude e longitude da opção selecionada
        var selectedLat = parseFloat(selectedOption.getAttribute('data-lat'));
        var selectedLng = parseFloat(selectedOption.getAttribute('data-lng'));
        if(selectedLat && selectedLng ){
            mapa.alterarCentroDoMapa(selectedLat, selectedLng)
        }else{
            msgAviso("Selecione uma filial")
        }
    })
});