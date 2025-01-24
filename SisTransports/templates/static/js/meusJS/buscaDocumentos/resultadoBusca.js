/**
 * Evento principal que é disparado quando o DOM é totalmente carregado.
 * Processa os dados armazenados em `sessionStorage` e popula tabelas com informações relacionadas.
 */
document.addEventListener('DOMContentLoaded', async function () {

    // Recupera os dados armazenados no sessionStorage
    const dados = JSON.parse(sessionStorage.getItem('buscaResultados'));

    // Define o título da busca com base no ID do documento
    document.getElementById('titulo-busca').textContent = `Pesquisa por ${dados.id_documento_busca}`;

    // Verifica e processa coletas
    if (dados.coletas.length > 0) {
        const tituloColetas = ['Nº Coleta', 'DTC', 'Dt Emissão', 'Dt Saída', 'Remetente', 'Destinatário', 'Volumes', 'Peso', 'Valor R$', 'Observação'];
        const dadosColetas = preparaDadosColeta(dados.coletas);

        
        populaTabelaBusca(dadosColetas, 'divTabelaBuscaColetas', tituloColetas, 'buscaColetasTbody', 'Coletas', modalDtc);
    }

    // Verifica e processa DTCs
    if (dados.dtcs.length > 0) {
        const tituloDtcs = ['Nº Dtc', "NF's", 'Data Cadastro', 'Remetente', 'Destinatário', 'Volumes', 'Peso', 'R$'];
        const dadosDtcs = await preparaDadosDtc(dados.dtcs);
        populaTabelaBusca(dadosDtcs, 'divTabelaBuscaDtc', tituloDtcs, 'buscaDtcTbody', "DTC'S", modalDtc);
    }

    // Verifica e processa CT-e
    if (dados.ctes.length > 0) {
        const tituloCtes = ['Nº CT-e', 'DTC', 'Dt Emissão', 'Remetente', 'Destinatário', 'Volumes', 'Peso', 'Valor R$'];
        const dadosCtes = await preparaDadosCtes(dados.ctes);
        populaTabelaBusca(dadosCtes, 'divTabelaBuscaCtes', tituloCtes, 'buscaCteTbody', "CTE'S", modalDtc);
    }

    // Verifica e processa Notas Fiscais
    if (dados.notas.length > 0) {
        const tituloNotas = ['Nota Fiscal Nº', 'DTC', 'Dt Emissão', 'Remetente', 'Destinatário', 'Volumes', 'Peso', 'Valor R$'];
        const dadosNotas = preparaDadosNotas(dados.notas);
        populaTabelaBusca(dadosNotas, 'divTabelaBuscaNF', tituloNotas, 'buscaColetaTbody', 'Notas Fiscais', modalDtc);
    }

    // Verifica e processa DTCs por nome
    if (dados.dtc_por_nome.length > 0) {
        const tituloDtcs = ['Nº Dtc', "NF's", 'Data Cadastro', 'Remetente', 'Destinatário', 'Volumes', 'Peso', 'R$'];
        const dadosDtcs = await preparaDadosDtc(dados.dtc_por_nome);
        populaTabelaBusca(dadosDtcs, 'divTabelaBuscaCNPJ', tituloDtcs, 'buscaDtcTbody', "Busca por nome", modalDtc);
    }

    // Verifica e processa DTCs por CNPJ
    if (dados.dtc_por_cnpj.length > 0) {
        const tituloDtcs = ['Nº Dtc', "NF's", 'Data Cadastro', 'Remetente', 'Destinatário', 'Volumes', 'Peso', 'R$'];
        const dadosDtcs = await preparaDadosDtc(dados.dtc_por_cnpj);
        populaTabelaBusca(dadosDtcs, 'divTabelaBuscaCNPJ', tituloDtcs, 'buscaDtcTbody', "Busca por CNPJ", modalDtc);
    }

    sessionStorage.removeItem('buscaResultados'); // Substitua 'chave' pelo nome do item


});


