const loadCalculoCte = () => {
    limpaDivCalculo();

    const loadFunctions = [
        loadDivOrigemCte,
        loadDivDestinoCte,
        loadDivEmissoraCte,
        loadDivTipoCte,
        loadDivTipoCalcCte,
        loadDivSelecionaTabelaCte,
        loadDivCfopCte,
        loadDivReDespachanteCte,
        loadDivObsCte,
        loadDivTabelaTotaisCte,
        loadDivFretePesoCte,
        loadDivFreteValorCte,
        loadDivAdvalorCte,
        loadDivGrisCte,
        loadDivPedagioCte,
        loadDivDespachoCte,
        loadDivOutrosCte,
        loadDivIcmsInclusoCte,
        loadDivBaseCalculoCte,
        loadDivAliquotaCte,
        loadDivIcmsNfCte,
        loadDivTotalFreteCte,
        loadDivBtnCalcCte
    ];

    for (const loadFunction of loadFunctions) {
        loadFunction();
    }
};


const preDtcSemNf = ()=>{
    let messageContainer = document.getElementById('divGeralcalcFrete');
    messageContainer.innerHTML = `
        <div class="alert alert-info mt-3" role="alert">
            Não há notas fiscais associadas a esta DTC.
        </div>
    `;
}

const limpaDivCalculo = ()=>{
    let messageContainer = document.getElementById('divGeralcalcFrete');
    messageContainer.innerHTML = `    <div class="form-group col-6 mb-0 mt-0">
    <div class="row">
        <div class="col-4  pl-1 pr-1 mt-0" id="divOrigemCte">

        </div>    
        <div class="col-4  pl-1 pr-1 mt-0" id="divDestinoCte">

        </div> 
        <div class="col-4 pl-1 pr-0" id="divEmissoraCte">

        </div> 
        <div class="col-4 pl-1 pr-1 mt-1" id="divTipoCte">
        </div>

        <div class="col-4 pl-1 pr-0 mt-1" id="divTipoCalc">

        </div>      
        <div class="col-4 pl-1 pr-1 mt-1" id="divSelecionaTabelaCte">

        </div> 
        <div class="col-8  pl-1 pr-1 mt-1" id="divCfopCte">

        </div>    
        <div class="col-4 pl-1 pr-1 mt-1" id="divRedespachanteCte">

        </div> 
        <div class="col-12  pl-1 pr-1 mt-1" id="divObsCte">

        </div>  
        <div class="col-12 pl-1 mt-1" id="divTabelaTotaisCte">

        </div>                                
    </div>
</div>
<div class="form-group col-6 mt-0" >
    <div class="form-group row mb-1">
        <div class="col-sm-4 mb-1 form-group pr-1 pl-1 form-floating" id="divFretePeso">
        </div>
        <div class="col-sm-4 mb-1 pl-0 pr-1 form-group form-floating" id="divFreteValor">

        </div> 
        <div class="col-sm-4 mb-1 pl-0 pr-1 form-group form-floating" id="divAdvalor"> 
          
        </div>            
        <div class="col-sm-3 mb-0 pr-1 pl-1 form-group form-floating" id="divGris">
        </div>
        <div class="col-sm-3 mb-1 pr-1 pl-0 form-group form-floating" id="divPedagio">

        </div>              
        <div class="col-sm-3 mb-1 pl-0 pr-1 form-group form-floating" id="divDespacho">
          
        </div>                                
        <div class="col-sm-3 mb-1 pl-0 pr-1 form-group form-floating " id="divOutros">
            
        </div> 

        <div class="form-check form-check-primary col-3 pl-3 pr-0 mt-4" id="divIcmsIncluso">
            
        </div>  

        <div class="col-sm-3 mb-0 pr-1 pl-1 form-group form-floating " id="divBaseCalculo">
            
        </div>
        <div class="col-sm-3 mb-1 pr-1 pl-0 form-group form-floating" id="divAliquota">
            
        </div>              
        <div class="col-sm-3 mb-1 pl-0 pr-1 form-group form-floating" id="divIcmsNf">
          
        </div>                                
        <div class="col-sm-12 mb-1 pl-0 pr-1 form-group form-floating" id="divTotalFrete">
            
        </div>  

        <div class="col-sm-3 mb-0 mt-1 form-group form-floating pl-1 pr-1" id="divBtnCalc">

        </div>
        <div class="col-sm-3 mb-1 mt-1 form-group pl-1 pr-1">

        </div>

        <div class="col-sm-3 mb-1 mt-1 form-group pl-1 pr-1">
        </div>  
        
        <div class="col-sm-3 mb-1 mt-1 form-group pl-1 pr-1">

        </div>            
    </div>
</div> `;
}

