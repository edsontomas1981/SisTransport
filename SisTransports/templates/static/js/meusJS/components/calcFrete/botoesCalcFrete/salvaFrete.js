let btnSalvaFrete = document.getElementById('btnSalvaCalc')

btnSalvaFrete.addEventListener('click',async ()=>{
    let dados = criarDadosFreteDtc();
    let url = '/operacional/createFrete/'    
    let conexao = new Conexao(url,dados)
    let result = await conexao.sendPostRequest()
})


const criarDadosFreteDtc=()=> {
    const dadosFreteDtc = {
        origem_cte: document.getElementById('origemCte').value,
        destino_cte: document.getElementById('destinoCte').value,
        emissora_cte: document.getElementById('emissoraCte').value,
        tipo_cte: document.getElementById('tipoCte').value,
        cfop_cte: document.getElementById('cfopCte').value,
        redesp_cte: document.getElementById('redespCte').value,
        tipo_calculo_cte: document.getElementById('tipoCalc').value,
        tabela_frete: document.getElementById('selecionaTabelaCte').value,
        observacao: document.getElementById('observacaoCte').value,
        icms_incluso: document.getElementById('icmsInclusoNf').checked,
        frete_calculado: document.getElementById('freteCalculado').value,
        advalor: document.getElementById('advalorNf').value,
        gris: document.getElementById('grisNf').value,
        despacho: document.getElementById('despachoNf').value,
        outros: document.getElementById('outrosNf').value,
        pedagio: document.getElementById('pedagioNf').value,
        vlr_coleta: document.getElementById('coletaNf').value,
        base_de_calculo: document.getElementById('baseCalculoNf').value,
        aliquota: document.getElementById('aliquotaNf').value,
        icms_valor: document.getElementById('icmsNf').value,
        total_frete: document.getElementById('freteTotalNf').value,
    };

    return dadosFreteDtc;
}
