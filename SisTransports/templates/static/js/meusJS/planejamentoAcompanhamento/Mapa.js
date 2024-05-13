// Definição da classe MapaLeaflet
class MapaLeaflet {
    // Construtor da classe
    constructor(containerId, latitude, longitude, zoom) {
        this.map = L.map(containerId).setView([latitude, longitude], zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        // Inicializa um array vazio para armazenar os marcadores adicionados ao mapa
        this.markers = [];
        this.currentPolyline = null; // Referência para a polyline atual no mapa
        this.currentMarkers = []; // Array para manter referências aos marcadores adicionados
        this.zoom = zoom
    }

    adicionarPoligonoFromData(data,cor) {
        // Verifica se há geometrias no objeto de dados
        if (data.geometries && Array.isArray(data.geometries) && data.geometries.length > 0) {
            const geometry = data.geometries[0]; // Assume apenas uma geometria por enquanto

            // Verifica se há vértices na geometria
            if (geometry.vertices && Array.isArray(geometry.vertices) && geometry.vertices.length > 0) {
                const polygonCoordinates = geometry.vertices.map(vertex => [vertex.latitude, vertex.longitude]);

                // Remove o polígono atual, se existir
                this.removerPoligono();

                // Cria um polígono com as coordenadas fornecidas
                const polygon = L.polygon(polygonCoordinates, {
                    color: cor, // Cor da linha do polígono
                    fillColor: cor, // Cor de preenchimento do polígono
                    fillOpacity: 0.2 // Opacidade do preenchimento do polígono
                }).addTo(this.map);

                // Ajusta a visualização do mapa para mostrar todo o polígono
                // this.map.fitBounds(polygon.getBounds());

                // Define o polígono criado como o polígono atual no mapa
                this.currentPolygon = polygon;
            } else {
                console.error('Erro: Não foram encontrados vértices na geometria.');
            }
        } else {
            console.error('Erro: Não foram encontradas geometrias válidas nos dados.');
        }
    }

    removerPoligono() {
        // Verifica se há um polígono atualmente adicionado ao mapa
        if (this.currentPolygon) {
            // Remove o polígono do mapa
            this.map.removeLayer(this.currentPolygon);
            this.currentPolygon = null; // Limpa a referência ao polígono
        }
    }

    adicionarMarcadorComIcone(latitude, longitude, popupContent, iconUrl, iconSize, id,dadosAdicionais,callback) {
        // Crie um ícone personalizado
        const customIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: iconSize // [largura, altura] em pixels
        });

        // Adicione o marcador com o ícone personalizado ao mapa
        const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(this.map);

        // Carrega Dados ao marcador
        marker.dados=dadosAdicionais

        // Adicione o conteúdo do popup ao marcador
        // marker.bindPopup(popupContent);

        // Adicione as informações personalizadas ao marcador
        if(marker.dados.placa){
            marker.placa = marker.dados.placa;
        }
        if(marker.dados.idDtc){
            marker.idDtc =marker.dados.idDtc;
        }

              


        // Adicione um evento de clique ao marcador para abrir o modal
        marker.on('click', () => {
            // Defina o conteúdo do modal
            callback(marker.dados,this.map)

            // const modalBody = document.getElementById('modalBody'); // Substitua 'modalBody' pelo ID do corpo do seu modal
            // modalBody.innerHTML = modalContent;

            // // Abra o modal ao clicar no marcador
            // this.modal.show();
        });

        // Adicione o marcador ao array de marcadores atuais
        this.currentMarkers.push(marker);

