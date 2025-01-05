let btnAddDocumentoFatura = document.getElementById('btnAddDocumentoFatura')

btnAddDocumentoFatura.addEventListener('click', async () => {

    let botao = {
        editar: {
        classe: 'btn-danger ',
        texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
        callback: removeCteFatura
        }
      }

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
    
    let response = await getDocumentoAddFatura(numDcto.value,idTipoDocumento.value)

    if(response.cte.fatura.id){
        msgErroFixa(`O CTe já está vinculado à fatura ${response.cte.fatura.id}. Remova-o da fatura atual para poder incluí-lo novamente.`);
        return
    }

    let cte = response.cte
    if(registroJaExisteFatura(ctesFatura,'id',cte.dtc_fk.id) != true){
        ctesFatura.push(preparaCteFatura(response.cte))
    }

    let valorFatura = formatarMoeda((somaFretes(ctesFatura)))
    document.getElementById('valorTotalMdlFatura').value = valorFatura
    popula_tbody_paginacao('paginacaoMdlFatura','tableDtcFatura',ctesFatura,botao,1,30,false,false)
    populaValorAPagar()
});
