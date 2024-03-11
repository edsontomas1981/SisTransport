var btnAddMotorista = document.getElementById('btnAdicionaMotorista')
var listaMotoristas = []


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

    console.log('o que vc veio parar aqui')
    // Verifica se o CPF já está na lista
    const cpfExistente = listaMotoristas.find(motorista => motorista.id === novoCPF);
    
    // Se o CPF já existe, exibe uma mensagem e não adiciona o motorista novamente
    if (cpfExistente) {
        msgAlerta(`O motorista com CPF ${novoCPF} já está cadastrado.`);
    } else {
        // Caso contrário, adiciona o novo motorista à lista
        listaMotoristas.push({ 'id': novoCPF, 'nome': novoNome });
    }
}









