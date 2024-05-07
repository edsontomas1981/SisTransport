var matriz = {lat:-23.47337308, lng:-46.47320867}

function preparaDadosPerimetro(element,mapa) {
    const latitude = parseFloat(element.getAttribute('data-lat'));
    const longitude = parseFloat(element.getAttribute('data-lng'));
    

    mapa.adicionarCirculo(latitude, longitude, 5000,"red",'');
    closeModal(); // Função para fechar modal (não definida aqui)
}

const gerarRotaOrigemDestino= async (element,mapa)=> {
    const latitude = parseFloat(element.getAttribute('data-lat'));
    const longitude = parseFloat(element.getAttribute('data-lng'));
    const origem = `${matriz.lng},${matriz.lat}`;
    const destino = `${longitude},${latitude}`;
    
    const response = await connEndpoint('/operacional/api/directions/', { 'start': origem, 'end': destino, 'localidades': {} });
    mapa.removerCirculo()
    if(mapa.currentPolyline){
        mapa.removerRota()  
    }
    mapa.imprimirRota(response.rota,10.3)

    closeModal(); // Função para fechar modal (não definida aqui)
}



// Função para mostrar informações detalhadas
const mostrarInformacoesDetalhadas=(dados,mapa)=> {
    console.log(dados.mapa)
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
    let btnGerarIntinerarios = `
                                <div class="btn-group pt-2" role="group" aria-label="Basic example" style="width:100%">
                                    <button type="button" class="btn btn-success" data-lat="${dados.lat}" data-lng="${dados.lng}"  onclick="gerarRota()">
                                        <i class="fa fa-location-arrow" aria-hidden="true"></i>
                                        Origem
                                    </button>
                                    <button type="button" class="btn btn-warning" data-lat="${dados.lat}" data-lng="${dados.lng}" onclick="preparaDadosPerimetro(this,mapa)">
                                        <i class="fa fa-map-signs" aria-hidden="true"></i>
                                        Perímetro
                                    </button>
                                    <button type="button" class="btn btn-primary" data-lat="${dados.lat}" data-lng="${dados.lng}" >
                                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                                        Destino
                                    </button>
                                </div>
                                `;
    let idColeta = `<span>Pré Dtc Nº : </span><span id="numDocumento"> ${dados.idDtc}</span>`
    let modalColetaId = document.getElementById("modalColetaId")
    let tabelaColetas = document.getElementById("tabelaColetas")
    let acoesColetas = document.getElementById("acoesColetas")
    let botoesColetas = document.getElementById("botoesColetas")
    tabelaColetas.innerHTML = tabela
    acoesColetas.innerHTML = acoes
    modalColetaId.innerHTML = idColeta
    // botoesColetas.innerHTML = btnGerarIntinerarios

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
        preparaDadosPerimetro(btnGeraPerimetro,dados.mapa);
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
    btnGeraRotaDaqui.addEventListener('click', () => {
        gerarRotaOrigemDestino(btnGeraRotaDaqui,dados.mapa);
    });

    // Exemplo de adicionar um botão dinamicamente com um evento de clique
    const btnGeraAteDaqui = document.createElement('button');
    btnGeraAteDaqui.textContent = 'Destino';
    // Adiciona o ícone usando Font Awesome (ou substitua pela sua biblioteca de ícones preferida)
    iconElement = document.createElement('i');
    iconElement.classList.add('fa', 'fa-map-marker', 'me-2'); // Classes do Font Awesome para o ícone

    btnGeraAteDaqui.appendChild(iconElement); // Adiciona o ícone ao botão

    btnGeraAteDaqui.className = 'btn btn-success';
    btnGeraAteDaqui.dataset.lat = dados.lat;
    btnGeraAteDaqui.dataset.lng = dados.lng;
    btnGeraAteDaqui.addEventListener('click', () => {
        preparaDadosPerimetro(btnGeraAteDaqui,dados.mapa);
    });
    // Adicionar o botão ao elemento pai no DOM
    const containerBotoes = document.getElementById("botoesColetas")

    // Limpa todos os elementos filhos do container
    while (containerBotoes.firstChild) {
        containerBotoes.removeChild(containerBotoes.firstChild);
    }

    containerBotoes.appendChild(btnGeraRotaDaqui);
    containerBotoes.appendChild(btnGeraPerimetro);
    containerBotoes.appendChild(btnGeraAteDaqui);



    openModal('modalPlanejamentoColetas')
}

