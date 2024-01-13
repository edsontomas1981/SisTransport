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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'A coleta foi salva com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })

        break;
      case 201:
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'A coleta foi alterada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })
          break;        
      case 300:
          Swal.fire({
          icon: 'error',
          title: this.alertCamposFaltando(this.resposta.camposVazios),
          showConfirmButton: true,
        })
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
   return msgInicial
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
  if ($('#numDtc').val()!=''){
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

$('#btnNovoColeta').on('click', function(e) {
  limpaColeta();
  e.preventDefault();
})


function limpaColeta(){
  $('#nf').val('')
  $('#volumes').val('')
  $('#peso').val('')
  $('#resultM3').val('')
  $('#valor').val('')
  $('#especie').val(0)
  $('#veiculo').val(0)
  $('#cepColeta').val('')
  $('#ruaColeta').val('')
  $('#numeroColeta').val('')
  $('#complementoColeta').val('')
  $('#bairroColeta').val('')
  $('#cidadeColeta').val('')
  $('#ufColeta').val('')
  $('#nomeColeta').val('')
  $('#contatoColeta').val('')
  $('#obs').val('')
  $('#mercadoria').val('')
  $('#horario').val('')
  $('#cnpjTomador').val('')
  $('#razaoTomador').val('')

}

function completaColeta(response){
  $('#nf').val(response.notaFiscal)
  $('#volumes').val(response.volume)
  $('#peso').val(response.peso)
  $('#resultM3').val(response.cubM3)
  $('#valor').val(response.valor)
  $('#especie').val(response.especie)
  // $('#veiculo').attr(response.veiculo)
  $('#cepColeta').val(response.cep)
  $('#ruaColeta').val(response.rua)
  $('#numeroColeta').val(response.numero)
  $('#complementoColeta').val(response.complemento)
  $('#bairroColeta').val(response.bairro)
  $('#cidadeColeta').val(response.cidade)
  $('#ufColeta').val(response.uf)
  $('#nomeColeta').val(response.nome)
  $('#contatoColeta').val(response.contato)
  $('#obs').val(response.observacao)
  $('#mercadoria').val(response.mercadoria)
  $('#horario').val(response.horario)
  $('#idColeta').val(response.id)
}