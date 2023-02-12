$('#incluiContato').on('click', function(e){
    alert(9)
    var contato = new Contato();
    contato.loadData()
    e.preventDefault();

})


class Contato {
    
    async loadData() {
      let url = '/contato/createContato/';
      let postData = $('form').serialize();
      postData += '&cnpj_cpf=' + this.cnpj;
      const result = await $.ajax({
        url: url,
        beforeSend: function() {
          $('#loader').show();
        },
        type: 'POST',
        data: postData,
        dataType: 'json',
        complete: function() {
          $('#loader').hide();
        }
      });
    }

    async dadosContato(){
      
      await this.loadData();
      
      return {id:this.id,
              cnpj:this.cnpj,
              insc_est:this.insc_est,
              razao:this.raz_soc,
              fantasia:this.fantasia,
              endereco:this.endereco
            }
    }
  }