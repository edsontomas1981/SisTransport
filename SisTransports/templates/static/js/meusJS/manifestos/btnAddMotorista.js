var btnAddMotorista = document.getElementById('btnAdicionaMotorista')
var listaMotoristas = []

btnAddMotorista.addEventListener('click',async ()=>{
    let cpfMotorista = document.getElementById('cpfMotoristaManifesto')
    let idManifesto = document.getElementById('spanNumManifesto')

    if(cpfMotorista.value.trim() == '' ){
        msgAviso("Por favor, selecione um motorista antes de prosseguir.")
        return
    }

    if(idManifesto.textContent == ''){
        msgAviso("Para adicionar um motorista, é necessário primeiro salvar ou selecionar um manifesto.")
    }else{

        let response  = await connEndpoint('/operacional/add_motorista_manifesto/', {'cpfMotorista':cpfMotorista.value,
                                                                                    'idManifesto':idManifesto.textContent});

        populaTbodyMotorista(response.motoristas)

        switch (response.status) {
            case 200:
                msgOk('Motorista cadastrado com sucesso!')
                break;
            default:
                break;
        }
        limpaMotorista();
    }
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
        msgAlerta(`O motorista com CPF ${novoCPF} já está cadastrado.`);
    } else {
        // Caso contrário, adiciona o novo motorista à lista
        listaMotoristas.push({ 'id': novoCPF, 'nome': novoNome });
    }
}









