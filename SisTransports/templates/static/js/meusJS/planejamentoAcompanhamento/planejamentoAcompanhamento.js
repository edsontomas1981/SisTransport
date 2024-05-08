var mapa
var matriz = {lat:-23.47337308, lng:-46.47320867}
var semaforo = {origem:{lat:null,lng:null,idDtc:null},
                destino:{lat:null,lng:null,idDtc:null}}

const criaPerimetro=(element)=> {
    const latitude = parseFloat(element.getAttribute('data-lat'));
    const longitude = parseFloat(element.getAttribute('data-lng'));
    mapa.adicionarCirculo(latitude, longitude, 5000,"red",'');
    closeModal(); // Função para fechar modal (não definida aqui)
}

const selecionaOrigem =(element)=> {
    const latitude = parseFloat(element.getAttribute('data-lat'));
    const longitude = parseFloat(element.getAttribute('data-lng'));
    const idDtc = element.getAttribute('data-id');
    semaforo.origem.lat = latitude
    semaforo.origem.lng = longitude
    semaforo.origem.idDtc = idDtc
    closeModal();
    msgAlerta('Por favor, selecione o ponto de destino.');
}
const selecionaDestino =(dados)=> {
    semaforo.destino.lat = dados.lat
    semaforo.destino.lng = dados.lng
    semaforo.destino.idDtc = dados.idDtc
    closeModal(); // Função para fechar modal (não definida aqui)
}

const limpaSemaforo = ()=>{

    semaforo.destino.lat = null
    semaforo.destino.lng = null
    semaforo.destino.idDtc = null

    semaforo.origem.lat = null
    semaforo.origem.lng = null
    semaforo.origem.idDtc = null
}

const verificaSemaforo = async(dados)=>{
    if (! semaforo.origem.idDtc){
        mostrarInformacoesDetalhadas(dados)
    }else{
        selecionaDestino(dados)
        let origem = `${semaforo.origem.lng},${semaforo.origem.lat}`;
        let destino = `${semaforo.destino.lng},${semaforo.destino.lat}`;
        const response = await connEndpoint('/operacional/api/directions/', { 'start': origem, 'end': destino, 'localidades': {} });
        console.log(response.status)
        if(response.status ==200){
            if(mapa.currentPolyline){
                mapa.removerRota()  
            }
            mapa.imprimirRota(response.rota,10.3)
        }else{
            msgErro(`Não foi possível estabelecer uma rota entre os Dtc's ${semaforo.origem.idDtc} e ${semaforo.destino.idDtc}.`);
        }
        limpaSemaforo()
    }
}

const gerarRotaOrigemDestino= async (element,mapa)=> {
    const latitude = parseFloat(element.getAttribute('data-lat'));
    const longitude = parseFloat(element.getAttribute('data-lng'));
    let origem = `${matriz.lng},${matriz.lat}`;
    let destino = `${longitude},${latitude}`;
    
    const response = await connEndpoint('/operacional/api/directions/', { 'start': origem, 'end': destino, 'localidades': {} });
    mapa.removerCirculo()
    if(mapa.currentPolyline){
        mapa.removerRota()  
    }
    mapa.imprimirRota(response.rota,10.3)
    closeModal(); // Função para fechar modal (não definida aqui)
}

const constroeModalVeiculosPlanejamento=()=>{
    openModal('modalPlanejamentoVeiculos')
}


