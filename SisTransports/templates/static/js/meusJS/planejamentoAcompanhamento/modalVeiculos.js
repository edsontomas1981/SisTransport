

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

const constroeModalVeiculosPlanejamento = async (element) => {
	console.log(element);

	let endereco = await transformaCoordenadasEmEndereco({lat: element.lat, lng: element.lng});
	let containerTituloModalVeiculos = document.getElementById("modalVeiculoId");
	limpaContainers("modalVeiculoId");
	limpa_tabelas('tbodyDocumentos');

	let titulo = document.createElement('h4');
	titulo.textContent = `Motorista: ${element.motorista}`;
	containerTituloModalVeiculos.appendChild(titulo);

	let subTitulo = document.createElement('h5');
	let placa = element.placa;
	subTitulo.id = 'subTitulo';
	subTitulo.dataset.id = placa;
	subTitulo.dataset.lat =element.lat;
	subTitulo.dataset.lng=element.lng;
	subTitulo.textContent = `Placa: ${placa}`;
	containerTituloModalVeiculos.appendChild(subTitulo);

	// Criar elemento para exibir o endereço e adicionar o texto do endereço
	let enderecoH6 = document.createElement('h6');
	enderecoH6.id = 'enderecoH6';  // Corrige o id para string
	enderecoH6.textContent = `Ultima Localização : ${endereco}`;  // Define o endereço como texto
	containerTituloModalVeiculos.appendChild(enderecoH6);

	let botoes = {
		mostrar: {
			classe: "btn-success text-white",
			texto: '<i class="fa fa-print" aria-hidden="true"></i>',
			callback: sendMessage
		},
		excluir: {
			classe: "btn-danger text-white",
			texto: '<i class="fa fa-print" aria-hidden="true"></i>',
			// callback: enviarMensagemWebSocket
		}
	};

	if (element.jobs) {
		popula_tbody("tbodyDocumentos", element.jobs, botoes, false);
	}

	openModal('modalPlanejamentoVeiculos');
};
