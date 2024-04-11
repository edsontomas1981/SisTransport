// Controla o comportamento das tabs
let tabs = document.querySelectorAll('.nav-link');

// Adiciona um ouvinte de evento para cada guia
tabs.forEach(tab => {
  tab.addEventListener('click', async () => {
      // Obtém o ID do conteúdo da guia associado
      let tabContentId = tab.getAttribute('aria-controls');
      switch (tabContentId) {
          case 'pills-dtc':
            break;
          case 'pills-coleta':
            break;  
          case 'pills-cotacao':
            break;
          case 'pills-nf':
              limpaNf();
              break;
          case 'pills-calculoFrete':
            calculoSemDiv()
            populaOrigemDtc()
            carregaDestino()
            loadDivTipoCte()
            populaNumNfs()
            populaTomadorCte()
            carregaEmissores()
            limpaFreteCte() 
            let nf = await loadNfs();
            if (nf === undefined){
              preDtcSemNf()
            }else{
              switch (nf.status) {
                case 300:
                  preDtcSemNf()
                  break;
                case 200:
                  let cte =await buscaCte()
                  if (cte.status === 200){
                    await preDtcCalculado()
                    populaCalculoCte(cte.cte)
                  }else{
                    await preDtcSemCalculo()
                    exibirCotacoes()
                    populaTotaisNaTabelaNfCte()
                  }
                  break;
                default:
                  break;
              }
            }
            case 'pills-rastreamento':
                break;
            default:
              break;
      }
  });
});

const populaCalculoCte = async (data) => {
  populaNfsCalculoCte();
  document.getElementById('tomadorCte').value = "Tomador : " + (data.dtc_fk.tomador.raz_soc || "N/A");
  document.getElementById('tabelaFreteCte').value = "Tabela Frete : " + (data.tabela_frete.descricao !== undefined ? data.tabela_frete.descricao : "Frete informado");
  document.getElementById('freteCalculadoCte').value = (data.freteCalculado) || 0;
  document.getElementById('grisCte').value = parseFloat(data.gris).toFixed(2) || 0;
  document.getElementById('advalorCte').value = parseFloat(data.advalor).toFixed(2) || 0;
  document.getElementById('despachoCte').value = parseFloat(data.despacho).toFixed(2) || 0;
  document.getElementById('pedagioCte').value = parseFloat(data.pedagio).toFixed(2) || 0;
  document.getElementById('outrosCte').value = parseFloat(data.outros).toFixed(2) || 0;
  document.getElementById('baseCalculoCte').value = parseFloat(data.baseDeCalculo).toFixed(2) || 0;
  document.getElementById('aliquotaCte').value = parseFloat(data.aliquota ).toFixed(2)|| 0;
  document.getElementById('icmsCte').value = parseFloat(data.icmsRS).toFixed(2) || 0;
  document.getElementById('freteTotalCte').value = parseFloat(data.totalFrete).toFixed(2) || 0;
  document.getElementById('tipoCalc').value = "0";
  document.getElementById('selecionaTabelaCte').value = "0";
  document.getElementById('coletaCte').value = parseFloat(data.vlrColeta).toFixed(2) || 0;
  document.getElementById('emissoraCte').value = parseInt(data.emissora_cte) || 1;
  document.getElementById('origemCte').value = parseInt(data.origem_cte) || 1;
  document.getElementById('cfopCte').value = parseInt(data.cfop_cte) || 0;
  document.getElementById('redespCte').value = parseInt(data.redesp_cte) || '';
  document.getElementById('observacaoCte').value = data.observacao || '';

};

const limpaCalculoCte = async () => {
  populaNfsCalculoCte();
  populaTomadorCte();
  // carregaEmissores();
  populaOrigemDtc();
  populaNumNfs();
  carregaDestino();
  document.getElementById('tabelaFreteCte').value = "Tabela Frete : "
  document.getElementById('freteCalculadoCte').value = "";
  document.getElementById('grisCte').value = ""
  document.getElementById('advalorCte').value = ""
  document.getElementById('despachoCte').value = ""
  document.getElementById('pedagioCte').value = ""
  document.getElementById('outrosCte').value = ""
  document.getElementById('baseCalculoCte').value = ""
  document.getElementById('aliquotaCte').value = ""
  document.getElementById('icmsCte').value = ""
  document.getElementById('freteTotalCte').value = ""
  document.getElementById('tipoCalc').value = "0";
  document.getElementById('selecionaTabelaCte').value = "0";
  document.getElementById('coletaCte').value = ""
  document.getElementById('cfopCte').value = 1
  document.getElementById('redespCte').value = ""


};

const populaNfsCalculoCte=async()=>{
  let nfs=await loadNfs()
  let totaisNfs =await calculaTotalNfs()
  document.getElementById('nfCte').value = geraTextoNf(nfs);
  populaTotaisNfs(totaisNfs)
}

/**
 * Gera um texto formatado representando números de notas fiscais ou intervalos de notas consecutivas.
 * @param {Object} nfs - Um objeto contendo uma propriedade 'nfs', que é uma matriz de objetos de notas fiscais.
 * @returns {string} - Uma string formatada contendo os números das notas fiscais ou intervalos de notas.
 */
const geraTextoNf = (nfs) => {
  console.log(nfs)
  let notasFiscais = "";
  const numNfs = nfs.nfs.length;

  let startRange = null;
  let prevNumNf = null;

  nfs.nfs.forEach((element, index) => {
    const numNf = parseInt(element.num_nf); 

    if (startRange === null) {
      startRange = numNf;
    }

    if (prevNumNf !== null && numNf !== prevNumNf + 1) {
      if (startRange === prevNumNf) {
        notasFiscais += `${startRange}/`;
      } else {
        notasFiscais += `${startRange} à ${prevNumNf}/`;
      }
      startRange = numNf;
    }

    prevNumNf = numNf;

    if (index === numNfs - 1) {
      if (startRange === numNf) {
        notasFiscais += `${startRange}`;
      } else {
        notasFiscais += `${startRange} à ${numNf}`;
      }
    }
  });
  return notasFiscais;
};