const btnSalvaNf = document.getElementById('btnSalvaNf')
btnSalvaNf.addEventListener('click',async (e)=>{
    let data = gereDadosNf()
    if(data){
      if($('#numDtc').val() != ''){
        data.dtc=$('#numDtc').val()
        let conexao = new Conexao('/operacional/createNf/', data);
        try {
            const result = await conexao.sendPostRequest();
            console.log(result)
            msgCadastraAlteraNf(result)
            preencherTabelaNf(result.nf)
            limpaNf();
            // Imprime a resposta JSON da solicitação POST
        } catch (error) {
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
})

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
    timer: 500
  })

}
