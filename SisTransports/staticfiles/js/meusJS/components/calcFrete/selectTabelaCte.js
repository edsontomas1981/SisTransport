
const tabelaCte = document.getElementById('selecionaTabelaCte');
tabelaCte.addEventListener('change', async () => {
    let tabela =await readTabelaCte()
    tabela.tabela.faixas = tabela.faixas
    let dadosNfs = await calculaTotalNfs()
    populaFreteCte(await calculaFreteCte(tabela,dadosNfs))
    populaTabelaCte(tabela.tabela,'tabelaFreteCte')
    icmsConfTabela(tabela.tabela)
});

// Carrega a tabela Selecionada
const readTabelaCte = async ()=>{
    let dados = {'numTabela':document.getElementById('selecionaTabelaCte').value}
    let conexao = new Conexao('/comercial/readTabelaId/', dados);
    try {
        const result = await conexao.sendPostRequest();
        return result
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}  

const populaFreteCte = async (composicaoFrete)=>{
    $('#freteCalculadoCte').val(composicaoFrete.fretePeso ?parseFloat(composicaoFrete.fretePeso).toFixed(2) : '');
    $('#advalorCte').val(composicaoFrete.advalor ? composicaoFrete.advalor.toFixed(2) : '');
    $('#coletaCte').val(composicaoFrete.vlrColeta ? composicaoFrete.vlrColeta.toFixed(2) : '');
    $('#grisCte').val(composicaoFrete.gris ? composicaoFrete.gris.toFixed(2) : '');
    $('#pedagioCte').val(composicaoFrete.vlrPedagio ? composicaoFrete.vlrPedagio.toFixed(2) : '');
    $('#despachoCte').val(composicaoFrete.despacho ? composicaoFrete.despacho.toFixed(2) : '');
    $('#outrosCte').val(composicaoFrete.outros ? composicaoFrete.outros.toFixed(2) : '');
    $('#baseCalculoCte').val(composicaoFrete.baseDeCalculo ? composicaoFrete.baseDeCalculo.toFixed(2) : '');
    $('#aliquotaCte').val(composicaoFrete.aliquota ? composicaoFrete.aliquota.toFixed(2) : '');
    $('#icmsCte').val(composicaoFrete.icms ? composicaoFrete.icms.toFixed(2) : '');
    $('#freteTotalCte').val(composicaoFrete.freteTotal ? composicaoFrete.freteTotal.toFixed(2) : '');

}

const limpaFreteCte = ()=>{
    $('#freteCalculadoCte').val('');
    $('#advalorCte').val('');
    $('#coletaCte').val('');
    $('#grisCte').val('');
    $('#pedagioCte').val('');
    $('#despachoCte').val('');
    $('#outrosCte').val('');
    $('#baseCalculoCte').val('');
    $('#aliquotaCte').val('');
    $('#icmsCte').val('');
    $('#freteTotalCte').val('');
}


const populaTabelaCte = (tabela,idCampo)=>{
    $('#'+idCampo).val('Tabela : ' + tabela.descricao)
}

const calculaFreteCte = async (tabela, dadosNfs) => {
    // tabela.tabela.faixas = tabela.faixas; // Removi o await, pois não parece necessário
  
    let vlrColeta = document.getElementById('coletaCte');
    // vlrColeta.value = await adicionaColeta();
    let calculoFrete = new CalculaFrete(tabela.tabela, dadosNfs);
    // calculoFrete.setVlrColeta(parseFloat(vlrColeta.value));
    calculoFrete.calculaFrete();
  
    return calculoFrete.composicaoFrete;
};
  


const  adicionaColeta= async ()=> {
    const result = await Swal.fire({
        title: 'Deseja adicionar um valor de coleta?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
    });

    if (result.isConfirmed) {
        const { value: vlrColeta } = await Swal.fire({
            input: 'text',
            inputLabel: 'Insira o valor em R$',
            inputPlaceholder: 'Exemplo: 25,99'
    });
        console.log(parseFloat(vlrColeta))
        return parseFloat(vlrColeta)
    }else{
        return 0.00
    } 
}

