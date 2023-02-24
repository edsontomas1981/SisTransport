const validarDtc = () => {

    let rotas=document.getElementById('rotasDtc')
    let modalidade=document.getElementById('modalidadeFrete')
    let pagador=document.getElementById('cnpjTomador')
    let vazio=0
    let verificaCampos = []

    switch (true) {
        case (rotas.selectedIndex === 0 && modalidade.selectedIndex === 0):
          verificaCampos.push(1)
          return verificaCampos;
        case (rotas.selectedIndex === 0):
            verificaCampos.push(2);
          return verificaCampos;
        case (modalidade.selectedIndex === 0):
            verificaCampos.push(3);
          return verificaCampos;
        default:
          return true;
    }

}