/**
 * Popula uma tabela HTML com base em dados fornecidos, exibindo um título acima dela.
 * Caso os dados estejam vazios, exibe uma mensagem de "Nenhum registro encontrado".
 * 
 * @param {Object} dadosTabela - Objeto contendo os dados a serem exibidos e informações adicionais.
 * @param {Array} dadosTabela.dados - Array de arrays representando as linhas e colunas da tabela.
 * @param {Object} dadosTabela.dtc - Objeto contendo informações adicionais associadas às linhas (como um ID).
 * @param {string} divTabela - ID do elemento onde a tabela será inserida.
 * @param {Array<string>} titulos - Lista de títulos das colunas da tabela.
 * @param {string} idTbody - ID do elemento tbody onde as linhas serão adicionadas.
 * @param {string} tituloTexto - Título exibido acima da tabela.
 * @param {Function} [callback] - Função de callback que será chamada ao clicar em uma linha da tabela. Recebe o ID do DTC.
 */
function populaTabelaBusca(dadosTabela, divTabela, titulos, idTbody, tituloTexto, callback = (idDtc) => { alert(idDtc); }) {

    // Verifica se os dados fornecidos estão vazios
    if (!Array.isArray(dadosTabela) || dadosTabela.length === 0) {
        document.getElementById(divTabela).innerHTML = `
            <h6>${tituloTexto}</h6>
            <p class="text-muted">Nenhum registro encontrado.</p>
        `;
        return;
    }

    // Monta o cabeçalho da tabela com os títulos fornecidos
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

    // Monta as linhas da tabela com os dados fornecidos
    let htmlTbody = '';
    dadosTabela.forEach(element => {
        htmlTbody += `<tr>`;
        element.dados.forEach(e => {
            htmlTbody += `<td onclick="${callback.name}('${element.dtc.id}')">${e}</td>`;
        });
        if(element.botao){
            
        }
        htmlTbody += '</tr>';
    });

    // Insere as linhas no tbody da tabela
    const tbody = document.getElementById(idTbody);
    tbody.innerHTML = htmlTbody;
}


/**
 * Prepara os dados brutos de coleta para exibição na tabela.
 * @param {Array} dadosBrutosColeta - Dados brutos contendo informações de coletas e DTCs.
 * @returns {Array} Lista de objetos formatados para exibição na tabela.
 */
