document.getElementById('btnCalcular').addEventListener('click',()=>{
    let selecionaTabelaFrete = document.getElementById('selecionaTabelaCte')
    let titulo = 'Tabela de Frete Não Selecionada'
    let msg = "É essencial escolher pelo menos uma tabela de frete ou optar pela alternativa de 'Frete Informado'."

    if (selecionaTabelaFrete.value == 0){
        msgTabela(titulo,msg)
    }else{
        calcular('numDtc','selecionaTabelaCte','coletaNf')
    }
})

const msgTabela=(titulo,msg)=>{
    Swal.fire({
        title: titulo,
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Entendi, Continuar',
        cancelButtonText: 'Cancelar'
    });
}

const calcular = async (numDtc,tabelaDtc,coleta)=>{
    let dados = await calculaTotalNfs()
    dados.idDtc = $('#'+numDtc).val(); 
    dados.idTabela = $('#'+tabelaDtc).val()
    dados.vlrColeta = $('#'+coleta).val();
    let url = '/comercial/calcula/calcula_frete/'    
    let conexao = new Conexao(url,dados)
    let result = await conexao.sendPostRequest()
    console.log(result)
}

