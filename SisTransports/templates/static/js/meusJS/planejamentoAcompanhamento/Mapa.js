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

    }

    adicionarMarcadorComIcone(latitude, longitude, popupContent, iconUrl, iconSize, idDtc,dadosAdicionais) {
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
        marker.bindPopup(popupContent);

        // Adicione as informações personalizadas ao marcador
        marker.idDtc = idDtc;


        // Adicione um evento de clique ao marcador para abrir o modal
        marker.on('click', () => {
            // Defina o conteúdo do modal
            mostrarInformacoesDetalhadas(marker.dados)

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

    imprimirRota(routeCoordinates, zoomLevel = 12) {
        // Primeiro, remova qualquer rota existente no mapa
        this.removerRota();

        // Crie uma nova polyline com as coordenadas da rota
        const polyline = L.polyline(routeCoordinates, { color: 'red' });

        // Adicione a nova polyline ao mapa
        polyline.addTo(this.map);

        // Ajuste a visão do mapa para mostrar toda a rota
        this.map.fitBounds(polyline.getBounds());

        // Verifique se o mapa está em um zoom maior que o desejado
        if (this.map.getZoom() > zoomLevel) {
            // Diminua o zoom para o nível especificado
            this.map.setZoom(zoomLevel);
        }

        // Defina a nova polyline como a polyline atual no mapa
        this.currentPolyline = polyline;
    }

    removerRota() {
        if (this.currentPolyline) {
            this.map.removeLayer(this.currentPolyline); // Remove a polyline do mapa
            this.currentPolyline = null; // Limpa a referência à polyline no objeto do mapa
        }
    }
}


