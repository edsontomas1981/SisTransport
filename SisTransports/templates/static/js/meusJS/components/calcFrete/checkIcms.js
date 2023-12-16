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
    let dadosNfs = await calculaTotalNfs()
    if ($('#icmsInclusoNf').prop('checked')) {
        console.log('Checkbox marcado');
        tabela.tabela.icmsIncluso=true
    } else {
        console.log('Checkbox desmarcado');
        tabela.tabela.icmsIncluso=false
    }
    populaFreteCte(await calculaFreteCte(tabela,dadosNfs))
    populaTabelaCte(tabela.tabela,'tabelaFreteCte')
})