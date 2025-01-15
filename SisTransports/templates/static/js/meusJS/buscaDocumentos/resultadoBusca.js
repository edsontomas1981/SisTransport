document.addEventListener('DOMContentLoaded', async function () {
    const dados = JSON.parse(sessionStorage.getItem('buscaResultados'));
    console.log(dados.id_documento_busca)

    document.getElementById('titulo-busca').textContent = (`Pesquisa por ${dados.id_documento_busca}`)

	if(dados.coletas.length>0){
			let tituloColetas = ['Nº Coleta','DTC','Dt Emissão','Dt Saída','Remetente',
                                'Destinatário','Volumes','Peso','Valor R$','Observação']
			let dadosColetas = preparaDadosColeta(dados.coletas)
			populaTabelaBusca(dadosColetas,'divTabelaBuscaColetas',tituloColetas,'buscaColetasTbody','Coletas')
	}   
    if(dados.dtcs.length>0){
            let tituloDtcs = ['Nº Dtc',"NF's",'Data Cadastro','Remetente','Destinatário','Volumes','Peso','R$']
            let dadosDtcs = await  preparaDadosDtc(dados.dtcs) 
            populaTabelaBusca(dadosDtcs,'divTabelaBuscaDtc',tituloDtcs,'buscaDtcTbody',"DTC'S")
    }
    if(dados.ctes.length>0){
        let tituloCtes = ['Nº CT-e','DTC','Dt Emissão','Remetente',
                        'Destinatário','Volumes','Peso','Valor R$']
        let dadosCtes = await preparaDadosCtes(dados.ctes)
        populaTabelaBusca(dadosCtes,'divTabelaBuscaCtes',tituloCtes,'buscaCteTbody',"CTE'S")
    }
    if(dados.notas.length>0){
        let tituloNotas = ['Nota Fiscal Nº','DTC','Dt Emissão','Remetente',
                           'Destinatário','Volumes','Peso','Valor R$']
        let dadosNotas = preparaDadosNotas(dados.notas)

        console.log(dadosNotas)
        populaTabelaBusca(dadosNotas,'divTabelaBuscaNF',tituloNotas,'buscaColetaTbody','Notas Fiscais')
    }
})

/**
 * Popula uma tabela com base em dados e títulos fornecidos.
 * @param {Array} dadosTabela - Array de objetos contendo os dados a serem exibidos na tabela.
 * @param {string} divTabela - ID do elemento onde a tabela será inserida.
 * @param {Array} titulos - Lista com os títulos das colunas na ordem em que serão exibidos.
 * @param {string} idTbody - ID do elemento tbody onde as linhas serão adicionadas.
 * @param {string} tituloTexto - Título exibido acima da tabela.
 */
