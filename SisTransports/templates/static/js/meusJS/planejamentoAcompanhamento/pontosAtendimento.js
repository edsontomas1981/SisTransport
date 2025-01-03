const selecionaLocal = async (dados) => {

    const populaTabelaIntinerarios = ()=>{
        popula_tbody_paginacao(
            'paginacaoPainelIntinerario',
            'tabelaDoctosBody',
            listaLocais,
            botao,
            1,
            20,
            false,
            false
        );
    }

    const removePontoIntinerario = (e)=>{
        // Filtra a lista para remover o item com o ID correspondente
        listaLocais = listaLocais.filter(item => item.id !== e);
        populaTabelaIntinerarios()
        populaTotaisIntinerario()
        resetaIcone(e)
    }

    let botao = {
        editar: {
        classe: 'btn btn-danger ',
        texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
        callback: removePontoIntinerario
        }
      }
    // Aguarda a confirmação antes de continuar
    if (await(msgConfirmacao('Deseja Selecionar o Destino Abaixo'))){

        // Adiciona o local à lista se ele ainda não estiver presente
        if (!listaLocais.some(item => item.id === dados.id)) {
            listaLocais.push({ id:dados.idDtc, nome: dados.nome, peso: dados.peso });
        }

        exibirLocaisSelecionados(listaLocais);
        populaTabelaIntinerarios()
        populaTotaisIntinerario()
    }
};

const exibirLocaisSelecionados = async (dados)=> {
    listaLocais.forEach(element => {
        let marcador = mapa.selecionarMarcador('idDtc',element.id)
        mapa.alterarIconeDoMarcador(marcador,iconePreto,iconeSize)
    });
}

const limpaSemaforo = ()=>{
    semaforo.destino.lat = null
    semaforo.destino.lng = null
    semaforo.destino.idDtc = null

    semaforo.origem.lat = null
    semaforo.origem.lng = null
    semaforo.origem.idDtc = null
}


const selecionaOrigem =(element)=> {
    stateMapa.estado = "addRota"
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

const gerarRotaOrigemDestino= async (element)=> {
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

// Função para mostrar informações detalhadas
const mostrarInformacoesDetalhadas=(dados)=> {

        // Implemente a lógica para exibir informações detalhadas
    let tabela = `
    <div class="row">
        <div class="col-sm-12">
        <table class="table table-striped table-sm" style="width:80%">
            <tr>
            <td style="text-align: left;"><strong>Número:</strong></td>
            <td style="text-align: left;">${dados.idDtc}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Data:</strong></td>
            <td style="text-align: left;">${formataDataPtBr(formataData(dados.data))}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Romaneio:</strong></td>
            <td style="text-align: left;">${(() => dados.romaneio ? dados.romaneio.toUpperCase() : 'EM ABERTO')()}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Veículo:</strong></td>
            <td style="text-align: left;">${(() => dados.placa ? dados.placa.toUpperCase() : 'EM ABERTO')()}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Motorista:</strong></td>
            <td style="text-align: left;">${(() => dados.motorista ? dados.motorista.toUpperCase() : 'EM ABERTO')()}</td>
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
            <td style="text-align: left;"><strong>Tipo Atendimento:</strong></td>
            <td style="text-align: left;">${dados.tipo_atendimento == 1 ? 'COLETA' : 'ENTREGA'}</td>
            </tr>
            <tr>
            <td style="text-align: left;"><strong>Status:</strong></td>
            <td style="text-align: left;">${formataStatus(dados.status)}</td>
            </tr>
        </table>
        </div> 
    </div>
    `;
    let acoes = `
                <div class="mt-2">
                <b class="pt-2" >Prioridade</b>
                <div class="badge badge-warning" style="width:100%">Média</div>
                </div>
                `
    let idColeta = `<span>PRÉ DTC Nº : </span><span id="numDocumento"> ${dados.idDtc} </span>`
    let nomeRemetente = `<span>REMETENTE : </span><span id="numDocumento"> ${truncateString(dados.remetente,25).toUpperCase()} </span>`
    let nomeDestinatario = `<span>DESTINATÁRIO : </span><span id="numDocumento"> ${truncateString(dados.destinatario,25).toUpperCase()} </span>`
    let modalColetaId = document.getElementById("modalColetaId")
    let modalNomeDestinatario = document.getElementById("modalNomeDestinatario")

    let tabelaColetas = document.getElementById("tabelaColetas")
    let acoesColetas = document.getElementById("acoesColetas")
    let botoesColetas = document.getElementById("botoesColetas")
    tabelaColetas.innerHTML = tabela
    acoesColetas.innerHTML = acoes
    modalColetaId.innerHTML = idColeta
    modalNomeRemetente.innerHTML =nomeRemetente
    modalNomeDestinatario.innerHTML =nomeDestinatario


    // Exemplo de adicionar um botão dinamicamente com um evento de clique
    const btnGeraPerimetro = document.createElement('button');
    btnGeraPerimetro.textContent = 'Perímetro';

    // Adiciona o ícone usando Font Awesome (ou substitua pela sua biblioteca de ícones preferida)
    // construção do botao gera perimetro
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
    // construção do botao gerar rota a partir do ponto de atendimento clicado
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
    // construção do botao gerar rota a ate do ponto de atendimento clicado partindo da matriz 
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

    limpaContainers("botoesColetas")

    containerBotoes.appendChild(btnGeraRotaDaqui);
    containerBotoes.appendChild(btnGeraPerimetro);
    containerBotoes.appendChild(btnGeraAteAqui);

    openModal('modalPlanejamentoColetas')
}