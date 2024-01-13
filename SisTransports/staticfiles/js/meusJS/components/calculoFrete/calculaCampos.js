document.addEventListener('DOMContentLoaded',()=>{
    bloqueiaCamposFrete()
})

const calculaFreteAPartirDosInputs = async ()=>{
    let dadosEmissora  = carregaEmissoresPorId($('#emissoraCte').val()) // carrega dados do emissor tais como aliquota que e usado nesta funcao
    let subtotal =await carregaValores()
    let aliquota = await selecionaAliquota(dadosEmissora)
    let freteTotal = calculaFrete(subtotal,aliquota)
    populaCalculo(freteTotal)
}

const carregaValores = async () => {

    const obterValor = (id) => parseFloat($(id).val()) || 0.00;

    const freteCalculado = obterValor('#freteCalculadoCte').toFixed(2);
    const advalor = obterValor('#advalorCte').toFixed(2);
    const coletaCte = obterValor('#coletaCte').toFixed(2);
    const grisCte = obterValor('#grisCte').toFixed(2);
    const pedagioCte = obterValor('#pedagioCte').toFixed(2);
    const despachoCte = obterValor('#despachoCte').toFixed(2);
    const outrosCte = obterValor('#outrosCte').toFixed(2);

    const listaValores = [freteCalculado, advalor, coletaCte, 
                        grisCte, pedagioCte, despachoCte, 
                        outrosCte];

    const total = listaValores.reduce((acumulador, element) => acumulador + parseFloat(element), 0);

    return total

};

const selecionaAliquota = async(dadosEmissora)=>{
    let tabela = await readTabelaCte()
    if(tabela.tabela.id){
        return tabela.tabela.aliquotaIcms
    }else{
        return dadosEmissora.aliquota
    }
}

const calculaFrete = (total,aliquota)=>{
    let freteTotal
    let icms
    let baseDeCalculo

    if ($('#icmsInclusoNf').prop('checked')) {
        let aliquotaCalculo = (100-aliquota)/100
        freteTotal = parseFloat(total)/parseFloat(aliquotaCalculo)
        icms = parseFloat(freteTotal)-parseFloat(total)
        baseDeCalculo = parseFloat(freteTotal)
    } else {
        freteTotal = parseFloat(total)
        icms=(total*parseFloat(aliquota))/100
        baseDeCalculo=freteTotal
    }

    return {'total':parseFloat(freteTotal).toFixed(2),
            'baseDeCalculo':parseFloat(baseDeCalculo).toFixed(2),
            'icms':parseFloat(icms).toFixed(2),
            'aliquota':aliquota
            }
}

const populaCalculo =(totais)=>{
    $('#baseCalculoCte').val(totais.baseDeCalculo)
    $('#icmsCte').val(totais.icms)
    $('#freteTotalCte').val(totais.total)
    $('#aliquotaCte').val(totais.aliquota)
}

const bloqueiaCamposFrete = () => {
    $('#freteCalculadoCte').prop('readonly', true);
    $('#advalorCte').prop('readonly', true);
    $('#grisCte').prop('readonly', true);
    $('#pedagioCte').prop('readonly', true);
    $('#despachoCte').prop('readonly', true);
    $('#outrosCte').prop('readonly', true);    
}

const desbloqueiaCamposFrete = () => {
    $('#freteCalculadoCte').prop('readonly', false);
    $('#advalorCte').prop('readonly', false);
    $('#grisCte').prop('readonly', false);
    $('#pedagioCte').prop('readonly', false);
    $('#despachoCte').prop('readonly', false);
    $('#outrosCte').prop('readonly', false);    
}