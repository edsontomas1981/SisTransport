loadEmissores('fatAutomaticoEmissor')
const getDadosFaturamentoAutomatico =()=>{
    console.log(getDadosForm('frmFaturamentoAutomatico'))
}

const preparaDadosTbodyFaturas = (faturas)=>{
    
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