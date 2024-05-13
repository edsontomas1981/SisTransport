var mapa
var matriz = {lat:-23.47337308, lng:-46.47320867}
var semaforo = {origem:{lat:null,lng:null,idDtc:null},
                destino:{lat:null,lng:null,idDtc:null}}

var stateMapa = {estado:null}

var listaLocais = []

const iconeVermelho = '../../static/images/mapasIcones/pinVermelho.png'
const iconeAzul = "../../static/images/mapasIcones/pinAzul.png"
const iconeRoxo = "../../static/images/mapasIcones/pinRoxo.png"
const iconeVerde = "../../static/images/mapasIcones/pinVerde.png"
const iconePreto = "../../static/images/mapasIcones/pinPreto.png"
const caminhao = "../../static/images/mapasIcones/caminhao2.png"
const armazem = "../../static/images/mapasIcones/armazem.png"
const local = "../../static/images/mapasIcones/loja.png"
const iconeSize= [20, 20] // [largura, altura] do ícone em pixels


const limpaContainers = (container)=>{
        let divContainer = document.getElementById(container)
        // Limpa todos os elementos filhos do container
        while (divContainer.firstChild) {
            divContainer.removeChild(divContainer.firstChild);
        }
}

const getLatLngStringToData = (locationString)=>{
    // Dividir a string com base na vírgula para separar os valores de latitude e longitude
    var parts = locationString.split(',');

    // Inicializar variáveis para armazenar os valores de latitude e longitude
    var lat = null;
    var lng = null;

    // Iterar sobre as partes divididas
    parts.forEach(function(part) {
        // Verificar se a parte contém a substring 'lat:'
        if (part.includes('lat:')) {
            // Extrair o valor de latitude após 'lat:'
            lat = parseFloat(part.split('lat:')[1]);
        } 
        // Verificar se a parte contém a substring 'lng:'
        else if (part.includes('lng:')) {
            // Extrair o valor de longitude após 'lng:'
            lng = parseFloat(part.split('lng:')[1]);
        }
    });

    // Verificar se foram extraídos valores válidos de latitude e longitude
    if (lat !== null && lng !== null) {
        // Criar objeto JSON com os dados de latitude e longitude
        var jsonData = {
            "latitude": lat,
            "longitude": lng
        };

        // Converter objeto JSON em uma string JSON
        var jsonString = JSON.stringify(jsonData);
        return jsonData
    } else {
        console.error('Não foi possível extrair os dados de latitude e longitude da string.');
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
            msgAviso(`selecionando locais dados ${dados.idDtc}`)
            selecionaLocal(dados)
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

const connWs =()=>{
    var id = 'mapa'
    var socket = new WebSocket(`ws://127.0.0.1:8000/operacional/ws/some_url/?id=${id}`);
    socket.onopen = function(event) {
        // Aguarda um curto período de tempo antes de enviar dados
        setTimeout(() => {
            socket.send(JSON.stringify({
                'message': 'Olá, servidor WebSocket!'
            }));
        }, 1000); // Delay de 1 segundo (1000 milissegundos)
    };
  
    socket.onmessage = function(event) {
        console.log((event.data))
        var data = JSON.parse(event.data);
        // Utilizar expressão regular para extrair lat e lng
        var regex = /lat:(-?\d+\.\d+),lng:(-?\d+\.\d+)/;
        var match = event.data.match(regex);
        if (match) {
            // Extrair lat e lng dos grupos correspondentes na expressão regular
            var lat = parseFloat(match[1]); // Valor da latitude
            var lng = parseFloat(match[2]); // Valor da longitude
        }
        console.log('Mensagem recebida:', data.message);
        var loc = getLatLngStringToData(data.message)
        let placaMarcador=mapa.selecionarMarcador('placa','AAG-3D41')
        console.log(loc )
        placaMarcador.dados.lat = loc.latitude
        placaMarcador.dados.lng = loc.longitude
        mapa.alterarLocalizacaoDoMarcador(placaMarcador,placaMarcador.dados.lat,placaMarcador.dados.lng)

    };
  
    socket.onclose = function(event) {
        console.log('Conexão WebSocket fechada.');
    };
  
    socket.onerror = function(error) {
        console.error('Erro na conexão WebSocket:', error);
    };
}

// Exemplo de uso da classe MapaLeaflet
document.addEventListener('DOMContentLoaded', async() => {
    connWs()
    const dados = geraCoordenadas()
    const polygonCoordinates = geraDadosPoligonoZmrc()

    mapa = new MapaLeaflet('map', -23.47337308, -46.47320867,10.3);
    
    let dadosMarcadores = {mapa:mapa,dados:dados,icone:local,iconeSize:iconeSize,callback:verificaEstado}

    let mapeamento = {lat: 0,lng: 1,motorista: 4,idDtc: 3,placa: 5,bairro: 6,volumes: 7,peso: 8};
    let dadosAdicionais = geraDadosAdicionais(dados,mapeamento)

    adicionaMarcadoresMapa(dadosMarcadores,dadosAdicionais)
    
    let dadosVeiculos = geraDadosVeiculos()
    mapeamento = {lat: 0,lng: 1,motorista: 2,placa: 3,qtdeDctos: 4,dados:5};
    dadosAdicionais = geraDadosAdicionais(dadosVeiculos,mapeamento)

    console.log(dadosAdicionais)
    dadosMarcadores = {dados:dadosVeiculos,icone:caminhao,iconeSize:[30, 30],callback:constroeModalVeiculosPlanejamento}
    adicionaMarcadoresMapa(dadosMarcadores,dadosAdicionais)


    mapa.adicionarPoligonoFromData(polygonCoordinates,'black');

    // mapa.adicionarMarcador(-22.9068, -43.1729, 'Rio de Janeiro',);
    // mapa.adicionarMarcador(-22.9035, -43.2096, 'Copacabana');

    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1,verificaEstado)


    let marcador=mapa.selecionarMarcador('idDtc',848004)
    let novaLat = marcador.dados.lat
    let novaLng = marcador.dados.lng
    // Exemplo de como remover um marcador pelo ID (indice) atribuído
    setInterval(() => {
        // novaLat += 0.1
        // novaLng += 0.1
        // mapa.alterarLocalizacaoDoMarcador(marcador,novaLat,novaLng)
        // mapa.removerMarcadorPelaInfo(1);
        // mapa.removerCirculo()
        }, 1000);


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