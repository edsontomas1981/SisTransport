const btnRemoveMotorista = (cpfMotorista)=>{
    let numManifesto = document.getElementById('spanNumManifesto')
    listaMotoristas=removerMotoristaLista(listaMotoristas,cpfMotorista)
    popula_tbody('tbodyMotorista',listaMotoristas,botoes,false)
}

const removerVeiculoLista = (listaVeiculos, placa)=> {
    const novaListaVeiculos = listaVeiculos.filter(listaVeiculos => listaVeiculos.id !== placa);
    
    if (novaListaVeiculos.length === listaVeiculos.length) {
        console.log(`Nenhum veiculo encontrado com o placa ${placa}.`);
    } else {
        console.log(`Placa ${placa} removido com sucesso.`);
    }

    return novaListaVeiculos;
}
