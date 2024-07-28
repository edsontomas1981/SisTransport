let btnGerarFaturaAutomatica = document.getElementById('btnGerarFaturaAutomatica')

btnGerarFaturaAutomatica.addEventListener('click',async()=>{
    let dados = obterDadosDoFormulario('frmFaturamentoAutomatico')
    let url = '/faturamento/gerar_faturas/'
    conectaEndpoint(url,dados)
})