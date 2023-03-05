class Coleta{
  constructor(dtc) {
    this.dtc = dtc;
  }

  sendPostRequest = async (url, onSuccess = () => {}) => {
    let idDtc = this.dtc
    if (idDtc) {
        if (validateDocumentNumber(this.dtc)) {
          let postData = $("form").serialize();
          postData += "&dtcColeta=" + this.dtc;
          try {
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: postData,
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            // Chama o callback de sucesso com o resultado da requisição
            onSuccess(result);
          } catch (error) {
            console.error(error);
            alert("Erro interno !");
          }
        } else {
          alert("Dtc não informado !");
        }
      }
    };

      createParceiro= async ()=>{
        await this.sendPostRequest('/operacional/createColeta/', this.carregaDados);
      }       
      readParceiro= async ()=>{
        await this.sendPostRequest('/operacional/readColeta/', this.carregaDados);
      } 
      updateParceiro= async ()=>{
        await this.sendPostRequest('/operacional/updateColeta/', this.carregaDados);
      } 
      deleteParceiro= async ()=>{
        await this.sendPostRequest('/operacional/deleteColeta/', this.carregaDados);
      }             

      carregaDados= async (response)=>{
        this.status=response.status

        switch (this.status) {
          case 200:
            console.log(response)
            // this.id = response.parceiro.id;
            // this.raz_soc = response.parceiro.raz_soc;
            // this.cnpj = response.parceiro.cnpj_cpf;
            // this.inscr = response.parceiro.insc_est;
            // this.fantasia = response.parceiro.nome_fantasia;
            // this.obs = response.parceiro.observacao;
            // this.cep = response.parceiro.endereco_fk.cep;
            // this.rua=response.parceiro.endereco_fk.logradouro
            // this.complemento=response.parceiro.endereco_fk.complemento
            // this.numero=response.parceiro.endereco_fk.numero
            // this.bairro =response.parceiro.endereco_fk.bairro
            // this.cidade=response.parceiro.endereco_fk.cidade
            // this.uf=response.parceiro.endereco_fk.uf
            // this.contatos=response.contatos
            // this.tabelas=response.tabelas
            // this.populaCampos()
            break;
          case 404 :
            alert('Parceiro nao cadastrado!')
            break;
          default:
            alert('Erro interno')
            break;
        }
      }
}

$('#btnSalvaColeta').on('click', function(e) {
  const coleta=new Coleta($('#numDtc').val())
  coleta.createParceiro();
  e.preventDefault();
})

function msgCamposFaltando(response) {
    let msgInicial = 'Os campos, '
    let eOuVirgula
    for (let i = 0; i < response.camposObrigatorios.length; i++) {
        eOuVirgula = response.camposObrigatorios.length == i + 2 ? " e " :
            response.camposObrigatorios.length == i + 1 ? '' : ', ';
        msgInicial += response.camposObrigatorios[i] + eOuVirgula

    }
    msgInicial += ' precisam ser preenchidos.'
    return msgInicial
}


$('#btnExcluiColeta').on('click', function(e) {
    let msg = 'Deseja realmente excluir a coleta ?'
    if (confirmacao(msg)) {
        deletaColeta($('#numPed').val())
    }
    e.preventDefault();
})

$('#btnNovoColeta').on('click', function(e) {
    e.preventDefault();
})

function confirmacao(msg) {
    var resposta = confirm(msg);
    return resposta
}

// function salvaColeta() {
//     let url = '/preDtc/saveColeta/'
//     let postData = $('form').serialize();
//     $.ajax({
//         url: url,
//         type: 'POST',
//         data: postData,
//         success: function(response) {
//             switch (response.status) {
//                 case 201:
//                     alert('Coleta alterada com sucesso !')
//                     break;
//                 case 200:
//                     alert('Coleta salva com sucesso !')
//                     completaColeta(response.coleta)
//                     break;
//                 case 411:
//                     msg = msgCamposFaltando(response)
//                     alert(msg)
//                     break;
//                 case 410:
//                     alert('Pedido não informado.')
//                     break;
//                 default:
//                     // code block
//             }
//         },
//         error: function(xhr) {
//             console.log('Erro');
//         }
//     });
// }

// function deletaColeta() {
//     let url = '/preDtc/deletaColeta/'
//     let postData = $('form').serialize();
//     $.ajax({
//         url: url,
//         type: 'POST',
//         data: postData,
//         success: function(response) {
//             switch (response.status) {
//                 case 200:
//                     alert('Coleta Deletada com sucesso !')
//                     limpaColeta()
//                     break;
//                 case 400:
//                     alert('Coleta salva com sucesso !')
//                     break;
//                 case 411:
//                     break;
//                 case 410:
//                     alert('Pedido não informado.')
//                     break;
//                 default:
//                     // code block
//             }
//         },
//         error: function(xhr) {
//             console.log('Erro');
//         }
//     });
// }