const adicionaMarcadoresMapa = (dados)=>{
    dados.dados.forEach(e => {
        let dadosAdicionais = {lat:e[0],lng:e[1],idDtc:e[3],motorista:e[4],placa:e[6],bairro:e[6],volumes:e[7],peso:e[8],mapa:dados.mapa}
        dados.mapa.adicionarMarcadorComIcone(e[0],e[1],e[6],dados.icone,dados.iconeSize,e[3],dadosAdicionais)
    });
}
// Exemplo de uso da classe MapaLeaflet
document.addEventListener('DOMContentLoaded', async() => {
    const dados = geraCoordenadas()
    const polygonCoordinates = geraDadosPoligonoZmrc()
    // const minianelviario = geraMiniAnelViario()
 
    const iconeVermelho = '../../static/images/mapasIcones/pinVermelho.png'
    const iconeAzul = "../../static/images/mapasIcones/pinAzul.png"
    const iconeRoxo = "../../static/images/mapasIcones/pinRoxo.png"
    const iconeVerde = "../../static/images/mapasIcones/pinVerde.png"
    const iconePreto = "../../static/images/mapasIcones/pinPreto.png"
    const caminhao = "../../static/images/mapasIcones/caminhao2.png"
    const armazem = "../../static/images/mapasIcones/armazem.png"
    const local = "../../static/images/mapasIcones/loja.png"
    const iconeSize= [20, 20] // [largura, altura] do ícone em pixels

    const mapa = new MapaLeaflet('map', -23.47337308, -46.47320867,10.3);
    
    let dadosMarcadores = {mapa:mapa,dados:dados,icone:local,iconeSize:iconeSize}
    adicionaMarcadoresMapa(dadosMarcadores)
    let dadosVeiculos = gerarLocalizacoesNaGrandeSP()

    console.log(dadosVeiculos)
    dadosMarcadores = {mapa:mapa,dados:dadosVeiculos,icone:caminhao,iconeSize:[30, 30]}
    adicionaMarcadoresMapa(dadosMarcadores)

    mapa.adicionarPoligonoFromData(polygonCoordinates,'red');

    mapa.adicionarMarcador(-22.9068, -43.1729, 'Rio de Janeiro');
    mapa.adicionarMarcador(-22.9035, -43.2096, 'Copacabana');

    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1)

    // var origem = `${rota[0][1]},${rota[0][0]}`;
    // var destino = `${rota[1][1]},${rota[1][0]}`;

    // const response = await connEndpoint('/operacional/api/directions/', { 'start': origem, 'end': destino, 'localidades': [] });

    // mapa.imprimirRota(response.rota);

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

        mapa.alterarCentroDoMapa(selectedLat, selectedLng)
    })
});




// const mostrarInformacoesDetalhadas = (dados,mapaColetas) => {



// };

// document.addEventListener("DOMContentLoaded", () => {
//     const mapContainerId = 'map';
//     const initialCoords = { lat: -23.47337308, lng: -46.47320867 };
//     const mapaColetas = criaMapa(mapContainerId, initialCoords);
//     const iconeVermelho = '../../static/images/mapasIcones/pinVermelho.png'
//     const iconeAzul = "../../static/images/mapasIcones/pinAzul.png"
//     const iconeRoxo = "../../static/images/mapasIcones/pinRoxo.png"
//     const iconeVerde = "../../static/images/mapasIcones/pinVerde.png"
//     const iconePreto = "../../static/images/mapasIcones/pinPreto.png"
//     const armazem = "../../static/images/mapasIcones/armazem.png"
//     const local = "../../static/images/mapasIcones/loja.png"

