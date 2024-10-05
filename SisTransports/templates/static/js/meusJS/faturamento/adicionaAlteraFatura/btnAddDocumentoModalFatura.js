
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
            remetente:cte.dtc_fk.remetente.raz_soc,
            destinatario:cte.dtc_fk.destinatario.raz_soc,
            freteTotal:cte.totalFrete,
            tomador:cte.dtc_fk.tomador.raz_soc
        }
    }

    const registroJaExisteFatura = (array, propriedade, valor)=> {
        return array.some(element => parseInt(element[propriedade]) === parseInt(valor));
    }
    
    // Função para somar os valores dos fretes
    const somaFretes = (ctes) => {
        return ctes.reduce((total, cte) => {
            const frete = parseFloat(cte.freteTotal); // Obtém o valor do frete
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
    console.log(registroJaExisteFatura(ctesFatura,'id',cte.dtc_fk.id) != true)
    if(registroJaExisteFatura(ctesFatura,'id',cte.dtc_fk.id) != true){
        ctesFatura.push(preparaCteFatura(response.cte))
    }

    let valorFatura = somaFretes(ctesFatura)
    document.getElementById('valorTotal').value = valorFatura
    popula_tbody('tableDtcFatura',ctesFatura,false,false)

});
