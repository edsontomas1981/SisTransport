const preDtcSemNf = async()=>{
    desBloqueiaSemNf()
    bloqueiaDivFrete()
    bloqueiaFreteCalculado()    
}

const preDtcCalculado = async()=>{
    bloqueiaSemNf()
    bloqueiaDivFrete()
    desbloqueiaFreteCalculado()    
}

const preDtcSemCalculo = async()=>{
    bloqueiaSemNf()
    desBloqueiaDivFrete()
    bloqueiaFreteCalculado()    
}

const calculoSemDiv = ()=>{
    bloqueiaSemNf()
    bloqueiaDivFrete()
    bloqueiaFreteCalculado()    
}

const bloqueiaSemNf=()=>{
    let semNf = document.getElementById('semNf');
    semNf.style.display = 'none';
}
const desBloqueiaSemNf=()=>{
    let semNf = document.getElementById('semNf');
    semNf.style.display = 'block';
}

const bloqueiaFreteCalculado=()=>{
    let divFreteCalculado = document.getElementById('divFreteCalculado');
    divFreteCalculado.style.display = 'none';
}

const desbloqueiaFreteCalculado=()=>{
    let divFreteCalculado = document.getElementById('divFreteCalculado');
    divFreteCalculado.style.display = 'block';
}

const divCalculoFrete = async ()=>{
    bloqueiaSemNf()
    desBloqueiaDivFrete()
}

const bloqueiaDivFrete=()=>{
    let esquerda = document.getElementById('esquerda');
    esquerda.style.display = 'none';
    let direita = document.getElementById('direita');
    direita.style.display = 'none';
}

const desBloqueiaDivFrete=()=>{
    let esquerda = document.getElementById('esquerda');
    esquerda.style.display = 'block';
    let direita = document.getElementById('direita');
    direita.style.display = 'block';
}

const loadDivOrigemCte=(origem)=>{
    let divOrigem = document.getElementById('origemCte')
    divOrigem.innerHTML=`<option value=1>${origem}</option>
                        `
}

const loadDivDestinoCte=(destino)=>{
    let divDestino = document.getElementById('destinoCte')
    divDestino.innerHTML=`<option value="1">${destino}</option>
                        `
}

const loadDivEmissoraCte=()=>{
    let divEmissora = document.getElementById('divEmissoraCte')
    // divEmissora.innerHTML=`
    //                     `
}

const loadDivTipoCte=()=>{
    let divTipo = document.getElementById('tipoCte')
    divTipo.innerHTML=`<option value="1">Normal</option>
                       <option value="2">Complemento</option>
                      `
}

const loadDivTipoCalcCte=async ()=>{
    let divTipoCalc = document.getElementById('divTipoCalc')
    // divTipoCalc.innerHTML=`
    //                     `
}

const loadDivSelecionaTabelaCte=()=>{
    let divSelecionaTabelaCte = document.getElementById('divSelecionaTabelaCte')
    // divSelecionaTabelaCte.innerHTML=`
    //                     `
}

const loadDivCfopCte=()=>{
    let divCfopCte = document.getElementById('divCfopCte')
    // divCfopCte.innerHTML=`
    //                     `
}

const loadDivReDespachanteCte=()=>{
    let divRedespachanteCte = document.getElementById('divRedespachanteCte')
    // divRedespachanteCte.innerHTML=`
    //                     `
}

const loadDivObsCte=()=>{
    let divObsCte = document.getElementById('divObsCte')
    // divObsCte.innerHTML=`
    //                     `
}

const populaTabelaTotaisCte=()=>{
 
}

const loadDivFretePesoCte=()=>{
    let divFretePeso = document.getElementById('divFretePeso')
    // divFretePeso.innerHTML=`
    //                     `
}

const loadDivFreteValorCte=()=>{
    let divFreteValor = document.getElementById('divFreteValor')
    // divFreteValor.innerHTML=`
    //                     `
}

const loadDivAdvalorCte=()=>{
    let divAdvalor = document.getElementById('divAdvalor')
    // divAdvalor.innerHTML=`
    //                     `
}

const loadDivGrisCte=()=>{
    let divGris = document.getElementById('divGris')
    // divGris.innerHTML=`
    //                     `
}

const loadDivPedagioCte=()=>{
    let divPedagio = document.getElementById('divPedagio')
    // divPedagio.innerHTML=`
    //                     `
}

const loadDivDespachoCte=()=>{
    let divDespacho = document.getElementById('divDespacho')
    // divDespacho.innerHTML=`
    //                     `
}

const loadDivOutrosCte=()=>{
    let divOutros = document.getElementById('divOutros')
    // divOutros.innerHTML=`
    //                     `
}

const loadDivIcmsInclusoCte=()=>{
    let divIcmsIncluso = document.getElementById('divIcmsIncluso')
    // divIcmsIncluso.innerHTML=`
    //                     `
}

const loadDivBaseCalculoCte=()=>{
    let divBaseCalculo = document.getElementById('divBaseCalculo')
    // divBaseCalculo.innerHTML=`
    //                          `
}

const loadDivAliquotaCte=()=>{
    let divAliquota = document.getElementById('divAliquota')
    // divAliquota.innerHTML=`
    //                          `
}

const loadDivIcmsNfCte=()=>{
    let divIcmsNf = document.getElementById('divIcmsNf')
    // divIcmsNf.innerHTML=`
    //                     `
}

const loadDivTotalFreteCte=()=>{
    let divTotalFrete = document.getElementById('divTotalFrete')
    // divTotalFrete.innerHTML=`
    //                     `
}

const loadDivBtnCalcCte=()=>{
    let divBtnCalc = document.getElementById('divBtnCalc')
    // divBtnCalc.innerHTML=`
    //                     `
}

const identificaTabela=()=>{
    let identificadorTabelaCte = document.getElementById('identificaTabela')
    let tabela = document.getElementById('selecionaTabelaCte')
    identificadorTabelaCte.value = ''
}

const identificaTomadorCalculoCte = ()=>{
    let identicadorTomadorCte = document.getElementById('identificaTomador')
    let tomadorDtc = document.getElementById('razaoTomador')
    identicadorTomadorCte.value = tomadorDtc.value
}
