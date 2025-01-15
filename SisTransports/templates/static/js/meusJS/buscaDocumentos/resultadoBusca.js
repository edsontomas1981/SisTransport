document.addEventListener('DOMContentLoaded', function () {
    const dados = JSON.parse(sessionStorage.getItem('buscaResultados'));
    console.log(dados.id_documento_busca)

    document.getElementById('titulo-busca').textContent = (`Pesquisa por ${dados.id_documento_busca}`)

	if(dados.coletas.length>0){
			let tituloColetas = ['Nº Coleta','DTC','Dt Emissão','Dt Saída','Remetente','Destinatário','Volumes','Peso','Valor R$']
			let dadosColetas = preparaDadosColeta(dados.coletas)
			populaTabelaBusca(dadosColetas,'divTabelaBuscaColetas',tituloColetas,'buscaColetasTbody','Coletas')
	}   
    if(dados.ctes.length>0){
			populaTabelaBusca(dados.ctes,'divTabelaBuscaCtes','buscaCteTbody',"CTE'S")
    }
    if(dados.dtcs.length>0){
			let tituloDtcs = ['Nº Dtc','Saída','Remetente','Destinatário','Emissão','Volumes','Peso','R$']
			populaTabelaBusca(dados.dtcs,'divTabelaBuscaDtc',tituloDtcs,'buscaDtcTbody',"DTC'S")
    }
    if(dados.notas.length>0){
			populaTabelaBusca(dados.notas,'divTabelaBuscaNF','buscaColetaTbody','Notas Fiscais')
    }
})

/**
 * Popula uma tabela com base em dados e títulos fornecidos.
 * @param {Array} dados - Array de objetos contendo os dados a serem exibidos na tabela.
 * @param {string} divTabela - ID do elemento onde a tabela será inserida.
 * @param {Array} titulos - Lista com os títulos das colunas na ordem em que serão exibidos.
 * @param {string} idTbody - ID do elemento tbody onde as linhas serão adicionadas.
 * @param {string} tituloTexto - Título exibido acima da tabela.
 */
function populaTabelaBusca(dados, divTabela, titulos, idTbody, tituloTexto) {
    // Verifica se os dados são válidos
    if (!Array.isArray(dados) || dados.length === 0) {
        document.getElementById(divTabela).innerHTML = `
            <h6>${tituloTexto}</h6>
            <p class="text-muted">Nenhum registro encontrado.</p>
        `;
        return;
    }

    // Renderiza o cabeçalho e a estrutura básica da tabela
    const colunas = titulos.map(titulo => `<th scope="col">${titulo}</th>`).join('');
    const tabelaHTML = `
        <div class="badge badge-primary badge-pill mt-3 mb-3">${tituloTexto}</div>
        <table class="table table-striped table-hover table-sm">
            <thead>
                <tr>${colunas}</tr>
            </thead>
            <tbody id="${idTbody}"></tbody>
        </table>
    `;
    document.getElementById(divTabela).innerHTML = tabelaHTML;

    const tabela = document.getElementById(idTbody);

    // Preenche a tabela iterando sobre os dados
    dados.forEach(dado => {
		console.log(dado)
        const linha = document.createElement('tr');
		
        linha.innerHTML = titulos
            .map(titulo => `<td>${dado[titulo.toLowerCase()] || '-'}</td>`) // Converte o título para minúsculas como chave
            .join('');
        tabela.appendChild(linha);
    });
}



function mostrarDetalhes(id) {
    // Aqui você pode implementar a lógica para mostrar os detalhes do remetente ou destinatário
    alert(`Mostrar detalhes para ${id}`);
}

function preparaDadosColeta (dados) {
	console.log(dados[0].dtc.coleta.id+'')
	return[{
		"Nº Coleta": dados[0].dtc.coleta.id+'',
		"dtc": dados[0].dtc.id,
		// "dataColeta": dado.coleta.data ? dado.coleta.data:null,
		"emissao": dados[0].dtc.data_cadastro,
		"remetente": dados[0].dtc.remetente.raz_soc,
		"destinatario": dados[0].dtc.destinatario.raz_soc,
		"volumes": dados[0].volumes,
		"peso": dados[0].peso,
		// "valor": dado.coleta.valor
	}]

    const dadosColeta = dados.map((dado) => {
		console.log(dado)
        return {
            "Nº Coleta": dado.dtc.coleta.id,
            "dtc": dado.dtc.id,
            // "dataColeta": dado.coleta.data ? dado.coleta.data:null,
            "emissao": dado.dtc.data_cadastro,
            "remetente": dado.dtc.remetente.raz_soc,
            "destinatario": dado.dtc.destinatario.raz_soc,
            "volumes": dado.volumes,
            "peso": dado.peso,
            // "valor": dado.coleta.valor
        };
    });
    return dadosColeta;
}