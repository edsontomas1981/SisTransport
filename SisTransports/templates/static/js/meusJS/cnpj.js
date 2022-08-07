function consultaCnpj() {

    // Aqui recuperamos o   cnpj preenchido do campo e usamos uma expressão regular para limpar da string tudo aquilo que for diferente de números
    var cnpj = $('#cnpj').val().replace(/[^0-9]/g, '');

    // Fazemos uma verificação simples do cnpj confirmando se ele tem 14 caracteres
    if (cnpj.length == 14) {

        // Aqui rodamos o ajax para a url da API concatenando o número do CNPJ na url
        $.ajax({
            url: 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
            method: 'GET',
            dataType: 'jsonp', // Em requisições AJAX para outro domínio é necessário usar o formato "jsonp" que é o único aceito pelos navegadores por questão de segurança
            complete: function(xhr) {

                // Aqui recuperamos o json retornado
                response = xhr.responseJSON;

                // Na documentação desta API tem esse campo status que retorna "OK" caso a consulta tenha sido efetuada com sucesso

                // Agora preenchemos os campos com os valores retornados
                if (response.status == 'OK') {
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

                    // Aqui exibimos uma mensagem caso tenha ocorrido algum erro
                } else {
                    alert(response.message); // Neste caso estamos imprimindo a mensagem que a própria API retorna
                }
            }
        });

        // Tratativa para caso o CNPJ não tenha 14 caracteres
    } else {
        alert('CNPJ inválido');
    }
}