const loadDivOrigemCte=()=>{
    let divOrigem = document.getElementById('divOrigemCte')
    divOrigem.innerHTML=`<div class="form-floating">
                            <select class="form-select" id="origemCte" aria-label="especie nf">
                                <option value=1>GUARULHOS-SP</option>
                            </select>
                            <label for="origemCte">Origem</label>
                         </div>
                        `
}

const loadDivDestinoCte=()=>{
    let divDestino = document.getElementById('divDestinoCte')
    divDestino.innerHTML=`<div class="form-floating">
                            <select class="form-select" id="destinoCte" aria-label="especie nf">
                                <option value="1">TERESINA-PI</option>
                            </select>
                            <label for="destinoCte">Destino</label>
                        </div>
                        `
}

const loadDivEmissoraCte=()=>{
    let divEmissora = document.getElementById('divEmissoraCte')
    divEmissora.innerHTML=`<div class="form-floating" >
                            <select class="form-select" id="emissoraCte" aria-label="especie nf">
                            <option selected>Emissora</option>
                            <option value="1">SAO(MATRIZ)</option>
                            <option value="2">THE(FILIAL)</option>
                            </select>
                            <label for="emissoraCte">Emissora</label>
                        </div>
                        `
}

const loadDivTipoCte=()=>{
    let divTipo = document.getElementById('divTipoCte')
    divTipo.innerHTML=`<div class="form-floating">
                            <select class="form-select" id="tipoCte" aria-label="especie nf">
                                <option value="1">Normal</option>
                                <option value="2">Complemento</option>
                            </select>
                            <label for="tipoCte">Tipo CT-e</label>
                        </div>
                        `
}

const loadDivTipoCalcCte=()=>{
    let divTipoCalc = document.getElementById('divTipoCalc')
    divTipoCalc.innerHTML=`<div class="form-floating">
                            <select class="form-select" id="tipoCalc" aria-label="especie nf">
                            <option selected>Selecione</option>
                            <option value="1">Tabela Geral</option>
                            <option value="2">Tabela Cliente</option>
                            <option value="2">Frete Informado</option>
                            </select>
                            <label for="tipoCalc">Tipo de cálculo</label>
                          </div>
                        `
}

const loadDivSelecionaTabelaCte=()=>{
    let divSelecionaTabelaCte = document.getElementById('divSelecionaTabelaCte')
    divSelecionaTabelaCte.innerHTML=`<div class="form-floating">
                                <select class="form-select" id="selecionaTabelaCte" aria-label="especie nf">
                                    <option selected>Selecione</option>
                                </select>
                                <label for="selecionaTabelaCte">Tabela de frete</label>
                            </div>
                        `
}

const loadDivCfopCte=()=>{
    let divCfopCte = document.getElementById('divCfopCte')
    divCfopCte.innerHTML=`<div class="form-floating">
                            <select class="form-select" id="cfopCte" aria-label="especie nf">
                                <option selected>CFOP</option>
                            </select>
                            <label for="cfopCte">CFOP</label>
                          </div>
                        `
}

const loadDivReDespachanteCte=()=>{
    let divRedespachanteCte = document.getElementById('divRedespachanteCte')
    divRedespachanteCte.innerHTML=`<div class="form-floating">
                                    <input type="text" class="form-control form-control-sm " 
                                    placeholder="Redespachante" name="redespCte" id="redespCte">
                                    <label class="text-secondary" for="redespCte">Redespachante :</label>
                                   </div>
                        `
}

const loadDivObsCte=()=>{
    let divObsCte = document.getElementById('divObsCte')
    divObsCte.innerHTML=`<div class="form-floating">
                            <textarea class="form-control" id="observacaoCte"></textarea>
                            <label for="observacaoCte">Observação</label>
                         </div>
                        `
}

const loadDivTabelaTotaisCte=()=>{
    let divTabelaTotaisCte = document.getElementById('divTabelaTotaisCte')
    divTabelaTotaisCte.innerHTML=`<div class="table-responsive">
                                    <table class="table">
                                    <thead>
                                        <tr>
                                        <th>Total de Volumes</th>
                                        <th>Peso Real</th>
                                        <th>M³</th>
                                        <th>Peso faturado</th>
                                        <th>Valor Nf's</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr id="totaisNfs">
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                        `
}

const loadDivFretePesoCte=()=>{
    let divFretePeso = document.getElementById('divFretePeso')
    divFretePeso.innerHTML=`<input type="text" class="form-control form-control-sm " 
                                placeholder="Frete Peso" name="fretePesoNf" id="fretePesoNf">
                            <label class="text-secondary" for="fretePesoNf">Frete peso:</label>
                        `
}

