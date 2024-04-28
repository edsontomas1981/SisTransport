

const initMapColetas= ()=>{
    // Cria um novo mapa do Google
    var map = new google.maps.Map(document.getElementById('map'), { 
        center: myLatLng,
        zoom: 10.3, // Ajuste o zoom conforme necessário
    });
}

const criaMapas = (divMapa, latLng) => {
    const mapa = new google.maps.Map(document.getElementById(divMapa), {
        center: latLng,
        zoom: 10.3,
    });

    mapa.markers = []; // Inicializa a lista de marcadores dentro do objeto mapa
    mapa.dados = [];

    return mapa;
};
const addMarker = (latitude, longitude, icone, dados, id, mapa,callback) => {
    let markers = []

    var iconSize = {
        width: 30, // Largura desejada em pixels
        height: 30 // Altura desejada em pixels
      };
    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: mapa,
        icon: {
            url: icone,
            scaledSize: new google.maps.Size(iconSize.width, iconSize.height)
        },
        id: id // Atribui um ID único ao marcador
    });

    marker.addListener('click', () => {
        if (typeof callback === 'function') {
            callback(dados);
        }
    });

    // Adiciona o marcador à lista de marcadores do mapa
    markers.push(marker);
    return marker
};

const addMarkerResponsavel = (lat,lng,icon,dados,id,mapa,callback)=>{
    addMarker(lat,lng,icon,dados,id,mapa)
}



const populaMapa = (coordenadasGeradas)=>{
    let dadosTableColetas = []
    let dadosAdicionais = []
    addMarker(myLatLng.lat,myLatLng.lng,armazem)
    // Obtém as coordenadas geradas pela função geraCoordenadas
      // Adiciona marcadores para cada conjunto de coordenadas
      coordenadasGeradas.forEach(function(coordenadas) {
        switch (coordenadas[2]) {
          case 1:
            dadosTableColetas.push({id:coordenadas[3],status:'Em Rota',placa:coordenadas[5],dadosAdicionais:{lat:coordenadas[0],lng:coordenadas[1]}})
            addMarker(coordenadas[0],coordenadas[1],local,coordenadas,coordenadas[3],mostrarInformacoesDetalhadas)
            break;
          case 2:
            dadosTableColetas.push({id:coordenadas[3],status:'Em Trânsito',placa:coordenadas[5],dadosAdicionais:{lat:coordenadas[0],lng:coordenadas[1]}})
            addMarker(coordenadas[0],coordenadas[1],local,coordenadas,coordenadas[3],mostrarInformacoesDetalhadas)
            break;
          case 3:
            dadosTableColetas.push({id:coordenadas[3],status:'Concluída',placa:coordenadas[5],dadosAdicionais:{lat:coordenadas[0],lng:coordenadas[1]}})
            addMarker(coordenadas[0],coordenadas[1],local,coordenadas,coordenadas[3],mostrarInformacoesDetalhadas)
            break;  
          case 4: 
            dadosTableColetas.push({id:coordenadas[3],status:'Aguardando',placa:coordenadas[5],dadosAdicionais:{lat:coordenadas[0],lng:coordenadas[1]}})
            addMarker(coordenadas[0],coordenadas[1],local,coordenadas,coordenadas[3],mostrarInformacoesDetalhadas)
            break;                                       
          default:
            break;
        }
        dadosAdicionais.push({lat:coordenadas[0],lng:coordenadas[1]})
      });
}

const removeMarker = (map, markerId) => {
    if (map.markers && map.markers.length > 0) {
        for (let i = 0; i < map.markers.length; i++) {
            if (map.markers[i].id === markerId) {
                // Remove o marcador do mapa
                map.markers[i].setMap(null);
                // Remove o marcador da lista de marcadores
                map.markers.splice(i, 1);
                break;
            }
        }
    }
};

