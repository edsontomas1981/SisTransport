let btnSalvaFrete = document.getElementById('btnSalvaCalc')
btnSalvaFrete.addEventListener('click',async ()=>{
    let dados = criarDadosFreteDtc();
    dados.idDtc = $('#numDtc').val(); 
    let url = '/operacional/createCte/'    
    let conexao = new Conexao(url,dados)
    let result = await conexao.sendPostRequest()
    console.log(result)
})

const criarDadosFreteDtc=()=>{
    const getValue = (elementId) => {
        const element = document.getElementById(elementId);
        if (element.value !='') {
            return element.value;
        } else if (element.classList.contains('campoObrigatorio') && element.value == '') {
            campoObrigatorio(elementId);
            if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'select' || element.tagName.toLowerCase() === 'textarea') {
                campoObrigatorio(element.getAttribute('data-alert-tag'))
                element.focus();
            }
            throw new Error(`Elemento obrigatório ${elementId} não encontrado.`);
        }
    };
 
    const dadosFreteDtc = {
        origem_cte: getValue('origemCte'),
        destino_cte: getValue('destinoCte'),
        emissora_cte: getValue('emissoraCte'),
        tipo_cte: getValue('tipoCte'),
        cfop_cte: getValue('cfopCte'),
        redesp_cte: getValue('redespCte'),
        tipo_calculo_cte: getValue('tipoCalc'),
        tabela_frete: getValue('selecionaTabelaCte'),
        observacao: getValue('observacaoCte'),
        icms_incluso: document.getElementById('icmsInclusoNf').checked,
        frete_calculado: getValue('freteCalculado'),
        advalor: getValue('advalorNf'),
        gris: getValue('grisNf'),
        despacho: getValue('despachoNf'),
        outros: getValue('outrosNf'),
        pedagio: getValue('pedagioNf'),
        vlr_coleta: getValue('coletaNf'),
        base_de_calculo: getValue('baseCalculoNf'),
        aliquota: getValue('aliquotaNf'),
        icms_valor: getValue('icmsNf'),
        total_frete: getValue('freteTotalNf'),
    };
    console.table(dadosFreteDtc)

    return dadosFreteDtc
}

const campoObrigatorio =(campo)=>{
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `O campo ${campo} é obrigatório`,
        showConfirmButton: false,
        timer: 1500
      })
      return null
}