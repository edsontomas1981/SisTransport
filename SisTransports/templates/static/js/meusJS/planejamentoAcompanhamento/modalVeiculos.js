

// Função para enviar mensagem ao servidor WebSocket
function sendMessage(message = 'get_active_users') {
    var usuario = 'teste';       // Substitua pelo identificador do seu usuário

    // Verificar se a variável 'socket' está definida e é uma instância válida de WebSocket
    if (socket.readyState === WebSocket.OPEN) {
        // Enviar mensagem ao servidor WebSocket
        socket.send(JSON.stringify({
            'message': message,
            'usuario': usuario,

        }));
    } else {
        console.error('Erro: Conexão WebSocket não está aberta.');
    }
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
          callback: sendMessage
      },
      excluir: {
          classe: "btn-danger text-white",
          texto: '<i class="fa fa-print" aria-hidden="true"></i>',
        //   callback: enviarMensagemWebSocket
      }
  };

  popula_tbody("tbodyDocumentos", element.dados, botoes, false);
  openModal('modalPlanejamentoVeiculos');
};
