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
            console.log(element.id)
            resetaIcone(element.id)
        });
    }

    if (listaLocais.length ==0){
        fechaPainel()
        stateMapa.estado = null
        listaLocais = []
        limpa_tabelas('tabelaDoctosBody')
        populaTotaisIntinerario()
        return
    }

    if(await msgConfirmacao('Um itinerário foi iniciado. Todas as informações serão perdidas. Você deseja fechar?')){
        fechaPainel()
        resetaIconesLista()
        listaLocais = []
        // Atualiza a tabela somente após a confirmação
        limpa_tabelas('tabelaDoctosBody')
        populaTotaisIntinerario()
        stateMapa.estado = null
        return
    };
}; 

const resetaIcone = (idDtc)=>{
    let marcador = mapa.selecionarMarcador('idDtc',idDtc)
    mapa.alterarIconeDoMarcador(marcador,local,iconeSize)     
}