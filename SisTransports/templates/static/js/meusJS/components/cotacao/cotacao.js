var listaTabelas
var icmsIncluso = document.getElementById("icmsInclusoCotacao");

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

const bloqueiaFreteCotacao=()=>{
    $('#freteValorCotacao').attr('disabled',true)
    $('#fretePesoCotacao').attr('disabled',true)
    $('#advalorCotacao').attr('disabled',true)
    $('#grisCotacao').attr('disabled',true)
    $('#pedagioCotacao').attr('disabled',true)
    $('#despachoCotacao').attr('disabled',true)
    $('#outrosCotacao').attr('disabled',true)
    $('#baseCalculoCotacao').attr('disabled',true)
    $('#aliquotaCotacao').attr('disabled',true)
    $('#icmsCotacao').attr('disabled',true)
    $('#vlrColetaCotacao').attr('disabled',true)
}

const desbloqueiaFreteCotacao=()=>{
    $('#freteValorCotacao').attr('disabled',false)
    $('#fretePesoCotacao').attr('disabled',false)
    $('#advalorCotacao').attr('disabled',false)
    $('#grisCotacao').attr('disabled',false)
    $('#pedagioCotacao').attr('disabled',false)
    $('#despachoCotacao').attr('disabled',false)
    $('#outrosCotacao').attr('disabled',false)
    $('#baseCalculoCotacao').attr('disabled',false)
    $('#aliquotaCotacao').attr('disabled',false)
    $('#icmsCotacao').attr('disabled',false)
    $('#vlrColetaCotacao').attr('disabled',false)
    $('#tabelaCotacao').val(0)

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
    limpaCamposFreteCotacao();
    calculoFreteGeral();
});

const calculoFreteGeral =()=>{
    bloqueiaFreteCotacao();
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
                    alert(vlrColeta)
                    calculoCotacao(tabela,vlrColeta)
                }else{
                    calculoCotacao(tabela,vlrColeta)
                }

            } else if (result.isDenied) {
                calculoCotacao(tabela)
            }
        })
    }
}

const calculoCotacao= async (tabela,vlrColeta)=>{
    let calcula = new CalculaFrete(tabela,geraDadosCotacao());
    if (vlrColeta){
        calcula.setVlrColeta(vlrColeta)
    }
    calcula.calculaFrete()
    populaFreteCotacao(calcula.composicaoFrete)
    
}


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
        carregaFreteInformado();
      // Executa ação quando nenhuma opção é selecionada
    }
});

const carregaFreteInformado=()=>{
    let select = $('#tabelaCotacao');
    select.empty();
    select.append($('<option>', {
        value: 0,
        text: 'Selecione a tabela'
    }));
    desbloqueiaFreteCotacao();
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
    limpaCamposFreteCotacao();
    resetaSelectCotacao();
}
$('#rotasDtc').on('change',function(e){
    resetaSelectCotacao()
})

const limpaCamposFreteCotacao = ()=>{
    $('#freteValorCotacao').val('')
    $('#fretePesoCotacao').val('')
    $('#advalorCotacao').val('')
    $('#grisCotacao').val('')
    $('#pedagioCotacao').val('')
    $('#despachoCotacao').val('')
    $('#outrosCotacao').val('')
    $('#baseCalculoCotacao').val('')
    $('#aliquotaCotacao').val('')
    $('#icmsCotacao').val('')
}
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
    bloqueiaFreteCotacao();
    e.preventDefault();
});

const populaFreteCotacao = (composicaoFrete) => {
    $('#fretePesoCotacao').val(composicaoFrete.fretePeso ? arredondaDuasCasas(composicaoFrete.fretePeso):arredondaDuasCasas(0));
    $('#advalorCotacao').val(composicaoFrete.advalor ? arredondaDuasCasas(composicaoFrete.advalor) :arredondaDuasCasas(0) );
    $('#vlrColetaCotacao').val(composicaoFrete.vlrColeta ? arredondaDuasCasas(composicaoFrete.vlrColeta):arredondaDuasCasas(0) );
    $('#grisCotacao').val(composicaoFrete.gris ? arredondaDuasCasas(composicaoFrete.gris) : arredondaDuasCasas(0));
    $('#pedagioCotacao').val(composicaoFrete.vlrPedagio ? arredondaDuasCasas(composicaoFrete.vlrPedagio):arredondaDuasCasas(0));
    $('#despachoCotacao').val(composicaoFrete.despacho ? arredondaDuasCasas(composicaoFrete.despacho):arredondaDuasCasas(0));
    $('#outrosCotacao').val(composicaoFrete.outros ? arredondaDuasCasas(composicaoFrete.outros):arredondaDuasCasas(0));
    $('#baseCalculoCotacao').val(arredondaDuasCasas(composicaoFrete.baseDeCalculo))
    $('#freteTotalCotacao').val(arredondaDuasCasas(composicaoFrete.freteTotal))
    $('#icmsCotacao').val(arredondaDuasCasas(composicaoFrete.icms))
    $('#aliquotaCotacao').val(composicaoFrete.aliquota);
    $('#vlrColetaCotacao').val(composicaoFrete.vlrColeta)
}

const arredondaDuasCasas=(valor)=>{
    return parseFloat(valor).toFixed(2)
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
        'volumes':$('#volumeCotacao').val(),
        'vlrNf':$('#valorNfCotacao').val(),
        'peso':$('#pesoCotacao').val(),
        'm3':$('#resultM3Cotacao').val(),
        'icmsSimNao':icmsIncluso.checked
    }
};

