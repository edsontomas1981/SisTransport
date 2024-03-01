var btnAddMotorista = document.getElementById('btnAdicionaMotorista')
var listaMotoristas = []

const btnRemoveMotorista = (element)=>{
    listaMotoristas=removerMotoristaLista(listaMotoristas,element)
    popula_tbody('tbodyMotorista',listaMotoristas,botoes,false)
}

let botoes={
    excluir: {
        classe: "btn-danger text-white",
        texto: 'Apagar',
        callback: btnRemoveMotorista
      }
  };

btnAddMotorista.addEventListener('click',()=>{


    let cpfMotorista = document.getElementById('cpfMotoristaManifesto')
    let nomeMotorista = document.getElementById('nomeMotoristaManifesto')

    let nome = nomeMotorista.value.replace(/\s/g, '');

    if (nome != ""){
        // listaMotoristas.push({'cpf':cpfMotorista.value,'nome':nomeMotorista.value})
        adicionarMotoristaNaLista(listaMotoristas,cpfMotorista.value,truncateString(nomeMotorista.value,12))
        popula_tbody('tbodyMotorista',listaMotoristas,botoes,false)
    }else{
        msgErro('É necessário selecionar um motorista')
    }

    limpaMotorista()

})

const limpaMotorista = ()=>{
    document.getElementById('cpfMotoristaManifesto').value = ''
    document.getElementById('nomeMotoristaManifesto').value = ''
}

// Função para adicionar um motorista à lista, verificando se o CPF já existe
const adicionarMotoristaNaLista=(listaMotoristas, novoCPF, novoNome)=> {
    // Verifica se o CPF já está na lista
    const cpfExistente = listaMotoristas.find(motorista => motorista.id === novoCPF);
    
    // Se o CPF já existe, exibe uma mensagem e não adiciona o motorista novamente
    if (cpfExistente) {
        console.log(`O motorista com CPF ${novoCPF} já está na lista.`);
    } else {
        // Caso contrário, adiciona o novo motorista à lista
        listaMotoristas.push({ 'id': novoCPF, 'nome': novoNome });
        console.log(`Motorista com CPF ${novoCPF} adicionado com sucesso.`);
    }
}

// Função para remover um motorista da lista com base no CPF
const removerMotoristaLista = (listaMotoristas, cpf)=> {
    // Filtra a lista para excluir o motorista com o CPF especificado
    const novaListaMotoristas = listaMotoristas.filter(motorista => motorista.id !== cpf);
    
    // Verifica se algum motorista foi removido
    if (novaListaMotoristas.length === listaMotoristas.length) {
        console.log(`Nenhum motorista encontrado com o CPF ${cpf}.`);
    } else {
        console.log(`Motorista com CPF ${cpf} removido com sucesso.`);
    }

    return novaListaMotoristas;
}