function populaTabelaBusca(dadosTabela, divTabela, titulos, idTbody, tituloTexto) {
    console.log(dadosTabela);
    if (!Array.isArray(dadosTabela) || dadosTabela.length === 0) {
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

    let htmlTbody = '';
    dadosTabela.forEach(element => {
        htmlTbody += '<tr>';
        element.forEach(e => {
            htmlTbody += `<td>${e}</td>`;
        });
        htmlTbody += '</tr>';
    });

    const tbody = document.getElementById(idTbody);
    tbody.innerHTML = htmlTbody;
}





function mostrarDetalhes(id) {
    // Aqui você pode implementar a lógica para mostrar os detalhes do remetente ou destinatário
    alert(`Mostrar detalhes para ${id}`);
}

/**
 * Prepara os dados brutos de coleta para exibição na tabela.
 * @param {Array} dadosBrutosColeta - Dados brutos contendo informações de coletas e DTCs.
 * @returns {Array} Lista de objetos formatados para exibição na tabela.
 */
function preparaDadosColeta(dadosBrutosColeta) {
    return dadosBrutosColeta.map(dado => {
        console.log(dado)
        const coleta = dado.coletas;
        const dtc = dado.dtc;

        const id = coleta.id;
        const dtcId = dtc.id;
        const dataEmissao = formataDataPtBr(dtc.data_cadastro);
        const dataSaida = formataDataPtBr(coleta.data);
        const remetente = truncateString(dtc.remetente.raz_soc, 15);
        const destinatario = truncateString(dtc.destinatario.raz_soc, 15);
        const volumes = coleta.volume;
        const peso = coleta.peso;
        const valor = coleta.valor;
        const observacao = truncateString(coleta.observacao, 10);
        return [id, dtcId, dataEmissao, dataSaida, remetente, destinatario, volumes, peso, valor,observacao];
    });
}


/**
 * Prepara os dados brutos de coleta para exibição na tabela.
 * @param {Array} dadosBrutosDtc - Dados brutos contendo informações de coletas e DTCs.
 * @returns {Promise<Array>} Lista de objetos formatados para exibição na tabela.
 */
async function preparaDadosDtc(dadosBrutosDtc) {
    // Aguarda a resolução de todas as promessas criadas dentro do `map`
    const dadosFormatados = await Promise.all(
        dadosBrutosDtc.map(async (dado) => {
            console.log(dado);
            let volumes =0
            let peso = 0
            let valor = 0
            // Obtém os dados de notas fiscais para o DTC atual
            let dadosNfs = await calculaTotalNfsUtils(dado.id);

            const dtcId = dado.id;
            const notas = geraTextoNfUtils(dado.notas_fiscais);
            const dataEmissao = formataDataPtBr(dado.data_cadastro);
            const remetente = truncateString(dado.remetente.raz_soc, 15);
            const destinatario = truncateString(dado.destinatario.raz_soc, 15);
            if (dadosNfs){
                volumes = dadosNfs.volumes || 0;
                peso = dadosNfs.peso || 0 ;
                valor = dadosNfs.vlrNf || 0;
            }

            return [
                dtcId,
                notas,
                dataEmissao,
                remetente,
                destinatario,
                volumes,
                peso,
                valor,
            ];
        })
    );

    return dadosFormatados;
}

/**
 * Prepara os dados brutos de CT-es para exibição na tabela.
 * @param {Array} dadosBrutosCte - Dados brutos contendo informações de CT-es e DTCs.
 * @returns {Promise<Array>} Lista de objetos formatados para exibição na tabela.
 */
async function preparaDadosCtes(dadosBrutosCte) {
    // Aguarda a resolução de todas as promessas criadas dentro do `map`
    const dadosFormatados = await Promise.all(
        dadosBrutosCte.map(async (dado) => {

            // Obtém os dados de notas fiscais para o DTC atual
            const dadosNfs = await calculaTotalNfsUtils(dado.dtc.id);
            // Inicializa valores padrão
            let volumes = 0;
            let peso = 0;
            let valor = 0;

            // Extrai informações de CT-e e DTC
            const cte = dado.ctes;
            const dtc = dado.dtc;

            const id = cte.id;
            const dtcId = dtc.id;
            const dataEmissao = formataDataPtBr(cte.data_cadastro);
            const remetente = truncateString(dtc.remetente.raz_soc, 15);
            const destinatario = truncateString(dtc.destinatario.raz_soc, 15);

            // Atualiza os valores se os dados de notas fiscais estiverem disponíveis
            if (dadosNfs) {
                volumes = dadosNfs.volumes || 0;
                peso = dadosNfs.peso || 0;
                valor = dadosNfs.vlrNf || 0;
            }

            return [id, dtcId, dataEmissao, remetente, destinatario, volumes, peso, valor];
        })
    );

    return dadosFormatados;
}

/**
 * Prepara os dados brutos de coleta para exibição na tabela.
 * @param {Array} dadosBrutosNf - Dados brutos contendo informações de coletas e DTCs.
 * @returns {Array} Lista de objetos formatados para exibição na tabela.
 */
function preparaDadosNotas(dadosBrutosNf) {
    return dadosBrutosNf.map(dado => {
        const nota = dado.nota;
        const dtc = dado.dtc;
        const num_nf = nota.num_nf;
        const dtcId = dtc.id;
        const dataCadastro = formataDataPtBr(nota.data_cadastro);
        const remetente = truncateString(dtc.remetente.raz_soc, 15);
        const destinatario = truncateString(dtc.destinatario.raz_soc, 15);
        const volumes = nota.volume;
        const peso = nota.peso;
        const valor = nota.valor_nf;
        return [num_nf, dtcId, dataCadastro, remetente, destinatario, volumes, peso, valor];
    });
}



