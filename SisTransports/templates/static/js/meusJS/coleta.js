class Coleta {
  constructor(url) {
    this.url = url;
    this.csrfToken = this.getCSRFToken();
  }

  getCSRFToken() {
    const cookieValue = document.cookie.match(/(^|;)csrftoken=([^;]*)/)[2];
    return cookieValue;
  }

  async sendPostRequest(data) {
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": this.csrfToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      alert("Erro interno!");
    }
  }

  async createColeta() {
    const data = this.carregaDadosRequisicao()
    const result = await this.sendPostRequest(data);
    this.resposta=result;
    switch (this.resposta.status) {
      case 200:
        alert('A coleta foi salva com sucesso! \
Se precisar editar ou revisar as informações que foram salvas, \
você pode fazer aqui mesmo ou encontrá-las na sua lista de coletas. \
Se tiver alguma dúvida ou precisar de ajuda adicional, \
entre em contato conosco.')
        break;
      case 300:
        this.alertCamposFaltando(this.resposta.camposVazios)
        break;        
      default:
        break;
    }
    
  }

  async deleteColeta() {
    const data = this.carregaDadosRequisicao()
    const result = await this.sendPostRequest(data);
    this.resposta=result;
    switch (this.resposta.status) {
      case 200:
        alert('A coleta foi excluída com sucesso. Todos os dados foram removidos permanentemente')
        break;
      case 300:
        this.alertCamposFaltando(this.resposta.camposVazios)
        break;        
      default:
        break;
    }
}  

  alertCamposFaltando(campos) {
    let msgInicial = 'Os campos '
    let eOuVirgula
    let camposFaltando = ''
    for (let i = 0; i < campos.length; i++) {
      eOuVirgula = campos.length == i + 2 ? " e " :
          campos.length == i + 1 ? '' : ', ';
      camposFaltando += campos[i] + eOuVirgula
    }
    msgInicial += camposFaltando + ' precisam ser preenchidos.'
    alert(msgInicial)
  }
  

  loadDados=()=>{
    this.dtc=$('#numDtc').val()
    this.nf=$('#nf').val()
    this.volume=$('#volumes').val()
    this.peso=$('#peso').val()
    this.m3=$('#resultM3').val()
    this.valor=$('#valor').val()
    this.especie=$('#especie').val()
    this.veiculo=$('#veiculo').val()
    this.tipoMercadoria=$('#mercadoria').val()
    this.horario=$('#horario').val()
    this.obs=$('#obs').val()
    this.cep=$('#cepColeta').val()
    this.rua=$('#ruaColeta').val()
    this.numero=$('#numeroColeta').val()
    this.complemento=$('#complementoColeta').val()
    this.bairro=$('#bairroColeta').val()
    this.cidade=$('#cidadeColeta').val()
    this.uf=$('#ufColeta').val()
    this.nomeContato=$('#nomeColeta').val()
    this.numeroContato=$('#contatoColeta').val()
  }

  carregaDadosRequisicao=()=>{
    this.loadDados();
      return {
          dtc:this.dtc,
          nf:this.nf,
          volume:this.volume,
          peso:this.peso,
          m3:this.m3,
          valor:this.valor,
          especie:this.especie,
          veiculo:this.veiculo,
          tipoMercadoria:this.tipoMercadoria,
          horario:this.horario,
          obs:this.obs,
          cep:this.cep,
          rua:this.rua,
          numero:this.numero,
          complemento:this.complemento,
          bairro:this.bairro,
          cidade:this.cidade,
          uf:this.uf,
          nomeContato:this.nomeContato,
          numeroContato:this.numeroContato
          };
  }
}


$('#btnSalvaColeta').on('click', function(e) {
  if ($('#numPed').val()!=''){
    const coleta=new Coleta('/operacional/createColeta/')
    coleta.createColeta();
    e.preventDefault();
  }else{
    alert("Por favor, selecione ou salve um dtc antes de prosseguir.")
  }
})

$('#btnExcluiColeta').on('click', function(e) {
  let confirmar =confirm('Tem certeza que deseja excluir esta coleta?\
Esta ação é irreversível e todos os dados coletados serão perdidos.')
  if (confirmar){
    if ($('#numPed').val()!=''){
      const coleta=new Coleta('/operacional/deleteColeta/')
      coleta.deleteColeta()
      e.preventDefault();
    }else{
      alert("Por favor, selecione ou salve um dtc antes de prosseguir.")
    }
  }
})





// class Coleta{
//   constructor(dtc) {
//     this.dtc = dtc;
//   }

