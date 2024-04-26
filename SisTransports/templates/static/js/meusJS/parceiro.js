class Parceiro {
  constructor(cnpj, sufixo) {
    this.cnpj = cnpj;
    this.sufixo = sufixo;
    this.botoes = {
                      mostrar: {
                        classe: "btn-primary text-white",
                        texto: '<i class="fa fa-print" aria-hidden="true"></i>',
                        // callback: abrirMdlTabela
                      }
                    };
    
  }

  async sendPostRequest(url, onSuccess = () => {}) {
    if (this.cnpj !== '' && validateDocumentNumber(this.cnpj)) {
      let postData = $("form").serialize();
      postData += "&cnpj_cpf=" + this.cnpj;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: postData,
        });
        if (!response.ok) {
          throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        const result = await response.json();
        // Chama o callback de sucesso com o resultado da requisição
        onSuccess(result);
      } catch (error) {
        console.error(error);
        alert("Erro interno!");
      }
    } else {
      alert("CPF/CNPJ Inválido!");
    }
  }

  async getWsParceiro() {
    await this.sendPostRequest('/parceiros/searchPartnerWs/', this.populaAPartirMdl);
  }

  async readParceiro() {
    await this.sendPostRequest("/parceiros/readParceiro/", this.carregaDados);
  }

  createParceiro() {
    this.sendPostRequest('/parceiros/createParceiro/', this.responseCreate);
  }

  responseCreate = async (response) => {
    switch (response.status) {
      case 200:
        alert('Parceiro cadastrado com sucesso!');
        break;
      case 201:
        alert('Parceiro alterado com sucesso!');
        break;
      case 300:
        alert('CNPJ inválido!');
        break;
      default:
        alert('Código de Erro: ' + response.status);
        break;
    }
  };

  carregaDados = async (response) => {
    this.status = response.status;
    switch (this.status) {
      case 200:
        const parceiro = response.parceiro;
        this.id = parceiro.id;
        this.raz_soc = parceiro.raz_soc;
        this.cnpj = parceiro.cnpj_cpf;
        this.inscr = parceiro.insc_est;
        this.fantasia = parceiro.nome_fantasia;
        this.obs = parceiro.observacao;
        this.cep = parceiro.endereco_fk.cep;
        this.rua = parceiro.endereco_fk.logradouro;
        this.complemento = parceiro.endereco_fk.complemento;
        this.numero = parceiro.endereco_fk.numero;
        this.bairro = parceiro.endereco_fk.bairro;
        this.cidade = parceiro.endereco_fk.cidade;
        this.uf = parceiro.endereco_fk.uf;
        this.contatos = response.contatos;
        this.tabelas = response.tabelas;
        this.populaCampos();
        break;
      case 404:
        alert('Parceiro não cadastrado!');
        this.openModalParceiro();
        break;
      default:
        alert('Erro interno');
        break;
    }
  };

  populaCampos = () => {
    $(`#cnpj${this.sufixo}`).val(this.cnpj);
    $(`#insc${this.sufixo}`).val(this.inscr);
    $(`#fantasia${this.sufixo}`).val(this.fantasia);
    $(`#razao${this.sufixo}`).val(this.raz_soc);
    $(`#cep${this.sufixo}`).val(this.cep);
    $(`#rua${this.sufixo}`).val(this.rua);
    $(`#numero${this.sufixo}`).val(this.numero);
    $(`#complemento${this.sufixo}`).val(this.complemento);
    $(`#bairro${this.sufixo}`).val(this.bairro);
    $(`#cidade${this.sufixo}`).val(this.cidade);
    $(`#uf${this.sufixo}`).val(this.uf);
  };

  limparCamposDtc = () => {
    $(`#cnpj${this.sufixo}`).val('');
    $(`#insc${this.sufixo}`).val('');
    $(`#fantasia${this.sufixo}`).val('');
    $(`#razao${this.sufixo}`).val('');
    $(`#cep${this.sufixo}`).val('');
    $(`#rua${this.sufixo}`).val('');
    $(`#numero${this.sufixo}`).val('');
    $(`#complemento${this.sufixo}`).val('');
    $(`#bairro${this.sufixo}`).val('');
    $(`#cidade${this.sufixo}`).val('');
    $(`#uf${this.sufixo}`).val('');
  };

  populaAPartirMdl = async (result) => {
    this.status = await result.status;
    switch (this.status) {
      case 200:
        const parceiro = result.parceiro;
        $('#cnpjMdl').val(parceiro.cnpj_cpf);
        $('#razaoMdl').val(parceiro.raz_soc);
        $('#insc_estMdl').val(parceiro.insc_est);
        $('#fantasiaMdl').val(parceiro.nome_fantasia);
        $('#obsMdl').val(parceiro.observacao);

        $('#cepMdl').val(parceiro.endereco_fk.cep);
        $('#ruaMdl').val(parceiro.endereco_fk.logradouro);
        $('#numeroMdl').val(parceiro.endereco_fk.numero);
        $('#complementoMdl').val(parceiro.endereco_fk.complemento);
        $('#bairroMdl').val(parceiro.endereco_fk.bairro);
        $('#cidadeMdl').val(parceiro.endereco_fk.cidade);
        $('#ufMdl').val(parceiro.endereco_fk.uf);
        this.populaContatos(result.contatos);
        this.populaTabelas(result.tabelas);
        break;
      case 404:
        break;
      default:
        alert('Erro interno');
        break;
    }
  };

  populaTabelas = (response) => {
    popula_tbody_paginacao('paginacaoParceiro','tbodyTabelaParceiro',this.preparaDadosTabelas(response[1]),this.botoes,1,70,true,false)
  };



  populaMdl = () => {
    $('#cnpjMdl').val(this.cnpj);
    $('#razaoMdl').val(this.raz_soc);
    $('#insc_estMdl').val(this.inscr);
    $('#fantasiaMdl').val(this.fantasia);
    $('#obsMdl').val(this.obs);

    $('#cepMdl').val(this.cep);
    $('#ruaMdl').val(this.rua);
    $('#numeroMdl').val(this.numero);
    $('#complementoMdl').val(this.complemento);
    $('#bairroMdl').val(this.bairro);
    $('#cidadeMdl').val(this.cidade);
    $('#ufMdl').val(this.uf);
    this.populaContatos(this.contatos);
  };

  openModalParceiro = () => {
    openModal('mdlCadParceiros')
    // $('#mdlCadParceiros').show();
  };

  aguardaMdl = () => {
    $('#cnpjMdl').val('Carregando ...');
    $('#razaoMdl').val('Carregando ...');
    $('#insc_estMdl').val('Carregando ...');
    $('#fantasiaMdl').val('Carregando ...');
    $('#obsMdl').val('Carregando ...');

    $('#cepMdl').val('Carregando ...');
    $('#ruaMdl').val('Carregando ...');
    $('#numeroMdl').val('Carregando ...');
    $('#complementoMdl').val('Carregando ...');
    $('#bairroMdl').val('Carregando ...');
    $('#cidadeMdl').val('Carregando ...');
    $('#ufMdl').val('Carregando ...');
  };

  carregaParceiroMdl = () => {
    this.sendPostRequest('/parceiros/readParceiro/', this.populaAPartirMdl);
  };

  deleteParceiro = () => {
    this.sendPostRequest('/parceiros/deleteParceiro/');
  };

  updateParceiro = () => {
    this.sendPostRequest('/parceiros/updateParceiro/');
  };

  limpaDados = () => {
    this.id = '';
    this.raz_soc = '';
    this.cnpj = '';
    this.inscr = '';
    this.fantasia = '';
    this.obs = '';

    this.cep = '';
    this.rua = '';
    this.complemento = '';
    this.numero = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';

    this.contatos = '';
  };

  populaContatos = (listaContatos) => {
    populaContatos(listaContatos);
  };

  preparaDadosTabelas=(tabelas)=>{
    let listaTabelas = []
    tabelas.forEach(e => {
      listaTabelas.push({'id':e.id,'descricao':e.descricao,
                        'minimo':e.freteMinimo,'frete':e.frete,'advalor':e.adValor,'gris':e.gris,
                        'despacho':e.despacho,'pedagio':e.pedagio,'outros':e.outros})
                      });
    return listaTabelas
  }
}

// let mdlCadParceiros = document.getElementById('mdlCadParceiros')
// let flag = false

// const abrirMdlTabela = (e)=>{
//   mdlCadParceiros.style.display = 'none'
//   flag = true 
//   mostrarTabela(e)
// }
// document.getElementById('btnCloseTabelaFrete').addEventListener('click',()=>{
//   if (flag){
//     flag = false;
//     mdlCadParceiros.style.display = 'block'
//   }
// })

