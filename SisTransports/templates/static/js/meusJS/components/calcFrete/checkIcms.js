let icmsInclusoNf = document.getElementById('icmsInclusoNf')

const icmsConfTabela = (tabela)=>{
    if (tabela.icmsIncluso){
        $('#icmsInclusoNf').prop('checked', true);
    }else{
        $('#icmsInclusoNf').prop('checked', false);
    }
}

icmsInclusoNf.addEventListener('click',async ()=>{
    let tabela =await readTabelaCte()
    tabela.tabela.faixas = tabela.faixas
    let dadosNfs = await calculaTotalNfs()
    if ($('#icmsInclusoNf').prop('checked')) {
        tabela.tabela.icmsIncluso=true
    } else {
        tabela.tabela.icmsIncluso=false
    }
    populaFreteCte(await calculaFreteCte(tabela,dadosNfs))
    populaTabelaCte(tabela.tabela,'tabelaFreteCte')
})