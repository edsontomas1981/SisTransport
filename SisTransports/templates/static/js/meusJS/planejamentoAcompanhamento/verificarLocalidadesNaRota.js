const verificarLocalidadesNaRota = async(origem,destino,coordenadas,mapa) => {
    let response  = await connEndpoint('/operacional/api/directions/', {'start':origem,'end':destino,'localidades':coordenadas});
    console.log(response.localidades_na_rota)
    imprimirRotaNoMapa(response.rota,mapa)
};

// Função para calcular a distância entre dois pontos em graus (usando fórmula simples de distância euclidiana)
const calcularDistanciaEntrePontos = (coord1, coord2) => {
    const dx = coord1[0] - coord2[0];
    const dy = coord1[1] - coord2[1];
    return Math.sqrt(dx * dx + dy * dy);
};

const imprimirRotaNoMapa=(routeCoordinates,mapa)=>{
    console.log("ok")
     // Cria um objeto de polyline com as coordenadas da rota
     var polyline = L.polyline(routeCoordinates, {color: 'red'}).addTo(mapa);

     // Ajusta a visão do mapa para mostrar toda a rota
     mapa.fitBounds(polyline.getBounds());
}