//     // Função para criar o mapa Leaflet
//     function criaMapa(divId, latLng) {
//         const mapa = L.map(divId).setView([latLng.lat, latLng.lng], 10);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution: '&copy; OpenStreetMap contributors'
//         }).addTo(mapa);

//         mapa.markers = [];
//         mapa.dados = [];

//         return mapa;
//     }

//     // Função para adicionar marcador ao mapa
//     function addMarker(lat, lng, iconUrl, dados, id, mapa, callback) {
//         const customIcon = L.icon({
//             iconUrl: iconUrl,
//             iconSize: [30, 30],
//             iconAnchor: [15, 15]
//         });

//         const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapa);
//         marker.myId = id;

//         if (typeof callback === 'function') {
//             marker.on('click', () => {
//                 callback(dados);
//             });
//         }

//         mapa.markers.push(marker);

//         return marker;
//     }

//     // Função para criar e exibir um círculo no mapa
//     function createPerimeter(latitude, longitude, radiusInMeters) {
//         removePerimeterMap();

//         const circle = L.circle([latitude, longitude], {
//             radius: radiusInMeters * 1000,
//             color: 'red',
//             fillColor: 'red',
//             fillOpacity: 0.5
//         }).addTo(mapaColetas);

//         mapaColetas.fitBounds(circle.getBounds());
//         mapaColetas.currentCircle = circle;

//         return circle;
//     }

//     // Função para remover o círculo do mapa
//     function removePerimeterMap() {
//         if (mapaColetas.currentCircle) {
//             mapaColetas.removeLayer(mapaColetas.currentCircle);
//             mapaColetas.currentCircle = null;
//         }
//     }





//     var coordenadasGeradas = geraCoordenadas();

//     // Exemplo de uso: Adicionar marcadores ao mapa
//     coordenadasGeradas.forEach(coordenada => {
//         const [lat, lng, iconUrl, dados, id] = coordenada;

//         const marker = addMarker(lat, lng, iconUrl, dados, id, mapaColetas, mostrarInformacoesDetalhadas);
//     });

//     // Exemplo de uso: Adicionar marcador de origem (armazém)
//     addMarker(initialCoords.lat, initialCoords.lng, '../../static/images/mapasIcones/armazem.png', {}, 0, mapaColetas);

//     // Exemplo de uso: Chamar função para gerar rota
//     const destinoCoords = { lat: -12.9704, lng: -38.5124 };
//     gerarRota(destinoCoords.lat, destinoCoords.lng, mapaColetas);

//     // Função para gerar rota
//     function gerarRota(destLat, destLng, mapa) {
//         const origem = `${initialCoords.lng},${initialCoords.lat}`;
//         const destino = `${destLng},${destLat}`;

//         verificarLocalidadesNaRota(origem, destino, coordenadasGeradas, mapa, [destLat, destLng]);
//     }

//     // Função para ação de botão de gerar rota
//     function acaoBotaoGerarRota(element) {
//         const lng = parseFloat(element.getAttribute('data-lng'));
//         const lat = parseFloat(element.getAttribute('data-lat'));

//         if (!isNaN(lng) && !isNaN(lat)) {
//             gerarRota(lat, lng, mapaColetas);
//         } else {
//             console.error('Dados de longitude e/ou latitude inválidos.');
//         }
//     }

//     // Adicionar evento de clique ao botão de gerar rota
//     const btnGerarRota = document.getElementById('btnGerarRota');
//     if (btnGerarRota) {
//         btnGerarRota.addEventListener('click', () => {
//             acaoBotaoGerarRota(btnGerarRota);
//         });
//     }

//     // Exemplo: Abrir modal
//     openModal('modalPlanejamentoColetas');
// });


// // // Definição global da função preparaDadosPerimetro
// // function preparaDadosPerimetro(element) {
// //     let mapa = document.getElementById('map')
// //     const latitude = element.getAttribute('data-lat');
// //     const longitude = element.getAttribute('data-lng');
// //     console.log(mapa)
// //     closeModal()
// //     createPerimeter(latitude,longitude,5,mapa)

