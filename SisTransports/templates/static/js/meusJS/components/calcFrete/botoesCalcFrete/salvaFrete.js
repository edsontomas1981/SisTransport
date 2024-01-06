const criarDadosFreteDtc=()=>{
    const getValue = (elementId) => {
        
        const element = document.getElementById(elementId);

        if (element.id == 'cfopCte' && element.value ==0){
            campoObrigatorio('CFOP')
            element.focus();
            throw new Error(`Elemento obrigatório ${elementId} não encontrado.`);
        }

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
        frete_calculado : getValue('freteCalculadoCte'),
        advalor: getValue('advalorCte'),
        gris: getValue('grisCte'),
        despacho: getValue('despachoCte'),
        outros: getValue('outrosCte'),
        pedagio: getValue('pedagioCte'),
        vlr_coleta: getValue('coletaCte'),
        base_de_calculo: getValue('baseCalculoCte'),
        aliquota: getValue('aliquotaCte'),
        icms_valor: getValue('icmsCte'),
        total_frete: getValue('freteTotalCte'),
    };

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