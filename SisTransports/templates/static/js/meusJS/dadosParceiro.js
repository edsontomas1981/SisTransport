var editaContato
var quemChamouModal

function enderecoColeta(response) {
    let cep = response.dados[0].endereco_fk.cep.replace(/\D/g, '');
    $('#cepColeta').val(cep);
    $('#ruaColeta').val(response.dados[0].endereco_fk.logradouro);
    $('#numeroColeta').val(response.dados[0].endereco_fk.numero);
    $('#bairroColeta').val(response.dados[0].endereco_fk.bairro);
    $('#complementoColeta').val(response.dados[0].endereco_fk.complemento);
    $('#cidadeColeta').val(response.dados[0].endereco_fk.cidade);
    $('#ufColeta').val(response.dados[0].endereco_fk.uf);
}

function modal(response) {
    $('#mdlCadParceiros').modal('show');
    $('#collapseOne').addClass('show');
    console.log('idParceiro')
    $('#idParceiro').val(response.dados[0].id)
    $('#idEndereco').val(response.dados[0].endereco_fk.id)
    let cnpjModal = response.dados[0].cnpj_cpf.replace(/[^\d]+/g, '');
    $('#cnpjMdl').val(cnpjModal);
    $('#razaoMdl').val(response.dados[0].raz_soc);
    $('#fantasiaMdl').val(response.dados[0].nome_fantasia);
    let cep = response.dados[0].endereco_fk.cep.replace(/\D/g, '');
    $('#cepMdl').val(cep);
    $('#ruaMdl').val(response.dados[0].endereco_fk.logradouro);
    $('#numeroMdl').val(response.dados[0].endereco_fk.numero);
    $('#bairroMdl').val(response.dados[0].endereco_fk.bairro);
    $('#complementoMdl').val(response.dados[0].endereco_fk.complemento);
    $('#cidadeMdl').val(response.dados[0].endereco_fk.cidade);
    $('#ufMdl').val(response.dados[0].endereco_fk.uf);
    $('#razaoMdl').focus()
}

function completaCnpj(response, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {
    if (response.dados.length > 0) {
        $('#idParceiro').val(response.dados[0].id)
        $('#idEndereco').val(response.dados[0].endereco_fk.id)
        $('#' + insc).val(response.dados[0].insc_est);
        $('#' + razao).val(response.dados[0].raz_soc);
        $('#' + fantasia).val(response.dados[0].nome_fantasia);
        $('#' + cep).val(response.dados[0].endereco_fk.cep);
        $('#' + endereco).val(response.dados[0].endereco_fk.logradouro);
        $('#' + numero).val(response.dados[0].endereco_fk.numero);
        $('#' + complemento).val(response.dados[0].endereco_fk.complemento);
        $('#' + bairro).val(response.dados[0].endereco_fk.bairro);
        $('#' + cidade).val(response.dados[0].endereco_fk.cidade);
        $('#' + uf).val(response.dados[0].endereco_fk.uf);
    } else {
        alert(response.message)
    }
}

function busca_parceiro(cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {

    let url = '/busca_parceiro/'
    let postData = $('form').serialize();
    postData += '&cnpj_cpf=' + cnpj;
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            switch (response.status) {
                case 200:
                    console.log(response.status)
                    completaCnpj(response, insc, razao, fantasia, cep,
                        endereco, numero, complemento, bairro, cidade, uf);
                    formHabilitaEdicao()
                    limpaTabelaContatos()
                    adicionaContatoNaTabela(response)
                    break;
                case 201:
                    console.log(response.status)
                    completaCnpj(response, insc, razao, fantasia, cep,
                        endereco, numero, complemento, bairro, cidade, uf);
                    limpaTabelaContatos()
                    formHabilitaEdicao()
                    break;
                case 429:
                    alert('Limite de requisições por minuto, excedido,tente novamente mais tarde.')
                    break;
                case 202:
                    console.log(response.status)
                    modal(response);
                    formDesabilitaEdicao()
                    break;
                case 401:
                    alert('Cnpj ou Cpf inválido !')
                    break;

            }
        },
        error: function(xhr) {
            console.log('Erro');
        } 

    });
}

$('#divContato').on('click', function(e) {
    if (!editaContato) {
        alert("Para adicionar um contato, é necessário primeiro salvar o parceiro.")
    }
})

function closeModal() {
    // Limpa os campos
    $('#cnpj').val('');
    $('#idParceiro').val('');
    resetaForm();
    formDesabilitaEdicao();
    $('#collapseOne').removeClass('show');
    $('#collapseTwo').removeClass('show');
    $('#collapseThree').removeClass('show');
    editaContato = false
}

$('#btnFechar').on('click', function(e) {
    closeModal();
    e.preventDefault();
})

$('#btnClose').on('click', function(e) {
    closeModal();
    e.preventDefault();
})
$('#salvaParceiro').on('click', function(e) {
    $('#acaoForm').val('salvaParceiro')
    let url = '/salva_parceiro/'
    let postData = $('form').serialize();
    postData += '&cepMdl=' + $('#cepMdl').val()
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            alert('Cadastro efetuado com sucesso')
            formHabilitaEdicao()
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
    e.preventDefault();
});

function dadosContatos() {
    let dados = '&cnpj_cpfMdl=' + $('#cnpjMdl').val();
    dados += '&contato=' + $('#contato').val();
    dados += '&nome=' + $('#nome').val();
    dados += '&cargo' + $('#cargo').val();
    dados += '&nome=' + $('#nome').val();
    console.log('teste', dados)
    return dados
}

