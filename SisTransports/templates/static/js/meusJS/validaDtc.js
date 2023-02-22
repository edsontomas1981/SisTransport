const validarDtc = () =>{
    let verificaCampos=[]
    if($('#modalidadeFrete').val()>0){
        verificaCampos.push('Selecione a modalidade de frete')
    }

    return verificaCampos

}