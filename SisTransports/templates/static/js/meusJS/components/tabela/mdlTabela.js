const conexaTabelas =async (url,dados)=>{
    let conexao = new Conexao(url, dados);
    try {
        const result = await conexao.sendPostRequest();
        return result
        // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }

}

function populaTabela(response) {
    $('#numTabela').val(response.tabela.id)
    populaFaixas(response.tabela.id)
    $('#descTabela').val(response.tabela.descricao)
    $('#tabBloq').prop("checked", response.tabela.bloqueada);
    $('#icms').prop("checked", response.tabela.icmsIncluso);
    $('#cobraCubagem').prop("checked", response.tabela.cubagem);
    $('#vlrFrete').val(response.tabela.frete);
    $('#tipoTabela').val(response.tabela.tipoTabela);
    $('#advalor').val(response.tabela.adValor);
    $('#gris').val(response.tabela.gris);
    $('#despacho').val(response.tabela.despacho);
    $('#outros').val(response.tabela.outros);
    $('#pedagio').val(response.tabela.pedagio);
    $('#cubagem').val(response.tabela.fatorCubagem);
    $('#freteMinimo').val(response.tabela.freteMinimo); 
    $('#tipoFrete').val(response.tabela.tipoCalculo);
    $('#tipoCobranPedagio').val(response.tabela.tipoPedagio);
    $('#aliquotaIcms').val(response.tabela.aliquotaIcms);
    $('#aliquotaIcms').val(response.tabela.aliquotaIcms);
    populaTabelaRotas(response)
    parceirosVinculados(response)
}

const mostrarTabela=async (idTabela)=> {
    resultado = await conexaTabelas('/comercial/readTabela/', {'id': idTabela});
    populaTabela(resultado)
    openModal('mdlTabFrete')
}

const populaTabelaRotas=(response)=>{
    limpaTabela('#rotasAnexadasTabela td')
    const data = response.rotas;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr" id="' + data[i].id + '">' +
            '<td id="nomeRota">' + data[i].nome + '</td>' +
            '<td>' + data[i].origemCidade + '-' + data[i].origemUf + '</td>' +
            '<td>' + data[i].destinoCidade + '-' +data[i].destinoUf + '</td>' +
            '<td>'+
            '<button type="button"class="btn btn-outline-danger btn-sm" id="desanexaRota">'+
            '<i class="fa fa-trash" aria-hidden="true"></i>'+
            '</button></td>' +
            '</tr>'

        $('#rotasAnexadasTabela tbody').append(template)
    }
}
