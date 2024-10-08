let btnBuscaModalFatura = document.getElementById('btnBuscaMdlFatura')
let idFatura = document.getElementById('idFaturaBusca')

btnBuscaModalFatura.addEventListener('click',async()=>{
    if (idFatura.value != ''){
        let response = await conectaEndpoint('/faturamento/get_fatura/',{idFatura:idFatura.value})
        switch (response.status) {
            case 200:
              populaModalFaturas(response.fatura)
              openModal('mdlFatura')
              break;
            case 404:
              msgAviso('Fatura não encontrada. Verifique as informações e tente novamente.')
              break;
      
            default:
              msgErro('Ocorreu um erro interno. Tente novamente mais tarde ou entre em contato com o suporte.')
              break;
          }
    }else{
        msgAviso('Por favor, informe o número da fatura.')
    }
    
})

