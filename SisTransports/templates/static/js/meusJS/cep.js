$('#btnCepColeta').on('click', function(e){
    busca_cep('cepColeta','ruaColeta','bairroColeta','cidadeColeta','ufColeta')
    e.preventDefault();
});

$('#btnCepMdl').on('click', function(e){
    busca_cep('cepMdl','ruaMdl','bairroMdl','cidadeMdl','ufMdl')
    e.preventDefault();
});

$('#btnBuscaCep').on('click', function(e){
    busca_cep('cepMdl','ruaMdl','bairroMdl','cidadeMdl','ufMdl')
    e.preventDefault();
});

document.getElementById('cepOrigem').addEventListener('blur',()=>{
    busca_cep('cepOrigem','logradouroOrigem','bairroOrigem','cidadeOrigem','ufOrigem')
})

document.getElementById('cepDestino').addEventListener('blur',()=>{
    busca_cep('cepDestino','logradouroDestino','bairroDestino','cidadeDestino','ufDestino')
})

function meu_callback(conteudo,rua,bairro, cidade, uf) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        $('#'+rua).val(conteudo.logradouro);
        $('#'+bairro).val(conteudo.bairro);
        $('#'+cidade).val(conteudo.localidade);
        $('#'+uf).val(conteudo.uf);

    }
    else {
    //CEP não Encontrado.
    alert("CEP não encontrado.");
    }
}
function busca_cep(cep,rua,bairro,cidade,uf) {

    var cep = $('#'+cep).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            $("#"+rua).val("...");
            $("#"+bairro).val("...");
            $("#"+cidade).val("...");
            $("#"+uf).val("...");
            

            //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("#"+rua).val(dados.logradouro);
                    $("#"+bairro).val(dados.bairro);
                    $("#"+cidade).val(dados.localidade);
                    $("#"+uf).val(dados.uf);
                    
                } //end if.
                else {
                    //CEP pesquisado não foi encontrado.
                    alert("CEP não encontrado.");
                }
            });
        } //end if.
        else {
            //cep é inválido.
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
    }

}     