function preparaDadosColeta(dadosBrutosColeta) {
    let novosDados = dadosBrutosColeta.map(dado => {
        const btnBaixaDetalhadaModalInfo = {
            btnBaixa: {
              classe: "btn-primary text-white",
              texto: '<i class="fas fa-check" aria-hidden="true"></i>',
            //   callback: selecionaVeiculo
            }
          };
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
        return {dados:[id, dtcId, dataEmissao, dataSaida, remetente, destinatario, volumes, peso, valor,observacao],dtc:dtc,botao:btnBaixaDetalhadaModalInfo};
    });

    return novosDados
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
            let volumes =0
            let peso = 0
            let valor = 0
            // Obtém os dados de notas fiscais para o DTC atual
            let dadosNfs = await calculaTotalNfsUtils(dado.notas_fiscais);
            const dtc = dado
            const dtcId = dado.id;
            const notas = geraTextoNfUtils(dado.notas_fiscais);
            const dataEmissao = formataDataPtBr(dado.data_cadastro);
            const remetente = truncateString(dado.remetente.raz_soc, 15);
            const destinatario = dado.destinatario && dado.destinatario.raz_soc 
                                ? truncateString(dado.destinatario.raz_soc, 15) 
                                : '';            
            if (dadosNfs){
                volumes = dadosNfs.volumes || 0;
                peso = dadosNfs.peso || 0 ;
                valor = dadosNfs.vlrNf || 0;
            }

            return {dados:[dtcId,notas,dataEmissao,remetente,destinatario,volumes,peso,valor,],dtc:dtc};
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
    let dtc
    // Aguarda a resolução de todas as promessas criadas dentro do `map`
    const dadosFormatados = await Promise.all(
        dadosBrutosCte.map(async (dado) => {

            // Obtém os dados de notas fiscais para o DTC atual
            const dadosNfs = await calculaTotalNfsUtils(dado.dtc.notas_fiscais);
            // Inicializa valores padrão
            let volumes = 0;
            let peso = 0;
            let valor = 0;

            // Extrai informações de CT-e e DTC
            const cte = dado.ctes;
            dtc = dado.dtc;

            const id = cte.id;
            const dtcId = dtc.id;
            const dataEmissao = formataDataPtBr(cte.data_cadastro);
            const remetente = truncateString(dtc.remetente.raz_soc, 15);
            const destinatario = truncateString(dtc.destinatario.raz_soc ? dtc.destinatario.raz_soc: '', 15);

            // Atualiza os valores se os dados de notas fiscais estiverem disponíveis
            if (dadosNfs) {
                volumes = dadosNfs.volumes || 0;
                peso = dadosNfs.peso || 0;
                valor = dadosNfs.vlrNf || 0;
            }

            return {dados:[id, dtcId, dataEmissao, remetente, destinatario, volumes, peso, valor],dtc:dtc};
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
    let novosDados = dadosBrutosNf.map(dado => {
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
        return {dados:[num_nf, dtcId, dataCadastro, remetente, destinatario, volumes, peso, valor],dtc:dtc};
    });

    return novosDados
}

/**
 * Popula os campos no modal com os dados fornecidos.
 * @param {Object} remetente - Dados do remetente.
 * @param {Object} destinatario - Dados do destinatário.
 * @param {Object} tomador - Dados do tomador.
 */
async function populaModalInfoDtc(remetente, destinatario, tomador,dtc) {


    // Populando id do Dtc
    document.getElementById("idDtcModalInfo").value = dtc.id || "";

    // Populando campos do Remetente
    document.getElementById("cnpjRemModalInfoDtc").value = remetente.cnpj || "";
    document.getElementById("razaoRemModalInfoDtc").value = remetente.razao || "";
    document.getElementById("cepRemModalInfoDtc").value = remetente.cep || "";
    document.getElementById("endRemModalInfoDtc").value = remetente.endereco || "";
    document.getElementById("numeroRemModalInfoDtc").value = remetente.numero || "";
    document.getElementById("compRemModalInfoDtc").value = remetente.complemento || "";
    document.getElementById("bairroRemModalInfoDtc").value = remetente.bairro || "";
    document.getElementById("cidRemModalInfoDtc").value = remetente.cidade || "";
    document.getElementById("ufRemModalInfoDtc").value = remetente.uf || "";

    // Populando campos do Destinatário
    document.getElementById("cnpjDestModalInfoDtc").value = destinatario.cnpj || "";
    document.getElementById("razaoDestModalInfoDtc").value = destinatario.razao || "";
    document.getElementById("cepDestModalInfoDtc").value = destinatario.cep || "";
    document.getElementById("endDestModalInfoDtc").value = destinatario.endereco || "";
    document.getElementById("numeroDestModalInfoDtc").value = destinatario.numero || "";
    document.getElementById("compDestModalInfoDtc").value = destinatario.complemento || "";
    document.getElementById("bairroDestModalInfoDtc").value = destinatario.bairro || "";
    document.getElementById("cidDestModalInfoDtc").value = destinatario.cidade || "";
    document.getElementById("ufDestModalInfoDtc").value = destinatario.uf || "";

    // Populando campos do Tomador
    document.getElementById("cnpjTomModalInfoDtc").value = tomador.cnpj || "";
    document.getElementById("razaoTomModalInfoDtc").value = tomador.razao || "";
    document.getElementById("cepTomModalInfoDtc").value = tomador.cep || "";
    document.getElementById("endTomModalInfoDtc").value = tomador.endereco || "";
    document.getElementById("numeroTomModalInfoDtc").value = tomador.numero || "";
    document.getElementById("compTomModalInfoDtc").value = tomador.complemento || "";
    document.getElementById("bairroTomModalInfoDtc").value = tomador.bairro || "";
    document.getElementById("cidTomModalInfoDtc").value = tomador.cidade || "";
    document.getElementById("ufTomModalInfoDtc").value = tomador.uf || "";

    console.log(dtc)

    if(dtc.cte.id){
        let dadosTabelaCteModalInfo =await preparaDadosTabelaCte(dtc.cte)
        popula_tbody('tbodyCteModalInfo',dadosTabelaCteModalInfo,false,false,false)
    }   

    if(dtc.notas_fiscais.length>0){
        let dadosTabelaNotasModalInfo =await preparaDadosTabelaNotas(dtc.notas_fiscais)
        popula_tbody('tbodyNfsModalInfo',dadosTabelaNotasModalInfo,false,false,false)
    }  

    if(dtc.ocorrencias.length>0){
        let dadosTabelaNotasModalInfo =await preparaDadosTabelaOcorrencias(dtc.ocorrencias)
        popula_tbody('tbodyHistoricoModalInfo',dadosTabelaNotasModalInfo,false,false,false)
    }      

    if(dtc.coleta){
        let dadosTabelaColetaModalInfo =await preparaDadosTabelaColeta(dtc.coleta)
        // let botaoBaixaModalInfo={
        //                             classe: "btn-primary text-white",
        //                             texto: 'Baixar',
        //                             // callback: baixaDetalhada
        //                         }
        popula_tbody('tbodyColetaModalInfo',dadosTabelaColetaModalInfo,false,false,false)
    }
}

/**
 * Prepara os dados de uma tabela de CTe, prevenindo erros e dados ausentes.
 * @param {Object} cte - Objeto contendo os dados do CTe.
 * @returns {Promise<Array>} - Array contendo os dados formatados para a tabela.
 */
async function preparaDadosTabelaCte(cte) {
    return [{
        freteCalculado: formatarMoeda(safeValue(cte.freteCalculado, 0)),
        advalorem: formatarMoeda(safeValue(cte.advalor, 0)),
        coleta: formatarMoeda(safeValue(cte.vlrColeta, 0)),
        gris: formatarMoeda(safeValue(cte.gris, 0)),
        pedagio: formatarMoeda(safeValue(cte.pedagio, 0)),
        despacho: formatarMoeda(safeValue(cte.despacho, 0)),
        outros: formatarMoeda(safeValue(cte.outros, 0)),
        icmsRs: formatarMoeda(safeValue(cte.icmsRS, 0)),
        aliq: safeValue(cte.aliquota, '0%'),
        total: formatarMoeda(safeValue(cte.totalFrete, 0)),
        obs: safeValue(cte.observacao, 'Sem observações'),
    }];
}

async function preparaDadosTabelaNotas(notas) {
    return notas.map(nota => ({
        numNf: safeValue(nota.num_nf),
        volume: safeValue(nota.volume),
        peso: safeValue(nota.peso, 0)+'kg',
        valor: formatarMoeda(safeValue(nota.valor_nf, 0)),
    }));
}

async function preparaDadosTabelaColeta(coleta) {
    return [{endereco:`${coleta.rua}-${coleta.numero}-${coleta.bairro}-${coleta.cidade}`,
            volumes:safeValue(coleta.volume),
            peso:`${safeValue(coleta.peso)} Kg`,
            valor:`R$ ${safeValue(coleta.valor)}`,
            obs:safeValue(coleta.observacao)}];
}

async function preparaDadosTabelaOcorrencias(ocorrencias) {
    return ocorrencias.map(ocorrencia => ({
        numeroDocumento: safeValue(ocorrencia.cte ? ocorrencia.cte : ocorrencia.coleta),
        tipo: ocorrencia.cte ? 'CT-e' : 'Coleta',
        responsavel: safeValue(ocorrencia.responsavel),
        data: safeValue(ocorrencia.data_ocorrencia),
        ocorrencia: safeValue(ocorrencia.tipo_ocorrencia.descricao),
        obs: safeValue(ocorrencia.observacao),
    }));
}

async function modalDtc(idDtc){
    const apiService = new ApiService();
    const url = "/operacional/get_dtc_id/";
    let dados = { id_dtc:idDtc};
    // Enviando dados via POST e armazenando o resultado em uma variável
    const dadosInfoDtc = await apiService.postData(url, dados);

    const dadosDtcRemetente = {
        cnpj: dadosInfoDtc?.dadosDtc?.remetente?.cnpj_cpf ?? '',
        razao: dadosInfoDtc?.dadosDtc?.remetente?.raz_soc ?? '',
        cep: dadosInfoDtc?.dadosDtc?.remetente?.endereco_fk?.cep ?? '',
        endereco: dadosInfoDtc?.dadosDtc?.remetente?.endereco_fk?.logradouro ?? '',
        numero: dadosInfoDtc?.dadosDtc?.remetente?.endereco_fk?.numero ?? '',
        complemento: dadosInfoDtc?.dadosDtc?.remetente?.endereco_fk?.complemento ?? '',
        bairro: dadosInfoDtc?.dadosDtc?.remetente?.endereco_fk?.bairro ?? '',
        cidade: dadosInfoDtc?.dadosDtc?.remetente?.endereco_fk?.cidade ?? '',
        uf: dadosInfoDtc?.dadosDtc?.remetente?.endereco_fk?.uf ?? '',
    };

    const dadosDtcDestinatario = {
        cnpj: dadosInfoDtc?.dadosDtc?.destinatario?.cnpj_cpf ?? '',
        razao: dadosInfoDtc?.dadosDtc?.destinatario?.raz_soc ?? '',
        cep: dadosInfoDtc?.dadosDtc?.destinatario?.endereco_fk?.cep ?? '',
        endereco: dadosInfoDtc?.dadosDtc?.destinatario?.endereco_fk?.logradouro ?? '',
        numero: dadosInfoDtc?.dadosDtc?.destinatario?.endereco_fk?.numero ?? '',
        complemento: dadosInfoDtc?.dadosDtc?.destinatario?.endereco_fk?.complemento ?? '',
        bairro: dadosInfoDtc?.dadosDtc?.destinatario?.endereco_fk?.bairro ?? '',
        cidade: dadosInfoDtc?.dadosDtc?.destinatario?.endereco_fk?.cidade ?? '',
        uf: dadosInfoDtc?.dadosDtc?.destinatario?.endereco_fk?.uf ?? '',
    };

    const dadosDtcTomador = {
        cnpj: dadosInfoDtc?.dadosDtc?.tomador?.cnpj_cpf ?? '',
        razao: dadosInfoDtc?.dadosDtc?.tomador?.raz_soc ?? '',
        cep: dadosInfoDtc?.dadosDtc?.tomador?.endereco_fk?.cep ?? '',
        endereco: dadosInfoDtc?.dadosDtc?.tomador?.endereco_fk?.logradouro ?? '',
        numero: dadosInfoDtc?.dadosDtc?.tomador?.endereco_fk?.numero ?? '',
        complemento: dadosInfoDtc?.dadosDtc?.tomador?.endereco_fk?.complemento ?? '',
        bairro: dadosInfoDtc?.dadosDtc?.tomador?.endereco_fk?.bairro ?? '',
        cidade: dadosInfoDtc?.dadosDtc?.tomador?.endereco_fk?.cidade ?? '',
        uf: dadosInfoDtc?.dadosDtc?.tomador?.endereco_fk?.uf ?? '',
    };

 
    populaModalInfoDtc(dadosDtcRemetente,dadosDtcDestinatario,dadosDtcTomador,dadosInfoDtc.dadosDtc)
    openModal('modalInfoDtc')
}
