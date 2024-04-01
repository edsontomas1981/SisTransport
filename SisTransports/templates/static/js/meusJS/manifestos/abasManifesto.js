document.getElementById('pills-pagamentos-tab').addEventListener('click', function (event) {
    document.getElementById('pills-pagamentos-tab').classList.remove('disabled');
})
// Adiciona um event listener para o evento show.bs.tab na aba pills-pagamentos-tab
document.getElementById('pills-pagamentos-tab').addEventListener('show.bs.tab', function (event) {
    // Verifica as condições antes de permitir que a aba seja aberta
    let numManifesto = document.getElementById('spanNumManifesto');
    if (numManifesto.textContent === '') {
        // Se as condições não forem atendidas, cancela a abertura da aba
        event.preventDefault();
        document.getElementById('pills-pagamentos-tab').classList.add('disabled');
        msgAviso("É necessário selecionar um manifesto para prosseguir.");
    }else{
        if(document.getElementById('dataEmissaoContrato').value == ''){
            carregaDataAtual()
        }
        somaContrato()
    }
});



const carregaDataAtual =() =>{
        // Obtém a data atual no formato YYYY-MM-DD
        var today = new Date().toISOString().split('T')[0];

        // Define a data atual como o valor padrão para o elemento input
        document.getElementById('dataEmissaoContrato').value = today;
}

