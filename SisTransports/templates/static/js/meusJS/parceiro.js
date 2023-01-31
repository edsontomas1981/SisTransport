class Parceiro {
    constructor(cnpj, sufixo) {
      this.cnpj = cnpj;
      this.sufixo = sufixo;
    }
  
    async loadData() {
      let url = '/busca_parceiro/';
      let postData = $('form').serialize();
      postData += '&cnpj_cpf=' + this.cnpj;
      const result = await $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        dataType: 'json'
      });
      this.id = result.dados[0].id;
      this.raz_soc = result.dados[0].raz_soc;
      this.endereco = result.dados[0].endereco_fk;
      this.insc_est = result.dados[0].insc_est;
      this.fantasia = result.dados[0].nome_fantasia;
    }

    async dadosParceiro(){
      
      await this.loadData();
      
      return {id:this.id,
              cnpj:this.cnpj,
              insc_est:this.insc_est,
              razao:this.raz_soc,
              fantasia:this.fantasia,
              endereco:this.endereco
            }

    }
  
    async carregaDados() {
      await this.loadData();
      $('#insc' + this.sufixo).val(this.insc_est);
      $('#fantasia' + this.sufixo).val(this.fantasia);
      $('#razao' + this.sufixo).val(this.raz_soc);
      $('#cep' + this.sufixo).val(this.endereco.cep);
      $('#rua' + this.sufixo).val(this.endereco.logradouro);
      $('#numero' + this.sufixo).val(this.endereco.numero);
      $('#complemento' + this.sufixo).val(this.endereco.complemento);
      $('#bairro' + this.sufixo).val(this.endereco.bairro);
      $('#cidade' + this.sufixo).val(this.endereco.cidade);
      $('#uf' + this.sufixo).val(this.endereco.uf);
    }
  }

// class Parceiro {
//     constructor(cnpj,sufixo) {
//       this.cnpj = cnpj;
//       this.sufixo=sufixo;
//     }
  
//     loadData() {
//       let url = '/busca_parceiro/'
//       let postData = $('form').serialize();
//       postData += '&cnpj_cpf=' + this.cnpj;
//       return $.ajax({
//         url: '/busca_parceiro/',
//         type: 'POST',
//         data: postData,
//         dataType: 'json'
//       }).done(data => {
//         this.id = data.dados[0].id;
//         this.raz_soc = data.dados[0].raz_soc;
//         this.endereco = data.dados[0].endereco_fk;
//       });
//     }

//     async getDados() {
//         await this.loadData();
//         $('#insc' + this.sufixo).val(this.raz_soc);
//         $('#fantasia' + this.sufixo).val(this.fantasia);
//         $('#razao' + this.sufixo).val(this.raz_soc);
//         $('#cep' + this.sufixo).val(this.endereco.cep);
//         $('#rua' + this.sufixo).val(this.endereco.cep);
//       }
// }



