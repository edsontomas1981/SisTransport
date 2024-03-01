var btnAddVeiculo = document.getElementById('btnAdicionaVeiculo')
var listaVeiculos = []

const btnRemoveVeiculo = (element)=>{
    listaVeiculos=removerMotoristaLista(listaVeiculos,element)
    popula_tbody('tbodyVeiculos',listaVeiculos,botoes,false)
}

let botoesVeiculo={
    excluir: {
        classe: "btn-danger text-white",
        texto: 'Apagar',
        callback: btnRemoveVeiculo
      }
  };

  btnAddVeiculo.addEventListener('click',()=>{

    let placa = document.getElementById('placaPrincipal')
    let modelo = document.getElementById('modeloPrincipal')
    let proprietario = document.getElementById('proprietarioPrincipal')

    let nomeProp = proprietario.value.replace(/\s/g, '');

    console.log(nomeProp)

    if (nomeProp != ""){
        adicionarVeiculosNaLista(listaVeiculos,placa.value,truncateString(modelo.value,12),truncateString(proprietario.value,12))
        popula_tbody('tbodyVeiculos',listaVeiculos,botoesVeiculo,false)
    }else{
        msgErro('É necessário selecionar um motorista')
    }

    console.log(listaVeiculos)

    limpaVeiculos(listaVeiculos)    

})

const limpaVeiculos = ()=>{
    document.getElementById('placaPrincipal').value = ''
    document.getElementById('modeloPrincipal').value = ''
    document.getElementById('proprietarioPrincipal').value = ''
}

// Função para adicionar um motorista à lista, verificando se o CPF já existe
const adicionarVeiculosNaLista=(listaVeiculos, novaPlaca, novoModelo,novoProprietario)=> {
    // Verifica se o CPF já está na lista
    const placaExistente = listaVeiculos.find(placa => placa.id === novaPlaca);
    
    // Se o CPF já existe, exibe uma mensagem e não adiciona o motorista novamente
    if (placaExistente) {
        console.log(`O motorista com CPF ${novaPlaca} já está na lista.`);
    } else {
        // Caso contrário, adiciona o novo motorista à lista
        listaVeiculos.push({ 'id': novaPlaca, 'modelo': novoModelo,'proprietario':novoProprietario });
        console.log(`Veiculo placa ${novaPlaca} adicionado com sucesso.`);
    }
}

// Função para remover um motorista da lista com base no CPF
const removerVeiculoLista = (listaVeiculos, placa)=> {
    // Filtra a lista para excluir o motorista com o placa especificado
    const novaListaVeiculos = listaVeiculos.filter(motorista => motorista.id !== placa);
    
    // Verifica se algum motorista foi removido
    if (novaListaVeiculos.length === listaVeiculos.length) {
        console.log(`Nenhum motorista encontrado com o placa ${placa}.`);
    } else {
        console.log(`Motorista com placa ${placa} removido com sucesso.`);
    }

    return novaListaVeiculos;
}