        // Retorne o marcador adicionado
        return marker;
    }

    selecionarMarcador(campo,valor) {
        console.log(campo + ':' + "valor")
        // Encontre o marcador correspondente ao valor e campo fornecidos
        const selectedMarker = this.currentMarkers.find(marker => {
            
            if (campo == 'id') {
                // Busca por ID
                return marker.dados.id == valor;
            } else if (campo == 'placa') {
                // Busca por placa
                return marker.placa == valor;
            } else if (campo == 'idDtc') {
                // Busca por ID Dtc
                return marker.idDtc == valor;
            } else {
                // Campo não reconhecido
                return false;
            }
        });
    
        // Verifique se o marcador foi encontrado
        if (selectedMarker) {
            // Abra o popup do marcador (caso deseje exibir o popup automaticamente ao selecionar)
            selectedMarker.openPopup();
    
            // Retorne o marcador selecionado
            return selectedMarker;
        } else {
            // Se nenhum marcador correspondente for encontrado, retorne null ou lide com o caso de não encontrar o marcador de acordo com sua lógica
            return null;
        }
    }

    // Método para alterar o ícone de um marcador existente
    alterarIconeDoMarcador(marker, iconUrl, iconSize) {
        // Crie um novo ícone personalizado com o URL e tamanho fornecidos
        const novoIcone = L.icon({
            iconUrl: iconUrl,
            iconSize: iconSize // [largura, altura] em pixels
        });

        // Altere o ícone do marcador para o novo ícone criado
        marker.setIcon(novoIcone);

        // Retorne o marcador atualizado
        return marker;
    }
    
    removerMarcadorPelaInfo(idDtc) {
        const index = this.currentMarkers.findIndex(marker => marker.idDtc === idDtc);
        if (index !== -1) {
            const markerToRemove = this.currentMarkers[index];
            this.map.removeLayer(markerToRemove); // Remove o marcador do mapa
            this.currentMarkers.splice(index, 1); // Remove o marcador do array de marcadores atuais
        }
    }

    adicionarMarcador(latitude, longitude, popupText) {
        const marker = L.marker([latitude, longitude]).addTo(this.map);
        marker.bindPopup(popupText);
        
        // Atribui um identificador único ao marcador
        marker.myId = this.markers.length;
        this.markers.push(marker); // Adiciona o marcador ao array de marcadores
    }

    adicionarCirculo(latitude, longitude, raio, cor, popupText) {
        // Remova o círculo existente antes de adicionar um novo
        this.removerCirculo();

        // Adicione o novo círculo ao mapa
        const circle = L.circle([latitude, longitude], {
            radius: raio,
            color: cor,
            fillColor: cor,
            fillOpacity: 0.5
        }).addTo(this.map)
        .bindPopup(popupText)
        .openPopup();

        // Mantenha uma referência ao círculo atual
        this.currentCircle = circle;
    }

    removerCirculo() {
        // Verifique se há um círculo atualmente adicionado ao mapa
        if (this.currentCircle) {
            // Remova o círculo do mapa
            this.map.removeLayer(this.currentCircle);
            this.currentCircle = null; // Limpe a referência ao círculo
        }
    }

    removerMarcador(markerId) {
        // Verifica se o mapa possui uma matriz de marcadores
        if (this.markers && Array.isArray(this.markers)) {
            // Procura o marcador pelo 'myId' e o remove do mapa
            for (let i = 0; i < this.markers.length; i++) {
                const marker = this.markers[i];
                if (marker.myId === markerId) {
                    this.map.removeLayer(marker); // Remove o marcador do mapa
                    this.markers.splice(i, 1); // Remove o marcador da matriz de marcadores
                    break;
                }
            }
        } else {
            console.error('Erro ao remover marcador: mapa ou marcadores não encontrados.');
        }
    }

    imprimirRota(routeCoordinates) {
        // Primeiro, remova qualquer rota existente no mapa
        this.removerRota();

        // Crie uma nova polyline com as coordenadas da rota
        const polyline = L.polyline(routeCoordinates, { color: 'red' });

        // Adicione a nova polyline ao mapa
        polyline.addTo(this.map);

        // Ajuste a visão do mapa para mostrar toda a rota
        this.map.fitBounds(polyline.getBounds());

        // // Verifique se o mapa está em um zoom maior que o desejado
        // if (this.map.getZoom() > zoomLevel) {
        //     // Diminua o zoom para o nível especificado
        //     this.map.setZoom(zoomLevel);
        // }

        // Defina a nova polyline como a polyline atual no mapa
        this.currentPolyline = polyline;
    }

    removerRota() {
        if (this.currentPolyline) {
            this.map.removeLayer(this.currentPolyline); // Remove a polyline do mapa
            this.currentPolyline = null; // Limpa a referência à polyline no objeto do mapa
        }
    }


    alterarCentroDoMapa(latitude, longitude,zoomLevel = 10.3) {
        // Verifica se as coordenadas de latitude e longitude são válidas e numéricas
        if (typeof latitude === 'number' && typeof longitude === 'number' && !isNaN(latitude) && !isNaN(longitude)) {
            // Atualiza o centro do mapa com as novas coordenadas
            this.map.setView([latitude, longitude]);
            console.log(`Centro do mapa alterado para (${latitude}, ${longitude}).`);
        } else {
            // Registra um erro se as coordenadas não forem válidas
            console.error('Erro ao alterar o centro do mapa: Coordenadas inválidas.');
        }
        this.map.setZoom(this.zoom);
    }

    // Método para alterar a localização (latitude e longitude) de um marcador existente
    alterarLocalizacaoDoMarcador(marker, novaLatitude, novaLongitude) {
        // Verifica se o marcador e as novas coordenadas são válidos
        if (marker && typeof novaLatitude === 'number' && typeof novaLongitude === 'number' && !isNaN(novaLatitude) && !isNaN(novaLongitude)) {
            // Obtém a posição atual do marcador
            const currentPosition = marker.getLatLng();

            // Verifica se as novas coordenadas são diferentes da posição atual
            if (currentPosition.lat !== novaLatitude || currentPosition.lng !== novaLongitude) {
                // Define as novas coordenadas para o marcador
                marker.setLatLng([novaLatitude, novaLongitude]);

                // Atualiza a posição do marcador no mapa
                marker.update();
                
                console.log(`Localização do marcador alterada para (${novaLatitude}, ${novaLongitude}).`);
            } else {
                console.log('O marcador já está na nova localização especificada.');
            }
        } else {
            console.error('Erro ao alterar a localização do marcador: Parâmetros inválidos.');
        }
    }
}


