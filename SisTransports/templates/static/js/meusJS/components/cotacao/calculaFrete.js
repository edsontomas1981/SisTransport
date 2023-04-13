const tabelaCotacao = document.getElementById('tabelaCotacao');
tabelaCotacao.addEventListener('change', (event) => {
    limpaCamposFreteCotacao();
    calculoFreteGeral();
});

const calculoFreteGeral =()=>{
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
    recalculaFreteCotacao()
}

const carregaFreteInformado=()=>{
    let select = $('#tabelaCotacao');
    select.empty();
    select.append($('<option>', {
        value: 0,
        text: 'Selecione a tabela'
    }));
    desbloqueiaFreteCotacao();
}

const btnCalculaCotacao = document.getElementById('btnCalculaCotacao');
btnCalculaCotacao.addEventListener('click',async (e)=>{
    alert(2)
    recalculaFreteCotacao()
    e.preventDefault();
});

const calculaIcmsCotacao=(listaValores)=>{
    let baseDeCalculo
    let freteTotal=0.00
    let subTotal=0.00
    let icms
    let icmsInclusoCotacao = document.getElementById('icmsInclusoCotacao')
    let aliquota = document.getElementById('aliquotaCotacao')
    
    for (const valor in listaValores) {
        console.log(listaValores[valor])
        subTotal += parseFloat(listaValores[valor])
    }

    percentuaAliquota=((100-parseFloat(aliquota.value))/100)
    console.log(percentuaAliquota)

    if (icmsInclusoCotacao.checked){
        freteTotal = parseFloat(subTotal)/percentuaAliquota
        icms = parseFloat(freteTotal)-parseFloat(subTotal)
        baseDeCalculo = freteTotal
        $('#freteTotalCotacao').val(arredondaDuasCasas(freteTotal));    
        $('#baseCalculoCotacao').val(arredondaDuasCasas(baseDeCalculo));
        $('#icmsCotacao').val(arredondaDuasCasas(icms));
    }else{
        freteTotal = parseFloat(subTotal)
        icms=freteTotal-(subTotal*parseFloat(percentuaAliquota))
        baseDeCalculo=freteTotal
        $('#freteTotalCotacao').val(arredondaDuasCasas(freteTotal));    
        $('#baseCalculoCotacao').val(arredondaDuasCasas(baseDeCalculo));
        $('#icmsCotacao').val(arredondaDuasCasas(icms));        
    }
}

const recalculaFreteCotacao=()=>{
    let listaValores=[]
    listaValores.push($('#fretePesoCotacao').val()=="" ? 0:$('#fretePesoCotacao').val())
    listaValores.push($('#advalorCotacao').val()=="" ? 0:$('#advalorCotacao').val())
    listaValores.push($('#vlrColetaCotacao').val()=="" ? 0:$('#vlrColetaCotacao').val())
    listaValores.push($('#grisCotacao').val()=="" ? 0:$('#grisCotacao').val())
    listaValores.push($('#pedagioCotacao').val()=="" ? 0:$('#pedagioCotacao').val())
    listaValores.push($('#despachoCotacao').val()=="" ? 0:$('#despachoCotacao').val())
    listaValores.push($('#outrosCotacao').val()=="" ? 0:$('#outrosCotacao').val())
    calculaIcmsCotacao(listaValores)
}

$('.calculoCotacao').on('change',()=>{
    let valor= recalculaFreteCotacao();
    console.log(valor)
})