const carregaTipoManifeto = async ()=>{

    let response = await connEndpoint('/operacional/get_ocorrencias_manifesto/',{})

    adicionarDadosAoSelect(response.ocorrencias,'cmbTipoManifesto','id','tipo_ocorrencia')

}

const carregaTipoDocumentos = async ()=>{

    let response = await connEndpoint('/operacional/get_tipos_documentos/',{})

    console.log(response)

    adicionarDadosAoSelect(response.tipos,'cmbTipoDocumento','id','tipo_documento')

}

document.addEventListener('DOMContentLoaded', ()=>{
    alert('manifesto')
    carregaTipoManifeto()
    carregaTipoDocumentos()
})
