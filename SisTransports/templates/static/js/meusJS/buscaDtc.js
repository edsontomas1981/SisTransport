const carregaDtc=async (response)=>{
    limpaDtc()
    if (response.status == 300){        
        Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Dtc não localizado!',
        showConfirmButton: false,
        timer: 1500
      })}else{
        $('#numDtc').val(response.dtc.id)
        
        if (response.dtc.remetente){
            populaCamposDtc(response.dtc.remetente,'Rem');
        }
        if (response.dtc.destinatario){
            populaCamposDtc(response.dtc.destinatario,'Dest');
        }
        if (response.dtc.consignatario){
            populaCamposDtc(response.dtc.consignatario,'Consig');
        }
        if (response.dtc.tipoFrete){
        $('#modalidadeFrete').val(response.dtc.tipoFrete)
        }
        if (response.dtc.rota){
            $('#rotasDtc').val(response.dtc.rota.id)
        }
       
        if (response.dtc.coleta){
            completaColeta(response.dtc.coleta)
        }
        if (response.cotacao){
            populaCotacao(response.cotacao)
        }
        if(response.notasFiscais){
            // populaCamposFrete(response)
            preencherTabelaNf(response.notasFiscais)
        }

        
        if(response.dtc.tomador && response.dtc.tomador.cnpj_cpf){
            $('#cnpjTomador').val(response.dtc.tomador.cnpj_cpf);
            $('#razaoTomador').val(response.dtc.tomador.raz_soc);
        }
    }
}

const populaCamposDtc = (response,sufixo) => {
    $(`#cnpj${sufixo}`).val(response.cnpj_cpf);
    $(`#insc${sufixo}`).val(response.insc_est);
    $(`#fantasia${sufixo}`).val(response.nome_fantasia);
    $(`#razao${sufixo}`).val(response.raz_soc);
    $(`#cep${sufixo}`).val(response.endereco_fk.cep);
    $(`#rua${sufixo}`).val(response.endereco_fk.logradouro);
    $(`#numero${sufixo}`).val(response.endereco_fk.numero);
    $(`#complemento${sufixo}`).val(response.endereco_fk.complemento);
    $(`#bairro${sufixo}`).val(response.endereco_fk.bairro);
    $(`#cidade${sufixo}`).val(response.endereco_fk.cidade);
    $(`#uf${sufixo}`).val(response.endereco_fk.uf);
  };

$('#modalidadeFrete').on('change', function () {
    defineTomador($('#modalidadeFrete').val())
});

$('#cnpjTomador').on('change', function () {
    defineTomador($('#modalidadeFrete').val())
});

$('#salvaDtc').on('click', function(e) {
    let camposInvalidos=validarDtc()

    if (camposInvalidos.length==0){
            if ($('#numDtc').val()==''){
                defineTomador($('#modalidadeFrete').val())
                dados = {'url':'/preDtc/createDtc/','id':cnpjTomador}
                conectaBackEnd(dados,salvouDtc)
            }else{
                defineTomador($('#modalidadeFrete').val())
                dados = {'url':'/preDtc/updateDtc/','id':cnpjTomador}
                conectaBackEnd(dados,atualizouDtc)
            }
            
    }else{
        camposInvalidos.forEach(element => {
            alert(element)
        });
    }
    e.preventDefault();
})

var salvouDtc = (response) =>{
    alert ('Dtc salvo com sucesso !')
    carregaDtc(response)
}

var atualizouDtc = (response) =>{
    alert ('Dtc atualizado com sucesso !')
    carregaDtc(response)
}


function defineTomador(seletor){
    const selectbox = document.getElementById('modalidadeFrete');
    switch (parseInt(seletor)) {
        case 1 :
            if ($('#cnpjRem').val()==''){
                alert('Para selecionar o frete cif, certifique-se de que o campo remetente não esteja vazio.')
                selectbox.value=0
                $('#cnpjTomador').val('')
                $('#razaoTomador').val('')

            }else{
            $('#cnpjTomador').val($('#cnpjRem').val())
            $('#razaoTomador').val($('#razaoRem').val())
            }
            break;
        case 2 :
            if ($('#cnpjDest').val()==''){
                alert('Para selecionar o frete fob, certifique-se de que o campo destinatário não esteja vazio.')
                selectbox.value=0
                $('#cnpjTomador').val('')
                $('#razaoTomador').val('')
            }else{
            $('#cnpjTomador').val($('#cnpjDest').val())
            $('#razaoTomador').val($('#razaoDest').val())
            }
            break;            
        case 3 :
            if ($('#cnpjConsig').val()==''){
                alert('Para selecionar o frete consignado, certifique-se de que o campo consignatário não esteja vazio.')
                selectbox.value=0
                $('#cnpjTomador').val('')
                $('#razaoTomador').val('')

            }else{                
            $('#cnpjTomador').val($('#cnpjConsig').val())
            $('#razaoTomador').val($('#razaoConsig').val())
            }
            break;            
        default:
            break;
    }
}