// Função para mostrar informações detalhadas
const mostrarInformacoesDetalhadas=(dados)=> {
    // Implemente a lógica para exibir informações detalhadas
    let tabela = `
    <div class="row">
        <div class="col-sm-6">
        <table class="table table-striped table-sm" style="width:80%">
            <tr>
            <td style="text-align: left;"><strong>Número:</strong></td>
            <td style="text-align: left;">${dados.idDtc}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Data:</strong></td>
            <td style="text-align: left;">17/10/2007</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Romaneio:</strong></td>
            <td style="text-align: left;">${dados.status}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Veículo:</strong></td>
            <td style="text-align: left;">${dados.placa}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Motorista:</strong></td>
            <td style="text-align: left;">${dados.motorista}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Volumes:</strong></td>
            <td style="text-align: left;">${dados.volumes}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Peso:</strong></td>
            <td style="text-align: left;">${dados.peso}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Localização:</strong></td>
            <td style="text-align: left;">${dados.bairro}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Status:</strong></td>
            <td style="text-align: left;">${dados.status}</td>
            </tr>
        </table>
        </div> 
    </div>
    `;
    let acoes = `
                <b>Anexar ao Veículo</b>
                <div class="btn-group" role="group" aria-label="Basic example" style="width:100%">
                <select class="form-select">
                    <option>Teste 1</option>
                    <option>Teste 2</option>
                </select>
                <button type="button" id="addDtcVeiculo" class="btn btn-primary">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
                </div>
                <b class="pt-2" >Inserir ocorrência</b>
                <div class="btn-group" role="group" aria-label="Basic example" style="width:100%">
                <select class="form-select">
                    <option>Teste 1</option>
                    <option>Teste 2</option>
                </select> 
                <button type="button" class="btn btn-primary">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
                </div>
                <div class="mt-2">
                <b class="pt-2" >Prioridade</b>
                <div class="badge badge-warning" style="width:100%">Média</div>
                </div>
                `
    let idColeta = `<span>Pré Dtc Nº : </span><span id="numDocumento"> ${dados.idDtc}</span>`
    let modalColetaId = document.getElementById("modalColetaId")
    let tabelaColetas = document.getElementById("tabelaColetas")
    let acoesColetas = document.getElementById("acoesColetas")
    let botoesColetas = document.getElementById("botoesColetas")
    tabelaColetas.innerHTML = tabela
    acoesColetas.innerHTML = acoes
    modalColetaId.innerHTML = idColeta

    // Exemplo de adicionar um botão dinamicamente com um evento de clique
    const btnGeraPerimetro = document.createElement('button');
    btnGeraPerimetro.textContent = 'Perímetro';

    // Adiciona o ícone usando Font Awesome (ou substitua pela sua biblioteca de ícones preferida)
    var iconElement = document.createElement('i');
    iconElement.classList.add('fa', 'fa-map-signs', 'me-2'); // Classes do Font Awesome para o ícone
    btnGeraPerimetro.appendChild(iconElement); // Adiciona o ícone ao botão

    btnGeraPerimetro.className = 'btn btn-warning';
    btnGeraPerimetro.dataset.lat = dados.lat;
    btnGeraPerimetro.dataset.lng = dados.lng;
    btnGeraPerimetro.addEventListener('click', () => {
        criaPerimetro(btnGeraPerimetro);
    });
    // Exemplo de adicionar um botão dinamicamente com um evento de clique
    const btnGeraRotaDaqui = document.createElement('button');
    btnGeraRotaDaqui.textContent = 'Origem';

    // Adiciona o ícone usando Font Awesome (ou substitua pela sua biblioteca de ícones preferida)
    iconElement = document.createElement('i');
    iconElement.classList.add('fa', 'fa-location-arrow', 'me-2'); // Classes do Font Awesome para o ícone

    btnGeraRotaDaqui.appendChild(iconElement); // Adiciona o ícone ao botão

    btnGeraRotaDaqui.className = 'btn btn-danger';
    btnGeraRotaDaqui.dataset.lat = dados.lat;
    btnGeraRotaDaqui.dataset.lng = dados.lng;
    btnGeraRotaDaqui.dataset.id = dados.idDtc

    btnGeraRotaDaqui.addEventListener('click', () => {
        selecionaOrigem(btnGeraRotaDaqui,mapa);
    });
    // Exemplo de adicionar um botão dinamicamente com um evento de clique
    const btnGeraAteAqui = document.createElement('button');
    btnGeraAteAqui.textContent = 'Destino';
    // Adiciona o ícone usando Font Awesome (ou substitua pela sua biblioteca de ícones preferida)
    iconElement = document.createElement('i');
    iconElement.classList.add('fa', 'fa-map-marker', 'me-2'); // Classes do Font Awesome para o ícone

    btnGeraAteAqui.appendChild(iconElement); // Adiciona o ícone ao botão

    btnGeraAteAqui.className = 'btn btn-success';
    btnGeraAteAqui.dataset.lat = dados.lat;
    btnGeraAteAqui.dataset.lng = dados.lng;
    btnGeraAteAqui.dataset.id = dados.idDtc

    btnGeraAteAqui.addEventListener('click', () => {
        gerarRotaOrigemDestino(btnGeraAteAqui,dados.mapa);
    });
    // Adicionar o botão ao elemento pai no DOM
    const containerBotoes = document.getElementById("botoesColetas")

    // Limpa todos os elementos filhos do container
    while (containerBotoes.firstChild) {
        containerBotoes.removeChild(containerBotoes.firstChild);
    }

    containerBotoes.appendChild(btnGeraRotaDaqui);
    containerBotoes.appendChild(btnGeraPerimetro);
    containerBotoes.appendChild(btnGeraAteAqui);

    openModal('modalPlanejamentoColetas')
}

const adicionaMarcadoresMapa = (dados)=>{
    dados.dados.forEach(e => {
        let dadosAdicionais = {lat:e[0],lng:e[1],idDtc:e[3],motorista:e[4],placa:e[6],bairro:e[6],volumes:e[7],peso:e[8],mapa:dados.mapa}
        dados.mapa.adicionarMarcadorComIcone(e[0],e[1],e[6],dados.icone,dados.iconeSize,e[3],dadosAdicionais,dados.callback)
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
    
    let dadosMarcadores = {mapa:mapa,dados:dados,icone:local,iconeSize:iconeSize,callback:verificaSemaforo}
    adicionaMarcadoresMapa(dadosMarcadores)
    let dadosVeiculos = gerarLocalizacoesNaGrandeSP()

    dadosMarcadores = {mapa:mapa,dados:dadosVeiculos,icone:caminhao,iconeSize:[30, 30],callback:constroeModalVeiculosPlanejamento}
    adicionaMarcadoresMapa(dadosMarcadores)

    mapa.adicionarPoligonoFromData(polygonCoordinates,'black');

    mapa.adicionarMarcador(-22.9068, -43.1729, 'Rio de Janeiro',);
    mapa.adicionarMarcador(-22.9035, -43.2096, 'Copacabana');

    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1,verificaSemaforo)

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