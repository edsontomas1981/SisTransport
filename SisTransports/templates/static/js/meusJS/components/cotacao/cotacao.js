var listaTabelas

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

const tabelaCotacao = document.getElementById('tabelaCotacao');
tabelaCotacao.addEventListener('change', (event) => {
    // Obtenha a opção selecionada
    const tabelaSelecionada = event.target.value;
    if(tabelaSelecionada !=0) {
        const valores = Object.values(listaTabelas);
        const tabelasSelecionadas = valores.find(listaTabelas => listaTabelas.id == tabelaSelecionada);
        const tabela = tabelasSelecionadas ? tabelasSelecionadas : null;
        Swal.fire({
            title: 'Deseja adicionar um valor de coleta?',
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: 'Sim',
            denyButtonText: 'Não',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const {value: vlrColeta} = await Swal.fire({
                    input: 'text',
                    inputLabel: 'Insira o valor em R$',
                    inputPlaceholder: 'Exemplo: 25,99'
                })
                if (vlrColeta) {
                    let calcula = new CalculaFrete(tabela, $('#volumeCotacao').val(), $('#pesoCotacao').val(), $('#valorNfCotacao').val(),
                        $('#resultM3Cotacao').val());
                    calcula.setVlrColeta(vlrColeta)
                    calcula.calculaFrete()
                    $('#aliquotaCotacao').val(calcula.tabela.aliquotaIcms);
                    populaFreteCotacao(calcula.listaFrete)
                } else {
                    let calcula = new CalculaFrete(tabela, $('#volumeCotacao').val(), $('#pesoCotacao').val(), $('#valorNfCotacao').val(),
                        $('#resultM3Cotacao').val());
                    calcula.setVlrColeta(0)
                    calcula.calculaFrete()
                    $('#aliquotaCotacao').val(calcula.tabela.aliquotaIcms);
                    populaFreteCotacao(calcula.listaFrete)
                }
            } else if (result.isDenied) {
                let calcula = new CalculaFrete(tabela, $('#volumeCotacao').val(), $('#pesoCotacao').val(), $('#valorNfCotacao').val(),
                    $('#resultM3Cotacao').val());
                calcula.setVlrColeta(0)
                calcula.calculaFrete()
                $('#aliquotaCotacao').val(calcula.tabela.aliquotaIcms);
                populaFreteCotacao(calcula.listaFrete)
            }
        })
    }
});


$('#tipoTabelaCotacao').on('change', function() {
    // Verifica o valor da opção selecionada
    var selectedValue = $(this).val();
   
    // Executa ação com base no valor selecionado
    if (selectedValue === '1') {
        carregaTabelasGerais()
    } else if (selectedValue === '2') {
        carregaTabelasEspecificas()
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
    resetaSelectCotacao();
}
$('#rotasDtc').on('change',function(e){
    resetaSelectCotacao()
})
const resetaSelectCotacao = () => {
    const tipoTabelaCotacao = $('#tipoTabelaCotacao')[0];
    tipoTabelaCotacao.innerHTML = '<option value="0">Selecione o tipo de tabela</option><option value="1">Tabela geral</option><option value="2">Tabela cliente</option><option value="3">Frete informado</option>';

    const tabelaCotacao = $('#tabelaCotacao')[0];
    tabelaCotacao.innerHTML =''
    tabelaCotacao.innerHTML = '<option value="0">Selecione a tabela</option>';
};
$('#pills-cotacao-tab').on('focus', function(e) {
    resetaSelectCotacao()
});

const btnCalculaCotacao = document.getElementById('btnCalculaCotacao');
btnCalculaCotacao.addEventListener('click',async (e)=>{
   let valores= [$('#fretePesoCotacao').val(),
    $('#advalorCotacao').val(),
    $('#vlrColetaCotacao').val(),
    $('#grisCotacao').val(),
    $('#pedagioCotacao').val(),
    $('#despachoCotacao').val(),
    $('#outrosCotacao').val()]
    let subtotal=0
    for (const valoresKey in valores) {
        subtotal+=parseFloat(valores[valoresKey])
    }
    let aliquota=(100-parseFloat($('#aliquotaCotacao').val()))/100;

    let freteTotal = subtotal/aliquota
    let icms=freteTotal-subtotal
    $('#baseCalculoCotacao').val(freteTotal.toFixed(2))
    $('#freteTotalCotacao').val(freteTotal.toFixed(2))
    $('#icmsCotacao').val(icms.toFixed(2))
});

const populaFreteCotacao = (listaFrete) => {
    $('#fretePesoCotacao').val(listaFrete.fretePeso.toFixed(2));
    $('#advalorCotacao').val(listaFrete.advalor.toFixed(2));
    $('#vlrColetaCotacao').val(listaFrete.vlrColeta.toFixed(2));
    $('#grisCotacao').val(listaFrete.gris.toFixed(2));
    $('#pedagioCotacao').val(listaFrete.vlrPedagio.toFixed(2));
    $('#despachoCotacao').val(listaFrete.despacho.toFixed(2));
    $('#outrosCotacao').val(listaFrete.outros.toFixed(2));


}


const carregaTabelasEspecificas=async()=>{
    let conexao = new Conexao('/comercial/readTabelasPorParceiro/', {tomador:$('#cnpjTomador').val()});
    try {
        const result = await conexao.sendPostRequest();
        populaSelectTabelas('tabelaCotacao',result)
        listaTabelas=result.tabelas
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
        populaSelectTabelas('tabelaCotacao',result)
        listaTabelas=result.tabelas
        // console.log(result); // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}

const geraDadosCotacao=()=>{
return{
        'qtde':$('#volumeCotacao').val(),
        'vlrNf':$('#valorNfCotacao').val(),
        'peso':$('#pesoCotacao').val(),
        'm3':$('#resultM3Cotacao').val(),
        'vlrColeta':$('#vlrColetaCotacao').val(),
        'tabela':$('#tabelaCotacao').val()
    }
};

