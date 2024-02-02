var botoes = {
  imprimir: {
    classe: "btn-warning text-white",
    texto: '<i class="fa fa-print" aria-hidden="true imprimirColetaUnica"></i>',
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
  popula_tbody_paginacao("navegacaoPaginacao","relatorioColetas",preparaDadosTbody(dados), botoes, 1, qtdePorPagina);
});

const generateRandomData = () => {
  const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const randomDecimal = (min, max, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round((Math.random() * (max - min) + min) * factor) / factor;
  };

  const randomCity = () => {
    const cities = ["Guarulhos-SP", "São Paulo-SP", "Rio de Janeiro-RJ", "Belo Horizonte-MG", "Porto Alegre-RS", "Curitiba-PR", "Recife-PE", "Fortaleza-CE", "Salvador-BA", "Manaus-AM", "Campinas-SP"];
    return cities[Math.floor(Math.random() * cities.length)];
  };

  const data = [];

  for (let i = 1; i <= 50; i++) {
    const record = {
      numero: i + 191,
      data: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)).toLocaleDateString(),
      remetente: `Remetente ${i}`,
      destinatario: `Destinatario ${i}`,
      quantidade: randomInt(5, 30),
      peso: `${randomDecimal(100, 500, 2)} Kgs`,
      valor: `R$ ${randomDecimal(500, 3000, 2)}`,
      cidade: randomCity()
    };

    data.push(record);
  }

  return data;
};

// Suponha que você tenha um elemento com a classe "seu-elemento" ao qual deseja adicionar o evento
const seuElemento = document.querySelector('.imprimirColetaUnica');

// Adicione o evento onclick usando a lógica fornecida
seuElemento.onclick = () => {
    const dataId = seuElemento.getAttribute('data-id');
    conectar('/operacional/printColetas/', [{'id': dataId}]);
    console.log(`Clicado para o ID ${dataId}`);
};