// // }

// // document.addEventListener("DOMContentLoaded",()=>{

// //     var coordenadasGeradas = geraCoordenadas();
// //     var coordsOrigem = { lat: -23.47337308, lng: -46.47320867 };


// //     // A função preparaDadosPerimetro agora recebe o elemento clicado como parâmetro
// //     const criaMapas = (divMapa, latLng) => {
// //         var mapa = L.map(divMapa).setView([latLng.lat, latLng.lng], 10); // Coordenadas iniciais e nível de zoom
// //         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //             attribution: '&copy; OpenStreetMap contributors'
// //         }).addTo(mapa); // Adicionar camada de mapa ao mapa
    
// //         mapa.markers = []; // Inicializa a lista de marcadores dentro do objeto mapa
// //         mapa.dados = []; // Inicializa a lista de dados associados ao mapa (por exemplo, informações de marcadores)
    
// //         return mapa; // Retorna o objeto do mapa Leaflet recém-criado
// //     };

// //     var mapaColetas = criaMapas('map', coordsOrigem)

    
// //     const addMarker = (latitude, longitude, icone, dados, id, mapa, callback) => {
// //         // Cria um ícone personalizado com o tamanho desejado
// //         let customIcon = L.icon({
// //             iconUrl: icone,
// //             iconSize: [30, 30], // Largura e altura do ícone em pixels
// //             iconAnchor: [15, 15] // Ponto de ancoragem do ícone (centro)
// //         });
    
// //         // Cria um marcador com a posição e o ícone personalizado
// //         const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(mapa);
    
// //         // Atribui um ID único ao marcador (se necessário)
// //         if (id) {
// //             marker.myId = id;
// //         }
    
// //         // Adiciona um evento de clique ao marcador para chamar a função de callback
// //         marker.on('click', () => {
// //             if (typeof callback === 'function') {
// //                 callback(dados);
// //             }
// //         });
    
// //         // Retorna o marcador criado
// //         return marker;
// //     };
    
// //     const addMarkerResponsavel = (lat,lng,icon,dados,id,mapa,callback)=>{
// //         addMarker(lat,lng,icon,dados,id,mapa)
// //     }
    
// //     const removeMarker = (map, markerId) => {
// //         // Verifica se o mapa possui uma propriedade 'markers' que é uma matriz de marcadores
// //         if (map && map.markers && Array.isArray(map.markers)) {
// //             // Percorre todos os marcadores do mapa
// //             for (let i = 0; i < map.markers.length; i++) {
// //                 const marker = map.markers[i];
// //                 // Verifica se o marcador possui a propriedade 'options' e 'id' correspondente ao markerId fornecido
// //                 if (marker.myId === markerId) {
// //                     // Remove o marcador do mapa
// //                     map.removeLayer(marker);
    
// //                     // Remove o marcador da matriz de marcadores
// //                     map.markers.splice(i, 1);
    
// //                     // Encerra o loop após encontrar e remover o marcador
// //                     break;
// //                 }
// //             }
// //         } else {
// //             console.error('Erro ao remover marcador: mapa ou marcadores não encontrados.');
// //         }
// //     };
    
    
// //     function createPerimeter(latitude, longitude, radiusInMeters) {
// //         removePerimeterMap(mapaColetas)
    
// //         // Criar um círculo com o centro nas coordenadas especificadas e o raio em graus
// //         const circle = L.circle([latitude, longitude], {
// //             radius: radiusInMeters * 1000, // Converter o raio de metros para quilômetros
// //             color: 'red', // Cor do contorno do círculo
// //             fillColor: 'red', // Cor de preenchimento do círculo
// //             fillOpacity: 0.5 // Opacidade do preenchimento do círculo
// //         }).addTo(mapaColetas); // Adiciona o círculo ao mapa Leaflet
    
    
    
// //         // Ajustar o mapa para exibir o círculo completamente
// //         mapaColetas.fitBounds(circle.getBounds());
    
