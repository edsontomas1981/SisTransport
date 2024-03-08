const btnRemoveMotorista = (cpfMotorista)=>{
    let numManifesto = document.getElementById('spanNumManifesto')
    listaMotoristas=removerMotoristaLista(listaMotoristas,cpfMotorista)
    popula_tbody('tbodyMotorista',listaMotoristas,botoes,false)
}

const removerMotoristaLista = (listaMotoristas, cpf)=> {
    const novaListaMotorista = listaMotoristas.filter(listaMotoristas => listaMotoristas.id !== cpf);
    
    if (novaListaMotorista.length === listaMotoristas.length) {
        console.log(`Nenhum veiculo encontrado com o cpf ${cpf}.`);
    } else {
        console.log(`cpf ${cpf} removido com sucesso.`);
    }

    return novaListaMotorista;
}
