
const imprimirColetaUnica = (element)=>{
  conectar('/operacional/printColetas/',[{'id':element}])
}

// Certifique-se de que 'botoes' esteja no escopo correto
var botoes = {
  imprimir: {
    classe: "btn-warning text-white",
    texto: '<i class="fa fa-print" aria-hidden="true"></i>',
    callback: imprimirColetaUnica
  }
};

const obterValoresCampos = () => {
  return {
    dataInicial: $('#dataInicial').val(),
    dataFinal: $('#dataFinal').val(),
    filtrar: $('#filtrar').val(),
    rota: $('#rotasRelatorioColetas').val(),
    ordenarPor: $('#ordernarPor').val()
  };
};

const realizarConexao = async (data) => {
  const conexao = new Conexao('/operacional/readColetasGeral/', data);
  try {
    return await conexao.sendPostRequest();
  } catch (error) {
    console.error(error);
  }
};

const getColetasPorData = async () => {
  const data = obterValoresCampos();
  return await realizarConexao(data);
};


const preparaDadosTbody = (dados) => {
  if (!dados || typeof dados.coletas === 'undefined') {
    console.error('Objeto de dados ou a propriedade coletas é indefinida.');
    return [];
  }
  let dadosColeta = [];

  const arrayColetas = Object.values(dados.coletas);

  arrayColetas.forEach(element => {
    let dictColeta = {};
  
    // Verificações contra possíveis dados vazios
    dictColeta.id = element.id ? element.id : null;
  
    dictColeta.dataColeta = element.data_cadastro ? formataDataPtBr(element.data_cadastro) : null;
    dictColeta.remetente = element.remetente ? truncateString(element.remetente.raz_soc, 20) : null;
    dictColeta.destinatario = element.destinatario ? truncateString(element.destinatario.raz_soc, 20) : null;
    dictColeta.volume = element.coleta ? element.coleta.volume : null;
    dictColeta.peso = element.coleta ? element.coleta.peso : null;
    dictColeta.valor = element.coleta ? element.coleta.valor : null;
  
    // Verificações para dados do destinatário
    if (element.destinatario && element.destinatario.endereco_fk) {
      dictColeta.localColeta = truncateString(element.destinatario.endereco_fk.bairro,12) + ' - ' + truncateString(element.destinatario.endereco_fk.cidade) + ' - ' + element.destinatario.endereco_fk.uf;
    } else {
      dictColeta.localColeta = null;
    }
  
    dadosColeta.push(dictColeta);
  });

  return dadosColeta;
};

// Exemplo de uso
let btnBuscarColetas = document.getElementById('buscarColetas');
btnBuscarColetas.addEventListener('click', async () => {
  const dados = await getColetasPorData()
  const cmbQtdePorPagina = document.getElementById('qtdePorPagina');
  const qtdePorPagina = cmbQtdePorPagina.options[cmbQtdePorPagina.selectedIndex].textContent;
  popula_tbody_paginacao("navegacaoPaginacao","relatorioColetas",preparaDadosTbody(dados), botoes, 1, qtdePorPagina,true,false); 
});


