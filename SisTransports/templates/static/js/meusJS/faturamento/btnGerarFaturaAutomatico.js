let btnGerarFaturaAutomatica = document.getElementById('btnGerarFaturaAutomatica')

btnGerarFaturaAutomatica.addEventListener('click',async()=>{

    let botoes={
        alterar: {
            classe: "btn-primary text-white",
            texto: '<i class="fa fa-search" aria-hidden="true"></i>',
            // callback: 
          },
        excluir: {
            classe: "btn-danger text-white",
            texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
            callback: excluirFatura
          }
      };

    let dados = obterDadosDoFormulario('frmFaturamentoAutomatico')
    let camposObrigatorios = ['dataVencimento']
    if ((validarCamposObrigatorios(dados,camposObrigatorios)).length != 0){
        msgAviso('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
    }else{
        let url = '/faturamento/gerar_faturas/'
        let response = await conectaEndpoint(url,dados)
        let faturas = preparaDadosTbodyFaturasAutomatica(response.faturas)
        popula_tbody_pag('divNavegacaoFatura','tbodyFaturas',faturas,botoes,1,10,false,false)
    }
})

const preparaDadosTbodyFaturas= (faturas)=>{
    
    let listaFaturas = []
    faturas.forEach(element => {
        listaFaturas.push({id:element.id,
            cnpj:element.cnpjTomador,
            sacado:element.sacado,
            qtdeDcto:element.qtdeDoctos,
            total:element.valor_a_pagar,
            vcto:formataDataPtBr(element.vencimento)
        })
    });

    return listaFaturas
}

const excluirFatura = async (e)=>{
    let url = '/faturamento/exclui_fatura/'
    let response = await conectaEndpoint(url,dados)
    msgAviso(response.status)
}