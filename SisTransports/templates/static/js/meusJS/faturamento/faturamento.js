loadEmissores('fatAutomaticoEmissor')
const getDadosFaturamentoAutomatico =()=>{
    console.log(getDadosForm('frmFaturamentoAutomatico'))
}

const preparaDadosTbodyFaturas = (faturas)=>{
    
    let listaFaturas = []
    faturas.forEach(element => {
        listaFaturas.push({id:element.id,
            sacado:element.sacado,
            qtdeDcto:element.qtdeDoctos,
            total:element.valor_a_pagar,
            vcto:formataDataPtBr(element.vencimento)
        })
    });

    return listaFaturas
}


/**
 * Exclui uma fatura após confirmação do usuário.
 *
 * Exibe uma mensagem de confirmação solicitando ao usuário que confirme se deseja excluir a fatura.
 * Se confirmado, faz uma requisição ao endpoint para excluir a fatura e exibe uma mensagem de sucesso ou erro,
 * dependendo da resposta do servidor.
 *
 * @param {number|string} e - O identificador da fatura a ser excluída.
 * @returns {void}
 *
 * @example
 * // Exemplo de uso:
 * excluirFatura(123); // Solicita a confirmação e exclui a fatura com ID 123.
 */
const excluirFatura = async (e) => {
    msgConfirmacao('Você tem certeza que deseja excluir esta fatura?').then(async (confirmado) => {
      if (confirmado) {
        let dados = { idFatura: e };
        let url = '/faturamento/exclui_fatura/';
        let response = await conectaEndpoint(url, dados);
        
        if (response.status === 200) {
          msgOk('Fatura excluída com sucesso!');
          popula_relatorio_faturas()
        } else {
          msgErro('Ocorreu um erro ao tentar excluir a fatura. Tente novamente.');
        }
      } else {
        console.log('Ação de exclusão cancelada pelo usuário.');
      }
    });
  };


  const readFatura = async (e)=>{
    let dados = { idFatura: e };
    let url = '/faturamento/get_fatura/';
    let response = await conectaEndpoint(url, dados);
    populaModalFatura(response.fatura)
    openModal('mdlFatura')
  }

  const formataDataISO = (data) => {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Adiciona o zero à esquerda se necessário
    const dia = String(dataObj.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`; // Retorna no formato YYYY-MM-DD
  }

  
  const populaModalFatura = (fatura) => {
    document.getElementById('idFatura').value = fatura.id;
    document.getElementById('cnpjSacadoFatura').value  = fatura.sacado_fk.cnpj_cpf
    document.getElementById('razaoSacadoFatura').value = fatura.sacado_fk.raz_soc;
    document.getElementById('valorAPagar').value = fatura.valor_a_pagar;
    document.getElementById('valorTotal').value = fatura.valor_total;
    document.getElementById('desconto').value = fatura.desconto;
    document.getElementById('dataEmissaoAlteraFatura').value = formataDataISO(fatura.data_emissao);
    document.getElementById('vencimento').value = formataDataISO(fatura.vencimento);
};


  

/**
 * Popula o relatório de faturas com os dados obtidos do servidor e adiciona botões de ação (alterar e excluir).
 *
 * Faz uma requisição ao endpoint que retorna as faturas, prepara os dados e popula uma tabela paginada no relatório.
 * Adiciona botões de "alterar" e "excluir" para cada fatura, com seus respectivos callbacks.
 *
 * @returns {Promise<void>} Uma Promise que resolve quando o relatório for populado.
 *
 * @example
 * // Exemplo de uso:
 * popula_relatorio_faturas(); // Popula o relatório de faturas com dados do servidor.
 */
const popula_relatorio_faturas = async () => {
    let botoes = {
      alterar: {
        classe: "btn-primary text-white",
        texto: '<i class="fa fa-search" aria-hidden="true"></i>',
        callback:readFatura
    },
      excluir: {
        classe: "btn-danger text-white",
        texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
        callback: excluirFatura
      }
    };
  
    let url = '/faturamento/get_faturas/';
    let dados = {};
    let response = await conectaEndpoint(url, dados);
    let faturas = preparaDadosTbodyFaturas(response.faturas);
    
    await popula_tbody_paginacao(
      'divNavegacaoFaturaRelatorio',
      'tbodyFaturasRelatorio',
      faturas,
      botoes,
      1, // Página inicial
      10, // Itens por página
      false, // Sem ordenação automática
      false  // Sem filtro adicional
    );
  };
  