document.getElementById('btnCalcular').addEventListener('click',()=>{
    let selecionaTabelaFrete = document.getElementById('selecionaTabelaCte')
    let tipoCalculo = document.getElementById('tipoCalc')
    let titulo = 'Tabela de Frete Não Selecionada'
    let msg = "É essencial escolher pelo menos uma tabela de frete ou optar pela alternativa de 'Frete Informado'."

    if (selecionaTabelaFrete.value == 0 && tipoCalculo.value != 3 ){
        msgTabela(titulo,msg)
    }else{
        calcular('numDtc','selecionaTabelaCte','coletaNf')
    }
})


document.getElementById('btnNovoCalc').addEventListener('click',(e)=>{
    desbloqueiaFreteCalculado()
    e.preventDefault();
})

const msgTabela=(titulo,msg)=>{
    Swal.fire({
        title: titulo,
        text: msg,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendi, Continuar',
    });
}

const verificaFreteCalculado=()=>{
    let tipoCalculo = document.getElementById('tipoCalc')
    let freteCalculado = document.getElementById('freteCalculado')
    if (tipoCalculo.value === '3' && (freteCalculado.value === '' || freteCalculado.value === '0' )){
        return false
    }else{
        return true
    }
}

const calcular = async (numDtc,tabelaDtc,coleta)=>{
    let freteCalculado = document.getElementById('freteCalculado')
    let titulo = 'Frete nao informado'
    let msg = "É essencial informar o valor do frete."

    let dados = await calculaTotalNfs()
    dados.idDtc = $('#'+numDtc).val(); 
    dados.idTabela = $('#'+tabelaDtc).val()
    dados.vlrColeta = $('#'+coleta).val();
    dados.icmsIncluso = document.getElementById('icmsInclusoNf').checked

    if(verificaFreteCalculado()){
        dados.freteInformado = freteCalculado.value
    }else{
        msgTabela(titulo,msg)
        return false
    }
    let url = '/comercial/calcula/calcula_frete/'    
    let conexao = new Conexao(url,dados)
    let result = await conexao.sendPostRequest()
    populaFreteNf(result)
}

const populaFreteNf=(response)=>{
    document.getElementById('freteCalculado').value=response.subtotais.frete_calculado
    document.getElementById('advalorNf').value=response.subtotais.advalor
    document.getElementById('coletaNf').value=response.subtotais.coleta
    document.getElementById('grisNf').value=response.subtotais.gris
    document.getElementById('pedagioNf').value=response.subtotais.pedagio
    document.getElementById('despachoNf').value=response.subtotais.despacho
    document.getElementById('outrosNf').value=response.subtotais.outros
    document.getElementById('baseCalculoNf').value=response.subtotais.base_de_calculo
    document.getElementById('aliquotaNf').value=response.subtotais.aliquota
    document.getElementById('icmsNf').value=response.subtotais.vlr_icms
    document.getElementById('freteTotalNf').value=response.subtotais.total_frete_com_icms
}

