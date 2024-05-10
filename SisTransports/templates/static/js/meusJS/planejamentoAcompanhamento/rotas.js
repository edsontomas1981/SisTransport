const criaPerimetro=(element)=> {
    const latitude = parseFloat(element.getAttribute('data-lat'));
    const longitude = parseFloat(element.getAttribute('data-lng'));
    mapa.adicionarCirculo(latitude, longitude, 5000,"red",'');
    closeModal(); // Função para fechar modal (não definida aqui)
}

const addRota = async()=>{
    let origem = `${semaforo.origem.lng},${semaforo.origem.lat}`;
    let destino = `${semaforo.destino.lng},${semaforo.destino.lat}`;
    const response = await connEndpoint('/operacional/api/directions/', { 'start': origem, 'end': destino, 'localidades': {} });
    if(response.status ==200){
        if(mapa.currentPolyline){
            mapa.removerRota()  
        }
        mapa.imprimirRota(response.rota,10.3)
    }else{
        msgErro(`Não foi possível estabelecer uma rota entre os Dtc's ${semaforo.origem.idDtc} e ${semaforo.destino.idDtc}.`);
    }
}

