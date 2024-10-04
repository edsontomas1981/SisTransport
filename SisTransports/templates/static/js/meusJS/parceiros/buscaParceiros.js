let txtBuscaParceiro = document.getElementById('nomeOuCnpjParceiro');

txtBuscaParceiro.addEventListener('input', () => {
    if (txtBuscaParceiro.value.length > 2) { 
        busca_parceiro_por_trecho(txtBuscaParceiro.value,populaTabelaParceiros)
    }
});

let preparaDados = (parceiros)=>{
    let listaParceiros = []
    parceiros.forEach(element => {
        listaParceiros.push({id:element.cnpj_cpf,
            fantasia:element.nome_fantasia,
            razao:element.raz_soc,
        })
    });
    return listaParceiros
}

const populaTabelaParceiros = (parceiros,txtCnpj,txtRazaoSoc)=>{
    const buscarParceiroPorCnpj=(e)=> {
      let parceiro = parceiros.filter(parceiro => parceiro.cnpj_cpf === e);

      cnpjBuscaParceiro.value = parceiro[0].cnpj_cpf
      razaoParceiro.value = parceiro[0].raz_soc
      closeModal()
    }

    let dados = preparaDados(parceiros)
    let botao = {
              editar: {
              classe: 'btn-success',
              texto: '<i class="fa fa-check" aria-hidden="true"></i>',
              callback: buscarParceiroPorCnpj
            }
          }
    popula_tbody_paginacao('paginacaoModalParceiros','tbodyModalParceiros',dados,botao,1,10,false,false)


  
} 

