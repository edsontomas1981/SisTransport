document.addEventListener('DOMContentLoaded', async() => {

    let conexao = new Conexao('/operacional/dados_combos_veiculos/',{});
    try {
        const result = await conexao.sendPostRequest();
        adicionarDadosAoSelect(result.tipo_combustivel,'tipoCombustivel','id','tipo_combustivel')
        adicionarDadosAoSelect(result.marcas,'marcaVeiculo','id','marca')
        adicionarDadosAoSelect(result.tipo_veiculo,'tipoVeiculo','id','tipo_veiculo')
        adicionarDadosAoSelect(result.tipo_carroceria,'tipoCarroceria','id','tipo_carroceria')
        return result
        // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }

})

const preparaDadosPopulaSelect = (dados)=>{
    let lista = []
    dados.forEach(element => {
        lista.push(element)
    });
    return lista
}