function carregaTabelaFrete(response){
    switch (response.dtc.tipoFrete) {
        case 1 :

            break;
        case 2 :
            
            break;            
        case 3 :
            
            break;            

        default:
            break;
    }
}



function completaDtcCnpj(response,cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {
        $('#' + cnpj).val(response.cnpj_cpf);
        $('#' + insc).val(response.insc_est);
        $('#' + razao).val(response.raz_soc);
        $('#' + fantasia).val(response.nome_fantasia);
        $('#' + cep).val(response.endereco_fk.cep);
        $('#' + endereco).val(response.endereco_fk.logradouro);
        $('#' + numero).val(response.endereco_fk.numero);
        $('#' + complemento).val(response.endereco_fk.complemento);
        $('#' + bairro).val(response.endereco_fk.bairro);
        $('#' + cidade).val(response.endereco_fk.cidade);
        $('#' + uf).val(response.endereco_fk.uf);
}

function limpaParceiro(cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {
        $('#' + cnpj).val('');
        $('#' + insc).val('');
        $('#' + razao).val('');
        $('#' + fantasia).val('');
        $('#' + cep).val('');
        $('#' + endereco).val('');
        $('#' + numero).val('');
        $('#' + complemento).val('');
        $('#' + bairro).val('');
        $('#' + cidade).val('');
        $('#' + uf).val('');
}        

function limpaDtc(){
    limpaParceiro('cnpjRem', 'inscRem', 'razaoRem', 'fantasiaRem', 'cepRem','ruaRem','numeroRem','complementoRem',
            'bairroRem','cidadeRem','ufRem')
    limpaParceiro('cnpjDest', "inscDest", "razaoDest", "fantasiaDest","cepDest","ruaDest", "numeroDest", "complementoDest",
            "bairroDest", "cidadeDest", "ufDest")
    limpaParceiro('cnpjRedesp', "inscRedesp", "razaoRedesp", "fantasiaRedesp","cepRedesp","ruaRedesp", "numeroRedesp", 
            "complementoRedesp", "bairroRedesp", "cidadeRedesp", "ufRedesp")  
    limpaParceiro('cnpjConsig', "inscConsig", "razaoConsig", "fantasiaConsig","cepConsig","ruaConsig", "numeroConsig", 
            "complementoConsig", "bairroConsig", "cidadeConsig", "ufConsig") 
    $('#modalidadeFrete').val(0);
    $('#numDtc').val('')
    $('#rotasDtc').val(0)
    limpaColeta()
    limpaCotacao()
    limpaNf()
    limparTabelaNf()
}

function buscaDtc () {
    let url = '/preDtc/buscaDtc/'
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            limpaDtc()
            carregaDtc(response)
            return(response)
         },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

async function carregaDtcMemoria () {
    let url = '/preDtc/buscaDtc/'
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {

            return(response)
         },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}


function excluiDtc(idDtc) {
    let url = '/preDtc/excluiDtc/'
    let postData = $('form').serialize();
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            alert("Dtc Deletado com sucesso");
            $('#numPed').val("")
            limpaDtc()
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

$('#btnBuscaDtc').on('click', async function(e) {
    limpaDtc()
    buscaDtc()
    e.preventDefault();
});

$('#excluiDtc').on('click', async (e) => {
    let numPedido = $('#numPed').val();
    let msg = `Tem certeza que deseja excluir o DTC de número ${numPedido}?`;
  
    let confirmacaoExclusao = await msgConfirmacao(msg); 
  
    if (confirmacaoExclusao) {
      excluiDtc(numPedido);
    }
  
    e.preventDefault();
  });

$('#btnNovo').on('click', function(e) {
    e.preventDefault();
    $('#numPed').val("")
    limpaDtc()
});

