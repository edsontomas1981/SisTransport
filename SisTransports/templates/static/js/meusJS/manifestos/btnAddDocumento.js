let btnAddDocumento = document.getElementById('btnAddDocumento')
let numDcto = document.getElementById('numeroDocumento')
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
    let response = await connEndpoint('/operacional/get_cte_dtc/', {'idDtc': numDcto.value});
    

    const documento = prepareDataToTableManifesto(response);
    if (!listaDocumentos.some(item => item.id === documento.id)) {
        listaDocumentos.push(documento);
        popula_tbody('tableDtcManifesto', listaDocumentos, botoesManifesto, false);
    } else {
        console.log("Documento com ID repetido. Não pode ser adicionado à lista.");
    }
});


const prepareDataToTableManifesto = (response)=>{
    return{'id':response.cte.dtc_fk.id,'cte':response.cte.id,
            'remetente':truncateString(response.cte.dtc_fk.remetente.raz_soc,20),
            'destinatario':truncateString(response.cte.dtc_fk.destinatario.raz_soc,20),
            'ocorencia':'Carregando',
            'dtsaida':'17/10/2007',
            'origem':truncateString(response.cte.dtc_fk.remetente.endereco_fk.cidade,10) + ' - ' + response.cte.dtc_fk.remetente.endereco_fk.uf,
            'destino':truncateString(response.cte.dtc_fk.destinatario.endereco_fk.cidade,8)+ ' - ' + response.cte.dtc_fk.destinatario.endereco_fk.uf,

        }
}




