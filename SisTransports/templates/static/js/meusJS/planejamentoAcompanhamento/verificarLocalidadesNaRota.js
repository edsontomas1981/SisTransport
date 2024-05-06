// Exemplo de uso das funções
const verificarLocalidadesNaRota = async (origem, destino, coordenadas, mapa,coords) => {
    try {
        const response = await connEndpoint('/operacional/api/directions/', { 'start': origem, 'end': destino, 'localidades': coordenadas});
        switch (response.status) {
            case 200:
                let rotas =[]
                response.localidades_na_rota.forEach(element => {
                    rotas.push({dtc:element})
                    // removeMarker(mapa,element)
                });
                let btnColetasRota = {
                       editar: {
                         classe: 'btn-primary',
                         texto: 'Editar',
                         callback: function(id) {
                           console.log('Botão Editar clicado para o ID:', id);
                         }
                       }
                    }

                imprimirRotaNoMapa(response.rota, mapa,10.3);
                popula_tbody('tbodyRotasColetas', rotas, btnColetasRota, 1, 9999, true);
                openModal('modalRotasColetas')
                break;
            default:
                msgErro("Não foi possível gerar a rota.");
                break;
        }
    } catch (error) {
        console.error('Erro ao buscar direções:', error);
        // Em caso de erro, remova a rota do mapa
        removerRotaDoMapa(mapa);
    }
};

// Função para calcular a distância entre dois pontos em graus (usando fórmula simples de distância euclidiana)
const calcularDistanciaEntrePontos = (coord1, coord2) => {
    const dx = coord1[0] - coord2[0];
    const dy = coord1[1] - coord2[1];
    return Math.sqrt(dx * dx + dy * dy);
};

const imprimirRotaNoMapa = (routeCoordinates, mapa, zoomLevel = 12) => {
    if (!routeCoordinates || routeCoordinates.length === 0) {
        console.error('Coordenadas da rota inválidas.');
        return;
    }
    // Primeiro, remova qualquer rota existente no mapa
    removerRotaDoMapa(mapa);

    // Crie uma nova polyline com as coordenadas da rota
    const polyline = L.polyline(routeCoordinates, { color: 'red' });

    // Adicione a nova polyline ao mapa
    polyline.addTo(mapa);

    // Ajuste a visão do mapa para mostrar toda a rota
    mapa.fitBounds(polyline.getBounds());

    // Verifique se o mapa está em um zoom maior que o desejado
    if (mapa.getZoom() > zoomLevel) {
        // Diminua o zoom para o nível especificado
        mapa.setZoom(zoomLevel);
    }

    // Defina a nova polyline como a polyline atual no mapa
    mapa.currentPolyline = polyline;
};


// Função para remover a polyline atual do mapa
const removerRotaDoMapa = (mapa) => {
    if (mapa.currentCircle) {
        mapa.removeLayer(mapa.currentCircle); // Remove o círculo do mapa
        mapa.currentCircle = null; // Limpa a referência ao círculo no objeto do mapa
    }
};