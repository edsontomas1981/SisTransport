const buscaCte = async ()=>{
    let idDtc = document.getElementById('numDtc')
    let url = '/operacional/read_cte_by_dtc/'   
    let dados = {'idDtc':idDtc.value} 
    let conexao = new Conexao(url,dados)
    let result = await conexao.sendPostRequest()
    return result
}

const preDtcSemNf = async()=>{
    desBloqueiaSemNf()
    bloqueiaDivFrete()
    bloqueiaFreteCalculado()
    bloqueiaBotoes()    
}

const preDtcCalculado = async()=>{
    bloqueiaSemNf()
    desBloqueiaDivFrete()
    bloqueiaFreteCalculado()
    desbloqueiaBotoes() 
}

const preDtcSemCalculo = async()=>{
    bloqueiaSemNf()
    desbloqueiaBotoes()
    desBloqueiaDivFrete()
    desbloqueiaFreteCalculado()
}
const calculoSemDiv = ()=>{
    bloqueiaSemNf()
    bloqueiaDivFrete()
    bloqueiaFreteCalculado()    
    bloqueiaBotoes()
    let camposForm = [
        'origemCte', 'destinoCte', 'emissoraCte', 'tipoCte', 'cfopCte', 'redespCte', 'observacaoCte',
        'tipoCalc', 'selecionaTabelaCte', 'icmsInclusoNf', 'freteCalc', 'advalorNf', 'coletaNf',
        'pedagioNf', 'despachoNf', 'outrosNf', 'grisNf','freteCalculado','nfCte','baseCalculoNf',
        'aliquotaNf','icmsNf','freteTotalNf'
        
    ];
    limpaCamposCalculo(camposForm)
}

const divCalculoFrete = async ()=>{
    bloqueiaSemNf()
    desBloqueiaDivFrete()
}

const populaRotaCte= async ()=>{
    let idRota = document.getElementById('rotasDtc')
    let data = {'idRota':idRota.value}
    let url  = '/operacional/read_rotas/'
    let conexao = new Conexao(url, data);
        try {
            const result = await conexao.sendPostRequest();
            return result
        } catch (error) {
            console.error(error); // Imprime a mensagem de erro
            // return error
        }
        loadDivOrigemCte(result.rota.origemCidade+"/"+response.dtc.rota.origemUf)
}

const limpaCamposCalculo =(campos)=>{
    campos.forEach(campoId => {
        const element = document.getElementById(campoId);
        if (element) {
          if (element.type === 'text' || element.type === 'password' || element.tagName === 'TEXTAREA') {
            element.value = '';
          } else if (element.type === 'select-one') {
            element.value = '0';
          } else if (element.type === 'checkbox' || element.type === 'radio') {
            element.checked = true;
          }
        }
    });
}

const bloqueiaBotoes=()=>{
    let semNf = document.getElementById('botoes');
    semNf.style.display = 'none';
}

const desbloqueiaBotoes=()=>{
    let semNf = document.getElementById('botoes');
    semNf.style.display = 'block';
}

const bloqueiaSemNf=()=>{
    let semNf = document.getElementById('semNf');
    semNf.style.display = 'none';
}

const desBloqueiaSemNf=()=>{
    let semNf = document.getElementById('semNf');
    semNf.style.display = 'block';
}

const desbloqueiaFreteCalculado=()=>{
    const idsParaDesbloquear = [
        'origemCte', 'destinoCte', 'emissoraCte', 'tipoCte', 'cfopCte', 'redespCte', 'observacaoCte',
        'tipoCalc', 'selecionaTabelaCte', 'icmsInclusoNf', 'freteCalc', 'advalorNf', 'coletaNf',
        'pedagioNf', 'despachoNf', 'outrosNf', 'grisNf','freteCalculado','nfCte'
    ];

    idsParaDesbloquear.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.disabled = false;
            campo.classList.remove('bloqueado');
        }
    });}

const bloqueiaFreteCalculado=()=>{
    const idsParaBloquear = [
        'origemCte', 'destinoCte', 'emissoraCte', 'tipoCte', 'cfopCte', 'redespCte', 'observacaoCte',
        'tipoCalc', 'selecionaTabelaCte', 'icmsInclusoNf', 'freteCalc', 'advalorNf', 'coletaNf',
        'pedagioNf', 'despachoNf', 'outrosNf', 'baseCalculoNf', 'aliquotaNf', 'icmsNf',  'grisNf',
        'freteTotalNf','freteCalculado','nfCte'
    ];

    idsParaBloquear.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.disabled = true;
            campo.classList.add('bloqueado');
        }
    });
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
    divOrigem.innerHTML=`<option value=0>Escolha a Origem</option>
                        <option value=1 selected>${origem}</option>
                        `
}

const loadDivDestinoCte=(destino)=>{
    let divDestino = document.getElementById('destinoCte')
    divDestino.innerHTML=`<option value="0">Escolha a Destino</option>  
                          <option value="1">${destino}</option>
                        `
}

const loadDivEmissoraCte=()=>{
    let divEmissora = document.getElementById('divEmissoraCte')
    // divEmissora.innerHTML=`
    //                     `
}

const loadDivTipoCte=()=>{
    let divTipo = document.getElementById('tipoCte')
    divTipo.innerHTML=`<option value="0">Normal</option>
                       <option value="1">Complemento</option>
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