$('#incluiContato').on('click', function(e) {
    $('#acaoForm').val('incluiContato');
    let url = '/inclui_contato/'
    let postData = $('form').serialize();
    postData += dadosContatos()
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            // TODO
            limpaTabelaContatos();
            adicionaContatoNaTabela(response);

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

function resetaForm() {
    $('#salvaParceiro').val('Cadastrar');
    $('#cnpjMdl').val('');
    $('#razaoMdl').val('');
    $('#fantasiaMdl').val('');
    $('#insc_estMdl').val('');
    $('#obsMdl').val('');
    //Endereco
    $('#idEnderecoMdl').val('');
    $('#cepMdl').val('');
    $('#ruaMdl').val('');
    $('#numeroMdl').val('');
    $('#bairroMdl').val('');
    $('#complementoMdl').val('');
    $('#cidadeMdl').val('');
    $('#ufMdl').val('');
    //Contatos
    limpaTabelaContatos();

}

function limpaTabelaContatos() {
    $('#tabela td').remove();
    $('#contato').val('');
    $('#nome').val('');
    $('#contato').val('');
    $('#cargo').val('');


}
 
$('#tabela tbody').on('click', function(e) {
    alert('teste')
}); 

function adicionaContatoNaTabela(response) {
    const data = response.contato;
    console.log(data)
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr>' +
            '<td id="tabela1"'+ data[i].id +'>' + data[i].id + '</td>' +
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

$('form').on('load', function(e) {
    resetaForm();
    formDesabilitaEdicao();
});

$('#btnCnpjRem').on('click', function(e) {
    quemChamouModal = 'cnpjMdl'
    $('#mdlCadParceiros').modal('show');
    busca_parceiro($('#cnpjRem').val(), 'inscRem', 'razaoRem',
        'fantasiaRem', 'cepRem', 'ruaRem', 'numeroRem',
        'complementoRem', 'bairroRem', 'cidadeRem', 'ufRem');

    e.preventDefault();
});

$('#cnpjRem').on('blur', function(e) {
    quemChamouModal = 'cnpjDest'
    busca_parceiro($('#cnpjRem').val(), 'inscRem', 'razaoRem',
        'fantasiaRem', 'cepRem', 'ruaRem', 'numeroRem',
        'complementoRem', 'bairroRem', 'cidadeRem', 'ufRem');
    e.preventDefault();
});

function preencheModalClick(cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {
    console.log('Click')
    $('#collapseOne').addClass('show');
    let cnpjModal = $('#' + cnpj).val().replace(/[^\d]+/g, '');
    $('#cnpjMdl').val(cnpjModal);
    $('#insc_estMdl').val($('#' + insc).val());
    $('#razaoMdl').val($('#' + razao).val());
    $('#fantasiaMdl').val($('#' + fantasia).val());
    let cepMdl = $('#' + cep).val().replace(/\D/g, '');
    $('#cepMdl').val(cepMdl);
    $('#ruaMdl').val($('#' + endereco).val());
    $('#numeroMdl').val($('#' + numero).val());
    $('#bairroMdl').val($('#' + bairro).val());
    $('#complementoMdl').val($('#' + complemento).val());
    $('#cidadeMdl').val($('#' + cidade).val());
    $('#ufMdl').val($('#' + uf).val());
}

$('#btnCnpjRem').on('click', function(e) {
    quemChamouModal = 'cnpjDest'
    console.log('debug1')
    $('#mdlCadParceiros').modal('show');

    preencheModalClick('cnpjRem', 'inscRem', 'razaoRem',
        'fantasiaRem', 'cepRem', 'ruaRem', 'numeroRem',
        'complementoRem', 'bairroRem', 'cidadeRem', 'ufRem');

    e.preventDefault();
});

$('#cnpjDest').on('blur', function(e) {
    quemChamouModal = 'cnpjDest'
    busca_parceiro($('#cnpjDest').val(), 'inscDest', 'razaoDest',
        'fantasiaDest', 'cepDest', 'ruaDest', 'numeroDest',
        'complementoDest', 'bairroDest', 'cidadeDest', 'ufDest');
    e.preventDefault();
});

$('#cnpjConsig').on('blur', function(e) {
    quemChamouModal = 'cnpjConsig'
    busca_parceiro($('#cnpjConsig').val(), 'inscConsig', 'razaoConsig',
        'fantasiaConsig', 'cepConsig', 'ruaConsig', 'numeroConsig',
        'complementoConsig', 'bairroConsig', 'cidadeConsig', 'ufConsig');

    e.preventDefault();
});

$('#cnpjRedesp').on('blur', function(e) {
    quemChamouModal = 'cnpjRedesp'
    busca_parceiro($('#cnpjRedesp').val(), 'inscRedesp', 'razaoRedesp',
        'fantasiaRedesp', 'cepRedesp', 'ruaRedesp', 'numeroRedesp',
        'complementoRedesp', 'bairroRedesp', 'cidadeRedesp', 'ufRedesp');
    e.preventDefault();
});

$('#mdlCadParceiros').on('hidden.bs.modal', function(e) {
    quemChamouModal = '';
    resetaForm();
    formDesabilitaEdicao();
})

$('#cnpjMdl').on('blur', function(e) {
    quemChamouModal = 'cnpjMdl';
    busca_parceiro($('#cnpjMdl').val(), 'insc_estMdl', 'razaoMdl',
        'fantasiaMdl', 'cepMdl', 'ruaMdl', 'numeroMdl',
        'complementoMdl', 'bairroMdl', 'cidadeMdl', 'ufMdl');
});