// //         // Retornar o objeto do círculo (perímetro) para referência posterior
// //         return circle;
// //     }
    
// //     // Função para remover o círculo (perímetro) atual do mapa
// //     const removePerimeterMap = () => {
// //         if (mapaColetas.currentCircle) {
// //             mapaColetas.removeLayer(map.currentCircle); // Remove o círculo do mapa
// //             mapaColetas.currentCircle = null; // Limpa a referência ao círculo no objeto do mapa
// //         }
// //     };







// // const iniciaMapaColetas=(coordenadas,coordsOrigem)=>{
// //     // Coordenadas iniciais
// //     let myLatLngEntrega = { lat: -12.9704, lng: -38.5124 };

// //     let iconeVermelho = '../../static/images/mapasIcones/pinVermelho.png'
// //     let iconeAzul = "../../static/images/mapasIcones/pinAzul.png"
// //     let iconeRoxo = "../../static/images/mapasIcones/pinRoxo.png"
// //     let iconeVerde = "../../static/images/mapasIcones/pinVerde.png"
// //     let iconePreto = "../../static/images/mapasIcones/pinPreto.png"
// //     let armazem = "../../static/images/mapasIcones/armazem.png"
// //     let local = "../../static/images/mapasIcones/loja.png"

// //     coordenadas.forEach(coordenada => {

// //         mapaColetas.dados.push({id:coordenada[3],status:'Em Rota',
// //                                 placa:coordenada[5],
// //                                 dadosAdicionais:{lat:coordenada[0],lng:coordenada[1]}})

// //         mapaColetas.markers.push(addMarker (coordenada[0], coordenada[1], 
// //                                   local, coordenada, coordenada[3], 
// //                                   mapaColetas,(element) => mostrarInformacoesDetalhadas(element, mapaColetas)))
                                  
// //       });

// //     addMarkerResponsavel(coordsOrigem.lat,coordsOrigem.lng,armazem,{},0,mapaColetas)

// //     const acaoBotaoGerarRota = (element,mapaColetas) => {
// //         let elemento = document.getElementById(element+'')
// //         // Obtém o valor dos atributos data-lng e data-lat do elemento
// //         const lng = elemento.getAttribute('data-lng');
// //         const lat = elemento.getAttribute('data-lat');

// //         // Verifica se os valores foram encontrados e os exibe no console
// //         if (lng && lat) {
// //             gerarRota(lat,lng,coordsOrigem,mapaColetas)
// //         } else {
// //             console.error('Dados de longitude e/ou latitude não encontrados.');
// //         }
// //     };

// //     let botoes = {
// //         mostrar: {
// //           classe: "btn-primary text-white",
// //           texto: '<i class="fa fa-eye" aria-hidden="true"></i>',
// //           callback: (element) => acaoBotaoGerarRota(element, mapaColetas) // Passando mapaColetas como argumento
// //         }
// //     };

// //     popula_tbody_paginacao('paginacaoPlanejamento',
// //                             'infoPlanejamentoColetas',
// //                             mapaColetas.dados,
// //                             botoes,
// //                             1,
// //                             9999,
// //                             false,
// //                             mapaColetas.dados.dadosAdicionais
// //                         )
// //     }

// //     iniciaMapaColetas(coordenadasGeradas,coordsOrigem)




// //     // Função para mudar a localização e o zoom do mapa
// //     const gerarRota=(lat, lng,coordsOrigem,mapaColetas)=> {

// //         // Exemplo de uso
// //         var origem = `${coordsOrigem.lng},${coordsOrigem.lat}`;
// //         var destino = `${lng},${lat}`;
// //         var coords = [lat,lng]

// //         verificarLocalidadesNaRota(origem,destino,coordenadasGeradas,mapaColetas,coords)

// //         // var novaPosicao = new google.maps.LatLng(latitude,longitude);
// //         // mapa.setCenter(novaPosicao);
// //         // mapa.setZoom(zoom);
// //     }


// // })

