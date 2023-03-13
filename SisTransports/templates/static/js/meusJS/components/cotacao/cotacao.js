$('#btnNovaCotacao').on('click', function(e) {
    limpaCotacao()
    e.preventDefault();
})

async function createCotacao() {
    let conexao = new Conexao('/comercial/cotacao/createCotacao/', {dados: 'meus dados'});
    try {
        const result = await conexao.sendPostRequest();
        console.log(result); // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}



$('#btnSalvaCotacao').on('click', function(e) {
    if ($('#freteTotalCotacao').val()!=0){
        createCotacao();
    }else{
        let calculafrete = confirm('ATENÇÃO! Antes de salvar, calcule o frete para obter o valor correto.\
Clique em "OK" para calcular o frete.')
        if (calculafrete){
            desejaExluir()
        }else{
            alert('não calcula')
        }
    }        
    e.preventDefault();
})

calculafrete=()=>{
    alert('calculou o frete')
}

$('#tipoTabelaCotacao').on('change', function() {
    // Verifica o valor da opção selecionada
    var selectedValue = $(this).val();
   
    // Executa ação com base no valor selecionado
    if (selectedValue === '1') {
        alert('Carrega Tabelas gerais')
        carregaTabelasGerais()
    } else if (selectedValue === '2') {
        alert('Carrega Tabelas especificas')
        carregaTabelasEspecificas()
      // Executa ação quando a opção "Tabela cliente" é selecionada
    } else {
        alert(selectedValue)
      // Executa ação quando nenhuma opção é selecionada
    }
});

const carregaTabelasEspecificas=async()=>{
    let conexao = new Conexao('/comercial/readTabelasPorParceiro/', {dados: 'meus dados'});
    try {
        const result = await conexao.sendPostRequest();
        console.log(result); // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}

const carregaTabelasGerais=async()=>{
    let dados = {'idRota':$('#rotasDtc').val()}
    let conexao = new Conexao('/comercial/readTabelasGeraisPorRota/', dados);
    try {
        const result = await conexao.sendPostRequest();
        populaSelectTabelas('tabelaCotacao',result.tabelas)
        console.log(result); // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}


$('#btnExcluiCotacao').on('click', function(e) {
    desejaExluir()
    e.preventDefault();
})

const desejaExluir=()=>{
    Swal.fire({
        title: 'Tem certeza de que deseja apagar a cotação? Essa ação não pode ser desfeita e todos os dados relacionados serão perdidos.\n' +
            'Por favor, confirme abaixo para continuar ou clique em \'Cancelar\' para manter o item.',
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Apagado!', '', 'error')
        }
    })
}


function limpaCotacao(){
    $('#nomeCotacao').val('')
    $('#contatoCotacao').val('')
    $('#nfCotacao').val('')
    $('#volumeCotacao').val('')
    $('#mercadoriaCotacao').val('')
    $('#valorNfCotacao').val('')
    $('#pesoCotacao').val('')
    $('#pesoFaturadoCotacao').val('')
    $('#resultM3Cotacao').val('')
    $('#obsCotacao').val('')
    $('#fretePesoCotacao').val('')
    $('#freteValorCotacao').val('')
    $('#advalorCotacao').val('')
    $('#grisCotacao').val('')
    $('#pedagioCotacao').val('')
    $('#despachoCotacao').val('')
    $('#outrosCotacao').val('')
    $('#baseCalculoCotacao').val('')
    $('#aliquotaCotacao').val('')
    $('#icmsCotacao').val('')
}

$('#rotasDtc').on('change',function(e){
    $('#tipoTabelaCotacao').empty()
    $('#tipoTabelaCotacao').append($('<option>', {
            value: 0,
            text: 'Selecione o tipo de tabela'
    }));

    $('#tipoTabelaCotacao').append($('<option>', {
            value: 1,
            text: 'Tabela geral'
    }));

    $('#tipoTabelaCotacao').append($('<option>', {
            value: 1,
            text: 'Tabela cliente'
    }));

    $('#tabelaCotacao').empty()
    $('#tabelaCotacao').append($('<option>', {
            value: 0,
            text: 'Selecione a tabela'
    }));
})

