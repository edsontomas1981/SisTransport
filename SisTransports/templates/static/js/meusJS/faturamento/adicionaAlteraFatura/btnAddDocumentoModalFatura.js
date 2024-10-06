
let ctesFatura = []

let btnAddDocumento = document.getElementById('btnAddDocumentoFatura')
btnAddDocumento.addEventListener('click', async () => {

    const getDocumentoAddFatura = async()=>{
        let response
        switch (document.getElementById('cmbTipoDocumentoFatura').value) {
            case '1':
                response = await connEndpoint('/operacional/get_cte_id/', {'idCte': numDcto.value});
                return response
    
            case '3':
                response = await connEndpoint('/operacional/get_cte_dtc/', {'idDtc': numDcto.value});
                return response
    
            default:
                break;
        }
    }

    const preparaCteFatura = (cte)=>{
        return{id:cte.dtc_fk.id,
            idCte:cte.id,
            remetente:truncateString(cte.dtc_fk.remetente.raz_soc,20),
            destinatario:truncateString(cte.dtc_fk.destinatario.raz_soc,20),
            freteTotal:formatarMoeda(cte.totalFrete),
            tomador:truncateString(cte.dtc_fk.tomador.raz_soc,20)
        }
    }

    const registroJaExisteFatura = (array, propriedade, valor)=> {
        return array.some(element => parseInt(element[propriedade]) === parseInt(valor));
    }
    
    // Função para somar os valores dos fretes
    const somaFretes = (ctes) => {
        return ctes.reduce((total, cte) => {
            const frete = parseFloat(converterMoedaParaNumero(cte.freteTotal)); // Obtém o valor do frete
            return frete ? total + frete : total; // Soma apenas se o valor do frete for válido
        }, 0); // Inicializa o total em 0
    };
    

    let numDcto = document.getElementById('numeroDocumentoFatura')
    let idTipoDocumento = document.getElementById('cmbTipoDocumentoFatura')
        
    if (numDcto.value.trim() == '') {
        msgAviso("Por favor, informe um número de documento.");
        return;
    }

    if (idTipoDocumento.value.trim() == '') {
        msgAviso("Por favor, informe o tipo de documento.");
        return;
    }
    
    let response = await getDocumentoAddFatura()

    let cte = response.cte
    if(registroJaExisteFatura(ctesFatura,'id',cte.dtc_fk.id) != true){
        ctesFatura.push(preparaCteFatura(response.cte))
    }

    let valorFatura = formatarMoeda((somaFretes(ctesFatura)))
    document.getElementById('valorTotalMdlFatura').value = valorFatura
    popula_tbody_paginacao('paginacaoMdlFatura','tableDtcFatura',ctesFatura,false,1,30,false,false)

    concedeDesconto()
});
