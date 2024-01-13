document.addEventListener('DOMContentLoaded',async ()=>{
    populaRotaGeral(await getRotas(),'rotasRelatorioColetas','Todos')
})