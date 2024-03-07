var btnAddVeiculo = document.getElementById('btnAdicionaVeiculo')
var listaVeiculos = []

let botoesVeiculo={
    excluir: {
        classe: "btn-danger text-white",
        texto: 'Apagar',
        callback: btnRemoveVeiculos
      }
  };

btnAddVeiculo.addEventListener('click',()=>{
    let placaManifesto = document.getElementById('placaPrincipal')
    let modelo = document.getElementById('modeloPrincipal')
    let proprietario = document.getElementById('proprietarioPrincipal')
    let nomeProp = proprietario.value.replace(/\s/g, '');

    if (nomeProp != ""){
        adicionarVeiculosNaLista(listaVeiculos,placaManifesto.value,truncateString(modelo.value,12),truncateString(proprietario.value,12))
        popula_tbody('tbodyVeiculos',listaVeiculos,botoesVeiculo,false)
    }else{
        msgErro('É necessário selecionar uma placa')
    }
    limpaVeiculos(listaVeiculos)    
})

const limpaVeiculos = ()=>{
    document.getElementById('placaPrincipal').value = ''
    document.getElementById('modeloPrincipal').value = ''
    document.getElementById('proprietarioPrincipal').value = ''
}

const adicionarVeiculosNaLista = (listaVeiculos, novaPlaca, novoModelo, novoProprietario) => {
    const placaExistente = listaVeiculos.find(veiculo => veiculo.id === novaPlaca);
    
    if (placaExistente) {
        console.log(`Veiculo de placa ${novaPlaca} já está na lista.`);
    } else {
        listaVeiculos.push({ 'id': novaPlaca, 'modelo': novoModelo, 'proprietario': novoProprietario });
    }
}


