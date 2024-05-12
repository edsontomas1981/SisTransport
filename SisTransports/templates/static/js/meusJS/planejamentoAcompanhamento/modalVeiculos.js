const testeWebsocket = () => {
  var socket = new WebSocket('ws://127.0.0.1:8000/operacional/ws/some_url/');
  
  socket.onopen = function(event) {
      console.log('Conexão WebSocket aberta.');

      // Aguarda um curto período de tempo antes de enviar dados
      setTimeout(() => {
          socket.send(JSON.stringify({
              'message': 'Olá, servidor WebSocket!'
          }));
      }, 1000); // Delay de 1 segundo (1000 milissegundos)
  };

  socket.onmessage = function(event) {
      var data = JSON.parse(event.data);
      console.log('Mensagem recebida:', data.message);
  };

  socket.onclose = function(event) {
      console.log('Conexão WebSocket fechada.');
  };

  socket.onerror = function(error) {
      console.error('Erro na conexão WebSocket:', error);
  };

  socket.send('Opa Testando')
};


function enviarMensagemWebSocket(mensagem = 'sei la enviando qq coisa') {
  // URL do WebSocket
  var websocketURL = 'ws://127.0.0.1:8000/operacional/ws/some_url/';

  // Criação da instância WebSocket
  var socket = new WebSocket(websocketURL);

  // Evento de abertura da conexão WebSocket
  socket.onopen = function(event) {
      console.log('Conexão WebSocket aberta.');

      // Aguarda um curto período de tempo antes de enviar dados
      setTimeout(() => {
          socket.send(JSON.stringify({
              'message': mensagem
          }));
      }, 1000); // Delay de 1 segundo (1000 milissegundos)
  };

  // Evento de recebimento de mensagem WebSocket
  socket.onmessage = function(event) {
      var data = JSON.parse(event.data);
      console.log('Mensagem recebida:', data.message);
  };

  // Evento de fechamento da conexão WebSocket
  socket.onclose = function(event) {
      console.log('Conexão WebSocket fechada.');
  };

  // Evento de erro na conexão WebSocket
  socket.onerror = function(error) {
      console.error('Erro na conexão WebSocket:', error);
  };

  // Envio de mensagem diretamente na função (opcional)
  // socket.send('Opa Testando');
}


const constroeModalVeiculosPlanejamento = (element) => {
  let containerTituloModalVeiculos = document.getElementById("modalVeiculoId");
  limpaContainers("modalVeiculoId");

  let titulo = document.createElement('h4');
  titulo.textContent = `Motorista: ${element.motorista}`;
  containerTituloModalVeiculos.appendChild(titulo);

  let subTitulo = document.createElement('h5');
  let placa = element.placa;
  subTitulo.id = 'subTitulo';
  subTitulo.dataset.id = placa;
  subTitulo.textContent = `Placa: ${placa}`;
  containerTituloModalVeiculos.appendChild(subTitulo);

  let botoes = {
      mostrar: {
          classe: "btn-success text-white",
          texto: '<i class="fa fa-print" aria-hidden="true"></i>',
          callback: testeWebsocket
      },
      excluir: {
          classe: "btn-danger text-white",
          texto: '<i class="fa fa-print" aria-hidden="true"></i>',
          callback: enviarMensagemWebSocket
      }
  };

  popula_tbody("tbodyDocumentos", element.dados, botoes, false);
  openModal('modalPlanejamentoVeiculos');
};
