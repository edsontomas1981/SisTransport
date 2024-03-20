let btnAddDocumento = document.getElementById('btnAddDocumento')
let listaDocumentos = []

const removerDocumentoPorId=(id)=> {
    listaDocumentos = listaDocumentos.filter(item => item.id != id); 
    popula_tbody('tableDtcManifesto', listaDocumentos, botoesManifesto, false);
}

let botoesManifesto={
    excluir: { 
        classe: "btn-danger text-white rounded",
        texto: 'Apagar',
        callback: removerDocumentoPorId
      }
  };

btnAddDocumento.addEventListener('click', async () => {

    // let response = await getDocumento()
    let numDcto = document.getElementById('numeroDocumento')
    let idManifesto = document.getElementById('spanNumManifesto')
    let idTipoDocumento = document.getElementById('cmbTipoDocumento').value
    let cmbTipoManifesto = document.getElementById('cmbTipoManifesto').value

    let respostaDocumento = await connEndpoint('/operacional/add_dtc_manifesto/', {'idTipoDocumento': idTipoDocumento,
                                                                                    'idCte': numDcto.value,
                                                                                    'idManifesto':idManifesto.textContent,
                                                                                    'cmbTipoManifesto':cmbTipoManifesto});

    if (numDcto.value.trim() == '') {
        msgAviso("Por favor, informe um número de documento.");
        return;
    }
    
    if (document.getElementById('cmbTipoManifesto').value == '') {
        msgAviso("Por favor, selecione um tipo de manifesto.");
        return;
    }
    
    if (document.getElementById('cmbTipoDocumento').value == '') {
        msgAviso("Por favor, selecione o tipo de documento.");
        return;
    }

    if (response.status == 200){
        const documento = prepareDataToTableManifesto(response);


        // if (!listaDocumentos.some(item => item.id === documento.id)) {
        //     listaDocumentos.push(documento);
        //     popula_tbody('tableDtcManifesto', listaDocumentos, botoesManifesto, false);
        // } else {
        //     msgAviso("Este documento já foi adicionado anteriormente.");
        // }
    }else{
        msgErro('Não foi possível encontrar o documento. Verifique se os dados estão corretos e tente novamente.')
    }

});


const getDocumento = async()=>{
    let response
    switch (document.getElementById('cmbTipoDocumento').value) {
        case '1':
            response = await connEndpoint('/operacional/get_cte_id/', {'idCte': numDcto.value});
            return response

        case '2':
            response = await connEndpoint('/operacional/get_cte_chave_nfe/', {'chaveNfe': numDcto.value});
            return response

        case '3':
            response = await connEndpoint('/operacional/get_cte_dtc/', {'idDtc': numDcto.value});
            return response

        default:
            break;
    }
}


const prepareDataToTableManifesto = (response)=>{
    return{'id':response.cte.dtc_fk.id,'cte':response.cte.id,
            'remetente':truncateString(response.cte.dtc_fk.remetente.raz_soc,20),
            'destinatario':truncateString(response.cte.dtc_fk.destinatario.raz_soc,20),
            'ocorencia':pegarTextoSelect('cmbTipoManifesto'),
            'dtsaida':'17/10/2007',
            'origem':truncateString(response.cte.dtc_fk.remetente.endereco_fk.cidade,10) + ' - ' + response.cte.dtc_fk.remetente.endereco_fk.uf,
            'destino':truncateString(response.cte.dtc_fk.destinatario.endereco_fk.cidade,8)+ ' - ' + response.cte.dtc_fk.destinatario.endereco_fk.uf,

        }
}




