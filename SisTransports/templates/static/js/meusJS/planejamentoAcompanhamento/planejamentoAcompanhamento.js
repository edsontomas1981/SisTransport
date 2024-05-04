// Definição global da função preparaDadosPerimetro
function preparaDadosPerimetro(element) {
    let mapa = document.getElementById('map')
    const latitude = element.getAttribute('data-lat');
    const longitude = element.getAttribute('data-lng');
    console.log(mapa)
    closeModal()
    createPerimeter(latitude,longitude,5,mapa)

}

document.addEventListener("DOMContentLoaded",()=>{

    var coordenadasGeradas = geraCoordenadas();
    var coordsOrigem = { lat: -23.47337308, lng: -46.47320867 };
    // A função preparaDadosPerimetro agora recebe o elemento clicado como parâmetro

    const mostrarInformacoesDetalhadas = (dados,mapaColetas) => {

        let tabela = `
        <div class="row">
            <div class="col-sm-6">
            <table class="table table-striped table-sm" style="width:80%">
                <tr>
                <td style="text-align: left;"><strong>Número:</strong></td>
                <td style="text-align: left;">${dados[3]}</td>
                </tr>
                <tr>
                <td style="text-align: left;"><strong>Data:</strong></td>
                <td style="text-align: left;">17/10/2007</td>
                </tr>
                <tr>
                <td style="text-align: left;"><strong>Romaneio:</strong></td>
                <td style="text-align: left;">${dados[3]}</td>
                </tr>
                <tr>
                <td style="text-align: left;"><strong>Veículo:</strong></td>
                <td style="text-align: left;">${dados[5]}</td>
                </tr>
                <tr>
                <td style="text-align: left;"><strong>Motorista:</strong></td>
                <td style="text-align: left;">${dados[4]}</td>
                </tr>
                <tr>
                <td style="text-align: left;"><strong>Volumes:</strong></td>
                <td style="text-align: left;">${dados[7]}</td>
                </tr>
                <tr>
                <td style="text-align: left;"><strong>Peso:</strong></td>
                <td style="text-align: left;">${dados[8]}</td>
                </tr>
                <tr>
                <td style="text-align: left;"><strong>Localização:</strong></td>
                <td style="text-align: left;">${dados[6]}</td>
                </tr>
                <tr>
                <td style="text-align: left;"><strong>Status:</strong></td>
                <td style="text-align: left;">${dados[9]}</td>
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
        let btnGerarIntinerarios = `
                                    <div class="btn-group pt-2" role="group" aria-label="Basic example" style="width:100%">
                                        <button type="button" class="btn btn-success">
                                            <i class="fa fa-location-arrow" aria-hidden="true"></i>
                                            Origem
                                        </button>
                                        <button type="button" class="btn btn-warning" data-lat="${dados[0]}" data-lng="${dados[1]}" onclick="preparaDadosPerimetro(this)">
                                            <i class="fa fa-map-signs" aria-hidden="true"></i>
                                            Perímetro
                                        </button>
                                        <button type="button" class="btn btn-primary">
                                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                                            Destino
                                        </button>
                                    </div>
                                    `;
        let idColeta = `<span>Pré Dtc Nº : </span><span id="numDocumento"> ${dados[3]}</span>`
        let modalColetaId = document.getElementById("modalColetaId")
        let tabelaColetas = document.getElementById("tabelaColetas")
        let acoesColetas = document.getElementById("acoesColetas")
        let botoesColetas = document.getElementById("botoesColetas")
        tabelaColetas.innerHTML = tabela
        acoesColetas.innerHTML = acoes
        modalColetaId.innerHTML = idColeta
        botoesColetas.innerHTML = btnGerarIntinerarios

        const btnAddDtcVeiculo = document.getElementById("addDtcVeiculo");
        btnAddDtcVeiculo.addEventListener('click', () => {
            removeMarker(mapaColetas, dados[3]); // Passa a referência ao mapa e o ID do marcador
        });
        openModal('modalPlanejamentoColetas')

    };





const iniciaMapaColetas=(coordenadas,coordsOrigem)=>{
    // Coordenadas iniciais
    let myLatLngEntrega = { lat: -12.9704, lng: -38.5124 };

    let iconeVermelho = '../../static/images/mapasIcones/pinVermelho.png'
    let iconeAzul = "../../static/images/mapasIcones/pinAzul.png"
    let iconeRoxo = "../../static/images/mapasIcones/pinRoxo.png"
    let iconeVerde = "../../static/images/mapasIcones/pinVerde.png"
    let iconePreto = "../../static/images/mapasIcones/pinPreto.png"
    let armazem = "../../static/images/mapasIcones/armazem.png"
    let local = "../../static/images/mapasIcones/loja.png"
    var mapaColetas = criaMapas('map', coordsOrigem)

    coordenadas.forEach(coordenada => {

        mapaColetas.dados.push({id:coordenada[3],status:'Em Rota',
                                placa:coordenada[5],
                                dadosAdicionais:{lat:coordenada[0],lng:coordenada[1]}})

        mapaColetas.markers.push(addMarker (coordenada[0], coordenada[1], 
                                  local, coordenada, coordenada[3], 
                                  mapaColetas,(element) => mostrarInformacoesDetalhadas(element, mapaColetas)))
                                  
      });

    addMarkerResponsavel(coordsOrigem.lat,coordsOrigem.lng,armazem,{},0,mapaColetas)

    const acaoBotaoGerarRota = (element,mapaColetas) => {
        let elemento = document.getElementById(element+'')
        // Obtém o valor dos atributos data-lng e data-lat do elemento
        const lng = elemento.getAttribute('data-lng');
        const lat = elemento.getAttribute('data-lat');

        // Verifica se os valores foram encontrados e os exibe no console
        if (lng && lat) {
            gerarRota(lat,lng,coordsOrigem,mapaColetas)
        } else {
            console.error('Dados de longitude e/ou latitude não encontrados.');
        }
    };

    let botoes = {
        mostrar: {
          classe: "btn-primary text-white",
          texto: '<i class="fa fa-eye" aria-hidden="true"></i>',
          callback: (element) => acaoBotaoGerarRota(element, mapaColetas) // Passando mapaColetas como argumento
        }
    };

    popula_tbody_paginacao('paginacaoPlanejamento',
                            'infoPlanejamentoColetas',
                            mapaColetas.dados,
                            botoes,
                            1,
                            9999,
                            false,
                            mapaColetas.dados.dadosAdicionais
                        )
    }

    iniciaMapaColetas(coordenadasGeradas,coordsOrigem)

    // Função para mudar a localização e o zoom do mapa
    const gerarRota=(lat, lng,coordsOrigem,mapaColetas)=> {

        // Exemplo de uso
        var origem = `${coordsOrigem.lng},${coordsOrigem.lat}`;
        var destino = `${lng},${lat}`;
        var coords = [lat,lng]

        verificarLocalidadesNaRota(origem,destino,coordenadasGeradas,mapaColetas,coords)

        // var novaPosicao = new google.maps.LatLng(latitude,longitude);
        // mapa.setCenter(novaPosicao);
        // mapa.setZoom(zoom);
    }


})

