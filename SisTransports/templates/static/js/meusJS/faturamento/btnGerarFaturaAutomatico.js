let btnGerarFaturaAutomatica = document.getElementById('btnGerarFaturaAutomatica')

btnGerarFaturaAutomatica.addEventListener('click',async()=>{
    let dados = obterDadosDoFormulario('frmFaturamentoAutomatico')
    let url = '/faturamento/gerar_faturas/'
    let response = await conectaEndpoint(url,dados)
    popula_tbody('tbodyFaturas',response.faturas,false,false)
})