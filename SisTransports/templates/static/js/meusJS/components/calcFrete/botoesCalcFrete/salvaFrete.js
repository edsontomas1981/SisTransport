let btnSalvaFrete = document.getElementById('btnSalvaCalc')

btnSalvaFrete.addEventListener('click',async ()=>{
    let dados = criarDadosFreteDtc();
    let url = '/operacional/createFrete/'    
    let conexao = new Conexao(url,dados)
    let result = await conexao.sendPostRequest()
})


const criarDadosFreteDtc=()=> {
    const dadosFreteDtc = {
        // origemCte: document.getElementById('origemCte').value,
        // destinoCte: document.getElementById('destinoCte').value,
        // emissoraCte: document.getElementById('emissoraCte').value,
        // tipoCte: document.getElementById('tipoCte').value,
        // cfopCte: document.getElementById('cfopCte').value,
        // redespCte: document.getElementById('redespCte').value,
        observacao: document.getElementById('observacaoCte').value,
        tipoCalc: document.getElementById('tipoCalc').value,
        selecionaTabelaCte: document.getElementById('selecionaTabelaCte').value,
        icmsIncluso: document.getElementById('icmsInclusoNf').checked,
        totalFrete: document.getElementById('freteCalculado').value,
        adValor: document.getElementById('advalorNf').value,
        vlrColeta: document.getElementById('coletaNf').value,
        gris: document.getElementById('grisNf').value,
        pedagio: document.getElementById('pedagioNf').value,
        despacho: document.getElementById('despachoNf').value,
        outros: document.getElementById('outrosNf').value,
        baseDeCalculo: document.getElementById('baseCalculoNf').value,
        aliquota: document.getElementById('aliquotaNf').value,
        icmsRS: document.getElementById('icmsNf').value,
        totalFrete: document.getElementById('freteTotalNf').value,
    };

    return dadosFreteDtc;
}
