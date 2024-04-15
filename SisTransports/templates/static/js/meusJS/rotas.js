$('#inserirRota').on('click', async (e)=> {
let camposObrigatorios = ["nomeRota","cepOrigem","logradouroOrigem","numeroOrigem",
                        "bairroOrigem","cidadeOrigem","ufOrigem","cepDestino"
                        ,"logradouroDestino","numeroDestino","bairroDestino",
                        "cidadeDestino","ufDestino"]
                        
    let dados = obterDadosDoFormulario("frmRotas",camposObrigatorios)

    let response  = await connEndpoint('/rotas/createRota/', dados);
    switch (response.status) {
        case 200:
            populaRota(response)
            msgOk("A rota foi salva com sucesso.")
            break;
        case 422:
            msgErro("O nome da rota já está em uso. Por favor, escolha outro nome.")
            break;
        default:
            msgErro("Não foi possível concluir a operação. Por favor, tente novamente mais tarde.")
            break;
    }
    
})


function populaRota(response) {
    console.log(response)
    $('#idRota').val(response.dados.id)
    $('#idNomeRota').val(response.dados.nome)
    limpa()
}

function limpa() {
    $('.limpar').val('')
}

function bdRota(dados, callback) {
    let url = dados.url
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            switch (response.status) {
                case 200:
                    callback(response)
                    break;
                case 400:

                    break;
                default:
                    break;
            }
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

var readRotas=(idSelect) =>{
    dados = { 'url': '/rotas/readRotas/' }
    conectaBackEnd(dados,carregaSelectRotas,idSelect)
}

var carregaSelectRotas = (response,idSelect) =>{
    options = response.rotas
    $.each(options, function(value, text) {
        $('#'+idSelect).append($("<option></option>").attr("value", text['id']).text(text['nome']));
      });
}

