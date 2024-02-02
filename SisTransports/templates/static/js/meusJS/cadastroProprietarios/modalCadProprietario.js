let fechaModalProp = document.getElementById('btnCloseModalProprietario')
fechaModalProp.addEventListener('click',()=>{
    limpaMdlProp()
})

const limpaMdlProp = ()=>{
    $('#selectTipoProp').val(0)
    $('#cnpj_cpf').val('')
    $('#razaoProp').val('')
    $('#anttProp').val('')
    $('#dataAntt').val('')
}