//   sendPostRequest = async (url, onSuccess = () => {}) => {
//     let idDtc = this.dtc
//     if (idDtc) {
//         if (validateDocumentNumber(this.dtc)) {
//           let postData = $("form").serialize();
//           postData += "&dtcColeta=" + this.dtc;
//           try {
//             const response = await fetch(url, {
//               method: "POST",
//               headers: { "Content-Type": "application/x-www-form-urlencoded" },
//               body: postData,
//             });
//             if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const result = await response.json();
//             // Chama o callback de sucesso com o resultado da requisição
//             onSuccess(result);
//           } catch (error) {
//             console.error(error);
//             alert("Erro interno !");
//           }
//         } else {
//           alert("Dtc não informado !");
//         }
//       }
//     };

//       createParceiro= async ()=>{
//         await this.sendPostRequest('/operacional/createColeta/', this.carregaDados);
//       }       
//       readParceiro= async ()=>{
//         await this.sendPostRequest('/operacional/readColeta/', this.carregaDados);
//       } 
//       updateParceiro= async ()=>{
//         await this.sendPostRequest('/operacional/updateColeta/', this.carregaDados);
//       } 
//       deleteParceiro= async ()=>{
//         await this.sendPostRequest('/operacional/deleteColeta/', this.carregaDados);
//       }             

//       carregaDados= async (response)=>{
//         this.status=response.status

//         switch (this.status) {
//           case 200:
//             console.log(response)
//             // this.id = response.parceiro.id;
//             // this.raz_soc = response.parceiro.raz_soc;
//             // this.cnpj = response.parceiro.cnpj_cpf;
//             // this.inscr = response.parceiro.insc_est;
//             // this.fantasia = response.parceiro.nome_fantasia;
//             // this.obs = response.parceiro.observacao;
//             // this.cep = response.parceiro.endereco_fk.cep;
//             // this.rua=response.parceiro.endereco_fk.logradouro
//             // this.complemento=response.parceiro.endereco_fk.complemento
//             // this.numero=response.parceiro.endereco_fk.numero
//             // this.bairro =response.parceiro.endereco_fk.bairro
//             // this.cidade=response.parceiro.endereco_fk.cidade
//             // this.uf=response.parceiro.endereco_fk.uf
//             // this.contatos=response.contatos
//             // this.tabelas=response.tabelas
//             // this.populaCampos()
//             break;
//           case 404 :
//             alert('Parceiro nao cadastrado!')
//             break;
//           default:
//             alert('Erro interno')
//             break;
//         }
//       }
// }


// function msgCamposFaltando(response) {
//     let msgInicial = 'Os campos, '
//     let eOuVirgula
//     for (let i = 0; i < response.camposObrigatorios.length; i++) {
//         eOuVirgula = response.camposObrigatorios.length == i + 2 ? " e " :
//             response.camposObrigatorios.length == i + 1 ? '' : ', ';
//         msgInicial += response.camposObrigatorios[i] + eOuVirgula

//     }
//     msgInicial += ' precisam ser preenchidos.'
//     return msgInicial
// }


// $('#btnExcluiColeta').on('click', function(e) {
//     let msg = 'Deseja realmente excluir a coleta ?'
//     if (confirmacao(msg)) {
//         deletaColeta($('#numPed').val())
//     }
//     e.preventDefault();
// })

// $('#btnNovoColeta').on('click', function(e) {
//     e.preventDefault();
// })

// function confirmacao(msg) {
//     var resposta = confirm(msg);
//     return resposta
// }

// // function salvaColeta() {
// //     let url = '/preDtc/saveColeta/'
// //     let postData = $('form').serialize();
// //     $.ajax({
// //         url: url,
// //         type: 'POST',
// //         data: postData,
// //         success: function(response) {
// //             switch (response.status) {
// //                 case 201:
// //                     alert('Coleta alterada com sucesso !')
// //                     break;
// //                 case 200:
// //                     alert('Coleta salva com sucesso !')
// //                     completaColeta(response.coleta)
// //                     break;
// //                 case 411:
// //                     msg = msgCamposFaltando(response)
// //                     alert(msg)
// //                     break;
// //                 case 410:
// //                     alert('Pedido não informado.')
// //                     break;
// //                 default:
// //                     // code block
// //             }
// //         },
// //         error: function(xhr) {
// //             console.log('Erro');
// //         }
// //     });
// // }

// // function deletaColeta() {
// //     let url = '/preDtc/deletaColeta/'
// //     let postData = $('form').serialize();
// //     $.ajax({
// //         url: url,
// //         type: 'POST',
// //         data: postData,
// //         success: function(response) {
// //             switch (response.status) {
// //                 case 200:
// //                     alert('Coleta Deletada com sucesso !')
// //                     limpaColeta()
// //                     break;
// //                 case 400:
// //                     alert('Coleta salva com sucesso !')
// //                     break;
// //                 case 411:
// //                     break;
// //                 case 410:
// //                     alert('Pedido não informado.')
// //                     break;
// //                 default:
// //                     // code block
// //             }
// //         },
// //         error: function(xhr) {
// //             console.log('Erro');
// //         }
// //     });
// // }

