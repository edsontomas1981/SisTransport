
let ctesFatura = []

const dataEmissaoModalFatura = document.getElementById('dataEmissaoModalFatura');
const getDataEmissao = () =>{
  const valor = dataEmissaoModalFatura.value;
  if (valor === '') {
      const dataAtual = new Date();
      dataEmissaoModalFatura.value = dataAtual.toISOString().split('T')[0];
  }   
}

dataEmissaoModalFatura.addEventListener('blur', function() {
  getDataEmissao()
});

const calculaValorPercentual = (valor,percentual)=>{

  let valorTotal
  percentual = percentual/100
  valorTotal = parseFloat(valor)*parseFloat(percentual)
  return valorTotal

}

const populaModalFaturas = (dados)=>{

  let botao = {
    editar: {
    classe: 'btn-danger ',
    texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
    callback: removeCteFatura
    }
  }

  ctesFatura = []
  document.getElementById('dataEmissaoModalFatura').value = formataData(dados.data_emissao)
  document.getElementById('vencimentoMdlFatura').value = formataData(dados.vencimento)
  document.getElementById('cnpjSacadoFatura').value = dados.sacado_fk.cnpj_cpf
  document.getElementById('razaoSacadoFatura').value = dados.sacado_fk.raz_soc
  document.getElementById('idFaturaMdlFatura').value = dados.id
  document.getElementById('acrescimoMdlFatura').value = dados.percentual_acrescimo
  document.getElementById('descontoMdlFatura').value = dados.percentual_desconto
  document.getElementById('descontoEmReaisMdlFatura').value = dados.desconto_em_reais
  document.getElementById('acrescimoEmReaisMdlFatura').value = dados.acrescimo_em_reais
  document.getElementById('valorTotalMdlFatura').value = dados.valor_total
  document.getElementById('valorAPagarMdlFatura').value = dados.valor_a_pagar

  preparaDadosTableModalFaturas(dados.ctes)

  popula_tbody_paginacao('paginacaoMdlFatura','tableDtcFatura',ctesFatura,botao,1,30,false,false)
}

const preparaDadosTableModalFaturas = (dados)=>{
  dados.forEach(element => {
    ctesFatura.push(preparaCteFatura(element))
  });
}

const limpaModalFaturas = ()=>{

  ctesFatura=[]
  document.getElementById('dataEmissaoModalFatura').value = ''
  document.getElementById('vencimentoMdlFatura').value = ''
  document.getElementById('cnpjSacadoFatura').value = ''
  document.getElementById('razaoSacadoFatura').value = ''
  document.getElementById('idFaturaMdlFatura').value = ''
  document.getElementById('acrescimoMdlFatura').value = ''
  document.getElementById('descontoMdlFatura').value = ''
  document.getElementById('descontoEmReaisMdlFatura').value = ''
  document.getElementById('acrescimoEmReaisMdlFatura').value = ''
  document.getElementById('valorTotalMdlFatura').value = ''
  document.getElementById('valorAPagarMdlFatura').value = ''
  document.getElementById('idFaturaBusca').value = ''
  document.getElementById('tableDtcFatura').innerHTML = ''
  document.getElementById('paginacaoMdlFatura').innerHTML = ''
  document.getElementById('numeroDocumentoFatura').value = ''
  document.getElementById('cmbTipoDocumentoFatura').value = ''


}

let valorDesconto
let valorAcrescimo
let valorAPagar = document.getElementById('valorAPagarMdlFatura')

const populaValorAPagar = ()=>{
  valorDesconto = concedeDesconto()
  valorAcrescimo = addAcrescimoMdl() 
  valorAPagar.value = formatarMoeda(parseFloat(valorAcrescimo)-(parseFloat(valorDesconto)) + parseFloat(somaFretes(ctesFatura)) )
}

const getDocumentoAddFatura = async(idDcto,tipoDcto)=>{
  let response
  switch (tipoDcto) {
      case '1':
          response = await connEndpoint('/operacional/get_cte_id/', {'idCte': idDcto});
          return response

      case '3':
          response = await connEndpoint('/operacional/get_cte_dtc/', {'idDtc': idDcto});
          return response

      default:
          break;
  }
}

const preparaCteFatura = (cte)=>{
  return{id:cte.dtc_fk.id,
      idCte:cte.id,
      remetente:truncateString(cte.dtc_fk.remetente.raz_soc,20),
      destinatario:truncateString(cte.dtc_fk.destinatario.raz_soc,20),
      freteTotal:formatarMoeda(cte.totalFrete),
      tomador:truncateString(cte.dtc_fk.tomador.raz_soc,20)
  }
}

const registroJaExisteFatura = (array, propriedade, valor)=> {
  return array.some(element => parseInt(element[propriedade]) === parseInt(valor));
}

const removerRegistroFatura = (array, propriedade, valor) => {
  return array.filter(element => parseInt(element[propriedade]) !== parseInt(valor));
};

// Função para somar os valores dos fretes
const somaFretes = (ctes) => {
  return ctes.reduce((total, cte) => {
      const frete = parseFloat(converterMoedaParaNumero(cte.freteTotal)); // Obtém o valor do frete
      return frete ? total + frete : total; // Soma apenas se o valor do frete for válido
  }, 0); // Inicializa o total em 0
};

const removeCteFatura = (e)=>{
  let botao = {
    editar: {
    classe: 'btn-danger ',
    texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
    callback: removeCteFatura
    }
  }
  ctesFatura=removerRegistroFatura(ctesFatura,'id',e)
  popula_tbody_paginacao('paginacaoMdlFatura','tableDtcFatura',ctesFatura,botao,1,30,false,false)
  let valorFatura = formatarMoeda((somaFretes(ctesFatura)))
  document.getElementById('valorTotalMdlFatura').value = valorFatura
  populaValorAPagar()
}



