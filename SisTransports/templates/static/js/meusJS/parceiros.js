// Escutar qual botao foi clicado e chamar a funcao de acordo com o botao clicado
function limpaTabela() {
    let td = document.getElementsByTagName("td");
    for (let i = 0; i < td.length; i++) {
        td[i].innerHTML = '';
    }
}


function resetaForm() {
    $('#salvaParceiro').val('Cadastrar');
    $('#razao').val('');
    $('#fantasia').val('');
    $('#insc_est').val('');
    $('#obs').val('');
    //Endereco
    $('#cep').val('');
    $('#rua').val('');
    $('#numero').val('');
    $('#bairro').val('');
    $('#complemento').val('');
    $('#cidade').val('');
    $('#uf').val('');
    //Contatos
    $("#idTabela tr").remove();

}

function preencheCamposCnpjWs(response) {
    $('#razao').val(response.nome);
    $('#nome').val(response.fantasia);
    $('#logradouro').val(response.logradouro);
    $('#fantasia').val(response.fantasia);
    $('#cep').val(response.cep);
    $('#rua').val(response.logradouro);
    $('#numero').val(response.numero);
    $('#bairro').val(response.bairro);
    $('#complemento').val(response.complemento);
    $('#cidade').val(response.municipio);
    $('#uf').val(response.uf);
}

function preencheCamposCnpjBd(response) {
    $('#cnpj').val(response.cnpj_cpf);
    $('#razao').val(response.raz_soc);
    $('#fantasia').val(response.nome_fantasia);
    $('#insc_est').val(response.insc_est);
    $('#obs').val(response.observacao);
    //Endereco
    $('#cep').val(response.endereco_fk.cep);
    $('#rua').val(response.endereco_fk.logradouro);
    $('#numero').val(response.endereco_fk.numero);
    $('#bairro').val(response.endereco_fk.bairro);
    $('#complemento').val(response.endereco_fk.complemento);
    $('#cidade').val(response.endereco_fk.cidade);
    $('#uf').val(response.endereco_fk.uf);
    //Contatos

}

function consultaCnpjWs() {
    // Aqui recuperamos o cnpj preenchido do campo e usamos uma expressão regular 
    //para limpar da string tudo aquilo que for diferente de números
    var cnpj = $('#cnpj').val().replace(/[^0-9]/g, '');
    console.log('WS')

    // Aqui rodamos o ajax para a url da API concatenando o número do CNPJ na url
    $.ajax({
        url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
        method: 'GET',
        dataType: 'jsonp', // Em requisições AJAX para outro domínio é necessário usar o formato "jsonp" que é o único aceito pelos navegadores por questão de segurança
        complete: function(xhr) {

            // Aqui recuperamos o json retornado
            response = xhr.responseJSON;

            // Na documentação desta API tem esse campo status que retorna "OK" 
            //caso a consulta tenha sido efetuada com sucesso

            // Agora preenchemos os campos com os valores retornados
            if (response.status == 'OK') {
                preencheCamposCnpjWs(response);
                // Aqui exibimos uma mensagem caso tenha ocorrido algum erro
            } else {
                alert(response.message); // Neste caso estamos imprimindo a mensagem que a própria API retorna
            }
        }
    });

}

function verificaCnpjBd(url, dadosForm) {
    console.log('BD')
    $.ajax({
        url: url,
        type: 'POST',
        data: dadosForm,
        success: function(response) {
            // se o cnpj existir ele altera o form para edição e nao cadastro
            console.log(response)
            if (response.dados.length > 0) {
                $('#salvaParceiro').val('Editar');
                preencheCamposCnpjBd(response.dados[0]);
                adicionaContatoNaTabela(response);
            } else {
                consultaCnpjWs();
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
}
// verifica se o cnpj ja existe no banco de dados
$('#cnpj').on('blur', function(e) {
    resetaForm();
    $('#acaoForm').val('nao');
    let url = '/busca_parceiro/'
    let postData = $('form').serialize();
    verificaCnpjBd(url, postData);
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
    const data = response.contato;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr id="tr" >' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].nome + '</td>' +
            '<td>' + data[i].cargo + '</td>' +
            '<td>' + data[i].tipo + '</td>' +
            '<td>' + data[i].fone_email_etc + '</td>' +
            '</tr>'

        $('table tbody').append(template)
    }


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