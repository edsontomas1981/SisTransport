let txtCpfVeiculo = document.getElementById('cpfMotorista')

txtCpfVeiculo.addEventListener('blur',async()=>{
    alert(txtCpfVeiculo.value)
    if (txtCpfVeiculo.value != ''){
        if (validateDocumentNumber(txtCpfVeiculo.value)){
            limpaMotoristaVeiculo()
            let response = await buscarParceiro(txtCpfVeiculo.value)
            if (response.status == 200){
                document.getElementById('nomeMotorista').value = response.parceiro.raz_soc
                response= await connEndpoint('/operacional/read_motorista/', {'cpfMotorista':txtCpfVeiculo.value})
                if (response.status >= 200 && response.status < 300 ){
                    console.log(response.motorista)
                    populaMotorista(response.motorista)
                }
            }

        }else{
            msgErro('CPF inválido')
        }
    }
})

const buscarParceiro = async(cnpj)=>{
    url='/parceiros/read_parceiro_json/'
    let dados = {'cnpj_cpf':cnpj}
    resposta = await connEndpoint(url,dados)
    return resposta
}

const populaMotorista = (motorista)=>{
    limpaMotoristaVeiculo()
    document.getElementById('cpfMotorista').value=motorista.parceiro_fk.cnpj_cpf
    document.getElementById('nomeMotorista').value=motorista.parceiro_fk.raz_soc
    document.getElementById('dataNascimento').value=formataData(motorista.data_nascimento)
    document.getElementById('dtToxicologico').value=formataData(motorista.validade_toxicologico)
    document.getElementById('filiacaoPai').value=motorista.filiacao_pai
    document.getElementById('pisMotorista').value=motorista.pis
    document.getElementById('estadoCivil').value=motorista.estado_civil
    document.getElementById('filiacaoMae').value=motorista.filiacao_mae
    document.getElementById('numeroHabilitacao').value=motorista.cnh_numero
    document.getElementById('categoriaHabilitacao').value=motorista.cnh_categoria
    document.getElementById('dataNascimento').value=formataData(motorista.data_nascimento)
    document.getElementById('dataEmissao').value=formataData(motorista.dt_emissao_cnh)
    document.getElementById('dataValidade').value=formataData(motorista.cnh_validade)
    document.getElementById('dataPrimeiraHabilitacao').value=formataData(motorista.dt_primeira_cnh)
    document.getElementById('registroHabilitacao').value=motorista.numero_registro_cnh
}

const limpaMotoristaVeiculo=()=>{

    document.getElementById('dataNascimento').value=''
    document.getElementById('dtToxicologico').value=''
    document.getElementById('filiacaoPai').value=''
    document.getElementById('pisMotorista').value=''
    document.getElementById('estadoCivil').selectedIndex=0
    document.getElementById('filiacaoMae').value=''
    document.getElementById('numeroHabilitacao').value=''
    document.getElementById('categoriaHabilitacao').selectedIndex=0
    document.getElementById('dataNascimento').value=''
    document.getElementById('dataEmissao').value=''
    document.getElementById('dataValidade').value=''
    document.getElementById('dataPrimeiraHabilitacao').value=''
    document.getElementById('registroHabilitacao').value=''
}

const limpaCnpjENomeMotorista=()=>{
    document.getElementById('cpfMotorista').value=''
    document.getElementById('nomeMotorista').value=''
}


document.getElementById('btnLimpaMotorista').addEventListener('click',()=>{
    limpaMotoristaVeiculo();
    limpaCnpjENomeMotorista();
})

document.getElementById('btnCloseMotorista').addEventListener('click',()=>{
    limpaMotoristaVeiculo();
    limpaCnpjENomeMotorista();
})