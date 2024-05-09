const constroeModalVeiculosPlanejamento=(element)=>{
    let containerTituloModalVeiculos = document.getElementById("modalVeiculoId")
    limpaContainers("modalVeiculoId")
    let titulo = document.createElement('h4');
    titulo.textContent = `Motorista: ${element.motorista}`

    containerTituloModalVeiculos.appendChild(titulo)
    let subTitulo = document.createElement('h5');
    subTitulo.textContent = `Placa: ${element.placa}`
    containerTituloModalVeiculos.appendChild(subTitulo)

    let botoes = {
        mostrar: {
          classe: "btn-success text-white",
          texto: '<i class="fa fa-print" aria-hidden="true"></i>',
          // callback: abrirMdlTabela
        },
        excluir: {
            classe: "btn-danger text-white",
            texto: '<i class="fa fa-print" aria-hidden="true"></i>',
            // callback: abrirMdlTabela
          }
      };
    popula_tbody("tbodyDocumentos",element.dados,botoes,false)
    openModal('modalPlanejamentoVeiculos')
}