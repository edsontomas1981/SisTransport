let selectTipoCalc = document.getElementById('tipoCalc')
selectTipoCalc.addEventListener('change',()=>{
    switch (selectTipoCalc.value) {
        case '3':
            desbloqueiaCamposFrete()
            populaTabelaCte({'descricao':'Frete Informado'},'tabelaFreteCte')
            break;

        default:
            bloqueiaCamposFrete()
            populaTabelaCte({'descricao':''},'tabelaFreteCte')
            break;
    }
})