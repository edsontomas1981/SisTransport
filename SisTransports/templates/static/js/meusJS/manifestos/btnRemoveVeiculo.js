const btnRemoveVeiculos = (placa)=>{
    listaVeiculos=btnRemoveVeiculosLista(listaVeiculos,placa)
    popula_tbody('tbodyVeiculos',listaVeiculos,botoesVeiculo,false)
}

const btnRemoveVeiculosLista = (listaVeiculos, placa)=> {
    const novaListaVeiculos = listaVeiculos.filter(listaVeiculos => listaVeiculos.id !== placa);
    
    if (novaListaVeiculos.length === listaVeiculos.length) {
        console.log(`Nenhum veiculo encontrado com o cpf ${placa}.`);
    } else {
        console.log(`cpf ${placa} removido com sucesso.`);
    }

    return novaListaVeiculos;
}
