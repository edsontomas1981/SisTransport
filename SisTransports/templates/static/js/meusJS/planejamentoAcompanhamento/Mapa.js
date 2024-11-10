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

        let registro 
        if(campo === 'idDtc'){
            registro = this.currentMarkers.find(e => e.dados.idDtc == valor);
            if (registro) {
                return registro
            }
        }

        if(campo === 'placa'){
            registro = this.currentMarkers.find(e => e.dados.placa == valor);
            if (registro) {
                return registro
            }
        }

        if(campo === 'id'){
            registro = this.currentMarkers.find(e => e.dados.id == valor);
            if (registro) {
                return registro
            }
        }
        
        
        // // Encontre o marcador correspondente ao valor e campo fornecidos
        // const selectedMarker = this.currentMarkers.find(marker => {
        //     if (campo == 'id') {
        //         // Busca por ID
        //         return marker.dados.id == valor;
        //     } else if (campo == 'placa') {
        //         // Busca por placa
        //         return marker.placa == valor;
        //     } else if (campo == 'idDtc') {  
        //         console.log(`Marcador : ${typeof(marker.idDtc)} Campo : ${campo},Valor : ${typeof(valor)}`)
        //         // Busca por ID Dtc
        //         return marker.idDtc == valor;
        //     } else {
        //         // Campo não reconhecido
        //         return false;
        //     }
        // });
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

    removerTodosMarcadores() {
        // Percorre o array de marcadores atuais e remove cada um do mapa
        this.currentMarkers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        
        // Limpa o array de marcadores
        this.currentMarkers = [];
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

    criarRota(pontos) {
        let coordenadas = []
        pontos = this.transformaListaEmArrayDePontosDeAtendimento(pontos)
        console.log(pontos)
        pontos.forEach(e => {
            coordenadas.push([e.dados.lat,e.dados.lng])            
        });

        // Verifique se existem pontos para criar a rota
        if (!pontos || pontos.length < 2) {
            console.error("São necessários pelo menos dois pontos para criar uma rota.");
            return;
        }
    
        // Gere as coordenadas da rota entre os pontos fornecidos
        // const routeCoordinates = pontos.dados.map(ponto => [ponto.lat, ponto.lng]);
    
        // Imprima a rota no mapa chamando o método imprimirRota
        this.imprimirRota(coordenadas);
    }

    async criarRotaComRuas(pontos) {
        // Transforma a lista em um array de pontos de atendimento e extrai as coordenadas
        pontos = this.transformaListaEmArrayDePontosDeAtendimento(pontos);
        let coordenadas = pontos.map(e => [e.dados.lat, e.dados.lng]);
    
        // Verifique se existem pontos para criar a rota
        if (!pontos || pontos.length < 2) {
            console.error("São necessários pelo menos dois pontos para criar uma rota.");
            return;
        }
    
        // Construa a string de coordenadas para a API do Mapbox
        const coordinatesString = coordenadas.map(coord => `${coord[1]},${coord[0]}`).join(';');
        const accessToken = '5b3ce3597851110001cf6248fa2ac3e598a04b3c9c4ef05b1472356b';
    
        // URL da API de direções do Mapbox
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinatesString}?geometries=geojson&access_token=${accessToken}`;
    
        try {
            // Requisição à API de direções do Mapbox
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.routes && data.routes.length > 0) {
                // Extraia as coordenadas da rota retornada pela API
                const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
    
                // Imprima a rota no mapa chamando o método imprimirRota
                this.imprimirRota(routeCoordinates);
            } else {
                console.error("Nenhuma rota foi encontrada.");
            }
        } catch (error) {
            console.error("Erro ao tentar obter a rota:", error);
        }
    }

    async decodificarPolyline(rota){
        const coordinates = await polyline.decode(rota);
        return coordinates
    }

    async criarRotaComVariosPontos(pontos) {
        // Converta a lista de pontos em um array de coordenadas no formato [longitude, latitude]
        pontos = this.transformaListaEmArrayDePontosDeAtendimento(pontos);
        const coordenadas = pontos.map(e => [e.dados.lng, e.dados.lat]);

        console.log({coordinates:coordenadas})

            // Verifique se existem pontos suficientes para criar a rota
        if (coordenadas.length < 2) {
            console.error("São necessários pelo menos dois pontos para criar uma rota.");
            return;
        }
    
        const apiKey = '5b3ce3597851110001cf6248fa2ac3e598a04b3c9c4ef05b1472356b'; // Substitua pela sua chave de API
    
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey
            },
            body: JSON.stringify({
                coordinates: coordenadas
            })
        };
        
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
    
            // Log da resposta completa para depuração
            console.log("Resposta da API:", data);
            
            console.log(await this.decodificarPolyline(data.routes[0].geometry))

            // imprimirRotaNoMapa(data) 
            // Verifique se a rota existe antes de tentar acessá-la
            if (data.routes && data.routes.length > 0 && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
                const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                this.imprimirRota(routeCoordinates);
            } else {
                console.error("A API não retornou uma rota válida.");
            }
        } catch (error) {
            console.error("Erro ao tentar obter a rota:", error);
        }
    }
    
    transformaListaEmArrayDePontosDeAtendimento(lista){
        let listaPontosNaRota = []
            lista.forEach(e => {
                listaPontosNaRota.push(this.selecionarMarcador('idDtc',e.id))
            });
        return listaPontosNaRota
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

    adicionarMarcadorComIconeNew(dadosMarcador) {

        // console.log(dadosMarcador)
        
        const customIcon = L.icon({
            iconUrl: dadosMarcador.iconUrl,
            iconSize: dadosMarcador.iconSize // [largura, altura] em pixels
        });


        // Adicione o marcador com o ícone personalizado ao mapa
        const marker = L.marker([dadosMarcador.lat, dadosMarcador.lng], { icon: customIcon }).addTo(this.map);

        if(dadosMarcador.dadosIntinerario){
            // Carrega Dados ao marcador
            marker.dados=dadosMarcador.dadosIntinerario
            marker.dados.lat = dadosMarcador.lat
            marker.dados.lng = dadosMarcador.lng
            marker.dados.idDtc = dadosMarcador.idDtc
        }

        if(dadosMarcador.dados_veiculo){
            // Carrega Dados ao marcador
            marker.dados=dadosMarcador.dados_veiculo
            marker.placa=dadosMarcador.dados_veiculo.placa
            marker.placa=dadosMarcador.dados_veiculo.motorista
            marker.dados.lat = dadosMarcador.lat
            marker.dados.lng = dadosMarcador.lng
            if(dadosMarcador.jobs){
                marker.dados.jobs = dadosMarcador.jobs
            }
        }



        // Adicione o conteúdo do popup ao marcador
        // marker.bindPopup(popupContent);

        // Adicione as informações personalizadas ao marcador
        if(dadosMarcador.placa){
            marker.placa = dadosMarcador.placa;
        }
        
        if(dadosMarcador.idDtc){
            marker.idDtc =dadosMarcador.placa;
        }

        if(dadosMarcador.popup){
            // Adicione o conteúdo do popup ao marcador
            marker.bindPopup(dadosMarcador.popup);

            // Exibe o popup ao passar o mouse sobre o marcador
            marker.on('mouseover', () => {
                marker.openPopup();
            });

            // Fecha o popup ao remover o mouse do marker
            marker.on('mouseout', () => {
                marker.closePopup();
            });
        }


        // Adicione um evento de clique ao marcador para abrir o modal
        marker.on('click', () => {
            // Defina o conteúdo do modal

            dadosMarcador.callback(marker.dados,this.map)
        });

        // Adicione o marcador ao array de marcadores atuais
        this.currentMarkers.push(marker);


        // Retorne o marcador adicionado
        return marker;
    }

    imprimirRotaNoMapa(routeCoordinates) {
        // Primeiro, remova qualquer rota existente do mapa
        this.removerRota();
    
        // Crie uma nova polyline com as coordenadas da rota
        const polyline = L.polyline(routeCoordinates, { color: 'blue', weight: 5 });
    
        // Adicione a nova polyline ao mapa
        polyline.addTo(this.map);
    
        // Ajuste a visão do mapa para mostrar toda a rota
        this.map.fitBounds(polyline.getBounds());
    
        // Verifique se o mapa está em um zoom maior que o desejado e ajuste, se necessário
        const zoomLevel = 12;  // Defina o nível de zoom desejado
        if (this.map.getZoom() > zoomLevel) {
            this.map.setZoom(zoomLevel);
        }
    
        // Defina a nova polyline como a rota atual no mapa
        this.currentPolyline = polyline;
    }
    

    obterCoordenadasDaRota(dadosRota) {
        // Inicialize uma lista para armazenar as coordenadas da rota
        const routeCoordinates = [];
    
        // Percorra cada segmento da rota
        dadosRota.forEach(segmento => {
            // Percorra cada etapa do segmento
            segmento.steps.forEach(step => {
                // Extraia os pontos de caminho de cada etapa
                step.way_points.forEach(ponto => {
                    // Supondo que você tenha uma função ou variável que converte `ponto` em coordenadas GPS
                    const coordenadas = this.converterWayPointParaCoordenadas(ponto);
                    routeCoordinates.push(coordenadas);
                });
            });
        });
    
        return routeCoordinates;
    }
    
    // Função auxiliar que converte um ponto de caminho em coordenadas GPS
    converterWayPointParaCoordenadas(ponto) {
        // Aqui você precisa implementar ou acessar um método para obter a coordenada GPS real
        // baseado no índice do ponto. Essa função é um placeholder e precisa ser ajustada
        return [latitude, longitude]; // Substitua latitude e longitude pelos valores reais
    }
    
    // Função que usa os dados dos steps para desenhar a rota no mapa
    exibirRota(dadosRota) {
        const routeCoordinates = this.obterCoordenadasDaRota(dadosRota);
        this.imprimirRotaNoMapa(routeCoordinates);
    }

    getMarkers(){
        // console.log(this.currentMarkers)
        return this.currentMarkers
    }
    
}


