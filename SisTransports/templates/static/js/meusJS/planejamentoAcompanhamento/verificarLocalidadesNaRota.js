const verificarLocalidadesNaRota = async() => {
    const origem = '8.681495,49.41461';
    const destino = '8.687872,49.420318';
    let response  = await connEndpoint('/operacional/api/directions/', {'start':origem,'end':destino});
    console.log(response)

};

// Função para calcular a distância entre dois pontos em graus (usando fórmula simples de distância euclidiana)
const calcularDistanciaEntrePontos = (coord1, coord2) => {
    const dx = coord1[0] - coord2[0];
    const dy = coord1[1] - coord2[1];
    return Math.sqrt(dx * dx + dy * dy);
};


verificarLocalidadesNaRota();