const loadDivFreteValorCte=()=>{
    let divFreteValor = document.getElementById('divFreteValor')
    divFreteValor.innerHTML=`<input type="text" class="form-control form-control-sm" 
                                placeholder="Frete Valor" name="freteValorNf" id="freteValorNf">
                            <label class="text-secondary" for="freteValorNf">Frete valor:</label>
                        `
}

const loadDivAdvalorCte=()=>{
    let divAdvalor = document.getElementById('divAdvalor')
    divAdvalor.innerHTML=`<input type="text" class="form-control form-control-sm " 
                            placeholder="Advalor" name="advalorNf" id="advalorNf">
                        <label class="text-secondary"for="advalorNf">Advalor:</label>  
                        `
}

const loadDivGrisCte=()=>{
    let divGris = document.getElementById('divGris')
    divGris.innerHTML=`<input type="text" class="form-control form-control-sm" 
                        placeholder="Gris" name="grisNf" id="grisNf">
                        <label class="text-secondary" for="grisNf">Gris:</label>
                        `
}

const loadDivPedagioCte=()=>{
    let divPedagio = document.getElementById('divPedagio')
    divPedagio.innerHTML=`<input type="text" class="form-control  form-control-sm " 
                        placeholder="Pedágio" id="pedagioNf" name="pedagioNf">
                        <label class="text-secondary"for="pedagioNf">Pedágio:</label>
                        `
}

const loadDivDespachoCte=()=>{
    let divDespacho = document.getElementById('divDespacho')
    divDespacho.innerHTML=`<input type="text" class="form-control  form-control-sm " 
                            placeholder="Despacho" id="despachoNf" name="despachoNf">
                            <label class="text-secondary"for="despachoNf">Despacho:</label>  
                        `
}

const loadDivOutrosCte=()=>{
    let divOutros = document.getElementById('divOutros')
    divOutros.innerHTML=`<input type="text" class="form-control  form-control-sm " 
                            placeholder="Outros" id="outrosNf" name="outrosNf">
                            <label class="text-secondary"for="outrosNf">Outros:</label>
                        `
}

const loadDivIcmsInclusoCte=()=>{
    let divIcmsIncluso = document.getElementById('divIcmsIncluso')
    divIcmsIncluso.innerHTML=`<label class="form-check-label">
                                <input type="checkbox" class="form-check-input" checked="" id="icmsInclusoNf" name="icmsInclusoNf">
                                Icms incluso ?
                                <i class="input-helper"></i></label>
                        `
}

const loadDivBaseCalculoCte=()=>{
    let divBaseCalculo = document.getElementById('divBaseCalculo')
    divBaseCalculo.innerHTML=`<input type="text" class="form-control form-control-sm" 
                                placeholder="Gris" name="baseCalculoNf" id="baseCalculoNf" disabled>
                                <label class="text-secondary" for="baseCalculoNf">Base de Cálculo:</label>
                             `
}

const loadDivAliquotaCte=()=>{
    let divAliquota = document.getElementById('divAliquota')
    divAliquota.innerHTML=`<input type="text" class="form-control  form-control-sm " 
                            placeholder="Pedágio" id="aliquotaNf" name="aliquotaNf" disabled>
                            <label class="text-secondary"for="aliquotaNf">Alíquota:</label>
                             `
}

const loadDivIcmsNfCte=()=>{
    let divIcmsNf = document.getElementById('divIcmsNf')
    divIcmsNf.innerHTML=`<input type="text" class="form-control  form-control-sm " 
                            placeholder="Despacho" id="icmsNf" name="icmsNf" disabled>
                           <label class="text-secondary h1"for="icmsNf">Icms R$:</label>  
                        `
}

const loadDivTotalFreteCte=()=>{
    let divTotalFrete = document.getElementById('divTotalFrete')
    divTotalFrete.innerHTML=`<input type="text" class="form-control form-control-sm bg-primary text-capitalize text-danger h1" 
                            placeholder="Outros" id="freteTotalNf" name="freteTotalNf" value="R$ 0.00"disabled>
                            <label class="text-secondary"for="freteTotalNf">Total Frete :</label>
                        `
}

const loadDivBtnCalcCte=()=>{
    let divBtnCalc = document.getElementById('divBtnCalc')
    divBtnCalc.innerHTML=`<button type="button" class="btn btn-warning btn-icon-text" id="btnCalcFrete">
                            <i class="ti-credit-card btn-icon-prepend"></i>
                                    Calcular
                         </button>
                        `
}


