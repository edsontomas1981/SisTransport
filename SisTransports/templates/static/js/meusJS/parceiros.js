var editaContato

function buscaParceiro(cnpj) {
    let url = '/busca_parceiro/'
    let postData = $('#remDest').serialize();
    postData = postData + '&cnpj_cpf=' + cnpj;

    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            // se o cnpj existir ele altera o form para edição e nao cadastro
            if (response.dados.length > 0) {
                return response.dados
            } else {
                console.log(buscaCnpjWs(cnpj));
                return response
            }

        },
        error: function(xhr) {
            console.log('Erro');
        },
        complete: function() {
            // closeModal()
        }
    });
}

function buscaCnpjWs(cnpj) {
    // Aqui recuperamos o cnpj preenchido do campo e usamos uma expressão regular 
    //para limpar da string tudo aquilo que for diferente de números
    var cnpj = $('#cnpj').val().replace(/[^0-9]/g, '');
    // Aqui rodamos o ajax para a url da API concatenando o número do CNPJ na url
    console.log("WS")
    $.ajax({
        url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
        method: 'GET',
        dataType: 'jsonp', // Em requisições AJAX para outro domínio é necessário usar o formato 
        //"jsonp" que é o único aceito pelos navegadores por questão de segurança
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
    formDesabilitaEdicao();
}

$('form').on('load', function(e) {
    resetaForm();
    formDesabilitaEdicao();

});

$('#cnpj').on('blur', function(e) {
    console.log("Primeiro Teste")
    resetaForm();
    verificaCnpjBd();
    e.preventDefault();
});

function formDesabilitaEdicao() {
    editaContato = false;
    $('#salvaParceiro').val('Cadastrar');
    $("#btnContato").attr("disabled", true);
}

function formHabilitaEdicao() {
    $('#salvaParceiro').val('Editar');
    $("#btnContato").attr("disabled", false);
    editaContato = true;
}

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
            '<td>' + '<button type="button" class="btn btn-success btn-rounded btn-icon">' +
            '<i class="ti-pencil-alt2"></i></button>' + '</td>' +
            '<td>' + '<button type="button" class="btn btn-danger btn-rounded btn-icon">' +
            '<i class="ti-eraser "></i>' + '</button>' + '</td>' +
            '</tr>'
        $('#tabela tbody').append(template)
    }
};

function limpaTabelaContatos() {
    $('#tabela td').remove();
}

function resetaForm() {
    $('#salvaParceiro').val('Cadastrar');
    $('#razao').val('');
    $('#fantasia').val('');
    $('#insc_est').val('');
    $('#obs').val('');
    //Endereco
    $('#idEndereco').val('');
    $('#cep').val('');
    $('#rua').val('');
    $('#numero').val('');
    $('#bairro').val('');
    $('#complemento').val('');
    $('#cidade').val('');
    $('#uf').val('');
    //Contatos
    limpaTabelaContatos();

}

function preencheCamposCnpjWs(response) {
    formDesabilitaEdicao();
    $('#razao').val(response.nome);
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

function consultaCnpjWs() {
    // Aqui recuperamos o cnpj preenchido do campo e usamos uma expressão regular 
    // para limpar da string tudo aquilo que for diferente de números
    var cnpj = $('#cnpj').val().replace(/[^0-9]/g, '');
    // Aqui rodamos o ajax para a url da API concatenando o número do CNPJ na url
    $.ajax({
        url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
        method: 'GET',
        dataType: 'jsonp', // Em requisições AJAX para outro domínio é necessário usar o formato 
        //"jsonp" que é o único aceito pelos navegadores por questão de segurança
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
    formDesabilitaEdicao();
}

function preencheCamposCnpjBd(response) {
    formHabilitaEdicao();
    $('#idParceiro').val(response.dados[0].id)
    $('#cnpj').val(response.dados[0].cnpj_cpf);
    $('#razao').val(response.dados[0].raz_soc);
    $('#fantasia').val(response.dados[0].nome_fantasia);
    $('#insc_est').val(response.dados[0].insc_est);
    $('#obs').val(response.dados[0].observacao);
    //Endereco
    $('#idEndereco').val(response.dados[0].endereco_fk.id);
    $('#cep').val(response.dados[0].endereco_fk.cep);
    $('#rua').val(response.dados[0].endereco_fk.logradouro);
    $('#numero').val(response.dados[0].endereco_fk.numero);
    $('#bairro').val(response.dados[0].endereco_fk.bairro);
    $('#complemento').val(response.dados[0].endereco_fk.complemento);
    $('#cidade').val(response.dados[0].endereco_fk.cidade);
    $('#uf').val(response.dados[0].endereco_fk.uf);
    //Contatos
    adicionaContatoNaTabela(response)

}

function verificaCnpjBd() {
    resetaForm();
    let url = '/busca_parceiro/'
    let postData = $('form').serialize();

    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            // se o cnpj existir ele altera o form para edição e nao cadastro
            console.log(response)
            return response
            if (response.dados.length > 0) {
                preencheCamposCnpjBd(response);
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
            limpaTabelaContatos();
            verificaCnpjBd();
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
            alert(response.message)
            formHabilitaEdicao();
            verificaCnpjBd();
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

$('#btnClose').on('click', function(e) {
    closeModal();
    e.preventDefault();
})

$('#divContato').on('click', function(e) {
    if (!editaContato) {
        alert("Para adicionar um contato, é necessário primeiro salvar o parceiro.")
    }
})

$('#btnFechar').on('click', function(e) {
    closeModal();
    e.preventDefault();
})

// function closeModal() {
//     $('#mdlCadParceiros').modal('hide');
//     // Limpa os campos
//     $('#cnpj').val('');
//     $('#idParceiro').val('');
//     resetaForm();
//     formDesabilitaEdicao();
//     $('#collapseOne').removeClass('show');
//     $('#collapseTwo').removeClass('show');
//     $('#collapseThree').removeClass('show');
//     editaContato = false
// }