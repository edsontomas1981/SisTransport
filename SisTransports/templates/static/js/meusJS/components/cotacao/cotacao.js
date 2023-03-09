class Conexao {
    constructor(url,data){
        this.url=url
        this.data=data
    }

    getCSRFToken() {
        const cookieValue = document.cookie.match(/(^|;)csrftoken=([^;]*)/)[2];
        return cookieValue;
      }
    
      async sendPostRequest() {
        this.csrfToken=this.getCSRFToken()
        try {
          const response = await fetch(this.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": this.csrfToken,
            },
            body: JSON.stringify(this.data),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const result = await response.json();
          return result;
        } catch (error) {
          console.error(error);
          alert("Erro interno!");
        }
      }
}

$('#btnNovaCotacao').on('click', function(e) {
    limpaCotacao()
    e.preventDefault();
})

async function createCotacao() {
    const conexao = new Conexao('/comercial/cotacao/createCotacao/', {dados: 'meus dados'});
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
    } else if (selectedValue === '2') {
        alert('Carrega Tabelas especificas')
      // Executa ação quando a opção "Tabela cliente" é selecionada
    } else {
        alert(selectedValue)
      // Executa ação quando nenhuma opção é selecionada
    }
});

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

var populaSelectTabelas = (dados,idSelect)=>{
    var select = $(idSelect);
    select.empty(); // limpa a select box antes de preencher
    for (var dado in dados) {
        select.append($('<option>', {
            value: dados[dado],
            text: dado
        }));
    }
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

