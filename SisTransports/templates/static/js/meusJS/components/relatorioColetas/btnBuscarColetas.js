  // Exemplo de função de callback para o botão "Alterar"
const handleAlterar = (id) => {
    console.log(`Botão "Alterar" clicado para o ID ${id}`);
    // Adicione a lógica desejada para o botão "Alterar"
  };
  
  // Exemplo de função de callback para o botão "Remover"
  const handleRemover = (id) => {
    console.log(`Botão "Remover" clicado para o ID ${id}`);
    // Adicione a lógica desejada para o botão "Remover"
  };
  // Certifique-se de que 'botoes' esteja no escopo correto
var botoes = {
  imprimir: {
    classe: "btn-inverse-primary text-white",
    texto: '<i class="fa fa-print" aria-hidden="true"></i>',
    callback: handleAlterar
  }
};
  
// Exemplo de uso
let btnBuscarColetas = document.getElementById('buscarColetas');
btnBuscarColetas.addEventListener('click', () => {
  const dados = generateRandomData();
  // Página atual e itens por página podem ser ajustados conforme necessário
  popula_tbody_paginacao("navegacaoPaginacao","relatorioColetas", dados, botoes, 1, 10);
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

const dados = generateRandomData();