// Escutar qual botao foi clicado e chamar a funcao de acordo com o botao clicado


$('#cnpj').on('blur', function(e) {
    $('#acaoForm').val('nao');
    let url = '/busca_parceiro/'
    let postData = $('form').serialize();
    console.log(postData)
    $.ajax({
      url: url,
      type: 'POST',   
      data: postData,
      success: function(response) {
        // TODO
        if (response.dados.length>0){
            $('#salvaParceiro').val('Editar');
        }
        
        // addItem(response)
      },
      error: function(xhr) {
        console.log('Erro');
      },
      complete: function() {
        // closeModal()
      }
    });
    e.preventDefault();
  });

$('#incluiContato').on('click', function(e) {
    $('#acaoForm').val('incluiContato');
    let url = '/salva_parceiro/'
    let postData = $('form').serialize();
    $.ajax({
      url: url,
      type: 'POST',   
      data: postData,
      success: function(response) {
        // TODO
        adicionaContatoNaTabela(response)
        // addItem(response)
      },
      error: function(xhr) {
        console.log('Erro');
      },
      complete: function() {
        // closeModal()
      }
    });
    e.preventDefault();
  });

  $('#salvaParceiro').on('click', function(e) {
    $('#acaoForm').val('salvaParceiro');
    let url = '/salva_parceiro/'
    let postData = $('form').serialize();
    $.ajax({
      url: url,
      type: 'POST',   
      data: postData,
      success: function(response) {
        // TODO
        mensagem(response)
        // addItem(response)
      },
      error: function(xhr) {
        console.log('Erro');
      },
      complete: function() {
        // closeModal()
      }
    });
    e.preventDefault();
  });

  function adicionaContatoNaTabela(response) {
    const data = response.dados[0];
    const template = '<tr>' +
            '<td>' + data.id + '</td>'+
            '<td>' + data.nome+ '</td>'+
            '<td>' + data.cargo + '</td>' +
            '<td>' + data.tipo + '</td>' +
            '<td>' + data.fone_email_etc +'</td>' +
        '</tr>'
  
    $('table tbody').append(template)
  };
  
  function closeModal() {
    $('#myModal').modal('hide');
    // Limpa os campos
    $('#id_first_name').val('');
    $('#id_last_name').val('');
    $('#id_email').val('');
  }

  function mensagem(response) {
    const msg = response;
    console.log(msg)
    alert(msg.message);
  }

  