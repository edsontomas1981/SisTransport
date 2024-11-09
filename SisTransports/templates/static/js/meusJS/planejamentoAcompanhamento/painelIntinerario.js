// Função para abrir e fechar o off-canvas
const abrirPainelIntinerario = () => {
    const offcanvas = document.getElementById("offcanvas");
    offcanvas.classList.add("open");  // Abre o painel, adicionando a classe 'open'
};

const fecharPainelIntinerario = async () => {

    const fechaPainel = ()=>{
    const offcanvas = document.getElementById("offcanvas");
        offcanvas.classList.remove("open");  // Fecha o painel, removendo a classe 'open'
    }

    const resetaIconesLista=()=>{
        listaLocais.forEach(element => {
            resetaIcone(element.id)
        });
    }

    if (listaLocais.length ==0){
        fechaPainel()
        listaLocais = []
        limpa_tabelas('tabelaDoctosBody')
        limpaMotoristaPainelIntinerario()
        limpaVeiculoPainelIntinerario()
        limpaTempo()
        limpaDistanciaAPercorrer()
        populaTotaisIntinerario()
        stateMapa.estado = null
        return
    }

    console.log(deepCompareArrays(listaLocais,listaComparacaoListaLocais))
    // Se forem iguais não houve alteração nenhuma e deve somente fechar
    if(deepCompareArrays(listaLocais,listaComparacaoListaLocais)){
        fechaPainel()
        listaLocais = []
        listaComparacaoListaLocais = []
        limpa_tabelas('tabelaDoctosBody')
        limpaMotoristaPainelIntinerario()
        limpaVeiculoPainelIntinerario()
        limpaTempo()
        limpaDistanciaAPercorrer()
        populaTotaisIntinerario()
        stateMapa.estado = null
        return
    }

    // Houve Alteração nao salva se persistir usar a lista de comparacao para atualizar os icones
    if(await msgConfirmacao("Ops! Você fez algumas mudanças, mas ainda não salvou. Se confirmar, perderá tudo. Tem certeza que quer fechar?")){
        carregaIconesUltimaAtualizacao()
        fechaPainel()
        listaLocais = []
        listaComparacaoListaLocais = []
        limpa_tabelas('tabelaDoctosBody')
        limpaMotoristaPainelIntinerario()
        limpaVeiculoPainelIntinerario()
        limpaTempo()
        limpaDistanciaAPercorrer()
        populaTotaisIntinerario()
        stateMapa.estado = null
        return
    };
}; 

const resetaIcone = (idDtc)=>{
    let marcador = mapa.selecionarMarcador('idDtc',idDtc)
    mapa.alterarIconeDoMarcador(marcador,local,iconeSize)     
}

const limpaMotoristaPainelIntinerario = ()=>{
    document.getElementById('cpfMotoristaIntinerario').value = ''
    document.getElementById('nomeMotoristaIntinerario').value = ''
}

const limpaVeiculoPainelIntinerario = ()=>{
    document.getElementById('placaPainelIntinerario').value = ''
    document.getElementById('modeloPainelIntinerario').value = ''
}

const populaTotaisIntinerario=()=>{
    const calculaPeso=()=>{
        let peso = 0
        listaLocais.forEach(e => {
            peso += parseFloat(e.peso)
        });
        return peso
    }

    document.getElementById('quantidadeDocumentos').textContent=`Docs : ${listaLocais.length}`
    document.getElementById('pesoIntinerario').textContent=`Peso : ${arredondarNumero(calculaPeso())}`
}

const populaTempoAproximadoIntinerario = (qtdeDctos,tempo)=>{
    let tempoEmMinutos = parseFloat(tempo)/60
    let tempoAdicionalPorEntregacoleta = parseFloat(qtdeDctos)*15

    document.getElementById('tempoAproximado').textContent=`Tempo : ${arredondarNumero(tempoEmMinutos+tempoAdicionalPorEntregacoleta)} min`
}

const limpaTempo = ()=>{
     document.getElementById('tempoAproximado').textContent=`Tempo : `
}

const populaDistanciaAPercorrer = (distanciaAPercorrerEmMetros)=>{
    let kilometragem = parseFloat(distanciaAPercorrerEmMetros)/1000
    console.log(kilometragem)

    document.getElementById('distanciaAPercorrer').textContent=`Kms : ${arredondarNumero(kilometragem)} kms`
}

const limpaDistanciaAPercorrer = ()=>{
    document.getElementById('distanciaAPercorrer').textContent=`Kms : `
}

const limpaTotaisIntinerario = ()=>{
    document.getElementById('quantidadeDocumentos').textContent=`Docs : `
    document.getElementById('pesoIntinerario').textContent=`Peso : `
}

const carregaIconesUltimaAtualizacao = ()=>{
    listaLocais.forEach(element => {
        resetaIcone(element.id)
    });
    listaComparacaoListaLocais.forEach(element => {
        resetaIcone(element.id)
    });
    listaComparacaoListaLocais.forEach(element => {
        let marcador = mapa.selecionarMarcador('idDtc',element.id)
        mapa.alterarIconeDoMarcador(marcador,iconePreto,iconeSize)
    });
}

const limpaPainelIntinerario = async ()=>{

    const botao = {
        editar: {
        classe: 'btn btn-danger ',
        texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
        callback: removePontoIntinerario
        }
    }

    const removePontoIntinerario = (e)=>{
        // Filtra a lista para remover o item com o ID correspondente
        listaLocais = listaLocais.filter(item => item.id !== e);
        populaTabelaIntinerarios()
        populaTotaisIntinerario()
        resetaIcone(e)
    }

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
    
    if(listaLocais.length === 0){
        limpa_tabelas('tabelaDoctosBody')
        limpaMotoristaPainelIntinerario()
        limpaVeiculoPainelIntinerario()
        limpaTotaisIntinerario()
        return
    }

    if(deepCompareArrays(listaLocais,listaComparacaoListaLocais)){
        alert('sao iguais')
        populaTabelaIntinerarios()
        return
    }

    if(await msgConfirmacao('Um itinerário foi alterado. Todas as informações serão perdidas. Você deseja limpar o formulário?')){
        listaLocais = listaComparacaoListaLocais
        populaTabelaIntinerarios()
        return
    };
}

const tracarRota = async ()=>{
    let listaDeDadosComLocal = mapa.transformaListaEmArrayDePontosDeAtendimento(listaLocais);

    const listaSimplificada = listaDeDadosComLocal.map(local => ({
        lat: local.dados.lat,
        lng: local.dados.lng
    }));

    const url = "/operacional/api/rotas_varios_destinos/";
    dados =  { coordenadas: listaSimplificada,pontoInicial:matriz}

    try {
        const resultado = await connEndpoint(url, dados);

        // Verifique o conteúdo de `resultado.rota.routes[0].segments`
        const coordenadasDaRota = resultado.coordenadas;

        // Passe as `coordenadasDaRota` para `exibirRota` dependendo do que é necessário
        mapa.imprimirRota(coordenadasDaRota); // ou mapa.exibirRota(coordenadasDaRota) se coordenadas simples forem necessárias
        let tempo = resultado.rota.routes[0].summary.duration
        let distanciaAPercorrer = resultado.rota.routes[0].summary.distance
        populaDistanciaAPercorrer(distanciaAPercorrer)
        populaTempoAproximadoIntinerario(listaDeDadosComLocal.length,tempo)
    } catch (error) {
        console.error("Erro ao cadastrar itinerário:", error);
    }
}

