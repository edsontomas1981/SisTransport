$('#incluiContato').on('click', function(e){

    const contato = new Contato($('#cnpjMdl').val());
    const tipoContato = document.getElementById('tipo_contato')
    if($('#idContato').val()!=''){    
      contato.updateContato($('#idContato').val())
      limpaContatos()
    }else{
      
      if(tipoContato.value != 0){
        contato.createContato();
        contato.populaContatos();
      }else{
        alert('Por favor, escolha o tipo de contato.')
      }

    }
    e.preventDefault();
})



$('#btnLimpaContatos').on('click',function(e){
  limpaContatos();
  e.preventDefault();
})

var limpaContatos=()=>{
  $('#tipo_contato').val(0);
  $('#cargo').val('');
  $('#nome').val('');
  $('#contato').val('');
  $('#idContato').val('');
}

$('#tabela').on("click", "#alteraContato", function(event) {
  var row = $(event.target).closest('tr');
  var contato = {};
  contato.id = row.attr("id");
  contato.nome = row.find("#nome").text();
  contato.cargo = row.find("#cargo").text();
  contato.tipo = row.find("#tipo").text();
  contato.fone = row.find("#fone").text();
  $('#tipo_contato').val(contato.tipo);
  $('#cargo').val(contato.cargo);
  $('#nome').val(contato.nome);
  $('#contato').val(contato.fone);
  $('#idContato').val(contato.id);
  // Obter o texto a ser buscado
  var textoBuscado =contato.tipo;
  // Buscar o elemento option correspondente
  var optionEncontrado = $("#tipo_contato").find('option').filter(function() {
      return $(this).text() === textoBuscado;
    });
  // Verificar se o elemento option foi encontrado
  if (optionEncontrado.length) {
  // Definir o atributo selected na opção correspondente
  optionEncontrado.prop("selected", true);
  }
});

$('#tabela').on("click", "#excluiContato", function(event) {
  var row = $(event.target).closest('tr');
  var row_id = row.attr("id")
  var contato = new Contato()
  if (confirm('Deseja excluir o contato ?')){
      contato.deleteContato(row_id)
      }
});

var populaContatos=(listaContatos)=>{
  limpaTabelaContatos()
  if (listaContatos){
    const data = listaContatos;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr" id="' + data[i].id + '">' +
            '<td>' + data[i].id + '</td>' +
            '<td id="nome">' + data[i].nome + '</td>' +
            '<td id="cargo">' + data[i].cargo + '</td>' +
            '<td id="tipo">' + data[i].tipo + '</td>' +
            '<td id="fone">' + data[i].fone_email_etc + '</td>' +
            '<td>' + '<button type="button" id="alteraContato"  class="btn btn-success btn-rounded btn-icon">' +
            '<i class="ti-pencil-alt2"></i></button>' + '</td>' +
            '<td>' + '<button type="button" id="excluiContato" class="btn btn-danger btn-rounded btn-icon">' +
            '<i class="ti-eraser "></i>' + '</button>' + '</td>' +
            '</tr>'
          $('#tabela tbody').append(template)
    }
  }
};

var limpaTabelaContatos=()=> {
    $('#tabela td').remove();
    $('#tipo_contato').val(0)
    $('#contato').val('');
    $('#nome').val('');
    $('#contato').val('');
    $('#cargo').val('');
}



class Contato {
    constructor(cnpj){
      this.cnpj=cnpj
    }

    async sendPostRequest(url,...idContato) {
      let postData = $('form').serialize();
      postData += '&cnpj_cpf=' + this.cnpj;
      if(idContato){
        postData += '&idContato=' + idContato;
      }
      const result = await $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        dataType: 'json',
      }); 
      populaContatos(result.listaContatos)
    }

    createContato(){
      this.sendPostRequest('/contato/createContato/');
    }
    deleteContato(idContato){
      this.sendPostRequest('/contato/deleteContato/',idContato);
    }
    updateContato(idContato){
      this.sendPostRequest('/contato/updateContato/',idContato);
    }




  }