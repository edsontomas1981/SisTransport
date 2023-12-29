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
            exibirCotacoes()
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

function exibirCotacoes() {
  // Lista de cotações
  const cotacoes = [
    { cotacao: 1001, volumes: 1, peso: 100, valorNf: 1100.00, valorCotacao: 110.00 },
    { cotacao: 1002, volumes: 2, peso: 200, valorNf: 2200.00, valorCotacao: 220.00 },
    { cotacao: 1003, volumes: 3, peso: 300, valorNf: 3300.00, valorCotacao: 330.00 },
    { cotacao: 1004, volumes: 4, peso: 400, valorNf: 4400.00, valorCotacao: 440.00 },
    { cotacao: 1005, volumes: 5, peso: 500, valorNf: 5500.00, valorCotacao: 550.00 },
    { cotacao: 1006, volumes: 6, peso: 600, valorNf: 6600.00, valorCotacao: 660.00 },
    { cotacao: 1007, volumes: 7, peso: 700, valorNf: 7700.00, valorCotacao: 770.00 },
    { cotacao: 1008, volumes: 8, peso: 800, valorNf: 8800.00, valorCotacao: 880.00 },
    { cotacao: 1009, volumes: 9, peso: 900, valorNf: 9900.00, valorCotacao: 990.00 }
  ];

  // Criar tabela HTML
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-sm'); // Adicione mais de uma classe à tabela

  table.innerHTML = `
    <thead>
      <tr>
        <th>Cotação</th>
        <th>Volumes</th>
        <th>Peso</th>
        <th>Valor Nf</th>
        <th>Valor Cotação</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${cotacoes.map((cotacao, index) => `
        <tr>
          <td>${cotacao.cotacao}</td>
          <td>${cotacao.volumes}</td>
          <td>${cotacao.peso}</td>
          <td>${cotacao.valorNf}</td>
          <td>${cotacao.valorCotacao}</td>
          <td><button class="btn btn-primary text-white form-control-sm" onclick="selecionarCotacao(${index})">Add</button></td>
        </tr>
      `).join('')}
    </tbody>
  `;

  // Opções do alerta
  const options = {
    title: 'Selecione uma Cotação',
    html: table,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Selecionar'
  };

  // Exibe o alerta
  Swal.fire(options).then((result) => {
    if (result.isConfirmed) {
      const selectedCotacao = cotacoes[result.value];
      Swal.fire(`Você selecionou a Cotação ${selectedCotacao.cotacao} - Valor: ${selectedCotacao.valorCotacao}`);
    }
  });
}

// Função para lidar com a seleção da cotação
function selecionarCotacao(index) {
  const cotacoes = [
    { cotacao: 1001, volumes: 1, peso: 100, valorNf: 1100.00, valorCotacao: 110.00 },
    { cotacao: 1002, volumes: 2, peso: 200, valorNf: 2200.00, valorCotacao: 220.00 },
    { cotacao: 1003, volumes: 3, peso: 300, valorNf: 3300.00, valorCotacao: 330.00 },
    { cotacao: 1004, volumes: 4, peso: 400, valorNf: 4400.00, valorCotacao: 440.00 },
    { cotacao: 1005, volumes: 5, peso: 500, valorNf: 5500.00, valorCotacao: 550.00 },
    { cotacao: 1006, volumes: 6, peso: 600, valorNf: 6600.00, valorCotacao: 660.00 },
    { cotacao: 1007, volumes: 7, peso: 700, valorNf: 7700.00, valorCotacao: 770.00 },
    { cotacao: 1008, volumes: 8, peso: 800, valorNf: 8800.00, valorCotacao: 880.00 },
    { cotacao: 1009, volumes: 9, peso: 900, valorNf: 9900.00, valorCotacao: 990.00 }
  ];

  const selectedCotacao = cotacoes[index];
  console.log('Cotação selecionada:', selectedCotacao);
  // Aqui você pode fazer o que quiser com a cotação selecionada
  // Por exemplo, adicionar a cotação a uma lista ou enviar para o servidor
}

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

