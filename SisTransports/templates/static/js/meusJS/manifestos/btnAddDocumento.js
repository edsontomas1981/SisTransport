let btnAddDocumento = document.getElementById('btnAddDocumento')
let listaDocumentos = []

const removerDocumentoPorId=async(id)=> {
    let idManifesto = document.getElementById('spanNumManifesto')
    let response  = await connEndpoint('/operacional/delete_dtc_manifesto/', {'idDtc':id,'idManifesto':idManifesto.textContent});
    if(response.status == 200)
    {
        populaTbodyDocumentos(response.documentos)
        populaQtdeDocumentosBarraManifesto(response.documentos.length)
    }else{
        msgErro("Não foi possível excluir o registro.")
    }
}

let botoesManifesto={
    excluir: { 
        classe: "btn-danger text-white rounded",
        texto: 'Apagar',
        callback: removerDocumentoPorId
      }
  };

btnAddDocumento.addEventListener('click', async () => {

    let numDcto = document.getElementById('numeroDocumento')
    let idManifesto = document.getElementById('spanNumManifesto')
    let idTipoDocumento = document.getElementById('cmbTipoDocumento').value
    let cmbTipoManifesto = document.getElementById('cmbTipoManifesto').value

        
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

    let response = await connEndpoint('/operacional/add_dtc_manifesto/', {'idTipoDocumento': idTipoDocumento,
                                                                                    'idDcto': numDcto.value,
                                                                                    'idManifesto':idManifesto.textContent,
                                                                                    'cmbTipoManifesto':cmbTipoManifesto});
    if (parseInt(response.status) != 422){
        populaTbodyDocumentos(response.documentos)
        populaQtdeDocumentosBarraManifesto(response.documentos.length)
        document.getElementById('numeroDocumento').value = ""
        document.getElementById('numeroDocumento').focus()
    }else{
        msgErro('Não foi possível encontrar o documento. Verifique se os dados estão corretos e tente novamente.')
    }
});

const populaTbodyDocumentos =(response)=>{
    const documento = prepareDataToTableManifesto(response);
    popula_tbody('tableDtcManifesto', documento, botoesManifesto, false);
}

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


const prepareDataToTableManifesto = (response) => {
    return response.map(element => {
        const data = {
            id: element.dtc_fk?.id || '',
            cte: element.cte?.id || '',
            remetente: truncateString(element.dtc_fk?.remetente?.raz_soc, 20) || '',
            destinatario: truncateString(element.dtc_fk?.destinatario?.raz_soc, 20) || '',
            ocorrencia: element.ocorrencia_manifesto_fk?.tipo_ocorrencia || '',
            dtsaida: element.manifesto_fk ? formataDataPtBr(element.manifesto_fk.data_previsão_inicio) : '',
            origem: truncateString(element.dtc_fk?.remetente?.endereco_fk?.cidade, 10) + ' - ' + (element.cte?.dtc_fk?.remetente?.endereco_fk?.uf || ''),
            destino: truncateString(element.dtc_fk?.destinatario?.endereco_fk?.cidade, 8) + ' - ' + (element.cte?.dtc_fk?.destinatario?.endereco_fk?.uf || '')
        };
        return data;
    });
}







