const tabelaCotacao = document.getElementById('tabelaCotacao');
tabelaCotacao.addEventListener('change', (event) => {
    limpaCamposFreteCotacao();
    calculoFreteGeral(event);
});

const calculoFreteGeral = (event) => { 
    // Obtenha a opção selecionada
    const tabelaSelecionada = event.target.value;

    if (tabelaSelecionada != 0) {
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
                    calculoCotacao(tabela, vlrColeta);
                } else {
                    calculoCotacao(tabela); // Aqui você está passando "vlrColeta" que é undefined
                }

            } else if (result.isDenied) {
                calculoCotacao(tabela);
            }
        })
    }
}


const calculoCotacao= async (tabela,vlrColeta)=>{
    console.log(tabela)
    let calcula = new CalculaFrete(tabela,geraDadosCotacao());
    if (vlrColeta){
        calcula.setVlrColeta(vlrColeta)
    }
    calcula.calculaFrete()
    $('#pesoFaturadoCotacao').val(calcula.pesoFaturado)
    populaFreteCotacao(calcula.composicaoFrete)
    recalculaFreteCotacao()//mudar nome funcao na verdade ela não recalcula ela soma os valores apos preenchidos
    if(tabela.descricao){
    preencheTabelaEmUso(tabela.descricao)
    }else{
        preencheTabelaEmUso('Frete informado')
    }
}

const carregaFreteInformado=(selectDestino)=>{
    let select = $('#'+selectDestino);
    select.empty();
    select.append($('<option>', {
        value: 0,
        text: 'Selecione a tabela'
    }));
    desbloqueiaFreteCotacao();
}



const calculaIcmsCotacao=(listaValores)=>{
    let baseDeCalculo
    let freteTotal=0.00
    let subTotal=0.00
    let icms
    let icmsInclusoCotacao = document.getElementById('icmsInclusoCotacao')
    let aliquota = document.getElementById('aliquotaCotacao')
    
    for (const valor in listaValores) {
        subTotal += parseFloat(listaValores[valor])
    }

    percentuaAliquota=((100-parseFloat(aliquota.value))/100)

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

const recalculaFreteCotacao=()=>{//mudar nome funcao na verdade ela não recalcula ela soma os valores apos preenchidos
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
})

const populaCotacao = async(response) => {
    $('#nomeCotacao').val(response.nome);
    $('#contatoCotacao').val(response.contato);
    $('#nfCotacao').val(response.numNf);
    $('#volumeCotacao').val(response.qtde);
    $('#mercadoriaCotacao').val(response.tipoMercadoria);
    $('#valorNfCotacao').val(response.vlrNf);
    $('#pesoCotacao').val(response.peso);
    $('#pesoFaturadoCotacao').val(response.pesoFaturado);
    $('#resultM3Cotacao').val(response.m3);
    $('#obsCotacao').val(response.observacao);
    $('#fretePesoCotacao').val(response.freteValor);
    $('#advalorCotacao').val(response.adValor);
    $('#vlrColetaCotacao').val(response.vlrColeta);
    $('#grisCotacao').val(response.gris);
    $('#pedagioCotacao').val(response.pedagio);
    $('#despachoCotacao').val(response.despacho);
    $('#Outros').val(response.mercadoria);
    $('#baseCalculoCotacao').val(response.baseDeCalculo);
    $('#aliquotaCotacao').val(response.aliquota);
    $('#icmsCotacao').val(response.icmsRS);
    $('#icmsInclusoCotacao').prop('checked', response.icmsIncluso);
    $('#freteTotalCotacao').val(response.totalFrete);
    
    if(response.tabela){
        preencheTabelaEmUso(response.tabela.descricao)
        }else{
            preencheTabelaEmUso('Frete informado')
        }
};

const preencheTabelaEmUso = (descricaoTabela)=>{
    let tabelaEmUso = document.getElementById("tabelaEmUso")
    tabelaEmUso.textContent = " | Tabela selecionada : " + descricaoTabela
}

  const limpaCotacao=()=>{
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
    $('#advalorCotacao').val('')
    $('#vlrColetaCotacao').val('')
    $('#grisCotacao').val('')
    $('#pedagioCotacao').val('')
    $('#despachoCotacao').val('')
    $('#Outros').val('')
    $('#baseCalculoCotacao').val('')
    $('#aliquotaCotacao').val('')
    $('#icmsCotacao').val('')
    $('#freteTotalCotacao').val('')
  }