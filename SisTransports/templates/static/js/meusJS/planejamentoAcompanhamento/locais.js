const selecionaLocal = (dados)=>{
    listaLocais.push({idDtc:dados.idDtc,volumes:dados.volumes,peso:dados.peso})
    exibirLocaisSelecionados(listaLocais)
}

const exibirLocaisSelecionados = async (dados)=> {

    // Criar tabela HTML
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-sm'); // Adicione mais de uma classe à tabela
  
    table.innerHTML = `
      <thead>
        <tr>
          <th>Id</th>
          <th>Volumes</th>
          <th>Peso</th>
        </tr>
      </thead>
      <tbody>
        ${dados.map((dado, index) => `
          <tr>
            <td>${dado.idDtc}</td>
            <td>${dado.volumes}</td>
            <td>${dado.peso}</td>
            <td><button class="btn btn-primary text-white form-control-sm" onclick="selecionarCotacao(${index})">Add</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;

    if (dados.length>0){
        // Opções do alerta
        const options = {
        title: 'Selecione uma Cotação',
        html: table,
        showCancelButton: true,
        cancelButtonText: 'Voltar',
        showConfirmButton: true, // Oculta o botão de confirmação
        confirmButtonText:'Selecionar',
        footer: '' // Remove o rodapé que contém os botões padrão
      };
    
        // Exibe o alerta
        Swal.fire(options).then((result) => {
        if (result.isConfirmed) {
            const selectedCotacao = dados[result.value];
            listaLocais.forEach(element => {
                let marcador = mapa.selecionarMarcador('idDtc',element.idDtc)
                mapa.alterarIconeDoMarcador(marcador,iconePreto,iconeSize)
            });
            stateMapa.estado=null
            listaLocais = []
        }
        });
    }
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
    let idColeta = `<span>Pré Dtc Nº : </span><span id="numDocumento"> ${dados.idDtc}</span>`
    let modalColetaId = document.getElementById("modalColetaId")
    let tabelaColetas = document.getElementById("tabelaColetas")
    let acoesColetas = document.getElementById("acoesColetas")
    let botoesColetas = document.getElementById("botoesColetas")
    tabelaColetas.innerHTML = tabela
    acoesColetas.innerHTML = acoes
    modalColetaId.innerHTML = idColeta

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
        criaPerimetro(btnGeraPerimetro);
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
    btnGeraRotaDaqui.dataset.id = dados.idDtc

    btnGeraRotaDaqui.addEventListener('click', () => {
        selecionaOrigem(btnGeraRotaDaqui,mapa);
    });
    // Exemplo de adicionar um botão dinamicamente com um evento de clique
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