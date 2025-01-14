document.addEventListener('DOMContentLoaded', function () {
    const dados = JSON.parse(sessionStorage.getItem('buscaResultados'));
    console.log(dados.id_documento_busca)

    document.getElementById('titulo-busca').textContent = (`Pesquisa por ${dados.id_documento_busca}`)

		if(dados.coletas.length>0){
			populaTabelaBusca(dados.coletas,'divTabelaBuscaColetas','buscaColetasTbody','Coletas')
		}   
    if(dados.ctes.length>0){
			populaTabelaBusca(dados.ctes,'divTabelaBuscaCtes','buscaCteTbody',"CTE'S")
    }
    if(dados.dtcs.length>0){
			populaTabelaBusca(dados.dtcs,'divTabelaBuscaDtc','buscaDtcTbody',"DTC'S")
    }
    if(dados.notas.length>0){
			populaTabelaBusca(dados.notas,'divTabelaBuscaNF','buscaColetaTbody','Notas Fiscais')
    }
})

function populaTabelaBusca(dados,divTabela,idTbody,tituloTexto){
	// Verifica se os dados são válidos
	if (!Array.isArray(dados) || dados.length === 0) {
		document.getElementById(divTabela).innerHTML = `
				<h6>Notas Fiscais</h6>
				<p class="text-muted">Nenhuma nota fiscal encontrada.</p>
		`;
		return;
	}

	console.log(dados)

	// Renderiza o cabeçalho e a estrutura básica da tabela
	const tabelaHTML = `
			<h6>${tituloTexto}</h6>
			<table class="table">
					<thead>
							<tr>
									<th scope="col">DTC</th>
									<th scope="col">Nota</th>
									<th scope="col">Emissão</th>
									<th scope="col">Remetente</th>
									<th scope="col">Destinatário</th>
									<th scope="col">Entrega</th>
									<th scope="col">Volumes</th>
									<th scope="col">Peso</th>
									<th scope="col">Valor</th>
							</tr>
					</thead>
					<tbody id="${idTbody}"></tbody>
			</table>
	`;
	document.getElementById(divTabela).innerHTML = tabelaHTML;

	const tabela = document.getElementById(idTbody);

	// Preenche a tabela iterando sobre os dados
	dados.forEach(dado => {
			const linha = document.createElement('tr');
			linha.innerHTML = `
					<td>${dado.dtc || '-'}</td>
					<td>${dado.nota || '-'}</td>
					<td>${dado.emissao || '-'}</td>
					<td>
							<button class="btn btn-link p-0" onclick="mostrarDetalhes('${dado.remetente || 'Informação indisponível'}')">
									${dado.remetente || '-'}
							</button>
					</td>
					<td>
							<button class="btn btn-link p-0" onclick="mostrarDetalhes('${dado.destinatario || 'Informação indisponível'}')">
									${dado.destinatario || '-'}
							</button>
					</td>
					<td>${dado.entrega || '-'}</td>
					<td>${dado.volumes || '-'}</td>
					<td>${dado.peso || '-'}</td>
					<td>${dado.valor || '-'}</td>
			`;
			tabela.appendChild(linha);
	});
}

function populaTabelaBuscaCte(dtc){
    // dados.ctes.forEach(element => {
    //     console.log(element)
    // });      

}
function populaTabelaBuscaColeta(dtc){
    // dados.coletas.forEach(element => {
    //     console.log(element)
    // });    

}

async function populaTabelaBuscaNF(dados) {
	// Verifica se os dados são válidos
	if (!Array.isArray(dados) || dados.length === 0) {
			document.getElementById('divTabelaBuscaNF').innerHTML = `
					<h6>Notas Fiscais</h6>
					<p class="text-muted">Nenhuma nota fiscal encontrada.</p>
			`;
			return;
	}

	// Renderiza o cabeçalho e a estrutura básica da tabela
	const tabelaHTML = `
			<h6>Notas Fiscais</h6>
			<table class="table">
					<thead>
							<tr>
									<th scope="col">DTC</th>
									<th scope="col">Nota</th>
									<th scope="col">Emissão</th>
									<th scope="col">Remetente</th>
									<th scope="col">Destinatário</th>
									<th scope="col">Entrega</th>
									<th scope="col">Volumes</th>
									<th scope="col">Peso</th>
									<th scope="col">Valor</th>
							</tr>
					</thead>
					<tbody id="tabelaBuscaNfs"></tbody>
			</table>
	`;
	document.getElementById('divTabelaBuscaNF').innerHTML = tabelaHTML;

	const tabela = document.getElementById('tabelaBuscaNfs');

	// Preenche a tabela iterando sobre os dados
	dados.forEach(dado => {
			const linha = document.createElement('tr');
			linha.innerHTML = `
					<td>${dado.dtc || '-'}</td>
					<td>${dado.nota || '-'}</td>
					<td>${dado.emissao || '-'}</td>
					<td>
							<button class="btn btn-link p-0" onclick="mostrarDetalhes('${dado.remetente || 'Informação indisponível'}')">
									${dado.remetente || '-'}
							</button>
					</td>
					<td>
							<button class="btn btn-link p-0" onclick="mostrarDetalhes('${dado.destinatario || 'Informação indisponível'}')">
									${dado.destinatario || '-'}
							</button>
					</td>
					<td>${dado.entrega || '-'}</td>
					<td>${dado.volumes || '-'}</td>
					<td>${dado.peso || '-'}</td>
					<td>${dado.valor || '-'}</td>
			`;
			tabela.appendChild(linha);
	});
}


function mostrarDetalhes(id) {
    // Aqui você pode implementar a lógica para mostrar os detalhes do remetente ou destinatário
    alert(`Mostrar detalhes para ${id}`);
}