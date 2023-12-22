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
                    populaCalculoCte(cte)
                  }else{
                    await preDtcSemCalculo()
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

const populaCalculoCte=async (data)=>{
  populaNfsCalculoCte()
  document.getElementById('tomadorCte').value = "Tomador : "+ data.cte.dtc_fk.tomador.raz_soc;
  document.getElementById('tabelaFreteCte').value = "Tabela Frete : " + (data.cte.tabela_frete.descricao !== undefined ? data.cte.tabela_frete.descricao : "Frete informado");
  document.getElementById('freteCalculado').value = data.cte.freteCalculado;
  document.getElementById('grisNf').value = data.cte.gris;
  document.getElementById('advalorNf').value = data.cte.advalor;
  document.getElementById('despachoNf').value = data.cte.despacho;
  document.getElementById('pedagioNf').value = data.cte.pedagio;
  document.getElementById('outrosNf').value = data.cte.outros;
  document.getElementById('baseCalculoNf').value = data.cte.baseDeCalculo;
  document.getElementById('aliquotaNf').value = data.cte.aliquota;
  document.getElementById('icmsNf').value = data.cte.icmsRS;
  document.getElementById('freteTotalNf').value = data.cte.totalFrete;
  document.getElementById('tipoCalc').value = "0"
  document.getElementById('selecionaTabelaCte').value = "0"
}

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

const confirmacao = async (msg) => {
  return new Promise(async (resolve) => {
    const result = await Swal.fire({
      title: msg,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

