document.addEventListener("DOMContentLoaded",async ()=>{
  let faturas = popula_relatorio_faturas()

})

document.getElementById('btnBuscaFaturasRelatorio').addEventListener('click',async()=>{
  let response = await conectaEndpoint('/faturamento/get_fatura_criterios/',{'id':12345})
  console.log(response)
})