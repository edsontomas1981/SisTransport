const btnSalvaNf = document.getElementById('btnSalvaNf');
btnSalvaNf.addEventListener('click', async (e) => {
  let chaveAcesso = document.getElementById('chaveAcessoNf');
  
  switch (await checaChaveAcessoCnpjRem(chaveAcesso.value)) { // Usando await para esperar a função assíncrona
    case true:
      createNF();
      break;
    case false:
      let checkCnpj = await nfDivergeChaveAcesso();
      if (checkCnpj) {
        createNF();
      } else {
        limpaNf();
      }
  }
});

const nfDivergeChaveAcesso = async () => {
  const result = await Swal.fire({
    title: 'Divergência nos Dados',
    text: "O CNPJ do remetente difere do informado pela chave de acesso. Deseja continuar mesmo assim?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, continuar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    return true;
  } else {
    return false;
  }
}



const createNF = async()=>{
  let data = gereDadosNf()
  if(data){
    if($('#numDtc').val() != ''){
      data.dtc=$('#numDtc').val()
      let conexao = new Conexao('/operacional/createNf/', data);
      try {
          const result = await conexao.sendPostRequest();
          msgCadastraAlteraNf(result)
          preencherTabelaNf(result.nf)
          limpaNf();
          // Imprime a resposta JSON da solicitação POST
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Campo Obrigatório',
          text: error,
          confirmButtonText: 'OK'
      });
          console.error(error); // Imprime a mensagem de erro
      }
    }else{
      Swal.fire({
          icon: 'error',
          title: 'Campo Obrigatório',
          text: 'É necessário selecionar um Dtc para a inclusão de notas fiscais.',
          confirmButtonText: 'OK'
      });
      
    }
  }
}

const msgCadastraAlteraNf =(response)=>{
  switch (response.status) {
    case 201:
      msgNf('alterada')
      break;
    case 200:
      msgNf('incluída')
      break;
    default:
      break;
  }
}

const msgNf =(mensagem)=>{
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `A nota fiscal foi ${mensagem} com sucesso!`,
    showConfirmButton: false,
    timer: 1000
  })

}
